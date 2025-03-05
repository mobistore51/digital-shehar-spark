
import React from "react";
import { ContentBlock as ContentBlockType } from "@/types/page";

interface ContentBlockProps {
  block: ContentBlockType;
}

export const ContentBlock: React.FC<ContentBlockProps> = ({ block }) => {
  switch (block.type) {
    case 'heading':
      const HeadingTag = block.content.level || 'h2';
      const headingClasses = {
        h1: 'text-4xl font-bold mt-8 mb-4',
        h2: 'text-3xl font-bold mt-6 mb-3',
        h3: 'text-2xl font-bold mt-5 mb-2',
        h4: 'text-xl font-bold mt-4 mb-2',
      }[block.content.level] || 'text-3xl font-bold mt-6 mb-3';
      
      return <HeadingTag className={headingClasses}>{block.content.text}</HeadingTag>;
    
    case 'paragraph':
      return <p className="my-4 text-gray-700 leading-relaxed">{block.content.text}</p>;
    
    case 'image':
      return (
        <figure className="my-6">
          {block.content.url && (
            <img 
              src={block.content.url} 
              alt={block.content.alt} 
              className="w-full rounded-lg shadow-md"
            />
          )}
          {block.content.caption && (
            <figcaption className="text-center text-gray-500 mt-2 text-sm">
              {block.content.caption}
            </figcaption>
          )}
        </figure>
      );
    
    case 'quote':
      return (
        <blockquote className="border-l-4 border-marketing-300 pl-6 py-2 my-6 italic bg-gray-50 rounded-r">
          <p className="text-gray-700">{block.content.text}</p>
          {block.content.author && (
            <footer className="text-right text-gray-500 mt-2 text-sm">
              — {block.content.author}
            </footer>
          )}
        </blockquote>
      );
    
    case 'columns':
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          <div className="text-gray-700 leading-relaxed">{block.content.columns?.[0]?.text}</div>
          <div className="text-gray-700 leading-relaxed">{block.content.columns?.[1]?.text}</div>
        </div>
      );
    
    case 'html':
      return (
        <div 
          className="my-6" 
          dangerouslySetInnerHTML={{ __html: block.content.code || '' }}
        />
      );
    
    default:
      return null;
  }
};
