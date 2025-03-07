
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { 
  Share2, Code, PenTool, Search, BarChart, Facebook, Instagram, ArrowRight, Package
} from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon: string;
  is_featured: boolean;
}

const ServicesSection = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch featured services from Supabase
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data, error } = await supabase
          .from('services')
          .select('*')
          .eq('is_featured', true)
          .order('order_index', { ascending: true })
          .limit(7); // Limit to 7 featured services
          
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

  // Get icon component based on icon name
  const getIconComponent = (iconName: string) => {
    switch (iconName?.toLowerCase()) {
      case 'share2': return <Share2 className="h-8 w-8 text-marketing-500" />;
      case 'code': return <Code className="h-8 w-8 text-marketing-500" />;
      case 'pentool': return <PenTool className="h-8 w-8 text-marketing-500" />;
      case 'search': return <Search className="h-8 w-8 text-marketing-500" />;
      case 'barchart': return <BarChart className="h-8 w-8 text-marketing-500" />;
      case 'facebook': return <Facebook className="h-8 w-8 text-marketing-500" />;
      case 'instagram': return <Instagram className="h-8 w-8 text-marketing-500" />;
      default: return <Package className="h-8 w-8 text-marketing-500" />; // Default icon
    }
  };

  // Improved animation with better performance
  useEffect(() => {
    // Using Intersection Observer for better performance
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
    
    const handleIntersect = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add class with delay based on data attribute
          const element = entry.target as HTMLElement;
          const delay = element.dataset.delay || '0';
          setTimeout(() => {
            element.classList.add('in-view');
          }, parseInt(delay));
          
          // Unobserve after animation
          observer.unobserve(entry.target);
        }
      });
    };
    
    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    const elements = document.querySelectorAll('.animate-reveal');
    
    elements.forEach(el => {
      observer.observe(el);
    });
    
    return () => {
      elements.forEach(el => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <section id="services-section" className="py-12 md:py-16 lg:py-20 bg-white relative overflow-hidden">
      {/* Background gradient elements */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-marketing-50 rounded-full opacity-60 blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-marketing-50 rounded-full opacity-60 blur-3xl"></div>
      
      <div className="container px-4">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
          <span className="inline-block bg-marketing-50 text-marketing-600 px-4 py-1 rounded-full text-sm font-medium mb-3 animate-reveal" data-delay="0">
            Our Services
          </span>
          <h2 className="heading-xl mb-4 animate-reveal" data-delay="100">
            Comprehensive Digital Marketing Solutions
          </h2>
          <p className="body-lg text-gray-600 animate-reveal" data-delay="200">
            We offer a wide range of digital marketing services to help your business thrive online.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {loading ? (
            <div className="col-span-3 text-center">Loading services...</div>
          ) : (
            services.map((service, index) => (
              <div 
                key={service.id} 
                className="glass p-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 animate-reveal"
                data-delay={index * 100}
              >
                <div className="bg-marketing-50 rounded-xl w-14 h-14 flex items-center justify-center mb-4">
                  {getIconComponent(service.icon)}
                </div>
                <h3 className="heading-sm mb-2 text-secondary">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <Link
                  to={`/services/${service.slug}`}
                  className="text-marketing-600 font-medium hover:text-marketing-700 inline-flex items-center group"
                >
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
            ))
          )}
        </div>

        <div className="mt-10 md:mt-12 text-center animate-reveal" data-delay="700">
          <Link to="/services" className="btn-primary shadow-md hover:shadow-lg">
            Explore All Services
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
