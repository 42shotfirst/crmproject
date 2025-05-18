/**
 * Dashboard Feature Module
 *
 * This module exports all public-facing components, hooks, and utilities
 * for the dashboard feature.
 */

// Re-export components
export { default as Dashboard } from "@/components/dashboard/Dashboard";
export { default as DashboardLayout } from "@/components/dashboard/DashboardLayout";
export { default as ActivityTimeline } from "@/components/dashboard/ActivityTimeline";
export { default as Sidebar } from "@/components/dashboard/Sidebar";

// Types
export interface DashboardMetric {
  id: string;
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  icon?: React.ReactNode;
}

export interface TimelineActivity {
  id: string;
  type: "email" | "call" | "meeting" | "task" | "note";
  title: string;
  description?: string;
  timestamp: Date;
  contactId?: string;
  userId?: string;
}
