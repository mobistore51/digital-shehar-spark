
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building, Paintbrush, Bell, Users, Lock } from "lucide-react";
import GeneralSettingsTab from "./GeneralSettingsTab";
import AppearanceSettingsTab from "./AppearanceSettingsTab";
import NotificationsSettingsTab from "./NotificationsSettingsTab";
import UsersSettingsTab from "./UsersSettingsTab";
import SecuritySettingsTab from "./SecuritySettingsTab";

type SettingsTabsProps = {
  saving: boolean;
  onSubmit: (e: React.FormEvent) => void;
};

const SettingsTabs = ({ saving, onSubmit }: SettingsTabsProps) => {
  return (
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
            <GeneralSettingsTab saving={saving} onSubmit={onSubmit} />
          </TabsContent>
          <TabsContent value="appearance" className="m-0">
            <AppearanceSettingsTab />
          </TabsContent>
          <TabsContent value="notifications" className="m-0">
            <NotificationsSettingsTab />
          </TabsContent>
          <TabsContent value="users" className="m-0">
            <UsersSettingsTab />
          </TabsContent>
          <TabsContent value="security" className="m-0">
            <SecuritySettingsTab />
          </TabsContent>
        </div>
      </div>
    </Tabs>
  );
};

export default SettingsTabs;
