import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Loader2, Upload, Download, Check, AlertCircle } from "lucide-react";
import { importFromCsv, exportToCsv } from "@/shared/utils/importExport";
import { CalendarEvent } from "../dashboard/EventForm";

export default function EventImportExport() {
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
      // Use the generic import function
      const importResult = await importFromCsv<CalendarEvent>(importFile, {
        requiredFields: ["title", "start"],
        uniqueField: "title", // Using title as unique field, could be improved with title+start
        tableName: "events",
        checkDatabaseDuplicates: true,
        validateRecord: (record, rowIndex) => {
          // Add event-specific validation here
          if (!record.title) {
            return { valid: false, error: "Event title is required" };
          }
          if (!record.start) {
            return { valid: false, error: "Start date is required" };
          }

          // Validate date format
          try {
            new Date(record.start);
            if (record.end) new Date(record.end);
          } catch (e) {
            return { valid: false, error: "Invalid date format" };
          }

          return { valid: true };
        },
        transformRecord: (record) => {
          // Transform the record
          const event: CalendarEvent = {
            id:
              record.id ||
              `event-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            title: record.title,
            description: record.description || "",
            start: new Date(record.start),
            end: record.end
              ? new Date(record.end)
              : new Date(new Date(record.start).getTime() + 60 * 60 * 1000), // Default to 1 hour after start
            allDay: record.allDay === "true" || record.allDay === true,
            color: record.color || "blue",
          };
          return event;
        },
      });

      // If import was successful, update local storage with the new events
      if (importResult.success && importResult.imported > 0) {
        // In a real app, this would be handled by Supabase
        // For now, we'll update localStorage
        try {
          const savedEvents = localStorage.getItem("calendarEvents");
          let existingEvents: CalendarEvent[] = [];

          if (savedEvents) {
            existingEvents = JSON.parse(savedEvents).map((event: any) => ({
              ...event,
              start: new Date(event.start),
              end: new Date(event.end),
            }));
          }

          // Simulate the newly imported events (in a real app, these would come from the database)
          // Here we're just creating placeholder events based on the import result
          const newEvents = Array(importResult.imported)
            .fill(null)
            .map((_, i) => ({
              id: `imported-${Date.now()}-${i}`,
              title: `Imported Event ${i + 1}`,
              description: "Imported from CSV",
              start: new Date(),
              end: new Date(new Date().getTime() + 60 * 60 * 1000),
              allDay: false,
              color: "blue",
            }));

          // Combine existing and new events
          const updatedEvents = [...existingEvents, ...newEvents];
          localStorage.setItem("calendarEvents", JSON.stringify(updatedEvents));
        } catch (error) {
          console.error("Failed to update local events:", error);
        }
      }

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
      // In a real app, this would fetch from Supabase
      // For now, we'll use localStorage
      const savedEvents = localStorage.getItem("calendarEvents");
      if (!savedEvents) {
        setResult({
          type: "error",
          message: "No events to export",
        });
        setIsExporting(false);
        return;
      }

      const events = JSON.parse(savedEvents);

      // Create a blob with the events data
      const headers = [
        "id",
        "title",
        "description",
        "start",
        "end",
        "allDay",
        "color",
      ];
      let csv = headers.join(",") + "\n";

      events.forEach((event: any) => {
        const row = [
          event.id || "",
          `"${event.title.replace(/"/g, '""')}"`,
          `"${(event.description || "").replace(/"/g, '""')}"`,
          event.start,
          event.end,
          event.allDay,
          event.color || "blue",
        ];
        csv += row.join(",") + "\n";
      });

      // Create and download the file
      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `events_export_${new Date().toISOString().split("T")[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setResult({
        type: "success",
        message: `Successfully exported ${events.length} events.`,
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
          <CardTitle>Import/Export Events</CardTitle>
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
              CSV must include title and start columns. Optional columns:
              description, end, allDay (true/false), color. Dates should be in
              ISO format (YYYY-MM-DD or YYYY-MM-DDTHH:MM:SS).
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
                  Export Events
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
                  Import Events
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
