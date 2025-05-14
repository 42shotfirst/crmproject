import { useAuth } from "../auth/AuthProvider";
import ContactsPanel from "./ContactsPanel";
import ActivityTimeline from "./ActivityTimeline";
import PaymentPanel from "./PaymentPanel";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="text-sm text-muted-foreground">
          Welcome back, {user?.email}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ContactsPanel />
        <ActivityTimeline />
      </div>

      <PaymentPanel />
    </div>
  );
}
