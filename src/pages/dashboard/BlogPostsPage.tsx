
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { Link, useNavigate } from "react-router-dom";
import { 
  Plus, 
  Search, 
  MoreVertical, 
  Edit, 
  Copy, 
  Trash, 
  ExternalLink, 
  EyeOff,
  Eye,
  Calendar,
  Filter
} from "lucide-react";

const BlogPostsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  // Dummy blog posts data
  const [posts, setPosts] = useState([
    {
      id: "1",
      title: "10 Digital Marketing Trends for 2024",
      slug: "digital-marketing-trends-2024",
      excerpt: "Stay ahead of the curve with these essential digital marketing trends for 2024.",
      categories: ["Marketing", "Digital"],
      tags: ["trends", "digital", "marketing"],
      isPublished: true,
      publishedAt: "2024-03-15",
      author: "John Doe"
    },
    {
      id: "2",
      title: "How to Improve Your SEO in 5 Steps",
      slug: "improve-seo-5-steps",
      excerpt: "Practical guide to boosting your website's SEO ranking quickly and effectively.",
      categories: ["SEO", "Marketing"],
      tags: ["seo", "ranking", "google"],
      isPublished: true,
      publishedAt: "2024-03-10",
      author: "Jane Smith"
    },
    {
      id: "3",
      title: "The Future of Social Media Marketing",
      slug: "future-social-media-marketing",
      excerpt: "Discover what's next for social media marketing and how to prepare your strategy.",
      categories: ["Social Media", "Marketing"],
      tags: ["social", "future", "trends"],
      isPublished: false,
      publishedAt: null,
      author: "Mark Johnson"
    },
    {
      id: "4",
      title: "Content Marketing Strategies That Actually Work",
      slug: "content-marketing-strategies",
      excerpt: "Learn which content marketing strategies deliver real results for your business.",
      categories: ["Content", "Marketing"],
      tags: ["content", "strategy", "roi"],
      isPublished: true,
      publishedAt: "2024-02-28",
      author: "Sarah Williams"
    },
    {
      id: "5",
      title: "Email Marketing in 2024: What's Changed",
      slug: "email-marketing-2024",
      excerpt: "Explore the latest developments in email marketing and how to adapt your campaigns.",
      categories: ["Email", "Marketing"],
      tags: ["email", "campaigns", "automation"],
      isPublished: true,
      publishedAt: "2024-02-20",
      author: "David Brown"
    }
  ]);

  // Filter posts based on search term
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.categories.some(cat => cat.toLowerCase().includes(searchTerm.toLowerCase())) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Delete post
  const deletePost = (id: string) => {
    setPosts(posts.filter(post => post.id !== id));
    toast({
      title: "Blog post deleted",
      description: "The blog post has been deleted successfully.",
    });
  };

  // Toggle publish status
  const togglePublish = (id: string) => {
    setPosts(posts.map(post => {
      if (post.id === id) {
        const isPublished = !post.isPublished;
        return {
          ...post,
          isPublished,
          publishedAt: isPublished ? new Date().toISOString().split('T')[0] : null
        };
      }
      return post;
    }));

    const post = posts.find(p => p.id === id);
    toast({
      title: post?.isPublished ? "Blog post unpublished" : "Blog post published",
      description: `The blog post has been ${post?.isPublished ? "unpublished" : "published"} successfully.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Blog Posts</h2>
          <p className="text-muted-foreground">
            Manage your blog posts and content.
          </p>
        </div>
        <Button onClick={() => navigate("/dashboard/blog/new")}>
          <Plus className="mr-2 h-4 w-4" />
          New Blog Post
        </Button>
      </div>

      <Card>
        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle>Blog Posts</CardTitle>
            <CardDescription>
              You have {posts.length} blog posts in total.
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search posts..."
                className="pl-8 w-full md:w-[250px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter By</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setSearchTerm("")}>
                  All Posts
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSearchTerm("published")}>
                  Published
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSearchTerm("draft")}>
                  Drafts
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setSearchTerm("marketing")}>
                  Marketing
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSearchTerm("seo")}>
                  SEO
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSearchTerm("content")}>
                  Content
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md">
            <div className="grid grid-cols-1 md:grid-cols-12 p-4 border-b font-medium text-sm">
              <div className="md:col-span-5">Title</div>
              <div className="md:col-span-2 hidden md:block">Categories</div>
              <div className="md:col-span-2 hidden md:block">Date</div>
              <div className="md:col-span-1 hidden md:block">Status</div>
              <div className="md:col-span-2 text-right">Actions</div>
            </div>
            <div className="divide-y">
              {filteredPosts.map((post) => (
                <div key={post.id} className="grid grid-cols-1 md:grid-cols-12 p-4 items-start md:items-center">
                  <div className="md:col-span-5 space-y-1">
                    <div className="font-medium">{post.title}</div>
                    <div className="text-sm text-muted-foreground truncate hidden md:block">{post.excerpt}</div>
                    <div className="md:hidden text-xs flex flex-wrap gap-1 mt-1">
                      {post.categories.map((category) => (
                        <Badge key={category} variant="outline" className="text-xs">{category}</Badge>
                      ))}
                    </div>
                    <div className="md:hidden text-xs text-muted-foreground flex items-center gap-1 mt-1">
                      <Calendar className="h-3 w-3" /> 
                      {post.publishedAt || "Draft"}
                    </div>
                  </div>
                  <div className="md:col-span-2 hidden md:flex flex-wrap gap-1">
                    {post.categories.map((category) => (
                      <Badge key={category} variant="outline">{category}</Badge>
                    ))}
                  </div>
                  <div className="md:col-span-2 text-sm text-muted-foreground hidden md:flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> 
                    {post.publishedAt || "Draft"}
                  </div>
                  <div className="md:col-span-1 hidden md:block">
                    {post.isPublished ? (
                      <Badge className="bg-green-100 text-green-800">Published</Badge>
                    ) : (
                      <Badge variant="outline">Draft</Badge>
                    )}
                  </div>
                  <div className="md:col-span-2 flex justify-end items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => togglePublish(post.id)}
                      title={post.isPublished ? "Unpublish" : "Publish"}
                    >
                      {post.isPublished ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => navigate(`/dashboard/blog/edit/${post.id}`)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => navigate(`/dashboard/blog/edit/${post.id}`)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate(`/${post.slug}`)}>
                          <ExternalLink className="mr-2 h-4 w-4" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => {
                          navigator.clipboard.writeText(`${window.location.origin}/${post.slug}`);
                          toast({ 
                            title: "URL copied",
                            description: "Post URL has been copied to clipboard."
                          });
                        }}>
                          <Copy className="mr-2 h-4 w-4" />
                          Copy URL
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="text-red-600 focus:text-red-600"
                          onClick={() => deletePost(post.id)}
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
              
              {filteredPosts.length === 0 && (
                <div className="p-8 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                    <Search className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">No blog posts found</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {searchTerm ? "Try a different search term" : "Create a new blog post to get started."}
                  </p>
                  <Button className="mt-4" onClick={() => navigate("/dashboard/blog/new")}>
                    <Plus className="mr-2 h-4 w-4" />
                    Create New Post
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogPostsPage;
