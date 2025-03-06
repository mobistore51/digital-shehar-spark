
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ScrollToTop from "../components/common/ScrollToTop";
import { motion } from "framer-motion";
import { ArrowLeft, Share2, Code, PenTool, Search, BarChart, Facebook, Instagram, Package } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { PageErrorState } from "@/components/dynamic-page/ErrorState";
import { PageLoadingState } from "@/components/dynamic-page/LoadingState";

interface ServiceDetail {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon: string;
  image_url: string | null;
  is_featured: boolean;
  content: string | null;
}

const ServiceDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState<ServiceDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch service details from Supabase
  useEffect(() => {
    const fetchServiceDetail = async () => {
      try {
        const { data, error } = await supabase
          .from('services')
          .select('*')
          .eq('slug', slug)
          .maybeSingle();
          
        if (error) {
          console.error('Error fetching service:', error);
          setError(error.message);
          return;
        }
        
        if (!data) {
          setError('Service not found');
          return;
        }
        
        setService(data);
      } catch (error: any) {
        console.error('Error:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchServiceDetail();
  }, [slug]);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Add metadata for better SEO
  useEffect(() => {
    if (service) {
      document.title = `${service.title} | DigitalShehar`;
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute("content", service.description);
      }
    }
  }, [service]);

  // Map icon names to components
  const getIconComponent = (iconName: string) => {
    switch (iconName?.toLowerCase()) {
      case 'share2': return <Share2 className="h-10 w-10 text-marketing-500" />;
      case 'code': return <Code className="h-10 w-10 text-marketing-500" />;
      case 'pentool': return <PenTool className="h-10 w-10 text-marketing-500" />;
      case 'search': return <Search className="h-10 w-10 text-marketing-500" />;
      case 'barchart': return <BarChart className="h-10 w-10 text-marketing-500" />;
      case 'facebook': return <Facebook className="h-10 w-10 text-marketing-500" />;
      case 'instagram': return <Instagram className="h-10 w-10 text-marketing-500" />;
      default: return <Package className="h-10 w-10 text-marketing-500" />; // Default icon
    }
  };

  if (loading) {
    return <PageLoadingState />;
  }

  if (error || !service) {
    return <PageErrorState error={error} />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-marketing-50 to-white py-20 md:py-28">
          <div className="container">
            <div className="flex mb-8">
              <button 
                onClick={() => navigate(-1)} 
                className="flex items-center text-marketing-600 hover:text-marketing-700 transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Services
              </button>
            </div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
                <div className="bg-marketing-50 rounded-2xl w-20 h-20 flex items-center justify-center flex-shrink-0">
                  {getIconComponent(service.icon)}
                </div>
                <div>
                  <h1 className="heading-xl mb-4 text-center md:text-left">{service.title}</h1>
                  <p className="body-lg text-gray-600 text-center md:text-left">
                    {service.description}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Service Content */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              {service.image_url && (
                <div className="mb-10 rounded-xl overflow-hidden shadow-lg">
                  <img 
                    src={service.image_url} 
                    alt={service.title} 
                    className="w-full h-auto object-cover"
                  />
                </div>
              )}
              
              {service.content ? (
                <div 
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: service.content || '' }}
                />
              ) : (
                <div className="space-y-6">
                  <h2 className="heading-md">About {service.title}</h2>
                  <p className="text-gray-700">
                    We offer professional {service.title.toLowerCase()} services designed to help your business grow and succeed in the digital landscape.
                  </p>
                  <p className="text-gray-700">
                    Contact us today to learn more about how our {service.title.toLowerCase()} can benefit your business.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-marketing-50 py-16 md:py-24">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="heading-lg mb-6">Ready to get started?</h2>
              <p className="body-md text-gray-600 mb-8">
                Contact us today to discuss how our {service.title} services can help you achieve your business goals.
              </p>
              <Link to="/contact" className="btn-primary">
                Get in Touch
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default ServiceDetail;
