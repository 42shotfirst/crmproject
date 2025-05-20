import { Suspense } from "react";
import { useRoutes, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./components/auth/AuthProvider";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import LoginForm from "./components/auth/LoginForm";
import RegisterForm from "./components/auth/RegisterForm";
import ForgotPasswordForm from "./components/auth/ForgotPasswordForm";
import ResetPasswordForm from "./components/auth/ResetPasswordForm";
import UnauthorizedPage from "./components/auth/UnauthorizedPage";
import Home from "./components/home";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import Dashboard from "./components/dashboard/Dashboard";
import ContactsPage from "./components/dashboard/ContactsPage";
import CalendarPage from "./components/dashboard/CalendarPage";
import DocumentsPage from "./components/dashboard/DocumentsPage";
import PaymentsPage from "./components/dashboard/PaymentsPage";
import UserSettingsPage from "./components/dashboard/UserSettingsPage";
import ReportsPage from "./components/reports/ReportsPage";
import DocumentImportExport from "./components/documents/DocumentImportExport";
import EventImportExport from "./components/calendar/EventImportExport";
import { Toaster } from "./components/ui/toaster";
import { ErrorBoundary } from "./components/ui/error-boundary";
import routes from "tempo-routes";

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Suspense
          fallback={
            <div className="flex justify-center items-center min-h-screen">
              Loading...
            </div>
          }
        >
          {/* Tempo routes must be rendered before other routes */}
          {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/forgot-password" element={<ForgotPasswordForm />} />
            <Route path="/reset-password" element={<ResetPasswordForm />} />
            <Route path="/unauthorized" element={<UnauthorizedPage />} />

            {/* Protected Dashboard Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <ErrorBoundary>
                    <DashboardLayout />
                  </ErrorBoundary>
                </ProtectedRoute>
              }
            >
              <Route
                path="dashboard"
                element={
                  <ErrorBoundary>
                    <Dashboard />
                  </ErrorBoundary>
                }
              />
              <Route
                path="contacts"
                element={
                  <ErrorBoundary>
                    <ContactsPage />
                  </ErrorBoundary>
                }
              />
              <Route
                path="calendar"
                element={
                  <ErrorBoundary>
                    <CalendarPage />
                  </ErrorBoundary>
                }
              />
              <Route
                path="documents"
                element={
                  <ErrorBoundary>
                    <DocumentsPage />
                  </ErrorBoundary>
                }
              />
              <Route
                path="payments"
                element={
                  <ErrorBoundary>
                    <PaymentsPage />
                  </ErrorBoundary>
                }
              />
              <Route
                path="reports"
                element={
                  <ErrorBoundary>
                    <ReportsPage />
                  </ErrorBoundary>
                }
              />
              <Route
                path="settings"
                element={
                  <ErrorBoundary>
                    <UserSettingsPage />
                  </ErrorBoundary>
                }
              />
            </Route>

            {/* Tempo routes */}
            {import.meta.env.VITE_TEMPO === "true" && (
              <Route path="/tempobook/*" />
            )}

            {/* Catch-all route */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
        <Toaster />
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
