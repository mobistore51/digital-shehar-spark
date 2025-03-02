
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
  Eye,
  Search,
  FileText,
  Loader2
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

// Type definition for pages
interface Page {
  id: string;
  title: string;
  slug: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

const PagesList = () => {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  // Fetch pages from Supabase
  const fetchPages = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('pages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setPages(data || []);
    } catch (error: any) {
      console.error('Error fetching pages:', error);
      toast({
        title: "Error fetching pages",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Delete a page
  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('pages')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast({
        title: "Page deleted",
        description: "The page has been successfully deleted.",
      });
      
      // Refresh the page list
      fetchPages();
    } catch (error: any) {
      console.error('Error deleting page:', error);
      toast({
        title: "Error deleting page",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  // Toggle page publish status
  const togglePublishStatus = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('pages')
        .update({ is_published: !currentStatus })
        .eq('id', id);

      if (error) throw error;
      
      toast({
        title: currentStatus ? "Page unpublished" : "Page published",
        description: `The page is now ${currentStatus ? "unpublished" : "published"}.`,
      });
      
      // Refresh the page list
      fetchPages();
    } catch (error: any) {
      console.error('Error updating page status:', error);
      toast({
        title: "Error updating page",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  // Filter pages based on search term
  const filteredPages = pages.filter(page => 
    page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Load pages on component mount
  useEffect(() => {
    fetchPages();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Pages</h2>
          <p className="text-muted-foreground">
            Manage the pages of your website.
          </p>
        </div>
        <Button asChild>
          <Link to="/dashboard/pages/new" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            <span>Add New Page</span>
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Website Pages</CardTitle>
              <CardDescription>
                A list of all pages on your website.
              </CardDescription>
            </div>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search pages..."
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
          ) : filteredPages.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-3 text-center">
              <FileText className="h-12 w-12 text-muted-foreground opacity-50" />
              <div>
                <p className="text-lg font-medium">No pages found</p>
                <p className="text-sm text-muted-foreground">
                  {searchTerm ? "Try a different search term" : "Get started by creating your first page"}
                </p>
              </div>
              {!searchTerm && (
                <Button asChild className="mt-4">
                  <Link to="/dashboard/pages/new">
                    <Plus className="mr-2 h-4 w-4" />
                    Create page
                  </Link>
                </Button>
              )}
            </div>
          ) : (
            <div className="relative overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Slug</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPages.map((page) => (
                    <TableRow key={page.id}>
                      <TableCell className="font-medium">{page.title}</TableCell>
                      <TableCell className="text-muted-foreground">{page.slug}</TableCell>
                      <TableCell>
                        <Badge variant={page.is_published ? "default" : "outline"}>
                          {page.is_published ? "Published" : "Draft"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {new Date(page.updated_at).toLocaleDateString()}
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
                            <DropdownMenuItem asChild>
                              <Link to={`/dashboard/pages/edit/${page.id}`} className="flex items-center">
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link to={`/${page.slug}`} target="_blank" className="flex items-center">
                                <Eye className="mr-2 h-4 w-4" />
                                View
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => togglePublishStatus(page.id, page.is_published)}
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              {page.is_published ? "Unpublish" : "Publish"}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="text-red-600 focus:text-red-600" 
                              onClick={() => handleDelete(page.id)}
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
      </Card>
    </div>
  );
};

export default PagesList;
