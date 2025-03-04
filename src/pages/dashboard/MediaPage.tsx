import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Plus, 
  Upload, 
  Image, 
  File, 
  MoreVertical, 
  Trash, 
  Copy, 
  Download, 
  Search,
  Loader2
} from "lucide-react";

interface MediaItem {
  id: string;
  name: string;
  url: string;
  type: "image" | "file";
  size: string;
  uploaded: string;
}

// Dummy media items for demonstration
const dummyImages: MediaItem[] = [
  { id: '1', name: 'hero-image.jpg', url: '/placeholder.svg', type: "image", size: '345 KB', uploaded: '2023-04-15' },
  { id: '2', name: 'team-photo.jpg', url: '/placeholder.svg', type: "image", size: '1.2 MB', uploaded: '2023-04-10' },
  { id: '3', name: 'product-banner.jpg', url: '/placeholder.svg', type: "image", size: '780 KB', uploaded: '2023-04-05' },
  { id: '4', name: 'office-location.jpg', url: '/placeholder.svg', type: "image", size: '550 KB', uploaded: '2023-04-01' },
  { id: '5', name: 'client-meeting.jpg', url: '/placeholder.svg', type: "image", size: '890 KB', uploaded: '2023-03-28' },
  { id: '6', name: 'logo-dark.png', url: '/placeholder.svg', type: "image", size: '120 KB', uploaded: '2023-03-25' },
];

const dummyFiles: MediaItem[] = [
  { id: '7', name: 'company-brochure.pdf', url: '#', type: "file", size: '2.4 MB', uploaded: '2023-04-12' },
  { id: '8', name: 'pricing-sheet.pdf', url: '#', type: "file", size: '450 KB', uploaded: '2023-04-08' },
  { id: '9', name: 'contract-template.docx', url: '#', type: "file", size: '380 KB', uploaded: '2023-04-03' },
  { id: '10', name: 'case-study.pdf', url: '#', type: "file", size: '1.7 MB', uploaded: '2023-03-30' },
];

const MediaPage = () => {
  const [activeTab, setActiveTab] = useState<string>("images");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [uploading, setUploading] = useState<boolean>(false);
  const { toast } = useToast();

  // Filter media based on search term
  const filteredImages = dummyImages.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredFiles = dummyFiles.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    setUploading(true);
    
    // Simulate upload delay
    setTimeout(() => {
      setUploading(false);
      toast({
        title: "File uploaded",
        description: "Your file has been uploaded successfully.",
      });
    }, 1500);
  };

  // Copy item URL to clipboard
  const copyToClipboard = (url: string, name: string) => {
    navigator.clipboard.writeText(url);
    toast({
      title: "URL copied",
      description: `URL for ${name} has been copied to clipboard.`,
    });
  };

  // Delete media item
  const deleteItem = (id: string, name: string) => {
    toast({
      title: "File deleted",
      description: `${name} has been deleted successfully.`,
    });
  };

  // Render media grid
  const renderMediaGrid = (items: MediaItem[]) => {
    if (items.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-12 space-y-3 text-center">
          {activeTab === "images" ? (
            <Image className="h-12 w-12 text-muted-foreground opacity-50" />
          ) : (
            <File className="h-12 w-12 text-muted-foreground opacity-50" />
          )}
          <div>
            <p className="text-lg font-medium">No {activeTab} found</p>
            <p className="text-sm text-muted-foreground">
              {searchTerm ? "Try a different search term" : `Upload some ${activeTab} to get started`}
            </p>
          </div>
          {!searchTerm && (
            <Label htmlFor="upload-file" className="cursor-pointer">
              <div className="flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md">
                <Upload className="h-4 w-4" />
                <span>Upload {activeTab === "images" ? "image" : "file"}</span>
              </div>
              <Input 
                id="upload-file" 
                type="file" 
                className="hidden" 
                onChange={handleFileUpload}
                accept={activeTab === "images" ? "image/*" : undefined}
              />
            </Label>
          )}
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <div key={item.id} className="relative group rounded-lg border bg-card overflow-hidden">
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="h-8 w-8 bg-background">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => copyToClipboard(item.url, item.name)}>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy URL
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="text-red-600 focus:text-red-600"
                    onClick={() => deleteItem(item.id, item.name)}
                  >
                    <Trash className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            {item.type === 'image' ? (
              <div className="aspect-square w-full">
                <img 
                  src={item.url} 
                  alt={item.name} 
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="aspect-square w-full flex items-center justify-center bg-muted">
                <File className="h-16 w-16 text-muted-foreground" />
              </div>
            )}
            
            <div className="p-3">
              <h3 className="font-medium text-sm truncate" title={item.name}>{item.name}</h3>
              <div className="flex justify-between items-center mt-1">
                <p className="text-xs text-muted-foreground">{item.size}</p>
                <p className="text-xs text-muted-foreground">{item.uploaded}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Media Library</h2>
          <p className="text-muted-foreground">
            Manage images and files for your website.
          </p>
        </div>
        <Label htmlFor="upload-media" className="cursor-pointer">
          <div className="flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md">
            {uploading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Uploading...</span>
              </>
            ) : (
              <>
                <Plus className="h-4 w-4" />
                <span>Upload Media</span>
              </>
            )}
          </div>
          <Input 
            id="upload-media" 
            type="file" 
            className="hidden" 
            onChange={handleFileUpload}
            disabled={uploading}
          />
        </Label>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Media Library</CardTitle>
              <CardDescription>
                All images and files used on your website.
              </CardDescription>
            </div>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search media..."
                className="pl-8 w-full md:w-[250px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="images" onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="images" className="flex items-center gap-2">
                <Image className="h-4 w-4" />
                <span>Images</span>
              </TabsTrigger>
              <TabsTrigger value="files" className="flex items-center gap-2">
                <File className="h-4 w-4" />
                <span>Files</span>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="images">
              {renderMediaGrid(filteredImages)}
            </TabsContent>
            <TabsContent value="files">
              {renderMediaGrid(filteredFiles)}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default MediaPage;
