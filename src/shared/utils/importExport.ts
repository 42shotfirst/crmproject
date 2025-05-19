/**
 * Utility functions for importing and exporting data in various formats
 */

import { supabase } from "@/lib/supabase";

/**
 * Generic interface for data records
 */
export interface DataRecord {
  id?: string;
  [key: string]: any;
}

/**
 * Import result interface
 */
export interface ImportResult {
  success: boolean;
  imported: number;
  skipped: number;
  errors: { row: number; error: string }[];
  duplicates: { row: number; identifier: string }[];
  message: string;
  details?: string;
}

/**
 * Options for CSV import
 */
export interface CsvImportOptions<T extends DataRecord> {
  /** Required fields that must be present in the CSV */
  requiredFields: string[];
  /** Field to check for duplicates */
  uniqueField: string;
  /** Supabase table name to import into */
  tableName: string;
  /** Function to validate a record before import */
  validateRecord?: (
    record: T,
    rowIndex: number,
  ) => { valid: boolean; error?: string };
  /** Function to transform a record before import */
  transformRecord?: (record: any) => T;
  /** Whether to check for duplicates in the database */
  checkDatabaseDuplicates?: boolean;
}

/**
 * Import data from a CSV file
 *
 * @param file The CSV file to import
 * @param options Import options
 * @returns Import result
 */
export async function importFromCsv<T extends DataRecord>(
  file: File,
  options: CsvImportOptions<T>,
): Promise<ImportResult> {
  try {
    // Read the CSV file
    const text = await file.text();
    const rows = text.split("\n");
    const headers = rows[0].split(",").map((h) => h.trim());

    // Validate required headers
    const missingHeaders = options.requiredFields.filter(
      (h) => !headers.includes(h),
    );

    if (missingHeaders.length > 0) {
      throw new Error(`Missing required headers: ${missingHeaders.join(", ")}`);
    }

    // Parse the data
    const records: T[] = [];
    const errors: { row: number; error: string }[] = [];
    const duplicates: { row: number; identifier: string }[] = [];
    const uniqueValues = new Set<string>();

    // Skip header row
    for (let i = 1; i < rows.length; i++) {
      if (!rows[i].trim()) continue; // Skip empty rows

      const values = rows[i].split(",").map((v) => v.trim());
      const record: any = {};

      // Map values to headers
      headers.forEach((header, index) => {
        record[header] = values[index] || "";
      });

      // Transform record if needed
      const transformedRecord = options.transformRecord
        ? options.transformRecord(record)
        : (record as T);

      // Validate required fields
      let isValid = true;
      for (const field of options.requiredFields) {
        if (!transformedRecord[field]) {
          errors.push({ row: i + 1, error: `${field} is required` });
          isValid = false;
          break;
        }
      }

      if (!isValid) continue;

      // Custom validation
      if (options.validateRecord) {
        const validation = options.validateRecord(transformedRecord, i);
        if (!validation.valid) {
          errors.push({
            row: i + 1,
            error: validation.error || "Validation failed",
          });
          continue;
        }
      }

      // Check for duplicates in the current import
      const uniqueValue = transformedRecord[options.uniqueField]
        ?.toString()
        .toLowerCase();
      if (uniqueValue && uniqueValues.has(uniqueValue)) {
        duplicates.push({ row: i + 1, identifier: uniqueValue });
        continue;
      }

      if (uniqueValue) {
        uniqueValues.add(uniqueValue);
      }
      records.push(transformedRecord);
    }

    let dbDuplicates: T[] = [];

    // Check for duplicates in the database
    if (options.checkDatabaseDuplicates && records.length > 0) {
      const uniqueValues = records
        .map((r) => r[options.uniqueField]?.toString().toLowerCase())
        .filter(Boolean);

      const { data: existingRecords, error: fetchError } = await supabase
        .from(options.tableName)
        .select(options.uniqueField)
        .in(options.uniqueField, uniqueValues);

      if (fetchError) throw fetchError;

      const existingValues = new Set(
        existingRecords?.map((r) =>
          r[options.uniqueField]?.toString().toLowerCase(),
        ) || [],
      );

      dbDuplicates = records.filter((r) =>
        existingValues.has(r[options.uniqueField]?.toString().toLowerCase()),
      );

      // Filter out database duplicates
      const newRecords = records.filter(
        (r) =>
          !existingValues.has(r[options.uniqueField]?.toString().toLowerCase()),
      );

      // Insert new records
      if (newRecords.length > 0) {
        const { error: insertError } = await supabase
          .from(options.tableName)
          .insert(newRecords);

        if (insertError) throw insertError;
      }

      // Prepare result message
      let resultMessage = `Successfully imported ${newRecords.length} records.`;
      let resultDetails = "";

      if (dbDuplicates.length > 0) {
        resultDetails += `\n${dbDuplicates.length} records skipped (already exist in database).`;
      }

      if (duplicates.length > 0) {
        resultDetails += `\n${duplicates.length} duplicates found in the import file.`;
      }

      if (errors.length > 0) {
        resultDetails += `\n${errors.length} rows had errors and were skipped.`;
      }

      return {
        success: true,
        imported: newRecords.length,
        skipped: dbDuplicates.length + duplicates.length,
        errors,
        duplicates,
        message: resultMessage,
        details: resultDetails,
      };
    } else {
      // Insert all records without checking database duplicates
      if (records.length > 0) {
        const { error: insertError } = await supabase
          .from(options.tableName)
          .insert(records);

        if (insertError) throw insertError;
      }

      return {
        success: true,
        imported: records.length,
        skipped: duplicates.length,
        errors,
        duplicates,
        message: `Successfully imported ${records.length} records.`,
        details:
          duplicates.length > 0
            ? `\n${duplicates.length} duplicates found in the import file.`
            : "",
      };
    }
  } catch (err: any) {
    return {
      success: false,
      imported: 0,
      skipped: 0,
      errors: [],
      duplicates: [],
      message: "Import failed",
      details: err.message,
    };
  }
}

