
import React from "react";
import { Link } from "react-router-dom";
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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreVertical, Edit, Trash, Eye, Package, Loader2 } from "lucide-react";
import { useServiceList } from "../context/ServiceListContext";

const ServiceList = () => {
  const { loading, error, filteredServices, handleDelete, toggleFeaturedStatus } = useServiceList();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (filteredServices.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-3 text-center">
        <Package className="h-12 w-12 text-muted-foreground opacity-50" />
        <div>
          <p className="text-lg font-medium">No services found</p>
          <p className="text-sm text-muted-foreground">
            Get started by creating your first service
          </p>
        </div>
        <Button asChild className="mt-4">
          <Link to="/dashboard/services/new">
            <Package className="mr-2 h-4 w-4" />
            Create service
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="relative overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Featured</TableHead>
            <TableHead>Order</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredServices.map((service) => (
            <TableRow key={service.id}>
              <TableCell className="font-medium">{service.title}</TableCell>
              <TableCell className="text-muted-foreground max-w-xs truncate">
                {service.description}
              </TableCell>
              <TableCell>
                <Badge variant={service.is_featured ? "default" : "outline"}>
                  {service.is_featured ? "Featured" : "Not Featured"}
                </Badge>
              </TableCell>
              <TableCell>{service.order_index}</TableCell>
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
                    <DropdownMenuItem asChild>
                      <Link to={`/services/${service.slug}`} target="_blank" className="flex items-center">
                        <Eye className="mr-2 h-4 w-4" />
                        View
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
  );
};

export default ServiceList;
