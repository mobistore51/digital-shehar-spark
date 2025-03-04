
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

const AppearanceSettingsTab = () => {
  return (
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
  );
};

export default AppearanceSettingsTab;
