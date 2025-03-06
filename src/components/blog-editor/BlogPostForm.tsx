
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ContentBlocks } from "@/components/blog-editor/ContentBlocks";
import { ContentBlock, BlockType } from "@/types/page";

interface BlogPostFormProps {
  title: string;
  slug: string;
  excerpt: string;
  blocks: ContentBlock[];
  showPreview: boolean;
  handleBasicInfoChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  addContentBlock: (type: BlockType) => void;
  updateBlockContent: (blockId: string, newContent: any) => void;
  moveBlock: (blockId: string, direction: 'up' | 'down') => void;
  removeBlock: (blockId: string) => void;
}

export const BlogPostForm: React.FC<BlogPostFormProps> = ({
  title,
  slug,
  excerpt,
  blocks,
  showPreview,
  handleBasicInfoChange,
  addContentBlock,
  updateBlockContent,
  moveBlock,
  removeBlock
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Post Content</CardTitle>
        <CardDescription>
          Write your blog post content here.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input 
            id="title" 
            name="title" 
            value={title} 
            onChange={handleBasicInfoChange} 
            placeholder="Enter blog post title" 
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="slug">Slug</Label>
          <Input 
            id="slug" 
            name="slug" 
            value={slug} 
            onChange={handleBasicInfoChange} 
            placeholder="enter-slug-here" 
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="excerpt">Excerpt</Label>
          <Textarea 
            id="excerpt" 
            name="excerpt" 
            value={excerpt} 
            onChange={handleBasicInfoChange} 
            placeholder="Brief summary of your post" 
            rows={3} 
          />
        </div>
        
        {/* Content Blocks Editor */}
        <ContentBlocks 
          blocks={blocks}
          showPreview={showPreview}
          addContentBlock={addContentBlock}
          updateBlockContent={updateBlockContent}
          moveBlock={moveBlock}
          removeBlock={removeBlock}
        />
      </CardContent>
    </Card>
  );
};