/**
 * Options for CSV export
 */
export interface CsvExportOptions {
  /** Fields to exclude from export */
  excludeFields?: string[];
  /** Custom filename (without extension) */
  filename?: string;
  /** Function to transform records before export */
  transformRecords?: (records: DataRecord[]) => DataRecord[];
}

/**
 * Export data to a CSV file
 *
 * @param tableName The Supabase table to export from
 * @param options Export options
 * @returns Whether the export was successful
 */
export async function exportToCsv(
  tableName: string,
  options: CsvExportOptions = {},
): Promise<boolean> {
  try {
    // Fetch all records
    const { data, error } = await supabase.from(tableName).select("*");

    if (error) throw error;

    if (!data || data.length === 0) {
      return false;
    }

    // Apply transformation if provided
    const records = options.transformRecords
      ? options.transformRecords(data)
      : data;

    // Get all possible headers
    const headers = new Set<string>();
    records.forEach((record) => {
      Object.keys(record).forEach((key) => {
        if (!options.excludeFields?.includes(key)) {
          headers.add(key);
        }
      });
    });

    // Convert to array and sort
    const headerArray = Array.from(headers).sort();

    // Create CSV content
    let csv = headerArray.join(",") + "\n";

    records.forEach((record) => {
      const row = headerArray.map((header) => {
        const value = record[header];
        // Handle special cases like objects, arrays, etc.
        if (typeof value === "object" && value !== null) {
          return `"${JSON.stringify(value).replace(/"/g, '""')}"`; // Escape quotes for CSV
        }
        return value !== undefined && value !== null
          ? `"${String(value).replace(/"/g, '""')}"`
          : "";
      });

      csv += row.join(",") + "\n";
    });

    // Create and download the file
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${options.filename || tableName}_export_${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    return true;
  } catch (err) {
    console.error("Export error:", err);
    return false;
  }
}

/**
 * Validate an email address
 *
 * @param email The email to validate
 * @returns Whether the email is valid
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Format file size in human-readable format
 *
 * @param bytes File size in bytes
 * @returns Formatted file size string
 */
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B";
  else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
  else return (bytes / 1048576).toFixed(1) + " MB";
}
