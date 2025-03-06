
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { LoadingState } from "@/components/page-editor/LoadingState";
import { useBlogEditor } from "@/hooks/use-blog-editor";
import { ContentBlock } from "@/types/page";
import { BlogEditorMain } from "@/components/blog-editor/BlogEditorMain";
import { BlogPostForm } from "@/components/blog-editor/BlogPostForm";
import { PublishingSidebar } from "@/components/blog-editor/PublishingSidebar";

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
    <>
      <BlogEditorMain 
        id={id}
        loading={loading}
        saving={saving}
        blocks={blocks}
        showPreview={showPreview}
        title={postBasics.title}
        slug={postBasics.slug}
        excerpt={postBasics.excerpt}
        togglePreview={togglePreview}
        handleBasicInfoChange={handleBasicInfoChange}
        handleSubmit={handleSubmit}
        addContentBlock={addContentBlock}
        updateBlockContent={updateBlockContent}
        moveBlock={moveBlock}
        removeBlock={removeBlock}
      />
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mt-6">
        <div className="md:col-span-2">
          <BlogPostForm 
            title={postBasics.title}
            slug={postBasics.slug}
            excerpt={postBasics.excerpt}
            blocks={blocks}
            showPreview={showPreview}
            handleBasicInfoChange={handleBasicInfoChange}
            addContentBlock={addContentBlock}
            updateBlockContent={updateBlockContent}
            moveBlock={moveBlock}
            removeBlock={removeBlock}
          />
        </div>
        
        <div>
          <PublishingSidebar 
            featuredImage={postBasics.featuredImage}
            isPublished={postBasics.isPublished}
            categories={postBasics.categories}
            tags={postBasics.tags}
            handleBasicInfoChange={handleBasicInfoChange}
            handleSwitchChange={handleSwitchChange}
            setPostBasics={setPostBasics}
          />
        </div>
      </div>
    </>
  );
};

export default BlogPostEditor;
