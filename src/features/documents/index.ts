/**
 * Documents Feature Module
 *
 * This module exports all public-facing components, hooks, and utilities
 * for the document management feature.
 */

// Re-export components
export { default as DocumentsPage } from "@/components/dashboard/DocumentsPage";

// Types
export interface Document {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  tags?: string[];
  contactId?: string;
  folderId?: string;
}

export interface DocumentFolder {
  id: string;
  name: string;
  parentId?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Constants
export const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "image/jpeg",
  "image/png",
  "text/plain",
];

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
