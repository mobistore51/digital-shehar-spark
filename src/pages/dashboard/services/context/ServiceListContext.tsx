
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon: string;
  is_featured: boolean;
  order_index: number;
  created_at: string;
  updated_at: string;
}

interface ServiceListContextType {
  services: Service[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  fetchServices: () => Promise<void>;
  handleDelete: (id: string) => Promise<void>;
  toggleFeaturedStatus: (id: string, currentStatus: boolean) => Promise<void>;
  filteredServices: Service[];
}

export const ServiceListContext = createContext<ServiceListContextType>({
  services: [],
  loading: false,
  error: null,
  searchTerm: "",
  setSearchTerm: () => {},
  fetchServices: async () => {},
  handleDelete: async () => {},
  toggleFeaturedStatus: async () => {},
  filteredServices: []
});

export const ServiceListProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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

      if (error) throw error;
      setServices(data || []);
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
      
      // Refresh the service list
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
      
      // Refresh the service list
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
    <ServiceListContext.Provider 
      value={{ 
        services, 
        loading, 
        error, 
        searchTerm, 
        setSearchTerm, 
        fetchServices, 
        handleDelete, 
        toggleFeaturedStatus,
        filteredServices
      }}
    >
      {children}
    </ServiceListContext.Provider>
  );
};

export const useServiceList = () => useContext(ServiceListContext);
