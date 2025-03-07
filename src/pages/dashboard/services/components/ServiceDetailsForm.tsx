
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { ImagePlus, ArrowUpDown } from "lucide-react";
import { useServiceContext } from "../context/ServiceContext";

interface ServiceFormProps {
  service: any;
}

const ServiceDetailsForm = ({ service }: ServiceFormProps) => {
  const { 
    handleChange,
    handleTitleChange, 
    handleSwitchChange 
  } = useServiceContext();
  
  return (
    <div className="space-y-4">
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
    </div>
  );
};

export default ServiceDetailsForm;
