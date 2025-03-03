
import React from "react";
import { ContentBlock } from "@/types/page";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ImageBlockEditor } from "./ImageBlockEditor";

interface BlockEditorProps {
  block: ContentBlock;
  updateBlockContent: (blockId: string, newContent: any) => void;
}

export const BlockEditor: React.FC<BlockEditorProps> = ({ block, updateBlockContent }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateBlockContent(block.id, { [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    updateBlockContent(block.id, { [name]: value });
  };

  switch (block.type) {
    case 'heading':
      return (
        <div className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor={`text-${block.id}`}>Heading Text</Label>
            <Input
              id={`text-${block.id}`}
              name="text"
              value={block.content.text || ""}
              onChange={handleInputChange}
              placeholder="Heading text"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor={`level-${block.id}`}>Heading Level</Label>
            <Select
              value={block.content.level || "h2"}
              onValueChange={(value) => handleSelectChange("level", value)}
            >
              <SelectTrigger id={`level-${block.id}`}>
                <SelectValue placeholder="Select heading level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="h1">Heading 1 (H1)</SelectItem>
                <SelectItem value="h2">Heading 2 (H2)</SelectItem>
                <SelectItem value="h3">Heading 3 (H3)</SelectItem>
                <SelectItem value="h4">Heading 4 (H4)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      );

    case 'paragraph':
      return (
        <div className="grid gap-2">
          <Label htmlFor={`text-${block.id}`}>Paragraph Text</Label>
          <Textarea
            id={`text-${block.id}`}
            name="text"
            value={block.content.text || ""}
            onChange={handleInputChange}
            placeholder="Paragraph text"
            rows={4}
          />
        </div>
      );

    case 'image':
      return <ImageBlockEditor block={block} updateBlockContent={updateBlockContent} />;

    case 'quote':
      return (
        <div className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor={`text-${block.id}`}>Quote Text</Label>
            <Textarea
              id={`text-${block.id}`}
              name="text"
              value={block.content.text || ""}
              onChange={handleInputChange}
              placeholder="Quote text"
              rows={4}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor={`author-${block.id}`}>Author (optional)</Label>
            <Input
              id={`author-${block.id}`}
              name="author"
              value={block.content.author || ""}
              onChange={handleInputChange}
              placeholder="Quote author"
            />
          </div>
        </div>
      );

    case 'columns':
      return (
        <div className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor={`column1-${block.id}`}>Column 1</Label>
            <Textarea
              id={`column1-${block.id}`}
              name="columns[0].text"
              value={block.content.columns?.[0]?.text || ""}
              onChange={(e) => {
                const columns = [...(block.content.columns || [{}, {}])];
                columns[0] = { ...columns[0], text: e.target.value };
                updateBlockContent(block.id, { columns });
              }}
              placeholder="Column 1 content"
              rows={4}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor={`column2-${block.id}`}>Column 2</Label>
            <Textarea
              id={`column2-${block.id}`}
              name="columns[1].text"
              value={block.content.columns?.[1]?.text || ""}
              onChange={(e) => {
                const columns = [...(block.content.columns || [{}, {}])];
                columns[1] = { ...columns[1], text: e.target.value };
                updateBlockContent(block.id, { columns });
              }}
              placeholder="Column 2 content"
              rows={4}
            />
          </div>
        </div>
      );

    case 'html':
      return (
        <div className="grid gap-2">
          <Label htmlFor={`code-${block.id}`}>HTML Code</Label>
          <Textarea
            id={`code-${block.id}`}
            name="code"
            value={block.content.code || ""}
            onChange={handleInputChange}
            placeholder="<!-- Enter HTML code here -->"
            rows={8}
            className="font-mono text-sm"
          />
        </div>
      );

    default:
      return <div>Unknown block type</div>;
  }
};
