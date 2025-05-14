import { useState, useEffect } from "react";
import { useAuth } from "./AuthProvider";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Search,
  UserPlus,
  Loader2,
  MoreHorizontal,
  Mail,
  User,
} from "lucide-react";

interface UserProfile {
  id: string;
  email: string;
  username?: string;
  role: "admin" | "manager" | "user";
  created_at: string;
  avatar_url?: string;
}

export default function UserManagement() {
  const { userRole } = useAuth();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<"user" | "manager" | "admin">(
    "user",
  );
  const [isInviting, setIsInviting] = useState(false);
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      setIsLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("user_profiles")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setUsers(data as UserProfile[]);
    } catch (err: any) {
      setError("Error loading users: " + err.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function inviteUser() {
    try {
      setIsInviting(true);
      setError(null);

      // In a real app, you would send an invitation email here
      // For this demo, we'll just create a user profile
      const { error } = await supabase.from("user_profiles").insert([
        {
          email: inviteEmail,
          role: inviteRole,
          created_at: new Date().toISOString(),
        },
      ]);

      if (error) throw error;

      setInviteDialogOpen(false);
      setInviteEmail("");
      setInviteRole("user");
      fetchUsers();
    } catch (err: any) {
      setError("Error inviting user: " + err.message);
    } finally {
      setIsInviting(false);
    }
  }

  async function updateUserRole(
    userId: string,
    newRole: "admin" | "manager" | "user",
  ) {
    try {
      setError(null);

      const { error } = await supabase
        .from("user_profiles")
        .update({ role: newRole })
        .eq("id", userId);

      if (error) throw error;

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, role: newRole } : user,
        ),
      );

      setEditDialogOpen(false);
      setSelectedUser(null);
    } catch (err: any) {
      setError("Error updating user role: " + err.message);
    }
  }

  const filteredUsers = users.filter(
    (user) =>
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.username &&
        user.username.toLowerCase().includes(searchTerm.toLowerCase())),
  );

  // Only admin and manager can access this page
  if (userRole !== "admin" && userRole !== "manager") {
    return (
      <Card>
        <CardContent className="pt-6">
          <Alert variant="destructive">
            <AlertDescription>
              You don't have permission to access user management.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-bold">User Management</CardTitle>
        <Dialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="h-4 w-4 mr-2" />
              Invite User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invite New User</DialogTitle>
              <DialogDescription>
                Send an invitation to a new user to join your organization.
              </DialogDescription>
            </DialogHeader>
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    placeholder="name@example.com"
                    type="email"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="role" className="text-sm font-medium">
                  Role
                </label>
                <Select
                  value={inviteRole}
                  onValueChange={(value: any) => setInviteRole(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    {userRole === "admin" && (
                      <SelectItem value="admin">Admin</SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setInviteDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={inviteUser}
                disabled={!inviteEmail || isInviting}
              >
                {isInviting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Inviting...
                  </>
                ) : (
                  "Send Invitation"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">User</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      <div className="flex justify-center">
                        <Loader2 className="h-6 w-6 animate-spin text-primary" />
                      </div>
                    </TableCell>
                  </TableRow>
                ) : filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={
                                user.avatar_url ||
                                `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`
                              }
                              alt={user.username || user.email}
                            />
                            <AvatarFallback>
                              {(
                                user.username?.[0] ||
                                user.email[0] ||
                                ""
                              ).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">
                              {user.username || "No username"}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell className="capitalize">{user.role}</TableCell>
                      <TableCell>
                        {new Date(user.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Dialog
                          open={editDialogOpen && selectedUser?.id === user.id}
                          onOpenChange={(open) => {
                            setEditDialogOpen(open);
                            if (!open) setSelectedUser(null);
                          }}
                        >
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => setSelectedUser(user)}
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit User</DialogTitle>
                              <DialogDescription>
                                Update user details and permissions.
                              </DialogDescription>
                            </DialogHeader>
                            {selectedUser && (
                              <div className="space-y-4 py-4">
                                <div className="flex items-center gap-4">
                                  <Avatar className="h-16 w-16">
                                    <AvatarImage
                                      src={
                                        selectedUser.avatar_url ||
                                        `https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedUser.email}`
                                      }
                                      alt={
                                        selectedUser.username ||
                                        selectedUser.email
                                      }
                                    />
                                    <AvatarFallback>
                                      {(
                                        selectedUser.username?.[0] ||
                                        selectedUser.email[0] ||
                                        ""
                                      ).toUpperCase()}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="font-medium">
                                      {selectedUser.username || "No username"}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                      {selectedUser.email}
                                    </p>
                                  </div>
                                </div>

                                <div className="space-y-2">
                                  <label
                                    htmlFor="edit-role"
                                    className="text-sm font-medium"
                                  >
                                    Role
                                  </label>
                                  <Select
                                    value={selectedUser.role}
                                    onValueChange={(value: any) =>
                                      setSelectedUser({
                                        ...selectedUser,
                                        role: value,
                                      })
                                    }
                                    disabled={
                                      selectedUser.id === "current-user-id"
                                    } // Prevent changing own role
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="user">User</SelectItem>
                                      <SelectItem value="manager">
                                        Manager
                                      </SelectItem>
                                      {userRole === "admin" && (
                                        <SelectItem value="admin">
                                          Admin
                                        </SelectItem>
                                      )}
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                            )}
                            <DialogFooter>
                              <Button
                                variant="outline"
                                onClick={() => setEditDialogOpen(false)}
                              >
                                Cancel
                              </Button>
                              <Button
                                onClick={() =>
                                  selectedUser &&
                                  updateUserRole(
                                    selectedUser.id,
                                    selectedUser.role,
                                  )
                                }
                              >
                                Save Changes
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center py-8 text-muted-foreground"
                    >
                      No users found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
