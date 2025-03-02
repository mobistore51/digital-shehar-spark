
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import { Loader2 } from "lucide-react";

// Define types for page content blocks
type BlockType = 'heading' | 'paragraph' | 'image' | 'quote' | 'columns' | 'html';

interface ContentBlock {
  id: string;
  type: BlockType;
  content: any;
}

interface PageData {
  id: string;
  title: string;
  slug: string;
  description: string;
  layout: string;
  content_blocks: ContentBlock[];
}

const DynamicPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPage = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const { data, error } = await supabase
          .from('pages')
          .select('*')
          .eq('slug', slug)
          .eq('is_published', true)
          .single();

        if (error) throw error;
        
        if (data) {
          setPage(data);
        } else {
          setError('Page not found');
          navigate('/404');
        }
      } catch (error: any) {
        console.error('Error fetching page:', error);
        setError(error.message);
        if (error.code === 'PGRST116') {
          navigate('/404');
        }
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPage();
    }
  }, [slug, navigate]);

  // Render a content block
  const renderContentBlock = (block: ContentBlock) => {
    switch (block.type) {
      case 'heading':
        const HeadingTag = block.content.level || 'h2';
        const headingClasses = {
          h1: 'text-4xl font-bold mt-8 mb-4',
          h2: 'text-3xl font-bold mt-6 mb-3',
          h3: 'text-2xl font-bold mt-5 mb-2',
          h4: 'text-xl font-bold mt-4 mb-2',
        }[block.content.level] || 'text-3xl font-bold mt-6 mb-3';
        
        return <HeadingTag className={headingClasses}>{block.content.text}</HeadingTag>;
      
      case 'paragraph':
        return <p className="my-4 text-gray-700 leading-relaxed">{block.content.text}</p>;
      
      case 'image':
        return (
          <figure className="my-6">
            {block.content.url && (
              <img 
                src={block.content.url} 
                alt={block.content.alt} 
                className="w-full rounded-lg shadow-md"
              />
            )}
            {block.content.caption && (
              <figcaption className="text-center text-gray-500 mt-2 text-sm">
                {block.content.caption}
              </figcaption>
            )}
          </figure>
        );
      
      case 'quote':
        return (
          <blockquote className="border-l-4 border-marketing-300 pl-6 py-2 my-6 italic bg-gray-50 rounded-r">
            <p className="text-gray-700">{block.content.text}</p>
            {block.content.author && (
              <footer className="text-right text-gray-500 mt-2 text-sm">
                — {block.content.author}
              </footer>
            )}
          </blockquote>
        );
      
      case 'columns':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
            <div className="text-gray-700 leading-relaxed">{block.content.columns?.[0]?.text}</div>
            <div className="text-gray-700 leading-relaxed">{block.content.columns?.[1]?.text}</div>
          </div>
        );
      
      case 'html':
        return (
          <div 
            className="my-6" 
            dangerouslySetInnerHTML={{ __html: block.content.code || '' }}
          />
        );
      
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-marketing-500" />
            <p className="mt-2 text-gray-600">Loading page...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !page) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800">Error</h1>
            <p className="mt-2 text-gray-600">{error || 'Page not found'}</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Choose layout wrapper based on page.layout
  let ContentWrapper = ({ children }: { children: React.ReactNode }) => (
    <div className="container max-w-4xl mx-auto px-4 py-12">{children}</div>
  );

  if (page.layout === 'landing') {
    ContentWrapper = ({ children }) => (
      <div className="container mx-auto px-4 py-6">{children}</div>
    );
  } else if (page.layout === 'fullwidth') {
    ContentWrapper = ({ children }) => (
      <div className="container max-w-6xl mx-auto px-4 py-12">{children}</div>
    );
  } else if (page.layout === 'sidebar') {
    ContentWrapper = ({ children }) => (
      <div className="container max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">{children}</div>
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="/" className="text-marketing-600 hover:underline">Home</a></li>
                <li><a href="/about" className="text-marketing-600 hover:underline">About Us</a></li>
                <li><a href="/services" className="text-marketing-600 hover:underline">Services</a></li>
                <li><a href="/contact" className="text-marketing-600 hover:underline">Contact Us</a></li>
              </ul>
            </div>
            <div className="bg-marketing-50 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4">Need Help?</h3>
              <p className="mb-4">Contact our team for assistance with your digital marketing needs.</p>
              <a href="/contact" className="btn-primary inline-block">Contact Us</a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <ContentWrapper>
          {/* Page Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">{page.title}</h1>
          
          {/* Content Blocks */}
          {page.content_blocks.map(block => (
            <div key={block.id}>
              {renderContentBlock(block)}
            </div>
          ))}
        </ContentWrapper>
      </main>
      <Footer />
    </div>
  );
};

export default DynamicPage;
