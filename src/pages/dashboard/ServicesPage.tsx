
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
  Package2,
  Loader2,
  RefreshCw,
  MoveUp,
  MoveDown
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase, initializeTables } from "@/lib/supabase";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Type definition for services
interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon: string;
  image_url?: string;
  is_featured: boolean;
  order_index: number;
  created_at: string;
  updated_at: string;
}

const ServicesPage = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tableExists, setTableExists] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  // Fetch services from Supabase
  const fetchServices = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) {
        if (error.code === '42P01') {
          setTableExists(false);
          await initializeTables();
          toast({
            title: "Database initialized",
            description: "We've set up the database tables for you. Try refreshing the list.",
          });
        } else {
          throw error;
        }
      } else {
        setTableExists(true);
        setServices(data || []);
      }
    } catch (error: any) {
      console.error('Error fetching services:', error);
      setError(error.message);
      toast({
        title: "Error fetching services",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Initialize tables if they don't exist
  const handleInitializeTables = async () => {
    setLoading(true);
    try {
      await initializeTables();
      toast({
        title: "Database initialized",
        description: "We've set up the database tables for you.",
      });
      await fetchServices();
    } catch (error: any) {
      console.error('Error initializing tables:', error);
      toast({
        title: "Error initializing database",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Delete a service
  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast({
        title: "Service deleted",
        description: "The service has been successfully deleted.",
      });
      
      // Refresh the list
      fetchServices();
    } catch (error: any) {
      console.error('Error deleting service:', error);
      toast({
        title: "Error deleting service",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  // Toggle service featured status
  const toggleFeaturedStatus = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('services')
        .update({ is_featured: !currentStatus })
        .eq('id', id);

      if (error) throw error;
      
      toast({
        title: currentStatus ? "Service unfeatured" : "Service featured",
        description: `The service is now ${currentStatus ? "unfeatured" : "featured"}.`,
      });
      
      // Refresh the list
      fetchServices();
    } catch (error: any) {
      console.error('Error updating service status:', error);
      toast({
        title: "Error updating service",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  // Move service up or down in order
  const moveService = async (id: string, direction: 'up' | 'down') => {
    try {
      const currentIndex = services.findIndex(s => s.id === id);
      if (currentIndex === -1) return;

      const newServices = [...services];
      if (direction === 'up' && currentIndex > 0) {
        const temp = newServices[currentIndex - 1].order_index;
        newServices[currentIndex - 1].order_index = newServices[currentIndex].order_index;
        newServices[currentIndex].order_index = temp;
        
        // Update both services in database
        await supabase
          .from('services')
          .upsert([
            newServices[currentIndex - 1],
            newServices[currentIndex]
          ]);
      } else if (direction === 'down' && currentIndex < services.length - 1) {
        const temp = newServices[currentIndex + 1].order_index;
        newServices[currentIndex + 1].order_index = newServices[currentIndex].order_index;
        newServices[currentIndex].order_index = temp;
        
        // Update both services in database
        await supabase
          .from('services')
          .upsert([
            newServices[currentIndex + 1],
            newServices[currentIndex]
          ]);
      }

      // Refresh the list
      fetchServices();
    } catch (error: any) {
      console.error('Error moving service:', error);
      toast({
        title: "Error moving service",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  // Filter services based on search term
  const filteredServices = services.filter(service => 
    service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Load services on component mount
  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Services</h2>
          <p className="text-muted-foreground">
            Manage your business services.
          </p>
        </div>
        <div className="flex gap-2">
          {!tableExists && (
            <Button 
              variant="outline" 
              onClick={handleInitializeTables}
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Initialize Database</span>
            </Button>
          )}
          <Button asChild>
            <Link to="/dashboard/services/new" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              <span>Add New Service</span>
            </Link>
          </Button>
        </div>
      </div>

      {error && !tableExists && (
        <Alert variant="destructive">
          <AlertTitle>Database Error</AlertTitle>
          <AlertDescription>
            The database tables required for this application do not exist yet. Click the "Initialize Database" button above to create them.
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Your Services</CardTitle>
              <CardDescription>
                A list of all services offered by your business.
              </CardDescription>
            </div>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search services..."
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
          ) : !tableExists ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-3 text-center">
              <Package2 className="h-12 w-12 text-muted-foreground opacity-50" />
              <div>
                <p className="text-lg font-medium">Database tables not found</p>
                <p className="text-sm text-muted-foreground">
                  You need to initialize the database tables before you can create services.
                </p>
              </div>
              <Button onClick={handleInitializeTables} className="mt-4">
                <RefreshCw className="mr-2 h-4 w-4" />
                Initialize Database
              </Button>
            </div>
          ) : filteredServices.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-3 text-center">
              <Package2 className="h-12 w-12 text-muted-foreground opacity-50" />
              <div>
                <p className="text-lg font-medium">No services found</p>
                <p className="text-sm text-muted-foreground">
                  {searchTerm ? "Try a different search term" : "Get started by creating your first service"}
                </p>
              </div>
              {!searchTerm && (
                <Button asChild className="mt-4">
                  <Link to="/dashboard/services/new">
                    <Plus className="mr-2 h-4 w-4" />
                    Create service
                  </Link>
                </Button>
              )}
            </div>
          ) : (
            <div className="relative overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Featured</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredServices.map((service, index) => (
                    <TableRow key={service.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => moveService(service.id, 'up')}
                            disabled={index === 0}
                            className="h-8 w-8"
                          >
                            <MoveUp className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => moveService(service.id, 'down')}
                            disabled={index === services.length - 1}
                            className="h-8 w-8"
                          >
                            <MoveDown className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{service.title}</TableCell>
                      <TableCell className="max-w-md truncate">{service.description}</TableCell>
                      <TableCell>
                        <Badge variant={service.is_featured ? "default" : "outline"}>
                          {service.is_featured ? "Featured" : "Not Featured"}
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
                            <DropdownMenuItem asChild>
                              <Link to={`/dashboard/services/edit/${service.id}`} className="flex items-center">
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => toggleFeaturedStatus(service.id, service.is_featured)}
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              {service.is_featured ? "Unfeature" : "Feature"}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="text-red-600 focus:text-red-600" 
                              onClick={() => handleDelete(service.id)}
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
          <Button variant="ghost" size="sm" onClick={fetchServices} className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ServicesPage;
