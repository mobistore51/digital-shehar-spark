
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import PagesList from "./pages/dashboard/PagesList";
import PageEditor from "./pages/dashboard/PageEditor";
import ServicesPage from "./pages/dashboard/ServicesPage";
import TestimonialsPage from "./pages/dashboard/TestimonialsPage";
import BlogPostsPage from "./pages/dashboard/BlogPostsPage";
import MediaPage from "./pages/dashboard/MediaPage";
import SettingsPage from "./pages/dashboard/SettingsPage";
import DynamicPage from "./components/DynamicPage";
import ServiceEditor from "./pages/dashboard/services/ServiceEditor";
import BlogPostEditor from "./pages/dashboard/blog/BlogPostEditor";

// Import the pages
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail"; // Add this import
import About from "./pages/About";
import Portfolio from "./pages/Portfolio";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            
            {/* Static routes */}
            <Route path="/services" element={<Services />} />
            <Route path="/services/:slug" element={<ServiceDetail />} /> {/* Add this route */}
            <Route path="/about" element={<About />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Dashboard Routes */}
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="pages" element={<PagesList />} />
              <Route path="pages/new" element={<PageEditor />} />
              <Route path="pages/edit/:id" element={<PageEditor />} />
              <Route path="services" element={<ServicesPage />} />
              <Route path="services/new" element={<ServiceEditor />} />
              <Route path="services/edit/:id" element={<ServiceEditor />} />
              <Route path="testimonials" element={<TestimonialsPage />} />
              <Route path="blog" element={<BlogPostsPage />} />
              <Route path="blog/new" element={<BlogPostEditor />} />
              <Route path="blog/edit/:id" element={<BlogPostEditor />} />
              <Route path="media" element={<MediaPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
            
            {/* Dynamic Page Route */}
            <Route path="/:slug" element={<DynamicPage />} />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
