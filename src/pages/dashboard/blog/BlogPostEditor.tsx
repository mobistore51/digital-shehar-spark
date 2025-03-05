
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Save, ImagePlus, Calendar, Tag, Loader2, Eye, EyeOff } from "lucide-react";
import { LoadingState } from "@/components/page-editor/LoadingState";
import { ContentBlocks } from "@/components/blog-editor/ContentBlocks";
import { useBlogEditor } from "@/hooks/use-blog-editor";
import { ContentBlock } from "@/types/page";

const BlogPostEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [postBasics, setPostBasics] = useState({
    title: "",
    slug: "",
    excerpt: "",
    featuredImage: "",
    isPublished: false,
    categories: [] as string[],
    tags: [] as string[]
  });
  
  // Use our custom hook for the content blocks
  const {
    blocks,
    showPreview,
    togglePreview,
    addContentBlock,
    updateBlockContent,
    moveBlock,
    removeBlock,
    setBlocks
  } = useBlogEditor([]);

  useEffect(() => {
    if (id) {
      setLoading(true);
      // Simulate loading post data
      setTimeout(() => {
        setPostBasics({
          title: "Sample Blog Post",
          slug: "sample-blog-post",
          excerpt: "This is a sample blog post for demonstration purposes.",
          featuredImage: "/placeholder.svg",
          isPublished: true,
          categories: ["Marketing", "Digital"],
          tags: ["seo", "content"]
        });
        
        // Add sample content blocks
        const sampleBlocks: ContentBlock[] = [
          {
            id: "1",
            type: "heading",
            content: { text: "Sample Blog Post", level: "h1" }
          },
          {
            id: "2",
            type: "paragraph",
            content: { text: "This is a sample paragraph for the blog post. It demonstrates how content blocks work in the editor." }
          }
        ];
        setBlocks(sampleBlocks);
        
        setLoading(false);
      }, 1000);
    }
  }, [id, setBlocks]);

  const handleBasicInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPostBasics(prev => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setPostBasics(prev => ({ ...prev, isPublished: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    // Construct the complete post object with both basic info and content blocks
    const completePost = {
      ...postBasics,
      content: blocks
    };
    
    console.log("Saving post:", completePost);
    
    // Simulate saving
    setTimeout(() => {
      setSaving(false);
      toast({
        title: "Success",
        description: id ? "Blog post updated successfully" : "Blog post created successfully",
      });
      navigate("/dashboard/blog");
    }, 1500);
  };

  if (loading) {
    return <LoadingState />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => navigate("/dashboard/blog")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-3xl font-bold tracking-tight">
            {id ? "Edit Blog Post" : "Create New Blog Post"}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={togglePreview}>
            {showPreview ? (
              <>
                <EyeOff className="mr-2 h-4 w-4" />
                Edit Mode
              </>
            ) : (
              <>
                <Eye className="mr-2 h-4 w-4" />
                Preview
              </>
            )}
          </Button>
          <Button variant="outline" onClick={() => navigate("/dashboard/blog")}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={saving}>
            {saving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Post Content</CardTitle>
              <CardDescription>
                Write your blog post content here.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input 
                  id="title" 
                  name="title" 
                  value={postBasics.title} 
                  onChange={handleBasicInfoChange} 
                  placeholder="Enter blog post title" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">Slug</Label>
                <Input 
                  id="slug" 
                  name="slug" 
                  value={postBasics.slug} 
                  onChange={handleBasicInfoChange} 
                  placeholder="enter-slug-here" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea 
                  id="excerpt" 
                  name="excerpt" 
                  value={postBasics.excerpt} 
                  onChange={handleBasicInfoChange} 
                  placeholder="Brief summary of your post" 
                  rows={3} 
                />
              </div>
              
              {/* Content Blocks Editor */}
              <ContentBlocks 
                blocks={blocks}
                showPreview={showPreview}
                addContentBlock={addContentBlock}
                updateBlockContent={updateBlockContent}
                moveBlock={moveBlock}
                removeBlock={removeBlock}
              />
            </CardContent>
          </Card>
        </div>

        <div>
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
                  checked={postBasics.isPublished} 
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
                      {postBasics.featuredImage ? (
                        <img 
                          src={postBasics.featuredImage} 
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
                    value={postBasics.categories.join(", ")} 
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
                    value={postBasics.tags.join(", ")} 
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
        </div>
      </div>
    </div>
  );
};

export default BlogPostEditor;
