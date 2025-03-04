
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
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Save, ImagePlus, ArrowUpDown, Loader2 } from "lucide-react";
import { LoadingState } from "@/components/page-editor/LoadingState";

const ServiceEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [service, setService] = useState({
    title: "",
    slug: "",
    description: "",
    imageUrl: "",
    icon: "",
    isFeatured: false,
    orderIndex: 0
  });

  React.useEffect(() => {
    if (id) {
      setLoading(true);
      // Simulate loading service data
      setTimeout(() => {
        setService({
          title: "Digital Marketing",
          slug: "digital-marketing",
          description: "Boost your online presence with our comprehensive digital marketing services.",
          imageUrl: "/placeholder.svg",
          icon: "BarChart",
          isFeatured: true,
          orderIndex: 1
        });
        setLoading(false);
      }, 1000);
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setService(prev => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setService(prev => ({ ...prev, isFeatured: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    // Simulate saving
    setTimeout(() => {
      setSaving(false);
      toast({
        title: "Success",
        description: id ? "Service updated successfully" : "Service created successfully",
      });
      navigate("/dashboard/services");
    }, 1500);
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
                onChange={handleChange} 
                placeholder="Enter service title" 
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
