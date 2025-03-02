
import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ContentBlock } from "@/types/page";

interface BlockEditorProps {
  block: ContentBlock;
  updateBlockContent: (blockId: string, newContent: any) => void;
}

export const BlockEditor: React.FC<BlockEditorProps> = ({ block, updateBlockContent }) => {
  switch (block.type) {
    case 'heading':
      return (
        <div className="space-y-2">
          <div className="flex space-x-2">
            <Input
              value={block.content.text || ''}
              onChange={(e) => updateBlockContent(block.id, { text: e.target.value })}
              placeholder="Heading text"
              className="flex-1"
            />
            <Select
              value={block.content.level || 'h2'}
              onValueChange={(value) => updateBlockContent(block.id, { level: value })}
            >
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="h1">H1</SelectItem>
                <SelectItem value="h2">H2</SelectItem>
                <SelectItem value="h3">H3</SelectItem>
                <SelectItem value="h4">H4</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      );
    
    case 'paragraph':
      return (
        <Textarea
          value={block.content.text || ''}
          onChange={(e) => updateBlockContent(block.id, { text: e.target.value })}
          placeholder="Paragraph text"
          rows={4}
        />
      );
    
    case 'image':
      return (
        <div className="space-y-2">
          <div className="flex space-x-2">
            <Input
              value={block.content.url || ''}
              onChange={(e) => updateBlockContent(block.id, { url: e.target.value })}
              placeholder="Image URL"
            />
          </div>
          <Input
            value={block.content.alt || ''}
            onChange={(e) => updateBlockContent(block.id, { alt: e.target.value })}
            placeholder="Alt text"
          />
          <Input
            value={block.content.caption || ''}
            onChange={(e) => updateBlockContent(block.id, { caption: e.target.value })}
            placeholder="Caption (optional)"
          />
        </div>
      );
    
    case 'quote':
      return (
        <div className="space-y-2">
          <Textarea
            value={block.content.text || ''}
            onChange={(e) => updateBlockContent(block.id, { text: e.target.value })}
            placeholder="Quote text"
            rows={3}
          />
          <Input
            value={block.content.author || ''}
            onChange={(e) => updateBlockContent(block.id, { author: e.target.value })}
            placeholder="Author (optional)"
          />
        </div>
      );
    
    case 'columns':
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Column 1</Label>
              <Textarea
                value={block.content.columns?.[0]?.text || ''}
                onChange={(e) => {
                  const columns = [...(block.content.columns || [])];
                  columns[0] = { ...columns[0], text: e.target.value };
                  updateBlockContent(block.id, { columns });
                }}
                placeholder="Column 1 content"
                rows={3}
              />
            </div>
            <div>
              <Label>Column 2</Label>
              <Textarea
                value={block.content.columns?.[1]?.text || ''}
                onChange={(e) => {
                  const columns = [...(block.content.columns || [])];
                  columns[1] = { ...columns[1], text: e.target.value };
                  updateBlockContent(block.id, { columns });
                }}
                placeholder="Column 2 content"
                rows={3}
              />
            </div>
          </div>
        </div>
      );
    
    case 'html':
      return (
        <Textarea
          value={block.content.code || ''}
          onChange={(e) => updateBlockContent(block.id, { code: e.target.value })}
          placeholder="Custom HTML"
          rows={6}
          className="font-mono text-sm"
        />
      );
    
    default:
      return <div>Unknown block type</div>;
  }
};
