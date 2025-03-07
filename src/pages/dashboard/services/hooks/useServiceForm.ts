
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";

interface ServiceFormData {
  title: string;
  slug: string;
  description: string;
  imageUrl: string;
  icon: string;
  isFeatured: boolean;
  orderIndex: number;
}

export const useServiceForm = (id?: string) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [service, setService] = useState<ServiceFormData>({
    title: "",
    slug: "",
    description: "",
    imageUrl: "",
    icon: "",
    isFeatured: false,
    orderIndex: 0
  });

  const fetchService = async (serviceId: string) => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('id', serviceId)
        .single();
      
      if (error) throw error;
      
      if (data) {
        setService({
          title: data.title,
          slug: data.slug,
          description: data.description || "",
          imageUrl: data.image_url || "",
          icon: data.icon || "",
          isFeatured: data.is_featured,
          orderIndex: data.order_index
        });
      }
    } catch (error: any) {
      console.error("Error fetching service:", error);
      toast({
        title: "Error",
        description: "Could not load service data. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setService(prev => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setService(prev => ({ ...prev, isFeatured: checked }));
  };

  const generateSlugFromTitle = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '-');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setService(prev => ({ 
      ...prev, 
      title: newTitle,
      slug: !prev.slug || prev.slug === generateSlugFromTitle(prev.title) 
        ? generateSlugFromTitle(newTitle) 
        : prev.slug
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!service.title.trim()) {
      toast({
        title: "Validation Error",
        description: "Title is required",
        variant: "destructive",
      });
      return;
    }
    
    if (!service.slug.trim()) {
      toast({
        title: "Validation Error",
        description: "Slug is required",
        variant: "destructive",
      });
      return;
    }
    
    setSaving(true);
    
    try {
      const serviceData = {
        title: service.title,
        slug: service.slug,
        description: service.description,
        image_url: service.imageUrl,
        icon: service.icon,
        is_featured: service.isFeatured,
        order_index: service.orderIndex
      };

      let result;
      
      if (id) {
        // Update existing service
        result = await supabase
          .from('services')
          .update(serviceData)
          .eq('id', id);
      } else {
        // Create new service
        result = await supabase
          .from('services')
          .insert([serviceData]);
      }

      if (result.error) throw result.error;
      
      toast({
        title: "Success",
        description: id ? "Service updated successfully" : "Service created successfully",
      });
      
      navigate("/dashboard/services");
    } catch (error: any) {
      console.error("Error saving service:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to save service. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  return {
    service,
    saving,
    handleChange,
    handleSwitchChange,
    handleTitleChange,
    handleSubmit,
    fetchService
  };
};
