import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useAuth } from "../auth/AuthProvider";
import { Loader2 } from "lucide-react";

export default function DashboardLayout() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
