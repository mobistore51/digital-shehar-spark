
import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useServiceList } from "../context/ServiceListContext";

const ServiceSearchBar = () => {
  const { searchTerm, setSearchTerm } = useServiceList();
  
  return (
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
  );
};

export default ServiceSearchBar;
