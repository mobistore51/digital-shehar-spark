import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  FileText, 
  Users, 
  Package, 
  BarChart, 
  Edit, 
  Plus, 
  Activity, 
  Clock, 
  CheckCircle, 
  Star, 
  Calendar,
  Shield,
  Code,
  ShoppingCart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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

// Latest features added to the platform
const latestFeatures = [
  { id: 1, name: "AI Content Generator", date: "June 15, 2024", status: "New", category: "Content" },
  { id: 2, name: "Dark Mode Support", date: "June 14, 2024", status: "New", category: "UI" },
  { id: 3, name: "Advanced Analytics Dashboard", date: "June 12, 2024", status: "New", category: "Analytics" },
  { id: 4, name: "Bulk Page Editor", date: "June 10, 2024", status: "New", category: "Content" },
  { id: 5, name: "SEO Optimization Tools", date: "June 8, 2024", status: "New", category: "SEO" },
  { id: 6, name: "Custom Domain Support", date: "June 5, 2024", status: "New", category: "Infrastructure" },
  { id: 7, name: "Social Media Integration", date: "June 3, 2024", status: "New", category: "Marketing" },
  { id: 8, name: "Email Marketing Templates", date: "May 30, 2024", status: "Updated", category: "Marketing" },
  { id: 9, name: "Form Builder", date: "May 28, 2024", status: "New", category: "Content" },
  { id: 10, name: "Image Compression", date: "May 25, 2024", status: "Updated", category: "Media" },
  { id: 11, name: "Custom CSS Editor", date: "May 23, 2024", status: "New", category: "Design" },
  { id: 12, name: "Webhook Integrations", date: "May 20, 2024", status: "New", category: "Infrastructure" },
  { id: 13, name: "Team Collaboration Tools", date: "May 18, 2024", status: "New", category: "Collaboration" },
  { id: 14, name: "Performance Optimization", date: "May 15, 2024", status: "Updated", category: "Infrastructure" },
  { id: 15, name: "User Role Management", date: "May 12, 2024", status: "New", category: "Security" },
  { id: 16, name: "API Access", date: "May 10, 2024", status: "New", category: "Development" },
  { id: 17, name: "Payment Gateway Integration", date: "May 8, 2024", status: "New", category: "E-commerce" },
  { id: 18, name: "Multilingual Content Support", date: "May 5, 2024", status: "New", category: "Content" },
  { id: 19, name: "Backup & Restore", date: "May 3, 2024", status: "New", category: "Security" },
  { id: 20, name: "Client Portal", date: "April 30, 2024", status: "New", category: "Client Management" },
  { id: 21, name: "A/B Testing Tools", date: "April 28, 2024", status: "New", category: "Marketing" },
  { id: 22, name: "Content Scheduling", date: "April 25, 2024", status: "Updated", category: "Content" },
  { id: 23, name: "Event Calendar", date: "April 23, 2024", status: "New", category: "Organization" },
  { id: 24, name: "Contact Form Analytics", date: "April 20, 2024", status: "New", category: "Analytics" },
  { id: 25, name: "PDF Generation", date: "April 18, 2024", status: "New", category: "Content" },
  { id: 26, name: "GDPR Compliance Tools", date: "April 15, 2024", status: "Updated", category: "Security" },
  { id: 27, name: "Site Speed Test", date: "April 12, 2024", status: "New", category: "Performance" },
  { id: 28, name: "Lead Generation Tools", date: "April 10, 2024", status: "New", category: "Marketing" },
  { id: 29, name: "Custom Page Templates", date: "April 8, 2024", status: "New", category: "Design" },
  { id: 30, name: "Marketing Automation", date: "April 5, 2024", status: "New", category: "Marketing" },
];

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Content":
      return FileText;
    case "UI":
    case "Design":
      return Edit;
    case "Analytics":
      return BarChart;
    case "SEO":
    case "Marketing":
      return Activity;
    case "Infrastructure":
    case "Performance":
      return CheckCircle;
    case "Media":
      return FileText;
    case "Collaboration":
    case "Client Management":
      return Users;
    case "Security":
      return Shield;
    case "Development":
      return Code;
    case "E-commerce":
      return ShoppingCart;
    case "Organization":
      return Calendar;
    default:
      return Star;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "New":
      return "bg-green-100 text-green-800";
    case "Updated":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

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

      {/* Latest Features Section */}
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
                {latestFeatures.map((feature) => {
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
    </div>
  );
};

export default Dashboard;
