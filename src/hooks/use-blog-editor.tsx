
import { useState, useCallback } from 'react';
import { ContentBlock, BlockType } from '@/types/page';
import { v4 as uuidv4 } from 'uuid';

export const useBlogEditor = (initialBlocks: ContentBlock[] = []) => {
  const [blocks, setBlocks] = useState<ContentBlock[]>(initialBlocks);
  const [showPreview, setShowPreview] = useState(false);

  const togglePreview = useCallback(() => {
    setShowPreview(prev => !prev);
  }, []);

  const addContentBlock = useCallback((type: BlockType) => {
    const newBlock: ContentBlock = {
      id: uuidv4(),
      type,
      content: getDefaultContentForType(type)
    };

    setBlocks(prevBlocks => [...prevBlocks, newBlock]);
  }, []);

  const updateBlockContent = useCallback((blockId: string, newContent: any) => {
    setBlocks(prevBlocks =>
      prevBlocks.map(block =>
        block.id === blockId
          ? { ...block, content: { ...block.content, ...newContent } }
          : block
      )
    );
  }, []);

  const moveBlock = useCallback((blockId: string, direction: 'up' | 'down') => {
    setBlocks(prevBlocks => {
      const index = prevBlocks.findIndex(block => block.id === blockId);
      if (index === -1) return prevBlocks;

      const newIndex = direction === 'up' ? index - 1 : index + 1;
      if (newIndex < 0 || newIndex >= prevBlocks.length) return prevBlocks;

      const newBlocks = [...prevBlocks];
      const temp = newBlocks[index];
      newBlocks[index] = newBlocks[newIndex];
      newBlocks[newIndex] = temp;

      return newBlocks;
    });
  }, []);

  const removeBlock = useCallback((blockId: string) => {
    setBlocks(prevBlocks => prevBlocks.filter(block => block.id !== blockId));
  }, []);

  return {
    blocks,
    showPreview,
    togglePreview,
    addContentBlock,
    updateBlockContent,
    moveBlock,
    removeBlock,
    setBlocks
  };
};

// Helper function to create default content based on block type
function getDefaultContentForType(type: BlockType): any {
  switch (type) {
    case 'heading':
      return { text: 'New Heading', level: 'h2' };
    case 'paragraph':
      return { text: 'New paragraph text.' };
    case 'image':
      return { url: '', alt: '', caption: '' };
    case 'quote':
      return { text: 'New quote', author: '' };
    case 'columns':
      return { columns: [{ text: 'Column 1 content' }, { text: 'Column 2 content' }] };
    case 'html':
      return { code: '<!-- Custom HTML -->' };
    default:
      return {};
  }
}
