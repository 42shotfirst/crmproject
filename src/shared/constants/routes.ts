/**
 * Application route paths
 */
export const ROUTES = {
  // Auth routes
  AUTH: {
    LOGIN: "/login",
    REGISTER: "/register",
    FORGOT_PASSWORD: "/forgot-password",
    RESET_PASSWORD: "/reset-password",
    UNAUTHORIZED: "/unauthorized",
  },

  // Dashboard routes
  DASHBOARD: "/",

  // Contact routes
  CONTACTS: "/contacts",
  CONTACT_DETAILS: "/contacts/:id",
  CONTACT_NEW: "/contacts/new",
  CONTACT_EDIT: "/contacts/:id/edit",

  // Calendar routes
  CALENDAR: "/calendar",
  EVENT_DETAILS: "/calendar/:id",
  EVENT_NEW: "/calendar/new",
  EVENT_EDIT: "/calendar/:id/edit",

  // Document routes
  DOCUMENTS: "/documents",
  DOCUMENT_DETAILS: "/documents/:id",

  // Payment routes
  PAYMENTS: "/payments",
  INVOICE_DETAILS: "/payments/invoices/:id",
  INVOICE_NEW: "/payments/invoices/new",

  // Report routes
  REPORTS: "/reports",
  REPORT_DETAILS: "/reports/:id",

  // Settings routes
  SETTINGS: "/settings",
  USER_PROFILE: "/settings/profile",
  USER_MANAGEMENT: "/settings/users",
  SYSTEM_SETTINGS: "/settings/system",

  // Help routes
  HELP: "/help",
};

/**
 * Generate a route path with parameters.
 *
 * @param route The route template
 * @param params The parameters to replace in the template
 * @returns The generated route path
 *
 * @example
 * ```ts
 * generatePath(ROUTES.CONTACT_DETAILS, { id: '123' }); // '/contacts/123'
 * ```
 */
export function generatePath(
  route: string,
  params: Record<string, string>,
): string {
  let path = route;

  Object.entries(params).forEach(([key, value]) => {
    path = path.replace(`:${key}`, value);
  });

  return path;
}
