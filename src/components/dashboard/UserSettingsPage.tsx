import { useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import UserProfileForm from "../auth/UserProfileForm";
import UserManagement from "../auth/UserManagement";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default function UserSettingsPage() {
  const { userRole } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          {(userRole === "admin" || userRole === "manager") && (
            <TabsTrigger value="users">User Management</TabsTrigger>
          )}
        </TabsList>
        <TabsContent value="profile" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
              <CardDescription>
                Update your profile information and preferences.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <UserProfileForm />
            </CardContent>
          </Card>
        </TabsContent>
        {(userRole === "admin" || userRole === "manager") && (
          <TabsContent value="users" className="mt-4">
            <UserManagement />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}
