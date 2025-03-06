
import React from "react";
import { Button } from "@/components/ui/button";
import { 
  Plus, 
  Type, 
  AlignLeft, 
  ImageIcon, 
  Quote, 
  Columns, 
  Code,
  ListOrdered,
  ListChecks,
  Table2,
  Youtube,
  FileVideo,
  Map,
  Paperclip,
  ScrollText
} from "lucide-react";
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

interface AddBlockDialogProps {
  addContentBlock: (type: BlockType) => void;
}

export const AddBlockDialog: React.FC<AddBlockDialogProps> = ({ addContentBlock }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          <span>Add Content Block</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Add Content Block</DialogTitle>
          <DialogDescription>
            Choose a content block type to add to your page.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4">
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
          <Button variant="outline" className="flex flex-col h-24 gap-2" onClick={() => {
            addContentBlock('ordered-list');
            document.querySelector<HTMLButtonElement>('[data-state="open"] button.close')?.click();
          }}>
            <ListOrdered className="h-8 w-8" />
            <span>Ordered List</span>
          </Button>
          <Button variant="outline" className="flex flex-col h-24 gap-2" onClick={() => {
            addContentBlock('checklist');
            document.querySelector<HTMLButtonElement>('[data-state="open"] button.close')?.click();
          }}>
            <ListChecks className="h-8 w-8" />
            <span>Checklist</span>
          </Button>
          <Button variant="outline" className="flex flex-col h-24 gap-2" onClick={() => {
            addContentBlock('table');
            document.querySelector<HTMLButtonElement>('[data-state="open"] button.close')?.click();
          }}>
            <Table2 className="h-8 w-8" />
            <span>Table</span>
          </Button>
          <Button variant="outline" className="flex flex-col h-24 gap-2" onClick={() => {
            addContentBlock('youtube');
            document.querySelector<HTMLButtonElement>('[data-state="open"] button.close')?.click();
          }}>
            <Youtube className="h-8 w-8" />
            <span>YouTube</span>
          </Button>
          <Button variant="outline" className="flex flex-col h-24 gap-2" onClick={() => {
            addContentBlock('video');
            document.querySelector<HTMLButtonElement>('[data-state="open"] button.close')?.click();
          }}>
            <FileVideo className="h-8 w-8" />
            <span>Video</span>
          </Button>
          <Button variant="outline" className="flex flex-col h-24 gap-2" onClick={() => {
            addContentBlock('map');
            document.querySelector<HTMLButtonElement>('[data-state="open"] button.close')?.click();
          }}>
            <Map className="h-8 w-8" />
            <span>Map</span>
          </Button>
          <Button variant="outline" className="flex flex-col h-24 gap-2" onClick={() => {
            addContentBlock('file');
            document.querySelector<HTMLButtonElement>('[data-state="open"] button.close')?.click();
          }}>
            <Paperclip className="h-8 w-8" />
            <span>File</span>
          </Button>
          <Button variant="outline" className="flex flex-col h-24 gap-2" onClick={() => {
            addContentBlock('callout');
            document.querySelector<HTMLButtonElement>('[data-state="open"] button.close')?.click();
          }}>
            <ScrollText className="h-8 w-8" />
            <span>Callout</span>
          </Button>
        </div>
        <DialogFooter>
          <Button variant="outline" className="close">Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
