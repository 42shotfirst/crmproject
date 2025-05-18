/**
 * Calendar Feature Module
 *
 * This module exports all public-facing components, hooks, and utilities
 * for the calendar and scheduling feature.
 */

// Re-export components
export { default as CalendarPage } from "@/components/dashboard/CalendarPage";
export { default as CalendarView } from "@/components/dashboard/CalendarView";
export { default as EventForm } from "@/components/dashboard/EventForm";

// Types
export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  allDay: boolean;
  location?: string;
  attendees?: string[];
  contactIds?: string[];
  color?: string;
  recurring?: RecurringPattern;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface RecurringPattern {
  frequency: "daily" | "weekly" | "monthly" | "yearly";
  interval: number;
  endDate?: Date;
  endAfterOccurrences?: number;
  weekdays?: number[];
  monthDay?: number;
  monthWeek?: number;
}

export interface CalendarViewOptions {
  view: "day" | "week" | "month" | "agenda";
  date: Date;
  showWeekends: boolean;
  showDeclined: boolean;
  filterByUser?: string[];
}
