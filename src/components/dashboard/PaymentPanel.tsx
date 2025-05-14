import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowUpRight, Download, FileText, Plus, Send } from "lucide-react";

interface Transaction {
  id: string;
  customer: string;
  amount: number;
  status: "completed" | "pending" | "failed";
  date: string;
}

interface Invoice {
  id: string;
  customer: string;
  amount: number;
  status: "paid" | "pending" | "overdue";
  dueDate: string;
}

interface PaymentPanelProps {
  transactions?: Transaction[];
  invoices?: Invoice[];
  totalRevenue?: number;
  pendingAmount?: number;
  overdueAmount?: number;
}

const PaymentPanel: React.FC<PaymentPanelProps> = ({
  transactions = [
    {
      id: "TX-1234",
      customer: "Acme Corp",
      amount: 1200,
      status: "completed",
      date: "2023-06-15",
    },
    {
      id: "TX-1235",
      customer: "Globex Inc",
      amount: 850,
      status: "pending",
      date: "2023-06-14",
    },
    {
      id: "TX-1236",
      customer: "Stark Industries",
      amount: 3200,
      status: "completed",
      date: "2023-06-12",
    },
    {
      id: "TX-1237",
      customer: "Wayne Enterprises",
      amount: 1750,
      status: "failed",
      date: "2023-06-10",
    },
  ],
  invoices = [
    {
      id: "INV-2234",
      customer: "Acme Corp",
      amount: 1200,
      status: "paid",
      dueDate: "2023-06-30",
    },
    {
      id: "INV-2235",
      customer: "Globex Inc",
      amount: 850,
      status: "pending",
      dueDate: "2023-06-25",
    },
    {
      id: "INV-2236",
      customer: "Stark Industries",
      amount: 3200,
      status: "paid",
      dueDate: "2023-06-20",
    },
    {
      id: "INV-2237",
      customer: "Wayne Enterprises",
      amount: 1750,
      status: "overdue",
      dueDate: "2023-06-05",
    },
  ],
  totalRevenue = 24500,
  pendingAmount = 3200,
  overdueAmount = 1750,
}) => {
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "completed":
      case "paid":
        return "default";
      case "pending":
        return "secondary";
      case "failed":
      case "overdue":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <Card className="w-full h-full bg-white">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Payment Processing</CardTitle>
        <CardDescription>
          Manage transactions, invoices, and payment status
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="text-sm font-medium text-muted-foreground mb-1">
                Total Revenue
              </div>
              <div className="text-2xl font-bold">
                ${totalRevenue.toLocaleString()}
              </div>
              <div className="mt-2 flex items-center text-sm text-green-600">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                <span>12% from last month</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-sm font-medium text-muted-foreground mb-1">
                Pending Payments
              </div>
              <div className="text-2xl font-bold">
                ${pendingAmount.toLocaleString()}
              </div>
              <Progress
                className="mt-2"
                value={Math.round((pendingAmount / totalRevenue) * 100)}
              />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-sm font-medium text-muted-foreground mb-1">
                Overdue Payments
              </div>
              <div className="text-2xl font-bold">
                ${overdueAmount.toLocaleString()}
              </div>
              <Progress
                className="mt-2"
                value={Math.round((overdueAmount / totalRevenue) * 100)}
              />
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="transactions">
          <TabsList className="mb-4">
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
          </TabsList>

          <TabsContent value="transactions">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">
                      {transaction.id}
                    </TableCell>
                    <TableCell>{transaction.customer}</TableCell>
                    <TableCell>
                      ${transaction.amount.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={getStatusBadgeVariant(transaction.status)}
                      >
                        {transaction.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="invoices">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">{invoice.id}</TableCell>
                    <TableCell>{invoice.customer}</TableCell>
                    <TableCell>${invoice.amount.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(invoice.status)}>
                        {invoice.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{invoice.dueDate}</TableCell>
                    <TableCell className="flex space-x-1">
                      <Button variant="ghost" size="sm">
                        <FileText className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Send className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">View All</Button>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Invoice
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PaymentPanel;
