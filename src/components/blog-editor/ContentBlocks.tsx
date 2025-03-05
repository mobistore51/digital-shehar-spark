
import React from "react";
import { ContentBlock, BlockType } from "@/types/page";
import { AddBlockDialog } from "@/components/page-editor/AddBlockDialog";
import { EmptyContent } from "@/components/page-editor/EmptyContent";
import { ContentBlockComponent } from "@/components/page-editor/ContentBlock";

interface ContentBlocksProps {
  blocks: ContentBlock[];
  showPreview: boolean;
  addContentBlock: (type: BlockType) => void;
  updateBlockContent: (blockId: string, newContent: any) => void;
  moveBlock: (blockId: string, direction: 'up' | 'down') => void;
  removeBlock: (blockId: string) => void;
}

export const ContentBlocks: React.FC<ContentBlocksProps> = ({
  blocks,
  showPreview,
  addContentBlock,
  updateBlockContent,
  moveBlock,
  removeBlock
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Post Content</h3>
        <AddBlockDialog addContentBlock={addContentBlock} />
      </div>

      {blocks.length === 0 ? (
        <EmptyContent addContentBlock={addContentBlock} />
      ) : (
        <div className="space-y-4">
          {blocks.map((block, index) => (
            <ContentBlockComponent
              key={block.id}
              block={block}
              index={index}
              totalBlocks={blocks.length}
              showPreview={showPreview}
              updateBlockContent={updateBlockContent}
              moveBlock={moveBlock}
              removeBlock={removeBlock}
            />
          ))}
        </div>
      )}
    </div>
  );
};
