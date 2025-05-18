/**
 * Reports Feature Module
 *
 * This module exports all public-facing components, hooks, and utilities
 * for the reporting feature.
 */

// Re-export components
export { default as ReportsDashboard } from "@/components/reports/ReportsDashboard";
export { default as ReportsPage } from "@/components/reports/ReportsPage";

// Types
export interface ReportMetric {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ReactNode;
}

export interface ReportData {
  title: string;
  description: string;
  lastGenerated: string;
  metrics: ReportMetric[];
}

export interface ReportExportOptions {
  format: "csv" | "pdf" | "excel";
  includeCharts?: boolean;
  dateRange?: {
    start: Date;
    end: Date;
  };
}
