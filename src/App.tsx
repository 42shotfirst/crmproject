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
import routes from "tempo-routes";

function App() {
  return (
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
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="contacts" element={<ContactsPage />} />
            <Route path="calendar" element={<CalendarPage />} />
            <Route path="documents" element={<DocumentsPage />} />
            <Route path="payments" element={<PaymentsPage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="settings" element={<UserSettingsPage />} />
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
  );
}

export default App;
