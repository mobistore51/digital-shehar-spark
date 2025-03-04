
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";

type QuickAction = {
  title: string;
  icon: LucideIcon;
  path: string;
  color: string;
};

type QuickActionsCardProps = {
  actions: QuickAction[];
};

const QuickActionsCard = ({ actions }: QuickActionsCardProps) => {
  return (
    <Card className="lg:col-span-3">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Manage your website content</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {actions.map((action, i) => {
          const Icon = action.icon;
          return (
            <Button 
              key={i} 
              className={`w-full justify-start text-white ${action.color}`}
              asChild
            >
              <Link to={action.path} className="flex items-center gap-2">
                <Icon className="h-4 w-4" />
                <span>{action.title}</span>
              </Link>
            </Button>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default QuickActionsCard;
