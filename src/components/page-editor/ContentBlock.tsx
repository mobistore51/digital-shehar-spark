
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoveUp, MoveDown, Trash, Type, AlignLeft, ImageIcon, Quote, Columns, Code } from "lucide-react";
import { BlockEditor } from "./BlockEditor";
import { BlockPreview } from "./BlockPreview";
import { ContentBlock as ContentBlockType } from "@/types/page";

interface ContentBlockProps {
  block: ContentBlockType;
  index: number;
  totalBlocks: number;
  showPreview: boolean;
  updateBlockContent: (blockId: string, newContent: any) => void;
  moveBlock: (blockId: string, direction: 'up' | 'down') => void;
  removeBlock: (blockId: string) => void;
}

export const ContentBlockComponent: React.FC<ContentBlockProps> = ({
  block,
  index,
  totalBlocks,
  showPreview,
  updateBlockContent,
  moveBlock,
  removeBlock,
}) => {
  const getBlockIcon = () => {
    switch (block.type) {
      case 'heading': return <Type className="h-5 w-5 text-gray-400" />;
      case 'paragraph': return <AlignLeft className="h-5 w-5 text-gray-400" />;
      case 'image': return <ImageIcon className="h-5 w-5 text-gray-400" />;
      case 'quote': return <Quote className="h-5 w-5 text-gray-400" />;
      case 'columns': return <Columns className="h-5 w-5 text-gray-400" />;
      case 'html': return <Code className="h-5 w-5 text-gray-400" />;
      default: return null;
    }
  };

  return (
    <Card className="relative">
      <div className="absolute right-3 top-3 flex space-x-1 z-10">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => moveBlock(block.id, 'up')}
          disabled={index === 0}
          className="h-8 w-8"
        >
          <MoveUp className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => moveBlock(block.id, 'down')}
          disabled={index === totalBlocks - 1}
          className="h-8 w-8"
        >
          <MoveDown className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => removeBlock(block.id)}
          className="h-8 w-8 hover:bg-red-50 hover:text-red-600"
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
      <CardContent className="pt-6 pb-4">
        {showPreview ? (
          <div className="pt-6">
            <BlockPreview block={block} />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              {getBlockIcon()}
              <span className="text-sm font-medium capitalize">{block.type}</span>
            </div>
            <BlockEditor block={block} updateBlockContent={updateBlockContent} />
          </div>
        )}
      </CardContent>
    </Card>
  );
};
