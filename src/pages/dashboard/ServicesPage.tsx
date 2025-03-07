
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Plus, RefreshCw } from "lucide-react";
import { ServiceListProvider, useServiceList } from "./services/context/ServiceListContext";
import ServiceList from "./services/components/ServiceList";
import ServiceSearchBar from "./services/components/ServiceSearchBar";

const ServicesPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Services</h2>
          <p className="text-muted-foreground">
            Manage your business services.
          </p>
        </div>
        <Button asChild>
          <Link to="/dashboard/services/new" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            <span>Add New Service</span>
          </Link>
        </Button>
      </div>

      <ServiceListProvider>
        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle>Services</CardTitle>
                <CardDescription>
                  Manage your business service offerings.
                </CardDescription>
              </div>
              <ServiceSearchBar />
            </div>
          </CardHeader>
          <CardContent>
            <ServiceList />
          </CardContent>
          <CardFooter className="border-t p-4 text-sm text-muted-foreground">
            <RefreshButton />
          </CardFooter>
        </Card>
      </ServiceListProvider>
    </div>
  );
};

const RefreshButton = () => {
  const { fetchServices } = useServiceList();
  
  return (
    <Button variant="ghost" size="sm" onClick={fetchServices} className="flex items-center gap-2">
      <RefreshCw className="h-4 w-4" />
      Refresh
    </Button>
  );
};

export default ServicesPage;
