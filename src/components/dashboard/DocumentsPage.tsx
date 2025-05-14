import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { FileText, Upload, Search, File, Trash2 } from "lucide-react";

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedAt: string;
  uploadedBy: string;
}

// Sample data for demonstration
const sampleDocuments: Document[] = [
  {
    id: "1",
    name: "Project Proposal.pdf",
    type: "PDF",
    size: "2.4 MB",
    uploadedAt: "2023-06-10",
    uploadedBy: "John Doe",
  },
  {
    id: "2",
    name: "Meeting Notes.docx",
    type: "DOCX",
    size: "1.2 MB",
    uploadedAt: "2023-06-12",
    uploadedBy: "Jane Smith",
  },
  {
    id: "3",
    name: "Financial Report.xlsx",
    type: "XLSX",
    size: "3.5 MB",
    uploadedAt: "2023-06-14",
    uploadedBy: "Bob Johnson",
  },
];

export default function DocumentsPage() {
  const documents = sampleDocuments;

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Documents</h1>
        <Button>
          <Upload className="mr-2 h-4 w-4" /> Upload
        </Button>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Files</CardTitle>
          <div className="relative w-64">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search files..." className="pl-10" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Name</th>
                  <th className="text-left py-3 px-4 font-medium">Type</th>
                  <th className="text-left py-3 px-4 font-medium">Size</th>
                  <th className="text-left py-3 px-4 font-medium">Uploaded</th>
                  <th className="text-left py-3 px-4 font-medium">By</th>
                  <th className="text-left py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {documents.length > 0 ? (
                  documents.map((doc) => (
                    <tr key={doc.id} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <File className="h-5 w-5 mr-2 text-blue-500" />
                          {doc.name}
                        </div>
                      </td>
                      <td className="py-3 px-4">{doc.type}</td>
                      <td className="py-3 px-4">{doc.size}</td>
                      <td className="py-3 px-4">
                        {formatDate(doc.uploadedAt)}
                      </td>
                      <td className="py-3 px-4">{doc.uploadedBy}</td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="icon">
                            <FileText className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="py-6 text-center text-muted-foreground"
                    >
                      No documents found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
