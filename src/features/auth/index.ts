/**
 * Authentication Feature Module
 *
 * This module exports all public-facing components, hooks, and utilities
 * for the authentication feature.
 */

// Re-export components
export { default as AuthProvider } from "@/components/auth/AuthProvider";
export { default as LoginForm } from "@/components/auth/LoginForm";
export { default as RegisterForm } from "@/components/auth/RegisterForm";
export { default as ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";
export { default as ResetPasswordForm } from "@/components/auth/ResetPasswordForm";
export { default as ProtectedRoute } from "@/components/auth/ProtectedRoute";
export { default as UnauthorizedPage } from "@/components/auth/UnauthorizedPage";

// Types
export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: "admin" | "manager" | "user";
  avatar?: string;
  createdAt: Date;
  lastLogin?: Date;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Constants
export const USER_ROLES = {
  ADMIN: "admin",
  MANAGER: "manager",
  USER: "user",
};

export const PERMISSIONS = {
  VIEW_CONTACTS: ["admin", "manager", "user"],
  EDIT_CONTACTS: ["admin", "manager"],
  DELETE_CONTACTS: ["admin"],
  VIEW_REPORTS: ["admin", "manager"],
  MANAGE_USERS: ["admin"],
  PROCESS_PAYMENTS: ["admin", "manager"],
};
