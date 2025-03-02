
import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { PageData } from "@/types/page";

interface PageFormProps {
  page: PageData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  setPage: React.Dispatch<React.SetStateAction<PageData>>;
}

export const PageForm: React.FC<PageFormProps> = ({ 
  page, 
  handleInputChange, 
  setPage 
}) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Page Title</Label>
              <Input
                id="title"
                name="title"
                value={page.title}
                onChange={handleInputChange}
                placeholder="Page Title"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                name="slug"
                value={page.slug}
                onChange={handleInputChange}
                placeholder="page-slug (leave blank to auto-generate)"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Meta Description</Label>
            <Textarea
              id="description"
              name="description"
              value={page.description}
              onChange={handleInputChange}
              placeholder="Page meta description for SEO"
              rows={2}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="keywords">Meta Keywords</Label>
              <Input
                id="keywords"
                name="keywords"
                value={page.keywords}
                onChange={handleInputChange}
                placeholder="Comma-separated keywords"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="layout">Page Layout</Label>
              <Select
                value={page.layout}
                onValueChange={(value) => setPage(prev => ({ ...prev, layout: value }))}
              >
                <SelectTrigger id="layout">
                  <SelectValue placeholder="Select a layout" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="landing">Landing Page</SelectItem>
                  <SelectItem value="sidebar">With Sidebar</SelectItem>
                  <SelectItem value="fullwidth">Full Width</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Switch
              id="published"
              checked={page.is_published}
              onCheckedChange={(checked) => setPage(prev => ({ ...prev, is_published: checked }))}
            />
            <Label htmlFor="published">
              {page.is_published ? 'Published' : 'Draft'}
            </Label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
