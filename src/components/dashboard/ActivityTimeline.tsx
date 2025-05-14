import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  CalendarIcon,
  CheckCircle,
  Clock,
  Mail,
  MessageSquare,
  Phone,
  Plus,
} from "lucide-react";

interface ActivityItem {
  id: string;
  type: "call" | "email" | "meeting" | "task" | "note";
  title: string;
  description?: string;
  timestamp: string;
  status: "completed" | "scheduled" | "pending";
  contact?: {
    id: string;
    name: string;
    avatar?: string;
    company?: string;
  };
}

interface ActivityTimelineProps {
  activities?: ActivityItem[];
}

const ActivityTimeline: React.FC<ActivityTimelineProps> = ({
  activities = defaultActivities,
}) => {
  return (
    <Card className="h-full bg-white">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle>Activity Timeline</CardTitle>
          <Button
            size="sm"
            variant="outline"
            className="flex items-center gap-1"
          >
            <Plus className="h-4 w-4" />
            <span>Add Activity</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="calls">Calls</TabsTrigger>
            <TabsTrigger value="emails">Emails</TabsTrigger>
            <TabsTrigger value="meetings">Meetings</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-0 mt-0">
            <div className="space-y-4 max-h-[320px] overflow-y-auto pr-2">
              {activities.map((activity) => (
                <ActivityItem key={activity.id} activity={activity} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="calls" className="space-y-0 mt-0">
            <div className="space-y-4 max-h-[320px] overflow-y-auto pr-2">
              {activities
                .filter((activity) => activity.type === "call")
                .map((activity) => (
                  <ActivityItem key={activity.id} activity={activity} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="emails" className="space-y-0 mt-0">
            <div className="space-y-4 max-h-[320px] overflow-y-auto pr-2">
              {activities
                .filter((activity) => activity.type === "email")
                .map((activity) => (
                  <ActivityItem key={activity.id} activity={activity} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="meetings" className="space-y-0 mt-0">
            <div className="space-y-4 max-h-[320px] overflow-y-auto pr-2">
              {activities
                .filter((activity) => activity.type === "meeting")
                .map((activity) => (
                  <ActivityItem key={activity.id} activity={activity} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="tasks" className="space-y-0 mt-0">
            <div className="space-y-4 max-h-[320px] overflow-y-auto pr-2">
              {activities
                .filter((activity) => activity.type === "task")
                .map((activity) => (
                  <ActivityItem key={activity.id} activity={activity} />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

const ActivityItem: React.FC<{ activity: ActivityItem }> = ({ activity }) => {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "call":
        return <Phone className="h-4 w-4" />;
      case "email":
        return <Mail className="h-4 w-4" />;
      case "meeting":
        return <CalendarIcon className="h-4 w-4" />;
      case "task":
        return <CheckCircle className="h-4 w-4" />;
      case "note":
        return <MessageSquare className="h-4 w-4" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge variant="secondary">Completed</Badge>;
      case "scheduled":
        return <Badge variant="outline">Scheduled</Badge>;
      case "pending":
        return (
          <Badge
            variant="outline"
            className="bg-amber-50 text-amber-700 border-amber-200"
          >
            Pending
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex gap-3 pb-4">
      <div className="flex flex-col items-center">
        <div className="rounded-full bg-muted p-2">
          {getActivityIcon(activity.type)}
        </div>
        <div className="flex-grow w-[1px] bg-border mt-2"></div>
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <h4 className="text-sm font-medium">{activity.title}</h4>
          {getStatusBadge(activity.status)}
        </div>

        {activity.description && (
          <p className="text-sm text-muted-foreground mb-2">
            {activity.description}
          </p>
        )}

        {activity.contact && (
          <div className="flex items-center gap-2 mb-2">
            <Avatar className="h-6 w-6">
              <AvatarImage
                src={activity.contact.avatar}
                alt={activity.contact.name}
              />
              <AvatarFallback>
                {activity.contact.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="text-xs">
              {activity.contact.name}
              {activity.contact.company && (
                <span className="text-muted-foreground">
                  {" "}
                  • {activity.contact.company}
                </span>
              )}
            </span>
          </div>
        )}

        <div className="flex items-center text-xs text-muted-foreground">
          <Clock className="h-3 w-3 mr-1" />
          <span>{activity.timestamp}</span>
        </div>
      </div>
    </div>
  );
};

// Default activities for demonstration
const defaultActivities: ActivityItem[] = [
  {
    id: "1",
    type: "call",
    title: "Sales call with John",
    description: "Discussed new product features and pricing options",
    timestamp: "Today, 10:30 AM",
    status: "completed",
    contact: {
      id: "101",
      name: "John Smith",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
      company: "Acme Inc",
    },
  },
  {
    id: "2",
    type: "email",
    title: "Follow-up email sent",
    description: "Sent product brochure and pricing information",
    timestamp: "Today, 9:15 AM",
    status: "completed",
    contact: {
      id: "102",
      name: "Sarah Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      company: "XYZ Corp",
    },
  },
  {
    id: "3",
    type: "meeting",
    title: "Product demo meeting",
    description: "Virtual meeting to showcase new platform features",
    timestamp: "Tomorrow, 2:00 PM",
    status: "scheduled",
    contact: {
      id: "103",
      name: "Michael Brown",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
      company: "Tech Solutions",
    },
  },
  {
    id: "4",
    type: "task",
    title: "Prepare proposal document",
    description: "Create custom proposal for enterprise client",
    timestamp: "Due in 2 days",
    status: "pending",
    contact: {
      id: "104",
      name: "Emily Davis",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily",
      company: "Global Enterprises",
    },
  },
  {
    id: "5",
    type: "note",
    title: "Client requirements note",
    description: "Key points from initial discovery call",
    timestamp: "Yesterday, 4:45 PM",
    status: "completed",
    contact: {
      id: "105",
      name: "Robert Wilson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=robert",
      company: "Wilson & Co",
    },
  },
  {
    id: "6",
    type: "email",
    title: "Contract renewal reminder",
    description: "Sent reminder about upcoming contract expiration",
    timestamp: "2 days ago",
    status: "completed",
    contact: {
      id: "106",
      name: "Jennifer Lee",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jennifer",
      company: "Lee Enterprises",
    },
  },
];

export default ActivityTimeline;
