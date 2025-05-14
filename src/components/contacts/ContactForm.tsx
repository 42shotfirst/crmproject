import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

interface ContactFormProps {
  contactId?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

interface Contact {
  id?: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: "lead" | "prospect" | "customer" | "inactive";
  notes?: string;
  custom_fields?: Record<string, any>;
}

export default function ContactForm({
  contactId,
  onSuccess,
  onCancel,
}: ContactFormProps) {
  const [contact, setContact] = useState<Contact>({
    name: "",
    email: "",
    phone: "",
    company: "",
    status: "lead",
    notes: "",
    custom_fields: {},
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [customFields, setCustomFields] = useState<
    Array<{ name: string; type: string; value: any }>
  >([]);

  useEffect(() => {
    if (contactId) {
      fetchContact(contactId);
    }
    fetchCustomFieldDefinitions();
  }, [contactId]);

  async function fetchContact(id: string) {
    try {
      setIsLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("contacts")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      if (data) {
        setContact(data as Contact);
      }
    } catch (err: any) {
      setError("Error loading contact: " + err.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchCustomFieldDefinitions() {
    try {
      const { data, error } = await supabase
        .from("custom_fields")
        .select("*")
        .order("name");

      if (error) throw error;

      if (data) {
        const fields = data.map((field) => ({
          name: field.name,
          type: field.type,
          value:
            contact.custom_fields?.[field.name] ||
            getDefaultValueForType(field.type),
        }));
        setCustomFields(fields);
      }
    } catch (err: any) {
      console.error("Error loading custom fields:", err);
    }
  }

  function getDefaultValueForType(type: string) {
    switch (type) {
      case "text":
        return "";
      case "number":
        return 0;
      case "date":
        return "";
      case "dropdown":
        return "";
      default:
        return "";
    }
  }

  function handleCustomFieldChange(index: number, value: any) {
    const updatedFields = [...customFields];
    updatedFields[index].value = value;
    setCustomFields(updatedFields);

    // Update the contact's custom_fields object
    const updatedCustomFields = { ...contact.custom_fields };
    updatedCustomFields[customFields[index].name] = value;
    setContact({ ...contact, custom_fields: updatedCustomFields });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setIsSaving(true);

    try {
      // Prepare custom fields
      const customFieldsData = {};
      customFields.forEach((field) => {
        customFieldsData[field.name] = field.value;
      });

      const contactData = {
        ...contact,
        custom_fields: customFieldsData,
      };

      let result;

      if (contactId) {
        // Update existing contact
        result = await supabase
          .from("contacts")
          .update(contactData)
          .eq("id", contactId);
      } else {
        // Create new contact
        result = await supabase.from("contacts").insert([contactData]);
      }

      if (result.error) throw result.error;

      if (onSuccess) onSuccess();
    } catch (err: any) {
      setError("Error saving contact: " + err.message);
    } finally {
      setIsSaving(false);
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Name *</Label>
          <Input
            id="name"
            value={contact.name}
            onChange={(e) => setContact({ ...contact, name: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={contact.email}
            onChange={(e) => setContact({ ...contact, email: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            value={contact.phone}
            onChange={(e) => setContact({ ...contact, phone: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="company">Company</Label>
          <Input
            id="company"
            value={contact.company}
            onChange={(e) =>
              setContact({ ...contact, company: e.target.value })
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status *</Label>
          <Select
            value={contact.status}
            onValueChange={(value: any) =>
              setContact({ ...contact, status: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="lead">Lead</SelectItem>
              <SelectItem value="prospect">Prospect</SelectItem>
              <SelectItem value="customer">Customer</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          value={contact.notes || ""}
          onChange={(e) => setContact({ ...contact, notes: e.target.value })}
          rows={4}
        />
      </div>

      {/* Custom Fields */}
      {customFields.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Custom Fields</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {customFields.map((field, index) => (
              <div key={field.name} className="space-y-2">
                <Label htmlFor={`custom-${field.name}`}>{field.name}</Label>
                {field.type === "text" && (
                  <Input
                    id={`custom-${field.name}`}
                    value={field.value}
                    onChange={(e) =>
                      handleCustomFieldChange(index, e.target.value)
                    }
                  />
                )}
                {field.type === "number" && (
                  <Input
                    id={`custom-${field.name}`}
                    type="number"
                    value={field.value}
                    onChange={(e) =>
                      handleCustomFieldChange(index, parseFloat(e.target.value))
                    }
                  />
                )}
                {field.type === "date" && (
                  <Input
                    id={`custom-${field.name}`}
                    type="date"
                    value={field.value}
                    onChange={(e) =>
                      handleCustomFieldChange(index, e.target.value)
                    }
                  />
                )}
                {field.type === "dropdown" && (
                  <Select
                    value={field.value}
                    onValueChange={(value) =>
                      handleCustomFieldChange(index, value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      {/* This would be populated from the options defined for this dropdown */}
                      <SelectItem value="option1">Option 1</SelectItem>
                      <SelectItem value="option2">Option 2</SelectItem>
                      <SelectItem value="option3">Option 3</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-end space-x-2">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={isSaving}>
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : contactId ? (
            "Update Contact"
          ) : (
            "Create Contact"
          )}
        </Button>
      </div>
    </form>
  );
}
