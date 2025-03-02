
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { PageForm } from "@/components/page-editor/PageForm";
import { AddBlockDialog } from "@/components/page-editor/AddBlockDialog";
import { EmptyContent } from "@/components/page-editor/EmptyContent";
import { ContentBlockComponent } from "@/components/page-editor/ContentBlock";
import { BlockType, PageData } from "@/types/page";

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
  }, [id, isEditing, toast]);

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
    let newBlock = {
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
      <PageForm 
        page={page} 
        handleInputChange={handleInputChange} 
        setPage={setPage} 
      />

      {/* Page Content Builder */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Page Content</h3>
          <AddBlockDialog addContentBlock={addContentBlock} />
        </div>

        {page.content_blocks.length === 0 ? (
          <EmptyContent addContentBlock={addContentBlock} />
        ) : (
          <div className="space-y-4">
            {page.content_blocks.map((block, index) => (
              <ContentBlockComponent
                key={block.id}
                block={block}
                index={index}
                totalBlocks={page.content_blocks.length}
                showPreview={showPreview}
                updateBlockContent={updateBlockContent}
                moveBlock={moveBlock}
                removeBlock={removeBlock}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PageEditor;
