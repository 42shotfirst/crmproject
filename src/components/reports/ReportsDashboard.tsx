import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Download,
  FileText,
  BarChart,
  PieChart,
  Users,
  Mail,
  Calendar,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Metric {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ReactNode;
}

interface ReportData {
  title: string;
  description: string;
  lastGenerated: string;
  metrics: Metric[];
}

export default function ReportsDashboard() {
  const [activeTab, setActiveTab] = useState("contacts");
  const { toast } = useToast();

  const reports: Record<string, ReportData> = {
    contacts: {
      title: "Contact Activity Report",
      description: "Overview of contact engagement and activity metrics",
      lastGenerated: "June 1, 2023",
      metrics: [
        {
          title: "Total Contacts",
          value: "1,234",
          change: "+12%",
          isPositive: true,
          icon: <Users className="h-4 w-4" />,
        },
        {
          title: "New Contacts",
          value: "56",
          change: "+8%",
          isPositive: true,
          icon: <Users className="h-4 w-4" />,
        },
        {
          title: "Conversion Rate",
          value: "24%",
          change: "+2%",
          isPositive: true,
          icon: <BarChart className="h-4 w-4" />,
        },
        {
          title: "Avg. Engagement",
          value: "3.7",
          change: "-0.3",
          isPositive: false,
          icon: <PieChart className="h-4 w-4" />,
        },
      ],
    },
    communications: {
      title: "Communications Report",
      description: "Analysis of email, call, and meeting effectiveness",
      lastGenerated: "June 2, 2023",
      metrics: [
        {
          title: "Emails Sent",
          value: "2,456",
          change: "+18%",
          isPositive: true,
          icon: <Mail className="h-4 w-4" />,
        },
        {
          title: "Open Rate",
          value: "42%",
          change: "+5%",
          isPositive: true,
          icon: <Mail className="h-4 w-4" />,
        },
        {
          title: "Meetings",
          value: "87",
          change: "+12%",
          isPositive: true,
          icon: <Calendar className="h-4 w-4" />,
        },
        {
          title: "Response Time",
          value: "3.2h",
          change: "-0.8h",
          isPositive: true,
          icon: <BarChart className="h-4 w-4" />,
        },
      ],
    },
    sales: {
      title: "Sales Performance Report",
      description: "Revenue, conversion, and sales pipeline metrics",
      lastGenerated: "June 3, 2023",
      metrics: [
        {
          title: "Total Revenue",
          value: "$24,500",
          change: "+15%",
          isPositive: true,
          icon: <BarChart className="h-4 w-4" />,
        },
        {
          title: "Avg. Deal Size",
          value: "$1,850",
          change: "+7%",
          isPositive: true,
          icon: <BarChart className="h-4 w-4" />,
        },
        {
          title: "Conversion Rate",
          value: "18%",
          change: "-2%",
          isPositive: false,
          icon: <PieChart className="h-4 w-4" />,
        },
        {
          title: "Pipeline Value",
          value: "$56,200",
          change: "+23%",
          isPositive: true,
          icon: <BarChart className="h-4 w-4" />,
        },
      ],
    },
  };

  const handleExport = (format: "csv" | "pdf") => {
    toast({
      title: "Export Started",
      description: `Your ${activeTab} report is being exported as ${format.toUpperCase()}.`,
    });

    // In a real app, this would trigger an actual export process
    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: `Your ${activeTab} report has been exported successfully.`,
      });
    }, 1500);
  };

  const currentReport = reports[activeTab];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => handleExport("csv")}>
            <FileText className="mr-2 h-4 w-4" /> Export CSV
          </Button>
          <Button variant="outline" onClick={() => handleExport("pdf")}>
            <Download className="mr-2 h-4 w-4" /> Export PDF
          </Button>
        </div>
      </div>

      <Tabs
        defaultValue="contacts"
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="contacts">Contact Activity</TabsTrigger>
          <TabsTrigger value="communications">Communications</TabsTrigger>
          <TabsTrigger value="sales">Sales Performance</TabsTrigger>
        </TabsList>

        {Object.keys(reports).map((reportKey) => (
          <TabsContent key={reportKey} value={reportKey} className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{reports[reportKey].title}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {reports[reportKey].description}
                </p>
                <p className="text-xs text-muted-foreground">
                  Last generated: {reports[reportKey].lastGenerated}
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {reports[reportKey].metrics.map((metric, index) => (
                    <Card key={index}>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-muted-foreground">
                            {metric.title}
                          </span>
                          {metric.icon}
                        </div>
                        <div className="text-2xl font-bold mt-2">
                          {metric.value}
                        </div>
                        <div
                          className={`text-sm mt-1 ${metric.isPositive ? "text-green-600" : "text-red-600"}`}
                        >
                          {metric.change} from last month
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="mt-8 border rounded-lg p-6 bg-muted/50">
                  <h3 className="text-lg font-medium mb-4">
                    Report Customization
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Select parameters to customize this report. Changes will be
                    reflected in the exported file.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium">Date Range</label>
                      <select className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm">
                        <option>Last 30 days</option>
                        <option>Last 90 days</option>
                        <option>Last 6 months</option>
                        <option>Last year</option>
                        <option>Custom range</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Group By</label>
                      <select className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm">
                        <option>Day</option>
                        <option>Week</option>
                        <option>Month</option>
                        <option>Quarter</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Include</label>
                      <select className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm">
                        <option>All data</option>
                        <option>Active only</option>
                        <option>Completed only</option>
                      </select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
