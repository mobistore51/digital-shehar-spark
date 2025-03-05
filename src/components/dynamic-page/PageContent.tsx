
import React from "react";
import { ContentBlock } from "./ContentBlock";
import { PageData } from "@/types/page";

interface PageContentProps {
  page: PageData;
}

export const PageContent: React.FC<PageContentProps> = ({ page }) => {
  return (
    <>
      {/* Page Title */}
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">{page.title}</h1>
      
      {/* Content Blocks */}
      {page.content_blocks.map(block => (
        <div key={block.id}>
          <ContentBlock block={block} />
        </div>
      ))}
    </>
  );
};
