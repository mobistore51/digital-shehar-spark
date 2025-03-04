
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Clock, LucideIcon } from "lucide-react";

export type Feature = {
  id: number;
  name: string;
  date: string;
  status: string;
  category: string;
};

type FeaturesTableProps = {
  features: Feature[];
  getCategoryIcon: (category: string) => LucideIcon;
  getStatusColor: (status: string) => string;
};

const FeaturesTable = ({ features, getCategoryIcon, getStatusColor }: FeaturesTableProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Latest Platform Features</CardTitle>
        <CardDescription>30 recently launched features and updates</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-auto max-h-[450px] pr-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]"></TableHead>
                <TableHead>Feature</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Release Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {features.map((feature) => {
                const IconComponent = getCategoryIcon(feature.category);
                return (
                  <TableRow key={feature.id}>
                    <TableCell>
                      <div className={`p-2 rounded-full bg-gray-100`}>
                        <IconComponent className="h-4 w-4 text-gray-600" />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{feature.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{feature.category}</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Clock className="h-3 w-3" />
                        {feature.date}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(feature.status)}>
                        {feature.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeaturesTable;
