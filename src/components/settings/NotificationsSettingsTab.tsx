
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

const NotificationsSettingsTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Settings</CardTitle>
        <CardDescription>
          Control which notifications you receive.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Email Notifications</h3>
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="email-contact-form" className="cursor-pointer">
                Contact Form Submissions
              </Label>
              <Switch id="email-contact-form" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="email-new-comment" className="cursor-pointer">
                New Comments
              </Label>
              <Switch id="email-new-comment" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="email-security" className="cursor-pointer">
                Security Alerts
              </Label>
              <Switch id="email-security" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="email-product-updates" className="cursor-pointer">
                Product Updates
              </Label>
              <Switch id="email-product-updates" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="email-marketing" className="cursor-pointer">
                Marketing Emails
              </Label>
              <Switch id="email-marketing" />
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-lg font-medium">System Notifications</h3>
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="browser-notifications" className="cursor-pointer">
                Browser Notifications
              </Label>
              <Switch id="browser-notifications" defaultChecked />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="contact-email">Notification Email</Label>
              <Input
                id="contact-email"
                type="email"
                placeholder="notifications@example.com"
                defaultValue="admin@digitalshehar.com"
              />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t p-6">
        <Button variant="outline">Reset to Default</Button>
        <Button>
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NotificationsSettingsTab;
