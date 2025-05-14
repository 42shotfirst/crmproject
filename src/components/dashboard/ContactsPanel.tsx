import React, { useState } from "react";
import {
  Search,
  Filter,
  MoreHorizontal,
  ChevronDown,
  ChevronUp,
  UserPlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: "active" | "inactive" | "lead";
  lastContact: string;
  company: string;
  avatar?: string;
}

const statusColors = {
  active: "bg-green-500",
  inactive: "bg-gray-500",
  lead: "bg-blue-500",
};

const ContactsPanel = ({
  contacts = mockContacts,
}: {
  contacts?: Contact[];
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Filter contacts based on search term and status filter
  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch =
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || contact.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Pagination logic
  const contactsPerPage = 5;
  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const currentContacts = filteredContacts.slice(
    indexOfFirstContact,
    indexOfLastContact,
  );
  const totalPages = Math.ceil(filteredContacts.length / contactsPerPage);

  const handleContactClick = (contact: Contact) => {
    setSelectedContact(contact);
  };

  return (
    <Card className="w-full bg-white shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-bold">Contacts</CardTitle>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="default" size="sm">
            <UserPlus className="h-4 w-4 mr-2" />
            Add Contact
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search contacts..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="lead">Lead</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead className="hidden md:table-cell">Phone</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Company
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Last Contact
                  </TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentContacts.length > 0 ? (
                  currentContacts.map((contact) => (
                    <TableRow
                      key={contact.id}
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => handleContactClick(contact)}
                    >
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={
                                contact.avatar ||
                                `https://api.dicebear.com/7.x/avataaars/svg?seed=${contact.name}`
                              }
                              alt={contact.name}
                            />
                            <AvatarFallback>
                              {contact.name.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <span>{contact.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{contact.email}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        {contact.phone}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {contact.company}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            contact.status === "active"
                              ? "default"
                              : contact.status === "lead"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {contact.status.charAt(0).toUpperCase() +
                            contact.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {contact.lastContact}
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="text-center py-8 text-gray-500"
                    >
                      No contacts found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Showing {indexOfFirstContact + 1}-
              {Math.min(indexOfLastContact, filteredContacts.length)} of{" "}
              {filteredContacts.length} contacts
            </p>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    className={
                      currentPage === 1 ? "pointer-events-none opacity-50" : ""
                    }
                  />
                </PaginationItem>

                {Array.from({ length: Math.min(totalPages, 3) }, (_, i) => {
                  const pageNumber = i + 1;
                  return (
                    <PaginationItem key={pageNumber}>
                      <PaginationLink
                        isActive={currentPage === pageNumber}
                        onClick={() => setCurrentPage(pageNumber)}
                      >
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}

                {totalPages > 3 && (
                  <PaginationItem>
                    <PaginationLink onClick={() => setCurrentPage(totalPages)}>
                      {totalPages}
                    </PaginationLink>
                  </PaginationItem>
                )}

                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    className={
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </CardContent>

      {/* Contact Detail Dialog */}
      <Dialog
        open={!!selectedContact}
        onOpenChange={(open) => !open && setSelectedContact(null)}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Contact Details</DialogTitle>
          </DialogHeader>
          {selectedContact && (
            <div className="grid gap-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage
                    src={
                      selectedContact.avatar ||
                      `https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedContact.name}`
                    }
                    alt={selectedContact.name}
                  />
                  <AvatarFallback>
                    {selectedContact.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold">
                    {selectedContact.name}
                  </h3>
                  <p className="text-gray-500">{selectedContact.company}</p>
                  <Badge
                    variant={
                      selectedContact.status === "active"
                        ? "default"
                        : selectedContact.status === "lead"
                          ? "secondary"
                          : "outline"
                    }
                    className="mt-1"
                  >
                    {selectedContact.status.charAt(0).toUpperCase() +
                      selectedContact.status.slice(1)}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p>{selectedContact.email}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Phone</p>
                  <p>{selectedContact.phone}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Company</p>
                  <p>{selectedContact.company}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">
                    Last Contact
                  </p>
                  <p>{selectedContact.lastContact}</p>
                </div>
              </div>

              <div>
                <h4 className="text-md font-semibold mb-2">
                  Recent Activities
                </h4>
                <div className="space-y-2">
                  <div className="p-3 bg-gray-50 rounded-md">
                    <p className="text-sm">
                      Email sent regarding project proposal
                    </p>
                    <p className="text-xs text-gray-500">May 12, 2023</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-md">
                    <p className="text-sm">
                      Phone call - Discussed contract terms
                    </p>
                    <p className="text-xs text-gray-500">May 8, 2023</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-md">
                    <p className="text-sm">Meeting scheduled for next week</p>
                    <p className="text-xs text-gray-500">May 5, 2023</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline">Edit Contact</Button>
                <Button>Contact Now</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
};

// Mock data for contacts
const mockContacts: Contact[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "(555) 123-4567",
    status: "active",
    lastContact: "May 12, 2023",
    company: "Acme Inc",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "(555) 987-6543",
    status: "inactive",
    lastContact: "Apr 28, 2023",
    company: "XYZ Corp",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
  },
  {
    id: "3",
    name: "Robert Johnson",
    email: "robert.j@example.com",
    phone: "(555) 456-7890",
    status: "lead",
    lastContact: "May 5, 2023",
    company: "Tech Solutions",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Robert",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    phone: "(555) 234-5678",
    status: "active",
    lastContact: "May 10, 2023",
    company: "Global Enterprises",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
  },
  {
    id: "5",
    name: "Michael Wilson",
    email: "michael.w@example.com",
    phone: "(555) 876-5432",
    status: "lead",
    lastContact: "May 8, 2023",
    company: "Innovative Solutions",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
  },
  {
    id: "6",
    name: "Sarah Brown",
    email: "sarah.b@example.com",
    phone: "(555) 345-6789",
    status: "inactive",
    lastContact: "Apr 15, 2023",
    company: "Creative Designs",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  },
  {
    id: "7",
    name: "David Miller",
    email: "david.m@example.com",
    phone: "(555) 567-8901",
    status: "active",
    lastContact: "May 11, 2023",
    company: "Miller & Associates",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
  },
  {
    id: "8",
    name: "Jennifer Taylor",
    email: "jennifer.t@example.com",
    phone: "(555) 678-9012",
    status: "lead",
    lastContact: "May 7, 2023",
    company: "Taylor Enterprises",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jennifer",
  },
];

export default ContactsPanel;
