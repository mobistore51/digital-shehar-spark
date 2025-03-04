
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import SettingsTabs from "@/components/settings/SettingsTabs";

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

      <SettingsTabs saving={saving} onSubmit={handleSubmit} />
    </div>
  );
};

export default SettingsPage;
