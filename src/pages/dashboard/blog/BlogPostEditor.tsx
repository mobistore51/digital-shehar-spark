
import React, { useState } from "react";
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
import { ArrowLeft, Save, ImagePlus, Calendar, Tag, Loader2 } from "lucide-react";
import { LoadingState } from "@/components/page-editor/LoadingState";

const BlogPostEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [post, setPost] = useState({
    title: "",
    slug: "",
    excerpt: "",
    featuredImage: "",
    content: "",
    isPublished: false,
    categories: [] as string[],
    tags: [] as string[]
  });

  React.useEffect(() => {
    if (id) {
      setLoading(true);
      // Simulate loading post data
      setTimeout(() => {
        setPost({
          title: "Sample Blog Post",
          slug: "sample-blog-post",
          excerpt: "This is a sample blog post for demonstration purposes.",
          featuredImage: "/placeholder.svg",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          isPublished: true,
          categories: ["Marketing", "Digital"],
          tags: ["seo", "content"]
        });
        setLoading(false);
      }, 1000);
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPost(prev => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setPost(prev => ({ ...prev, isPublished: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
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
                  value={post.title} 
                  onChange={handleChange} 
                  placeholder="Enter blog post title" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">Slug</Label>
                <Input 
                  id="slug" 
                  name="slug" 
                  value={post.slug} 
                  onChange={handleChange} 
                  placeholder="enter-slug-here" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea 
                  id="excerpt" 
                  name="excerpt" 
                  value={post.excerpt} 
                  onChange={handleChange} 
                  placeholder="Brief summary of your post" 
                  rows={3} 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea 
                  id="content" 
                  name="content" 
                  value={post.content} 
                  onChange={handleChange} 
                  placeholder="Write your blog post content here" 
                  rows={10} 
                />
              </div>
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
                  checked={post.isPublished} 
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
                      {post.featuredImage ? (
                        <img 
                          src={post.featuredImage} 
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
                    value={post.categories.join(", ")} 
                    onChange={(e) => setPost(prev => ({ 
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
                    value={post.tags.join(", ")} 
                    onChange={(e) => setPost(prev => ({ 
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
