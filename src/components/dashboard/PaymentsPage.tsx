import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Plus, Download } from "lucide-react";

interface Payment {
  id: string;
  invoiceNumber: string;
  amount: number;
  status: "pending" | "completed" | "failed";
  date: string;
  dueDate: string;
  customer: string;
  description: string;
}

// Sample data for demonstration
const samplePayments: Payment[] = [
  {
    id: "1",
    invoiceNumber: "INV-001",
    amount: 1200,
    status: "completed",
    date: "2023-06-01",
    dueDate: "2023-06-15",
    customer: "Acme Inc",
    description: "Monthly subscription",
  },
  {
    id: "2",
    invoiceNumber: "INV-002",
    amount: 750,
    status: "pending",
    date: "2023-06-05",
    dueDate: "2023-06-20",
    customer: "XYZ Corp",
    description: "Consulting services",
  },
  {
    id: "3",
    invoiceNumber: "INV-003",
    amount: 500,
    status: "failed",
    date: "2023-06-10",
    dueDate: "2023-06-25",
    customer: "123 Industries",
    description: "Product license",
  },
  {
    id: "4",
    invoiceNumber: "INV-004",
    amount: 2000,
    status: "pending",
    date: "2023-06-12",
    dueDate: "2023-06-27",
    customer: "Global Solutions",
    description: "Implementation services",
  },
];

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  completed: "bg-green-100 text-green-800",
  failed: "bg-red-100 text-red-800",
};

export default function PaymentsPage() {
  const payments = samplePayments;

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Payments</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Create Invoice
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(4450)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(2750)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              2 invoices pending
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(500)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              1 invoice overdue
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Invoice</th>
                  <th className="text-left py-3 px-4 font-medium">Customer</th>
                  <th className="text-left py-3 px-4 font-medium">Amount</th>
                  <th className="text-left py-3 px-4 font-medium">Date</th>
                  <th className="text-left py-3 px-4 font-medium">Due Date</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                  <th className="text-left py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment.id} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4">{payment.invoiceNumber}</td>
                    <td className="py-3 px-4">{payment.customer}</td>
                    <td className="py-3 px-4">
                      {formatCurrency(payment.amount)}
                    </td>
                    <td className="py-3 px-4">{formatDate(payment.date)}</td>
                    <td className="py-3 px-4">{formatDate(payment.dueDate)}</td>
                    <td className="py-3 px-4">
                      <Badge
                        variant="outline"
                        className={statusColors[payment.status]}
                      >
                        {payment.status.charAt(0).toUpperCase() +
                          payment.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4 mr-1" /> PDF
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
