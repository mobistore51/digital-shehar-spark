
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { PageData } from "@/types/page";

export const usePageData = (slug: string | undefined) => {
  const navigate = useNavigate();
  const [page, setPage] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPage = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Using maybeSingle() instead of single() to properly handle cases where no record is found
        const { data, error } = await supabase
          .from('pages')
          .select('*')
          .eq('slug', slug)
          .eq('is_published', true)
          .maybeSingle();

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

  return { page, loading, error };
};
