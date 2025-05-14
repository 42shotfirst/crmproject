import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  FileText,
  Upload,
  Search,
  File,
  Trash2,
  Download,
  Tag,
  X,
  Eye,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "../ui/dialog";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useToast } from "../ui/use-toast";
import { useAuth } from "../auth/AuthProvider";
import { createClient } from "@supabase/supabase-js";

interface Document {
  id: string;
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

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(
    null,
  );
  const [newTag, setNewTag] = useState("");
  const [filter, setFilter] = useState("all");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { user } = useAuth();

  // Load documents on component mount
  useEffect(() => {
    loadDocuments();
  }, []);

  // Load documents from storage
  const loadDocuments = async () => {
    try {
      // In a real app, you would fetch from your database
      // For now, we'll use sample data
      const sampleDocuments: Document[] = [
        {
          id: "1",
          name: "Project Proposal.pdf",
          type: "PDF",
          size: "2.4 MB",
          uploadedAt: "2023-06-10",
          uploadedBy: "John Doe",
          url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
          tags: ["proposal", "project"],
          contactId: "c1",
        },
        {
          id: "2",
          name: "Meeting Notes.docx",
          type: "DOCX",
          size: "1.2 MB",
          uploadedAt: "2023-06-12",
          uploadedBy: "Jane Smith",
          tags: ["meeting", "notes"],
          eventId: "e1",
        },
        {
          id: "3",
          name: "Financial Report.xlsx",
          type: "XLSX",
          size: "3.5 MB",
          uploadedAt: "2023-06-14",
          uploadedBy: "Bob Johnson",
          tags: ["financial", "report"],
          contactId: "c2",
        },
      ];

      setDocuments(sampleDocuments);
    } catch (error) {
      console.error("Error loading documents:", error);
      toast({
        title: "Error",
        description: "Failed to load documents",
        variant: "destructive",
      });
    }
  };

  // Handle file upload
  const handleUpload = async () => {
    if (fileInputRef.current?.files?.length) {
      setIsUploading(true);
      const file = fileInputRef.current.files[0];

      try {
        // In a real app, you would upload to Supabase storage
        // const { data, error } = await supabase.storage
        //   .from('documents')
        //   .upload(`${user?.id}/${file.name}`, file);

        // if (error) throw error;

        // Simulate upload delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Create new document entry
        const newDoc: Document = {
          id: `doc-${Date.now()}`,
          name: file.name,
          type: file.name.split(".").pop()?.toUpperCase() || "UNKNOWN",
          size: formatFileSize(file.size),
          uploadedAt: new Date().toISOString(),
          uploadedBy: user?.email || "Current User",
          tags: [],
        };

        setDocuments((prev) => [newDoc, ...prev]);
        toast({
          title: "Success",
          description: "Document uploaded successfully",
        });

        // Reset file input
        if (fileInputRef.current) fileInputRef.current.value = "";
      } catch (error) {
        console.error("Error uploading document:", error);
        toast({
          title: "Error",
          description: "Failed to upload document",
          variant: "destructive",
        });
      } finally {
        setIsUploading(false);
      }
    }
  };

