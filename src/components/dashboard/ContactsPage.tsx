import { useState } from "react";
import ContactForm from "../contacts/ContactForm";
import CustomFieldsManager from "../contacts/CustomFieldsManager";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

export default function ContactsPage() {
  const [isAddContactOpen, setIsAddContactOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Contacts</h1>
        <Button onClick={() => setIsAddContactOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Contact
        </Button>
      </div>

      <Tabs defaultValue="contacts">
        <TabsList>
          <TabsTrigger value="contacts">All Contacts</TabsTrigger>
          <TabsTrigger value="custom-fields">Custom Fields</TabsTrigger>
        </TabsList>
        <TabsContent value="contacts" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Contact Management</CardTitle>
              <CardDescription>
                View, add, edit, and manage your contacts.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Contact list will be implemented here */}
              <p className="text-muted-foreground">
                No contacts found. Add your first contact to get started.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="custom-fields" className="mt-4">
          <CustomFieldsManager />
        </TabsContent>
      </Tabs>

      <Dialog open={isAddContactOpen} onOpenChange={setIsAddContactOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Contact</DialogTitle>
          </DialogHeader>
          <ContactForm
            onSuccess={() => setIsAddContactOpen(false)}
            onCancel={() => setIsAddContactOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
