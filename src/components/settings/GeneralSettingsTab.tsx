
import React, { useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, Save } from "lucide-react";

type GeneralSettingsTabProps = {
  saving: boolean;
  onSubmit: (e: React.FormEvent) => void;
};

const GeneralSettingsTab = ({ saving, onSubmit }: GeneralSettingsTabProps) => {
  return (
    <Card>
      <form onSubmit={onSubmit}>
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
  );
};

export default GeneralSettingsTab;
