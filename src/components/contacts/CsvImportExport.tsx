import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Loader2, Upload, Download, Check, AlertCircle } from "lucide-react";

interface Contact {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  status: "lead" | "prospect" | "customer" | "inactive";
  notes?: string;
  custom_fields?: Record<string, any>;
}

export default function CsvImportExport() {
  const [isImporting, setIsImporting] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [importFile, setImportFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<{
    type: "success" | "error";
    message: string;
    details?: string;
  } | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImportFile(e.target.files[0]);
      setResult(null);
    }
  };

  const handleImport = async () => {
    if (!importFile) return;

    setIsImporting(true);
    setProgress(0);
    setResult(null);

    try {
      // Read the CSV file
      const text = await importFile.text();
      const rows = text.split("\n");
      const headers = rows[0].split(",").map((h) => h.trim());

      // Validate required headers
      const requiredHeaders = ["name", "email", "status"];
      const missingHeaders = requiredHeaders.filter(
        (h) => !headers.includes(h),
      );

      if (missingHeaders.length > 0) {
        throw new Error(
          `Missing required headers: ${missingHeaders.join(", ")}`,
        );
      }

      // Parse the data
      const contacts: Contact[] = [];
      const errors: { row: number; error: string }[] = [];
      const duplicates: { row: number; email: string }[] = [];
      const emails = new Set<string>();

      // Skip header row
      for (let i = 1; i < rows.length; i++) {
        if (!rows[i].trim()) continue; // Skip empty rows

        const values = rows[i].split(",").map((v) => v.trim());
        const contact: any = {};

        // Map values to headers
        headers.forEach((header, index) => {
          contact[header] = values[index] || "";
        });

        // Validate required fields
        if (!contact.name) {
          errors.push({ row: i + 1, error: "Name is required" });
          continue;
        }

        if (!contact.email) {
          errors.push({ row: i + 1, error: "Email is required" });
          continue;
        }

        // Check for valid email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(contact.email)) {
          errors.push({ row: i + 1, error: "Invalid email format" });
          continue;
        }

        // Check for valid status
        const validStatuses = ["lead", "prospect", "customer", "inactive"];
        if (!validStatuses.includes(contact.status)) {
          contact.status = "lead"; // Default to lead if invalid
        }

        // Check for duplicates in the current import
        if (emails.has(contact.email.toLowerCase())) {
          duplicates.push({ row: i + 1, email: contact.email });
          continue;
        }

        emails.add(contact.email.toLowerCase());
        contacts.push(contact as Contact);

        // Update progress
        setProgress(Math.round(((i + 1) / rows.length) * 100));
      }

      // Check for duplicates in the database
      const { data: existingContacts, error: fetchError } = await supabase
        .from("contacts")
        .select("email")
        .in(
          "email",
          contacts.map((c) => c.email.toLowerCase()),
        );

      if (fetchError) throw fetchError;

      const existingEmails = new Set(
        existingContacts?.map((c) => c.email.toLowerCase()) || [],
      );

      const newContacts = contacts.filter(
        (c) => !existingEmails.has(c.email.toLowerCase()),
      );

      const dbDuplicates = contacts.filter((c) =>
        existingEmails.has(c.email.toLowerCase()),
      );

      // Insert new contacts
      if (newContacts.length > 0) {
        const { error: insertError } = await supabase
          .from("contacts")
          .insert(newContacts);

        if (insertError) throw insertError;
      }

      // Prepare result message
      let resultMessage = `Successfully imported ${newContacts.length} contacts.`;
      let resultDetails = "";

      if (dbDuplicates.length > 0) {
        resultDetails += `\n${dbDuplicates.length} contacts skipped (already exist in database).`;
      }

      if (duplicates.length > 0) {
        resultDetails += `\n${duplicates.length} duplicates found in the import file.`;
      }

      if (errors.length > 0) {
        resultDetails += `\n${errors.length} rows had errors and were skipped.`;
      }

      setResult({
        type: "success",
        message: resultMessage,
        details: resultDetails,
      });
    } catch (err: any) {
      setResult({
        type: "error",
        message: "Import failed",
        details: err.message,
      });
    } finally {
      setIsImporting(false);
      setProgress(100);
    }
  };

  const handleExport = async () => {
    setIsExporting(true);
    setResult(null);

    try {
      // Fetch all contacts
      const { data, error } = await supabase.from("contacts").select("*");

      if (error) throw error;

      if (!data || data.length === 0) {
        setResult({
          type: "error",
          message: "No contacts to export",
        });
        return;
      }

      // Get all possible headers (including custom fields)
      const headers = new Set<string>();
      data.forEach((contact) => {
        Object.keys(contact).forEach((key) => {
          if (key !== "id" && key !== "custom_fields") {
            headers.add(key);
          }
        });

        // Add custom fields headers
        if (contact.custom_fields) {
          Object.keys(contact.custom_fields).forEach((key) => {
            headers.add(`custom_${key}`);
          });
        }
      });

      // Convert to array and sort
      const headerArray = Array.from(headers).sort();

      // Create CSV content
      let csv = headerArray.join(",") + "\n";

      data.forEach((contact) => {
        const row = headerArray.map((header) => {
          if (header.startsWith("custom_") && contact.custom_fields) {
            const customField = header.replace("custom_", "");
            return contact.custom_fields[customField] || "";
          }
          return contact[header as keyof typeof contact] || "";
        });

        csv += row.join(",") + "\n";
      });

      // Create and download the file
      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `contacts_export_${new Date().toISOString().split("T")[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setResult({
        type: "success",
        message: `Successfully exported ${data.length} contacts.`,
      });
    } catch (err: any) {
      setResult({
        type: "error",
        message: "Export failed",
        details: err.message,
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Import Contacts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {result && (
            <Alert
              variant={result.type === "error" ? "destructive" : "default"}
              className="mb-4"
            >
              <div className="flex items-center">
                {result.type === "success" ? (
                  <Check className="h-4 w-4 mr-2" />
                ) : (
                  <AlertCircle className="h-4 w-4 mr-2" />
                )}
                <AlertDescription>{result.message}</AlertDescription>
              </div>
              {result.details && (
                <div className="mt-2 text-sm whitespace-pre-line">
                  {result.details}
                </div>
              )}
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="csv-file">CSV File</Label>
            <Input
              id="csv-file"
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              disabled={isImporting}
            />
            <p className="text-sm text-muted-foreground">
              CSV must include name, email, and status columns. Status should be
              one of: lead, prospect, customer, inactive.
            </p>
          </div>

          {isImporting && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Importing...</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}

          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={handleExport}
              disabled={isExporting || isImporting}
            >
              {isExporting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Exporting...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Export Contacts
                </>
              )}
            </Button>
            <Button
              onClick={handleImport}
              disabled={!importFile || isImporting || isExporting}
            >
              {isImporting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Importing...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Import Contacts
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
