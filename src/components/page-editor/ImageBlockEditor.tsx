
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ContentBlock } from "@/types/page";
import { ImageUploader } from "./ImageUploader";

interface ImageBlockEditorProps {
  block: ContentBlock;
  updateBlockContent: (blockId: string, newContent: any) => void;
}

export const ImageBlockEditor: React.FC<ImageBlockEditorProps> = ({
  block,
  updateBlockContent,
}) => {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    updateBlockContent(block.id, { [name]: value });
  };

  const handleImageUploaded = (url: string) => {
    updateBlockContent(block.id, { url });
  };

  return (
    <div className="space-y-4">
      <ImageUploader 
        onImageUploaded={handleImageUploaded} 
        currentImageUrl={block.content.url} 
      />
      
      <div className="grid gap-2">
        <Label htmlFor={`alt-${block.id}`}>Alt Text</Label>
        <Input
          id={`alt-${block.id}`}
          name="alt"
          value={block.content.alt || ""}
          onChange={handleInputChange}
          placeholder="Describe the image (for accessibility)"
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor={`caption-${block.id}`}>Caption</Label>
        <Input
          id={`caption-${block.id}`}
          name="caption"
          value={block.content.caption || ""}
          onChange={handleInputChange}
          placeholder="Image caption (optional)"
        />
      </div>
    </div>
  );
};
