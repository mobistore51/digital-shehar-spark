
import React from "react";
import { 
  FileText, 
  Users, 
  Package, 
  BarChart, 
  Edit, 
  Plus 
} from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import ActivityCard from "@/components/dashboard/ActivityCard";
import QuickActionsCard from "@/components/dashboard/QuickActionsCard";
import FeaturesTable from "@/components/dashboard/FeaturesTable";
import { getCategoryIcon, getStatusColor } from "@/components/dashboard/CategoryIconHelper";
import { Feature } from "@/components/dashboard/FeaturesTable";
import AnalyticsSection from "@/components/dashboard/AnalyticsSection";

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
const latestFeatures: Feature[] = [
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

const Dashboard = () => {
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
          <StatCard 
            key={i}
            title={card.title}
            value={card.value}
            description={card.description}
            icon={card.icon}
            color={card.color}
          />
        ))}
      </div>

      {/* Analytics Section */}
      <AnalyticsSection />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <ActivityCard activities={recentActivities} />
        <QuickActionsCard actions={quickActions} />
      </div>

      {/* Latest Features Section */}
      <FeaturesTable 
        features={latestFeatures} 
        getCategoryIcon={getCategoryIcon}
        getStatusColor={getStatusColor}
      />
    </div>
  );
};

export default Dashboard;
