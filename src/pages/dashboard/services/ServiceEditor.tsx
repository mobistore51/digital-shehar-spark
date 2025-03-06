
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
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Save, ImagePlus, ArrowUpDown, Loader2 } from "lucide-react";
import { LoadingState } from "@/components/page-editor/LoadingState";
import { supabase } from "@/lib/supabase";
import { v4 as uuidv4 } from "uuid";

interface ServiceFormData {
  title: string;
  slug: string;
  description: string;
  imageUrl: string;
  icon: string;
  isFeatured: boolean;
  orderIndex: number;
}

const ServiceEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
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

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetchService(id);
    }
  }, [id]);

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
    } finally {
      setLoading(false);
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

  if (loading) {
    return <LoadingState />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => navigate("/dashboard/services")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-3xl font-bold tracking-tight">
            {id ? "Edit Service" : "Create New Service"}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => navigate("/dashboard/services")}>
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

      <Card>
        <CardHeader>
          <CardTitle>Service Details</CardTitle>
          <CardDescription>
            Add or edit service information.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input 
                id="title" 
                name="title" 
                value={service.title} 
                onChange={handleTitleChange} 
                placeholder="Enter service title" 
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input 
                id="slug" 
                name="slug" 
                value={service.slug} 
                onChange={handleChange} 
                placeholder="enter-slug-here" 
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              name="description" 
              value={service.description} 
              onChange={handleChange} 
              placeholder="Describe your service" 
              rows={3} 
            />
          </div>
          
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="icon">Icon</Label>
              <Input 
                id="icon" 
                name="icon" 
                value={service.icon} 
                onChange={handleChange} 
                placeholder="Icon name (e.g., BarChart)" 
              />
              <p className="text-xs text-muted-foreground">
                Enter the name of a Lucide icon (e.g., BarChart, Code, Package)
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="orderIndex">Display Order</Label>
              <div className="flex gap-2">
                <Input 
                  id="orderIndex" 
                  name="orderIndex" 
                  type="number" 
                  value={service.orderIndex} 
                  onChange={handleChange} 
                />
                <Button variant="outline" size="icon">
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Set the display order (lower numbers appear first)
              </p>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Image</Label>
            <div className="flex flex-col gap-2">
              <div className="border rounded h-40 overflow-hidden bg-muted flex items-center justify-center">
                {service.imageUrl ? (
                  <img 
                    src={service.imageUrl} 
                    alt="Service" 
                    className="w-full h-full object-cover" 
                  />
                ) : (
                  <ImagePlus className="h-8 w-8 text-muted-foreground opacity-50" />
                )}
              </div>
              <Input 
                id="imageUrl" 
                name="imageUrl" 
                value={service.imageUrl} 
                onChange={handleChange} 
                placeholder="/images/service.jpg or https://..." 
              />
              <Button variant="outline">
                <ImagePlus className="h-4 w-4 mr-2" />
                Select Image
              </Button>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch 
              id="featured" 
              checked={service.isFeatured} 
              onCheckedChange={handleSwitchChange} 
            />
            <Label htmlFor="featured" className="cursor-pointer">
              Feature this service on the homepage
            </Label>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServiceEditor;
