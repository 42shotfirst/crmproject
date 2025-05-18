/**
 * Payments Feature Module
 *
 * This module exports all public-facing components, hooks, and utilities
 * for the payment processing feature.
 */

// Re-export components
export { default as PaymentsPage } from "@/components/dashboard/PaymentsPage";
export { default as PaymentPanel } from "@/components/dashboard/PaymentPanel";

// Types
export interface Invoice {
  id: string;
  number: string;
  contactId: string;
  amount: number;
  currency: string;
  status: "draft" | "sent" | "paid" | "overdue" | "cancelled";
  dueDate: Date;
  issueDate: Date;
  paidDate?: Date;
  items: InvoiceItem[];
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
  taxRate?: number;
  taxAmount?: number;
}

export interface PaymentMethod {
  id: string;
  type: "card" | "bank_account" | "other";
  name: string;
  last4?: string;
  expiryMonth?: number;
  expiryYear?: number;
  isDefault: boolean;
}
