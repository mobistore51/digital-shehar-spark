
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus, Save } from "lucide-react";

const UsersSettingsTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Management</CardTitle>
        <CardDescription>
          Manage access and permissions for your team members.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Team Members</h3>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Invite User
            </Button>
          </div>
          <div className="border rounded-md">
            <div className="grid grid-cols-4 p-4 border-b font-medium">
              <div>User</div>
              <div>Email</div>
              <div>Role</div>
              <div className="text-right">Actions</div>
            </div>
            <div className="divide-y">
              <div className="grid grid-cols-4 p-4 items-center">
                <div className="font-medium">Admin User</div>
                <div className="text-muted-foreground">admin@digitalshehar.com</div>
                <div><Badge>Admin</Badge></div>
                <div className="text-right">
                  <Button variant="ghost" size="sm">Edit</Button>
                </div>
              </div>
              <div className="grid grid-cols-4 p-4 items-center">
                <div className="font-medium">Content Editor</div>
                <div className="text-muted-foreground">editor@digitalshehar.com</div>
                <div><Badge variant="outline">Editor</Badge></div>
                <div className="text-right">
                  <Button variant="ghost" size="sm">Edit</Button>
                </div>
              </div>
              <div className="grid grid-cols-4 p-4 items-center">
                <div className="font-medium">Marketing Manager</div>
                <div className="text-muted-foreground">marketing@digitalshehar.com</div>
                <div><Badge variant="outline">Manager</Badge></div>
                <div className="text-right">
                  <Button variant="ghost" size="sm">Edit</Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Role Permissions</h3>
          <div className="grid gap-4">
            <div className="border rounded-md p-4">
              <h4 className="font-medium mb-2">Admin</h4>
              <p className="text-sm text-muted-foreground mb-4">Full access to all features and settings</p>
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="w-1/2 text-sm">Dashboard access:</span>
                  <span className="text-sm font-medium">Full access</span>
                </div>
                <div className="flex items-center">
                  <span className="w-1/2 text-sm">Content management:</span>
                  <span className="text-sm font-medium">Create, edit, delete</span>
                </div>
                <div className="flex items-center">
                  <span className="w-1/2 text-sm">User management:</span>
                  <span className="text-sm font-medium">Full access</span>
                </div>
                <div className="flex items-center">
                  <span className="w-1/2 text-sm">Settings:</span>
                  <span className="text-sm font-medium">Full access</span>
                </div>
              </div>
            </div>
            <div className="border rounded-md p-4">
              <h4 className="font-medium mb-2">Editor</h4>
              <p className="text-sm text-muted-foreground mb-4">Can manage content but not system settings</p>
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="w-1/2 text-sm">Dashboard access:</span>
                  <span className="text-sm font-medium">Limited access</span>
                </div>
                <div className="flex items-center">
                  <span className="w-1/2 text-sm">Content management:</span>
                  <span className="text-sm font-medium">Create, edit</span>
                </div>
                <div className="flex items-center">
                  <span className="w-1/2 text-sm">User management:</span>
                  <span className="text-sm font-medium">No access</span>
                </div>
                <div className="flex items-center">
                  <span className="w-1/2 text-sm">Settings:</span>
                  <span className="text-sm font-medium">No access</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t p-6">
        <Button variant="outline">Cancel</Button>
        <Button>
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UsersSettingsTab;
