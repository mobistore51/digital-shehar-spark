
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ImagePlus, Calendar, Tag } from "lucide-react";

interface PublishingSidebarProps {
  featuredImage: string;
  isPublished: boolean;
  categories: string[];
  tags: string[];
  handleBasicInfoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSwitchChange: (checked: boolean) => void;
  setPostBasics: React.Dispatch<React.SetStateAction<{
    title: string;
    slug: string;
    excerpt: string;
    featuredImage: string;
    isPublished: boolean;
    categories: string[];
    tags: string[];
  }>>;
}

export const PublishingSidebar: React.FC<PublishingSidebarProps> = ({
  featuredImage,
  isPublished,
  categories,
  tags,
  handleSwitchChange,
  setPostBasics
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Publishing</CardTitle>
        <CardDescription>
          Configure blog post settings.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <Label htmlFor="published" className="cursor-pointer">Publish</Label>
          <Switch 
            id="published" 
            checked={isPublished} 
            onCheckedChange={handleSwitchChange} 
          />
        </div>

        <Separator />

        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <ImagePlus className="h-4 w-4" />
              Featured Image
            </Label>
            <div className="flex flex-col gap-2">
              <div className="border rounded aspect-video overflow-hidden bg-muted flex items-center justify-center">
                {featuredImage ? (
                  <img 
                    src={featuredImage} 
                    alt="Featured" 
                    className="w-full h-full object-cover" 
                  />
                ) : (
                  <ImagePlus className="h-8 w-8 text-muted-foreground opacity-50" />
                )}
              </div>
              <Button variant="outline">
                <ImagePlus className="h-4 w-4 mr-2" />
                Select Image
              </Button>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Tag className="h-4 w-4" />
              Categories
            </Label>
            <Input 
              placeholder="Marketing, Digital, SEO" 
              value={categories.join(", ")} 
              onChange={(e) => setPostBasics(prev => ({ 
                ...prev, 
                categories: e.target.value.split(",").map(cat => cat.trim()).filter(Boolean)
              }))} 
            />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Tag className="h-4 w-4" />
              Tags
            </Label>
            <Input 
              placeholder="seo, content-marketing, digital" 
              value={tags.join(", ")} 
              onChange={(e) => setPostBasics(prev => ({ 
                ...prev, 
                tags: e.target.value.split(",").map(tag => tag.trim()).filter(Boolean)
              }))} 
            />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Publication Date
            </Label>
            <Input 
              type="date" 
              value={new Date().toISOString().substring(0, 10)}
              onChange={() => {}}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
