
import React, { useEffect, useState } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ScrollToTop from "../components/common/ScrollToTop";
import { motion } from "framer-motion";
import { ArrowRight, Share2, Code, PenTool, Search, BarChart, Facebook, Instagram, Package } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";

interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon: string;
  is_featured: boolean;
}

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Fetch services from Supabase
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data, error } = await supabase
          .from('services')
          .select('*')
          .order('order_index', { ascending: true });
          
        if (error) {
          console.error('Error fetching services:', error);
          return;
        }
        
        if (data) {
          setServices(data);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchServices();
  }, []);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Add metadata for better SEO
  useEffect(() => {
    document.title = "Our Services | DigitalShehar";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Explore DigitalShehar's comprehensive digital marketing services including SEO, social media, web development and more.");
    }
  }, []);

  // Map icon names to components
  const getIconComponent = (iconName: string) => {
    switch (iconName?.toLowerCase()) {
      case 'share2': return <Share2 className="h-6 w-6 text-marketing-500" />;
      case 'code': return <Code className="h-6 w-6 text-marketing-500" />;
      case 'pentool': return <PenTool className="h-6 w-6 text-marketing-500" />;
      case 'search': return <Search className="h-6 w-6 text-marketing-500" />;
      case 'barchart': return <BarChart className="h-6 w-6 text-marketing-500" />;
      case 'facebook': return <Facebook className="h-6 w-6 text-marketing-500" />;
      case 'instagram': return <Instagram className="h-6 w-6 text-marketing-500" />;
      default: return <Package className="h-6 w-6 text-marketing-500" />; // Default icon
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-marketing-50 to-white py-20 md:py-28">
          <div className="container">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="heading-xl mb-6">Our Services</h1>
              <p className="body-lg text-gray-600 mb-8">
                We provide comprehensive digital marketing solutions to help your business thrive online.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container">
            {loading ? (
              <div className="text-center">Loading services...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service, index) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="glass p-6 rounded-2xl shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
                  >
                    <div className="bg-marketing-50 rounded-xl w-12 h-12 flex items-center justify-center mb-4">
                      {getIconComponent(service.icon)}
                    </div>
                    <h3 className="heading-sm mb-2 text-secondary">{service.title}</h3>
                    <p className="text-gray-600 mb-4 text-sm flex-grow line-clamp-3">{service.description}</p>
                    <Link
                      to={`/services/${service.slug}`}
                      className="text-marketing-600 text-sm font-medium hover:text-marketing-700 inline-flex items-center group mt-auto"
                    >
                      Learn More
                      <ArrowRight className="ml-1 h-3.5 w-3.5 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-marketing-50 py-16 md:py-24">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="heading-lg mb-6">Ready to grow your business?</h2>
              <p className="body-md text-gray-600 mb-8">
                Contact us today to discuss your digital marketing needs and discover how we can help you achieve your business goals.
              </p>
              <Link to="/contact" className="btn-primary">
                Get Started
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

export default Services;
