
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2, Save } from "lucide-react";

interface PageEditorHeaderProps {
  isEditing: boolean;
  showPreview: boolean;
  saving: boolean;
  onBack: () => void;
  onTogglePreview: () => void;
  onSave: (e: React.FormEvent) => void;
}

export const PageEditorHeader: React.FC<PageEditorHeaderProps> = ({
  isEditing,
  showPreview,
  saving,
  onBack,
  onTogglePreview,
  onSave
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={onBack}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-3xl font-bold tracking-tight">
          {isEditing ? 'Edit Page' : 'Create New Page'}
        </h2>
      </div>
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          onClick={onTogglePreview}
        >
          {showPreview ? 'Edit Mode' : 'Preview'}
        </Button>
        <Button 
          onClick={onSave}
          disabled={saving}
          className="flex items-center gap-2"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {saving ? 'Saving...' : 'Save Page'}
        </Button>
      </div>
    </div>
  );
};
