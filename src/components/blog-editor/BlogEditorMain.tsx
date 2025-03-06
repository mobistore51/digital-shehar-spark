
import React from "react";
import { Button } from "@/components/ui/button";
import { ContentBlocks } from "@/components/blog-editor/ContentBlocks";
import { Loader2, Eye, EyeOff, Save, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ContentBlock } from "@/types/page";

interface BlogEditorMainProps {
  id?: string;
  loading: boolean;
  saving: boolean;
  blocks: ContentBlock[];
  showPreview: boolean;
  title: string;
  slug: string;
  excerpt: string;
  togglePreview: () => void;
  handleBasicInfoChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  addContentBlock: (type: any) => void;
  updateBlockContent: (blockId: string, newContent: any) => void;
  moveBlock: (blockId: string, direction: 'up' | 'down') => void;
  removeBlock: (blockId: string) => void;
}

export const BlogEditorMain: React.FC<BlogEditorMainProps> = ({
  id,
  loading,
  saving,
  blocks,
  showPreview,
  title,
  slug,
  excerpt,
  togglePreview,
  handleBasicInfoChange,
  handleSubmit,
  addContentBlock,
  updateBlockContent,
  moveBlock,
  removeBlock
}) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => navigate("/dashboard/blog")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-3xl font-bold tracking-tight">
            {id ? "Edit Blog Post" : "Create New Blog Post"}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={togglePreview}>
            {showPreview ? (
              <>
                <EyeOff className="mr-2 h-4 w-4" />
                Edit Mode
              </>
            ) : (
              <>
                <Eye className="mr-2 h-4 w-4" />
                Preview
              </>
            )}
          </Button>
          <Button variant="outline" onClick={() => navigate("/dashboard/blog")}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={saving}>
            {saving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