  // Handle document deletion
  const handleDelete = async (docId: string) => {
    try {
      // In a real app, you would delete from Supabase storage and database
      // const { error } = await supabase.storage
      //   .from('documents')
      //   .remove([`${user?.id}/${docName}`]);

      // if (error) throw error;

      setDocuments((prev) => prev.filter((doc) => doc.id !== docId));
      toast({
        title: "Success",
        description: "Document deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting document:", error);
      toast({
        title: "Error",
        description: "Failed to delete document",
        variant: "destructive",
      });
    }
  };

  // Add tag to document
  const addTag = (docId: string, tag: string) => {
    if (!tag.trim()) return;

    setDocuments((prev) =>
      prev.map((doc) => {
        if (doc.id === docId) {
          const updatedTags = [...(doc.tags || []), tag.trim()];
          return { ...doc, tags: updatedTags };
        }
        return doc;
      }),
    );

    setNewTag("");
  };

  // Remove tag from document
  const removeTag = (docId: string, tagToRemove: string) => {
    setDocuments((prev) =>
      prev.map((doc) => {
        if (doc.id === docId && doc.tags) {
          return {
            ...doc,
            tags: doc.tags.filter((tag) => tag !== tagToRemove),
          };
        }
        return doc;
      }),
    );
  };

  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / 1048576).toFixed(1) + " MB";
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Get file icon based on type
  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "pdf":
        return <FileText className="h-5 w-5 mr-2 text-red-500" />;
      case "docx":
      case "doc":
        return <FileText className="h-5 w-5 mr-2 text-blue-500" />;
      case "xlsx":
      case "xls":
        return <FileText className="h-5 w-5 mr-2 text-green-500" />;
      case "pptx":
      case "ppt":
        return <FileText className="h-5 w-5 mr-2 text-orange-500" />;
      default:
        return <File className="h-5 w-5 mr-2 text-gray-500" />;
    }
  };

  // Filter documents based on search term and filter type
  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.tags?.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase()),
      );

    if (filter === "all") return matchesSearch;
    if (filter === "contacts") return matchesSearch && doc.contactId;
    if (filter === "events") return matchesSearch && doc.eventId;
    return matchesSearch;
  });

  return (
    <div className="space-y-6 bg-background">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Documents</h1>
        <div className="flex gap-2">
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleUpload}
          />
          <Button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
          >
            {isUploading ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Uploading...
              </span>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" /> Upload
              </>
            )}
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-4">
            <CardTitle>Files</CardTitle>
            <Tabs
              defaultValue="all"
              className="w-[300px]"
              onValueChange={setFilter}
            >
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="contacts">Contact Files</TabsTrigger>
                <TabsTrigger value="events">Event Files</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className="relative w-64">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search files or tags..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
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
                  <th className="text-left py-3 px-4 font-medium">Tags</th>
                  <th className="text-left py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDocuments.length > 0 ? (
                  filteredDocuments.map((doc) => (
                    <tr key={doc.id} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          {getFileIcon(doc.type)}
                          <span className="truncate max-w-[200px]">
                            {doc.name}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4">{doc.type}</td>
                      <td className="py-3 px-4">{doc.size}</td>
                      <td className="py-3 px-4">
                        {formatDate(doc.uploadedAt)}
                      </td>
                      <td className="py-3 px-4 truncate max-w-[150px]">
                        {doc.uploadedBy}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex flex-wrap gap-1 max-w-[200px]">
                          {doc.tags?.map((tag, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="flex items-center gap-1"
                            >
                              {tag}
                              <button
                                onClick={() => removeTag(doc.id, tag)}
                                className="hover:text-red-500 transition-colors"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </Badge>
                          ))}
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0 rounded-full"
                              >
                                <Tag className="h-3 w-3" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Add Tag</DialogTitle>
                              </DialogHeader>
                              <div className="flex gap-2">
                                <Input
                                  value={newTag}
                                  onChange={(e) => setNewTag(e.target.value)}
                                  placeholder="Enter tag name"
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                      addTag(doc.id, newTag);
                                    }
                                  }}
                                />
                                <DialogClose asChild>
                                  <Button
                                    onClick={() => addTag(doc.id, newTag)}
                                  >
                                    Add
                                  </Button>
                                </DialogClose>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          {doc.url && (
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
                                <DialogHeader>
                                  <DialogTitle>{doc.name}</DialogTitle>
                                </DialogHeader>
                                <div className="mt-4 h-[60vh] overflow-auto">
                                  {doc.type.toLowerCase() === "pdf" ? (
                                    <iframe
                                      src={doc.url}
                                      className="w-full h-full"
                                      title={doc.name}
                                    />
                                  ) : (
                                    <div className="flex items-center justify-center h-full">
                                      <div className="text-center">
                                        <FileText className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                                        <p>
                                          Preview not available for this file
                                          type
                                        </p>
                                        <Button className="mt-4" asChild>
                                          <a
                                            href={doc.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                          >
                                            <Download className="mr-2 h-4 w-4" />{" "}
                                            Download to view
                                          </a>
                                        </Button>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </DialogContent>
                            </Dialog>
                          )}
                          <Button variant="ghost" size="icon">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(doc.id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={7}
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
