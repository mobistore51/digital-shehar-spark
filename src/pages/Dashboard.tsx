
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Users, Package, BarChart, Edit, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const statCards = [
  {
    title: "Total Pages",
    value: "12",
    description: "Live pages on your website",
    icon: FileText,
    color: "bg-blue-100 text-blue-700",
  },
  {
    title: "Services",
    value: "7",
    description: "Active service offerings",
    icon: Package,
    color: "bg-green-100 text-green-700",
  },
  {
    title: "Testimonials",
    value: "16",
    description: "Client testimonials",
    icon: Users,
    color: "bg-purple-100 text-purple-700",
  },
  {
    title: "Blog Posts",
    value: "24",
    description: "Published articles",
    icon: BarChart,
    color: "bg-amber-100 text-amber-700",
  },
];

const recentActivities = [
  { id: 1, action: "Page Updated", target: "About Us", time: "2 hours ago" },
  { id: 2, action: "Service Added", target: "Email Marketing", time: "Yesterday" },
  { id: 3, action: "Blog Published", target: "Digital Marketing Trends 2024", time: "3 days ago" },
  { id: 4, action: "Testimonial Added", target: "Client: Tech Solutions Inc.", time: "1 week ago" },
];

const quickActions = [
  { title: "New Page", icon: Plus, path: "/dashboard/pages/new", color: "bg-marketing-500 hover:bg-marketing-600" },
  { title: "New Service", icon: Plus, path: "/dashboard/services/new", color: "bg-green-600 hover:bg-green-700" },
  { title: "New Blog Post", icon: Edit, path: "/dashboard/blog/new", color: "bg-amber-600 hover:bg-amber-700" },
];

const Dashboard = () => {
  const { user } = useAuth();
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Welcome back!</h2>
          <p className="text-muted-foreground">
            Here's what's happening with your website today.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              <div className={`p-2 rounded-full ${card.color}`}>
                <card.icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground">{card.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest website updates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-0">
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-4 border-b pb-4 last:border-0 last:pb-0">
                  <div className="rounded-full p-2 bg-gray-100">
                    <Edit className="h-4 w-4 text-gray-600" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">
                      {activity.action}: <span className="text-muted-foreground">{activity.target}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your website content</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {quickActions.map((action, i) => (
              <Button 
                key={i} 
                className={`w-full justify-start text-white ${action.color}`}
                asChild
              >
                <Link to={action.path} className="flex items-center gap-2">
                  <action.icon className="h-4 w-4" />
                  <span>{action.title}</span>
                </Link>
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
