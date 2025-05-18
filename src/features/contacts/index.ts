/**
 * Contacts Feature Module
 *
 * This module exports all public-facing components, hooks, and utilities
 * for the contacts management feature.
 */

// Re-export components
export { default as ContactForm } from "@/components/contacts/ContactForm";
export { default as CsvImportExport } from "@/components/contacts/CsvImportExport";
export { default as CustomFieldsManager } from "@/components/contacts/CustomFieldsManager";

// Types will be defined here as we build them
export interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  status: "prospect" | "lead" | "customer";
  createdAt: Date;
  updatedAt: Date;
  // Additional fields will be added as needed
}

// Feature-specific constants
export const CONTACT_STATUS_OPTIONS = [
  { label: "Prospect", value: "prospect" },
  { label: "Lead", value: "lead" },
  { label: "Customer", value: "customer" },
];
