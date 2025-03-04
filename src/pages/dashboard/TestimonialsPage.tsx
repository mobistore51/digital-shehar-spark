
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { 
  Plus, 
  MoreVertical, 
  Edit, 
  Trash, 
  RefreshCw,
  Users,
  Search,
  Star,
  Loader2
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Type definition for testimonials
interface Testimonial {
  id: string;
  client_name: string;
  client_title: string;
  client_company: string;
  client_image: string;
  content: string;
  rating: number;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

const TestimonialsPage = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  // Fetch testimonials from Supabase
  const fetchTestimonials = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTestimonials(data || []);
    } catch (error: any) {
      console.error('Error fetching testimonials:', error);
      setError(error.message);
      toast({
        title: "Error fetching testimonials",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Delete a testimonial
  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast({
        title: "Testimonial deleted",
        description: "The testimonial has been successfully deleted.",
      });
      
      // Refresh the testimonial list
      fetchTestimonials();
    } catch (error: any) {
      console.error('Error deleting testimonial:', error);
      toast({
        title: "Error deleting testimonial",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  // Toggle testimonial featured status
  const toggleFeaturedStatus = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('testimonials')
        .update({ is_featured: !currentStatus })
        .eq('id', id);

      if (error) throw error;
      
      toast({
        title: currentStatus ? "Testimonial unfeatured" : "Testimonial featured",
        description: `The testimonial is now ${currentStatus ? "unfeatured" : "featured"}.`,
      });
      
      // Refresh the testimonial list
      fetchTestimonials();
    } catch (error: any) {
      console.error('Error updating testimonial status:', error);
      toast({
        title: "Error updating testimonial",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  // Filter testimonials based on search term
  const filteredTestimonials = testimonials.filter(testimonial => 
    testimonial.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    testimonial.client_company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    testimonial.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Load testimonials on component mount
  useEffect(() => {
    fetchTestimonials();
  }, []);

  // Render stars based on rating
  const renderRatingStars = (rating: number) => {
    return Array(5).fill(0).map((_, index) => (
      <Star 
        key={index} 
        className={`h-4 w-4 ${index < rating ? "text-amber-500 fill-amber-500" : "text-gray-300"}`} 
      />
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Testimonials</h2>
          <p className="text-muted-foreground">
            Manage client testimonials and reviews.
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Testimonial
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Client Testimonials</CardTitle>
              <CardDescription>
                View and manage client reviews and feedback.
              </CardDescription>
            </div>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search testimonials..."
                className="pl-8 w-full md:w-[250px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : filteredTestimonials.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-3 text-center">
              <Users className="h-12 w-12 text-muted-foreground opacity-50" />
              <div>
                <p className="text-lg font-medium">No testimonials found</p>
                <p className="text-sm text-muted-foreground">
                  {searchTerm ? "Try a different search term" : "Get started by adding your first client testimonial"}
                </p>
              </div>
              {!searchTerm && (
                <Button className="mt-4">
                  <Plus className="mr-2 h-4 w-4" />
                  Add testimonial
                </Button>
              )}
            </div>
          ) : (
            <div className="relative overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client</TableHead>
                    <TableHead>Content</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTestimonials.map((testimonial) => (
                    <TableRow key={testimonial.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            {testimonial.client_image ? (
                              <AvatarImage src={testimonial.client_image} alt={testimonial.client_name} />
                            ) : null}
                            <AvatarFallback>
                              {testimonial.client_name.split(' ').map(n => n[0]).join('').toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{testimonial.client_name}</p>
                            {testimonial.client_title && testimonial.client_company ? (
                              <p className="text-xs text-muted-foreground">
                                {testimonial.client_title}, {testimonial.client_company}
                              </p>
                            ) : testimonial.client_company ? (
                              <p className="text-xs text-muted-foreground">{testimonial.client_company}</p>
                            ) : null}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-xs">
                        <p className="truncate">{testimonial.content}</p>
                      </TableCell>
                      <TableCell>
                        <div className="flex">
                          {renderRatingStars(testimonial.rating)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={testimonial.is_featured ? "default" : "outline"}>
                          {testimonial.is_featured ? "Featured" : "Not Featured"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => toggleFeaturedStatus(testimonial.id, testimonial.is_featured)}
                            >
                              <Star className="mr-2 h-4 w-4" />
                              {testimonial.is_featured ? "Unfeature" : "Feature"}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="text-red-600 focus:text-red-600" 
                              onClick={() => handleDelete(testimonial.id)}
                            >
                              <Trash className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
        <CardFooter className="border-t p-4 text-sm text-muted-foreground">
          <Button variant="ghost" size="sm" onClick={fetchTestimonials} className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TestimonialsPage;
