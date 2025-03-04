
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
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
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  Save, 
  Building, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Users, 
  Bell, 
  Lock, 
  Paintbrush, 
  Loader2, 
  Trash
} from "lucide-react";

const SettingsPage = () => {
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      toast({
        title: "Settings saved",
        description: "Your settings have been updated successfully.",
      });
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account and website settings.
        </p>
      </div>

      <Tabs defaultValue="general">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/5">
            <TabsList className="flex flex-col h-auto p-0 bg-transparent space-y-1">
              <TabsTrigger 
                value="general" 
                className="justify-start px-4 py-2 h-9 font-normal"
              >
                <Building className="h-4 w-4 mr-2" />
                General
              </TabsTrigger>
              <TabsTrigger 
                value="appearance" 
                className="justify-start px-4 py-2 h-9 font-normal"
              >
                <Paintbrush className="h-4 w-4 mr-2" />
                Appearance
              </TabsTrigger>
              <TabsTrigger 
                value="notifications" 
                className="justify-start px-4 py-2 h-9 font-normal"
              >
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </TabsTrigger>
              <TabsTrigger 
                value="users" 
                className="justify-start px-4 py-2 h-9 font-normal"
              >
                <Users className="h-4 w-4 mr-2" />
                Users
              </TabsTrigger>
              <TabsTrigger 
                value="security" 
                className="justify-start px-4 py-2 h-9 font-normal"
              >
                <Lock className="h-4 w-4 mr-2" />
                Security
              </TabsTrigger>
            </TabsList>
          </div>
          
          <div className="flex-1">
            <TabsContent value="general" className="m-0">
              <Card>
                <form onSubmit={handleSubmit}>
                  <CardHeader>
                    <CardTitle>General Settings</CardTitle>
                    <CardDescription>
                      Update your business information and contact details.
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Business Information</h3>
                      <div className="grid gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="company-name">Business Name</Label>
                          <Input
                            id="company-name"
                            placeholder="Digital Shehar"
                            defaultValue="Digital Shehar"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="tagline">Tagline</Label>
                          <Input
                            id="tagline"
                            placeholder="Your tagline here"
                            defaultValue="Digital Marketing Solutions"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="description">Description</Label>
                          <Textarea
                            id="description"
                            placeholder="Brief description of your business"
                            defaultValue="Digital Shehar provides comprehensive digital marketing solutions for businesses of all sizes. We help you grow your online presence and reach your target audience effectively."
                            rows={4}
                          />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Contact Details</h3>
                      <div className="grid gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="email" className="flex items-center gap-2">
                            <Mail className="h-4 w-4" />
                            Email Address
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="contact@example.com"
                            defaultValue="contact@digitalshehar.com"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="phone" className="flex items-center gap-2">
                            <Phone className="h-4 w-4" />
                            Phone Number
                          </Label>
                          <Input
                            id="phone"
                            placeholder="+1 123 456 7890"
                            defaultValue="+91 98765 43210"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="website" className="flex items-center gap-2">
                            <Globe className="h-4 w-4" />
                            Website
                          </Label>
                          <Input
                            id="website"
                            placeholder="https://example.com"
                            defaultValue="https://digitalshehar.com"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="address" className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            Address
                          </Label>
                          <Textarea
                            id="address"
                            placeholder="Your business address"
                            defaultValue="123 Digital Street, Tech Park, Bangalore, 560001, India"
                            rows={3}
                          />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Social Media</h3>
                      <div className="grid gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="facebook">Facebook</Label>
                          <Input
                            id="facebook"
                            placeholder="https://facebook.com/yourbusiness"
                            defaultValue="https://facebook.com/digitalshehar"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="twitter">Twitter / X</Label>
                          <Input
                            id="twitter"
                            placeholder="https://twitter.com/yourbusiness"
                            defaultValue="https://twitter.com/digitalshehar"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="instagram">Instagram</Label>
                          <Input
                            id="instagram"
                            placeholder="https://instagram.com/yourbusiness"
                            defaultValue="https://instagram.com/digitalshehar"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="linkedin">LinkedIn</Label>
                          <Input
                            id="linkedin"
                            placeholder="https://linkedin.com/company/yourbusiness"
                            defaultValue="https://linkedin.com/company/digitalshehar"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="flex justify-between border-t p-6">
                    <Button variant="outline">Cancel</Button>
                    <Button type="submit" disabled={saving}>
                      {saving ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>

            <TabsContent value="appearance" className="m-0">
              <Card>
                <CardHeader>
                  <CardTitle>Appearance Settings</CardTitle>
                  <CardDescription>
                    Customize how your website looks and feels.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Theme</h3>
                    <div className="grid gap-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="theme-mode" className="cursor-pointer">Dark Mode</Label>
                        <Switch id="theme-mode" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="primary-color">Primary Color</Label>
                        <div className="flex gap-2">
                          <Input
                            id="primary-color"
                            type="color"
                            className="w-12 h-10 p-1"
                            defaultValue="#0F766E"
                          />
                          <Input 
                            type="text" 
                            className="flex-1" 
                            defaultValue="#0F766E" 
                            placeholder="HEX color code" 
                          />
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="font-family">Font Family</Label>
                        <select
                          id="font-family"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                          defaultValue="Inter"
                        >
                          <option value="Inter">Inter</option>
                          <option value="Roboto">Roboto</option>
                          <option value="Open Sans">Open Sans</option>
                          <option value="Montserrat">Montserrat</option>
                          <option value="Poppins">Poppins</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Layout</h3>
                    <div className="grid gap-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="fullwidth-layout" className="cursor-pointer">Full-width Layout</Label>
                        <Switch id="fullwidth-layout" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="sticky-header" className="cursor-pointer">Sticky Header</Label>
                        <Switch id="sticky-header" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="show-footer" className="cursor-pointer">Show Footer</Label>
                        <Switch id="show-footer" defaultChecked />
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
            </TabsContent>
              
            <TabsContent value="notifications" className="m-0">
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
            </TabsContent>
              
            <TabsContent value="users" className="m-0">
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
            </TabsContent>
              
            <TabsContent value="security" className="m-0">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>
                    Manage your account security and password.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Password</h3>
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input
                          id="current-password"
                          type="password"
                          placeholder="Enter your current password"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input
                          id="new-password"
                          type="password"
                          placeholder="Enter your new password"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input
                          id="confirm-password"
                          type="password"
                          placeholder="Confirm your new password"
                        />
                      </div>
                      <Button className="mt-2 w-full md:w-auto">Change Password</Button>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Two-factor authentication is disabled</p>
                        <p className="text-sm text-muted-foreground">
                          Add an extra layer of security to your account
                        </p>
                      </div>
                      <Button variant="outline">Enable</Button>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Sessions</h3>
                    <div className="space-y-4">
                      <div className="border rounded-md p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">Current Session</p>
                            <p className="text-sm text-muted-foreground">
                              Chrome on Windows • IP: 192.168.1.1
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Started: Today at 10:30 AM
                            </p>
                          </div>
                          <Badge>Active</Badge>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full">Sign Out of All Sessions</Button>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-red-600">Danger Zone</h3>
                    <div className="border border-red-200 rounded-md p-4 bg-red-50">
                      <div className="space-y-2">
                        <p className="font-medium">Delete Account</p>
                        <p className="text-sm text-muted-foreground">
                          Permanently delete your account and all of your content. This action cannot be undone.
                        </p>
                        <Button variant="destructive" className="mt-2">
                          <Trash className="h-4 w-4 mr-2" />
                          Delete Account
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
