
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, Type, AlignLeft, ImageIcon, Quote, Columns, Code } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BlockType } from "@/types/page";

interface EmptyContentProps {
  addContentBlock: (type: BlockType) => void;
}

export const EmptyContent: React.FC<EmptyContentProps> = ({ addContentBlock }) => {
  return (
    <Card>
      <CardContent className="py-8 text-center">
        <div className="flex flex-col items-center gap-2">
          <div className="rounded-full bg-gray-100 p-3">
            <Plus className="h-6 w-6 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium">No content blocks yet</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            Get started by adding your first content block. You can add headings, paragraphs, images, and more.
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="mt-4">Add First Block</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Content Block</DialogTitle>
                <DialogDescription>
                  Choose a content block type to add to your page.
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-4">
                <Button variant="outline" className="flex flex-col h-24 gap-2" onClick={() => {
                  addContentBlock('heading');
                  document.querySelector<HTMLButtonElement>('[data-state="open"] button.close')?.click();
                }}>
                  <Type className="h-8 w-8" />
                  <span>Heading</span>
                </Button>
                <Button variant="outline" className="flex flex-col h-24 gap-2" onClick={() => {
                  addContentBlock('paragraph');
                  document.querySelector<HTMLButtonElement>('[data-state="open"] button.close')?.click();
                }}>
                  <AlignLeft className="h-8 w-8" />
                  <span>Paragraph</span>
                </Button>
                <Button variant="outline" className="flex flex-col h-24 gap-2" onClick={() => {
                  addContentBlock('image');
                  document.querySelector<HTMLButtonElement>('[data-state="open"] button.close')?.click();
                }}>
                  <ImageIcon className="h-8 w-8" />
                  <span>Image</span>
                </Button>
                <Button variant="outline" className="flex flex-col h-24 gap-2" onClick={() => {
                  addContentBlock('quote');
                  document.querySelector<HTMLButtonElement>('[data-state="open"] button.close')?.click();
                }}>
                  <Quote className="h-8 w-8" />
                  <span>Quote</span>
                </Button>
                <Button variant="outline" className="flex flex-col h-24 gap-2" onClick={() => {
                  addContentBlock('columns');
                  document.querySelector<HTMLButtonElement>('[data-state="open"] button.close')?.click();
                }}>
                  <Columns className="h-8 w-8" />
                  <span>Columns</span>
                </Button>
                <Button variant="outline" className="flex flex-col h-24 gap-2" onClick={() => {
                  addContentBlock('html');
                  document.querySelector<HTMLButtonElement>('[data-state="open"] button.close')?.click();
                }}>
                  <Code className="h-8 w-8" />
                  <span>Custom HTML</span>
                </Button>
              </div>
              <DialogFooter>
                <Button variant="outline" className="close">Cancel</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
};
