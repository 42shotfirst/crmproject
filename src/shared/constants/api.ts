/**
 * API base URL
 */
export const API_BASE_URL = import.meta.env.VITE_SUPABASE_URL || "";

/**
 * API endpoints
 */
export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
    LOGOUT: "/auth/logout",
    REFRESH_TOKEN: "/auth/refresh-token",
  },

  // User endpoints
  USERS: "/users",
  USER_PROFILE: "/users/profile",

  // Contact endpoints
  CONTACTS: "/contacts",
  CONTACT_IMPORT: "/contacts/import",
  CONTACT_EXPORT: "/contacts/export",

  // Calendar endpoints
  EVENTS: "/events",

  // Document endpoints
  DOCUMENTS: "/documents",
  DOCUMENT_UPLOAD: "/documents/upload",

  // Payment endpoints
  INVOICES: "/invoices",
  PAYMENTS: "/payments",
  PAYMENT_METHODS: "/payment-methods",

  // Report endpoints
  REPORTS: "/reports",
};

/**
 * API request timeout in milliseconds
 */
export const API_TIMEOUT = 30000; // 30 seconds

/**
 * Default API request headers
 */
export const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

/**
 * HTTP status codes
 */
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
};
