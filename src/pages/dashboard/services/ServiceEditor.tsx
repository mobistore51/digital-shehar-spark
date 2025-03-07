
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, ArrowLeft, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { LoadingState } from "@/components/page-editor/LoadingState";
import { useServiceForm } from "./hooks/useServiceForm";
import ServiceDetailsForm from "./components/ServiceDetailsForm";

const ServiceEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const { service, saving, handleSubmit, fetchService } = useServiceForm(id);

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetchService(id).finally(() => setLoading(false));
    }
  }, [id, fetchService]);

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
        <CardContent>
          <ServiceDetailsForm service={service} />
        </CardContent>
      </Card>
    </div>
  );
};

export default ServiceEditor;
