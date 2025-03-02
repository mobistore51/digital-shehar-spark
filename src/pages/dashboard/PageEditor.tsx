
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  ArrowLeft, 
  Loader2, 
  Save, 
  Plus, 
  Trash, 
  MoveUp,
  MoveDown,
  Image as ImageIcon,
  Type,
  Quote,
  AlignLeft,
  Columns,
  Code
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

// Define types for page content blocks
type BlockType = 'heading' | 'paragraph' | 'image' | 'quote' | 'columns' | 'html';

interface ContentBlock {
  id: string;
  type: BlockType;
  content: any; // Will be different based on block type
}

interface PageData {
  id?: string;
  title: string;
  slug: string;
  description: string;
  keywords: string;
  layout: string;
  is_published: boolean;
  content_blocks: ContentBlock[];
}

const generateId = () => {
  return Math.random().toString(36).substring(2, 9);
};

const PageEditor = () => {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  
  // Page data
  const [page, setPage] = useState<PageData>({
    title: '',
    slug: '',
    description: '',
    keywords: '',
    layout: 'default',
    is_published: false,
    content_blocks: []
  });

  // Fetch page data if editing
  useEffect(() => {
    const fetchPage = async () => {
      if (isEditing) {
        setLoading(true);
        try {
          const { data, error } = await supabase
            .from('pages')
            .select('*')
            .eq('id', id)
            .single();

          if (error) throw error;
          
          if (data) {
            setPage({
              id: data.id,
              title: data.title || '',
              slug: data.slug || '',
              description: data.description || '',
              keywords: data.keywords || '',
              layout: data.layout || 'default',
              is_published: data.is_published || false,
              content_blocks: data.content_blocks || []
            });
          }
        } catch (error: any) {
          console.error('Error fetching page:', error);
          toast({
            title: "Error loading page",
            description: error.message,
            variant: "destructive",
          });
        } finally {
          setLoading(false);
        }
      }
    };

    fetchPage();
  }, [id, isEditing]);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPage(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      // Generate slug from title if not provided
      let pageSlug = page.slug;
      if (!pageSlug && page.title) {
        pageSlug = page.title
          .toLowerCase()
          .replace(/[^\w\s]/gi, '')
          .replace(/\s+/g, '-');
        setPage(prev => ({ ...prev, slug: pageSlug }));
      }

      if (isEditing) {
        // Update existing page
        const { error } = await supabase
          .from('pages')
          .update({
            title: page.title,
            slug: pageSlug,
            description: page.description,
            keywords: page.keywords,
            layout: page.layout,
            is_published: page.is_published,
            content_blocks: page.content_blocks,
            updated_at: new Date()
          })
          .eq('id', id);

        if (error) throw error;

        toast({
          title: "Page updated",
          description: "Your page has been updated successfully.",
        });
      } else {
        // Create new page
        const { error } = await supabase
          .from('pages')
          .insert({
            title: page.title,
            slug: pageSlug,
            description: page.description,
            keywords: page.keywords,
            layout: page.layout,
            is_published: page.is_published,
            content_blocks: page.content_blocks,
            created_at: new Date(),
            updated_at: new Date()
          });

        if (error) throw error;

        toast({
          title: "Page created",
          description: "Your new page has been created successfully.",
        });

        // Redirect to pages list
        navigate('/dashboard/pages');
      }
    } catch (error: any) {
      console.error('Error saving page:', error);
      toast({
        title: "Error saving page",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  // Add a new content block
  const addContentBlock = (type: BlockType) => {
    let newBlock: ContentBlock = {
      id: generateId(),
      type,
      content: {}
    };

    // Initialize content based on block type
    switch (type) {
      case 'heading':
        newBlock.content = { text: 'New Heading', level: 'h2' };
        break;
      case 'paragraph':
        newBlock.content = { text: 'New paragraph text. Edit this content.' };
        break;
      case 'image':
        newBlock.content = { url: '', alt: '', caption: '' };
        break;
      case 'quote':
        newBlock.content = { text: 'New quote text', author: '' };
        break;
      case 'columns':
        newBlock.content = { 
          columns: [
            { text: 'Column 1 content' },
            { text: 'Column 2 content' }
          ]
        };
        break;
      case 'html':
        newBlock.content = { code: '<!-- HTML code here -->' };
        break;
    }

    setPage(prev => ({
      ...prev,
      content_blocks: [...prev.content_blocks, newBlock]
    }));
  };

  // Remove a content block
  const removeBlock = (blockId: string) => {
    setPage(prev => ({
      ...prev,
      content_blocks: prev.content_blocks.filter(block => block.id !== blockId)
    }));
  };

  // Update a content block
  const updateBlockContent = (blockId: string, newContent: any) => {
    setPage(prev => ({
      ...prev,
      content_blocks: prev.content_blocks.map(block => 
        block.id === blockId ? { ...block, content: { ...block.content, ...newContent } } : block
      )
    }));
  };

  // Move block up or down
  const moveBlock = (blockId: string, direction: 'up' | 'down') => {
    const blocks = [...page.content_blocks];
    const index = blocks.findIndex(block => block.id === blockId);
    
    if (direction === 'up' && index > 0) {
      [blocks[index], blocks[index - 1]] = [blocks[index - 1], blocks[index]];
    } else if (direction === 'down' && index < blocks.length - 1) {
      [blocks[index], blocks[index + 1]] = [blocks[index + 1], blocks[index]];
    }
    
    setPage(prev => ({ ...prev, content_blocks: blocks }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  // Render the appropriate editor for each block type
  const renderBlockEditor = (block: ContentBlock) => {
    switch (block.type) {
      case 'heading':
        return (
          <div className="space-y-2">
            <div className="flex space-x-2">
              <Input
                value={block.content.text || ''}
                onChange={(e) => updateBlockContent(block.id, { text: e.target.value })}
                placeholder="Heading text"
                className="flex-1"
              />
              <Select
                value={block.content.level || 'h2'}
                onValueChange={(value) => updateBlockContent(block.id, { level: value })}
              >
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="h1">H1</SelectItem>
                  <SelectItem value="h2">H2</SelectItem>
                  <SelectItem value="h3">H3</SelectItem>
                  <SelectItem value="h4">H4</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );
      
      case 'paragraph':
        return (
          <Textarea
            value={block.content.text || ''}
            onChange={(e) => updateBlockContent(block.id, { text: e.target.value })}
            placeholder="Paragraph text"
            rows={4}
          />
        );
      
      case 'image':
        return (
          <div className="space-y-2">
            <div className="flex space-x-2">
              <Input
                value={block.content.url || ''}
                onChange={(e) => updateBlockContent(block.id, { url: e.target.value })}
                placeholder="Image URL"
              />
            </div>
            <Input
              value={block.content.alt || ''}
              onChange={(e) => updateBlockContent(block.id, { alt: e.target.value })}
              placeholder="Alt text"
            />
            <Input
              value={block.content.caption || ''}
              onChange={(e) => updateBlockContent(block.id, { caption: e.target.value })}
              placeholder="Caption (optional)"
            />
          </div>
        );
      
      case 'quote':
        return (
          <div className="space-y-2">
            <Textarea
              value={block.content.text || ''}
              onChange={(e) => updateBlockContent(block.id, { text: e.target.value })}
              placeholder="Quote text"
              rows={3}
            />
            <Input
              value={block.content.author || ''}
              onChange={(e) => updateBlockContent(block.id, { author: e.target.value })}
              placeholder="Author (optional)"
            />
          </div>
        );
      
      case 'columns':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Column 1</Label>
                <Textarea
                  value={block.content.columns?.[0]?.text || ''}
                  onChange={(e) => {
                    const columns = [...(block.content.columns || [])];
                    columns[0] = { ...columns[0], text: e.target.value };
                    updateBlockContent(block.id, { columns });
                  }}
                  placeholder="Column 1 content"
                  rows={3}
                />
              </div>
              <div>
                <Label>Column 2</Label>
                <Textarea
                  value={block.content.columns?.[1]?.text || ''}
                  onChange={(e) => {
                    const columns = [...(block.content.columns || [])];
                    columns[1] = { ...columns[1], text: e.target.value };
                    updateBlockContent(block.id, { columns });
                  }}
                  placeholder="Column 2 content"
                  rows={3}
                />
              </div>
            </div>
          </div>
        );
      
      case 'html':
        return (
          <Textarea
            value={block.content.code || ''}
            onChange={(e) => updateBlockContent(block.id, { code: e.target.value })}
            placeholder="Custom HTML"
            rows={6}
            className="font-mono text-sm"
          />
        );
      
      default:
        return <div>Unknown block type</div>;
    }
  };

  // Render a preview of the content block
  const renderBlockPreview = (block: ContentBlock) => {
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => navigate('/dashboard/pages')}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-3xl font-bold tracking-tight">
            {isEditing ? 'Edit Page' : 'Create New Page'}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            onClick={() => setShowPreview(!showPreview)}
          >
            {showPreview ? 'Edit Mode' : 'Preview'}
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={saving || !page.title}
            className="flex items-center gap-2"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            {saving ? 'Saving...' : 'Save Page'}
          </Button>
        </div>
      </div>

      {/* Page Details */}
      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
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
          </form>
        </CardContent>
      </Card>

      {/* Page Content Builder */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Page Content</h3>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                <span>Add Content Block</span>
              </Button>
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

        {page.content_blocks.length === 0 ? (
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
        ) : (
          <div className="space-y-4">
            {page.content_blocks.map((block, index) => (
              <Card key={block.id} className="relative">
                <div className="absolute right-3 top-3 flex space-x-1 z-10">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => moveBlock(block.id, 'up')}
                    disabled={index === 0}
                    className="h-8 w-8"
                  >
                    <MoveUp className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => moveBlock(block.id, 'down')}
                    disabled={index === page.content_blocks.length - 1}
                    className="h-8 w-8"
                  >
                    <MoveDown className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeBlock(block.id)}
                    className="h-8 w-8 hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
                <CardContent className="pt-6 pb-4">
                  {showPreview ? (
                    <div className="pt-6">
                      {renderBlockPreview(block)}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        {block.type === 'heading' && <Type className="h-5 w-5 text-gray-400" />}
                        {block.type === 'paragraph' && <AlignLeft className="h-5 w-5 text-gray-400" />}
                        {block.type === 'image' && <ImageIcon className="h-5 w-5 text-gray-400" />}
                        {block.type === 'quote' && <Quote className="h-5 w-5 text-gray-400" />}
                        {block.type === 'columns' && <Columns className="h-5 w-5 text-gray-400" />}
                        {block.type === 'html' && <Code className="h-5 w-5 text-gray-400" />}
                        <span className="text-sm font-medium capitalize">{block.type}</span>
                      </div>
                      {renderBlockEditor(block)}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PageEditor;
