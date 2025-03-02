
import React from "react";
import { ImageIcon } from "lucide-react";
import { ContentBlock } from "@/types/page";

interface BlockPreviewProps {
  block: ContentBlock;
}

export const BlockPreview: React.FC<BlockPreviewProps> = ({ block }) => {
  switch (block.type) {
    case 'heading':
      const HeadingTag = block.content.level || 'h2';
      return <HeadingTag className="font-bold my-2">{block.content.text}</HeadingTag>;
    
    case 'paragraph':
      return <p className="my-2">{block.content.text}</p>;
    
    case 'image':
      return (
        <figure className="my-4">
          {block.content.url ? (
            <img 
              src={block.content.url} 
              alt={block.content.alt} 
              className="max-w-full rounded-md"
            />
          ) : (
            <div className="bg-gray-200 h-40 flex items-center justify-center rounded-md">
              <ImageIcon className="h-8 w-8 text-gray-400" />
            </div>
          )}
          {block.content.caption && (
            <figcaption className="text-center text-sm text-gray-500 mt-2">
              {block.content.caption}
            </figcaption>
          )}
        </figure>
      );
    
    case 'quote':
      return (
        <blockquote className="border-l-4 border-gray-300 pl-4 my-4 italic">
          <p>{block.content.text}</p>
          {block.content.author && (
            <footer className="text-right text-sm text-gray-500 mt-2">
              — {block.content.author}
            </footer>
          )}
        </blockquote>
      );
    
    case 'columns':
      return (
        <div className="grid grid-cols-2 gap-4 my-4">
          <div>{block.content.columns?.[0]?.text}</div>
          <div>{block.content.columns?.[1]?.text}</div>
        </div>
      );
    
    case 'html':
      return (
        <div className="my-4 p-3 bg-gray-100 rounded-md">
          <div className="text-xs text-gray-500 mb-2">Custom HTML</div>
          <pre className="text-xs overflow-x-auto">{block.content.code}</pre>
        </div>
      );
    
    default:
      return <div>Unknown block type</div>;
  }
};
