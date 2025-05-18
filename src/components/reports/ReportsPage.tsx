import ReportsDashboard from "./ReportsDashboard";
import { Toaster } from "@/components/ui/toaster";

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <ReportsDashboard />
      <Toaster />
    </div>
  );
}
