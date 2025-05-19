import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Loader2, Upload, Download, Check, AlertCircle } from "lucide-react";
import {
  importFromCsv,
  exportToCsv,
  ImportResult,
  formatFileSize,
} from "@/shared/utils/importExport";

interface Document {
  id?: string;
  name: string;
  type: string;
  size: string;
  uploadedAt: string;
  uploadedBy: string;
  url?: string;
  tags?: string[];
  contactId?: string;
  eventId?: string;
}

export default function DocumentImportExport() {
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
      // Set up progress tracking
      const updateProgress = (percent: number) => {
        setProgress(percent);
      };

      // Use the generic import function
      const importResult = await importFromCsv<Document>(importFile, {
        requiredFields: ["name", "type"],
        uniqueField: "name",
        tableName: "documents",
        checkDatabaseDuplicates: true,
        validateRecord: (record, rowIndex) => {
          // Add document-specific validation here
          if (!record.name) {
            return { valid: false, error: "Document name is required" };
          }
          if (!record.type) {
            return { valid: false, error: "Document type is required" };
          }
          return { valid: true };
        },
        transformRecord: (record) => {
          // Transform the record if needed
          return {
            ...record,
            uploadedAt: record.uploadedAt || new Date().toISOString(),
            uploadedBy: record.uploadedBy || "CSV Import",
            size: record.size || "0 KB",
            tags: record.tags
              ? typeof record.tags === "string"
                ? record.tags.split(";")
                : record.tags
              : [],
          };
        },
      });

      setResult({
        type: importResult.success ? "success" : "error",
        message: importResult.message,
        details: importResult.details,
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
      const success = await exportToCsv("documents", {
        excludeFields: ["id", "url"],
        filename: "documents",
        transformRecords: (records) => {
          // Transform records for export if needed
          return records.map((doc) => ({
            ...doc,
            tags: Array.isArray(doc.tags) ? doc.tags.join(";") : doc.tags,
          }));
        },
      });

      if (success) {
        setResult({
          type: "success",
          message: "Documents exported successfully",
        });
      } else {
        setResult({
          type: "error",
          message: "No documents to export",
        });
      }
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
          <CardTitle>Import/Export Documents</CardTitle>
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
              CSV must include name and type columns. Optional columns: size,
              uploadedAt, uploadedBy, tags (semicolon-separated), contactId,
              eventId.
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
                  Export Documents
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
                  Import Documents
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
