
export type BlockType = 'heading' | 'paragraph' | 'image' | 'quote' | 'columns' | 'html';

export interface ContentBlock {
  id: string;
  type: BlockType;
  content: any; // Will be different based on block type
}

export interface PageData {
  id?: string;
  title: string;
  slug: string;
  description: string;
  keywords: string;
  layout: string;
  is_published: boolean;
  content_blocks: ContentBlock[];
}
