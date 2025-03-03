
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { BlockType, PageData } from "@/types/page";

// Helper function to generate random IDs for blocks
export const generateId = () => {
  return Math.random().toString(36).substring(2, 9);
};

export const usePageEditor = () => {
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

  return {
    isEditing,
    loading,
    saving,
    page,
    showPreview,
    setShowPreview,
    handleInputChange,
    handleSubmit,
    addContentBlock,
    removeBlock,
    updateBlockContent,
    moveBlock,
    setPage,
    navigate
  };
};
