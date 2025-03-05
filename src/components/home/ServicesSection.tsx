
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Share2, Code, PenTool, Search, BarChart, Facebook, Instagram, ArrowRight
} from "lucide-react";

const ServicesSection = () => {
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

  const services = [
    {
      id: 1,
      title: "Social Media Marketing",
      description: "Boost your brand visibility and engagement with strategic social media campaigns.",
      icon: <Share2 className="h-8 w-8 text-marketing-500" />,
      link: "/services/social-media-marketing",
      delay: 0,
    },
    {
      id: 2,
      title: "Web Development",
      description: "Create stunning, responsive websites that convert visitors into customers.",
      icon: <Code className="h-8 w-8 text-marketing-500" />,
      link: "/services/web-development",
      delay: 100,
    },
    {
      id: 3,
      title: "Brand Development",
      description: "Build a distinctive brand identity that resonates with your target audience.",
      icon: <PenTool className="h-8 w-8 text-marketing-500" />,
      link: "/services/brand-development",
      delay: 200,
    },
    {
      id: 4,
      title: "Search Engine Optimization",
      description: "Improve your website's visibility in search results and drive organic traffic.",
      icon: <Search className="h-8 w-8 text-marketing-500" />,
      link: "/services/seo",
      delay: 300,
    },
    {
      id: 5,
      title: "Google Ads",
      description: "Target potential customers with precision and maximize your ROI with Google Ads.",
      icon: <BarChart className="h-8 w-8 text-marketing-500" />,
      link: "/services/google-ads",
      delay: 400,
    },
    {
      id: 6,
      title: "Facebook Ads",
      description: "Reach your ideal audience and grow your business with effective Facebook advertising.",
      icon: <Facebook className="h-8 w-8 text-marketing-500" />,
      link: "/services/facebook-ads",
      delay: 500,
    },
    {
      id: 7,
      title: "Social Media Ads",
      description: "Engage with potential customers across various social media platforms.",
      icon: <Instagram className="h-8 w-8 text-marketing-500" />,
      link: "/services/social-media-ads",
      delay: 600,
    },
  ];

  return (
    <section id="services-section" className="section-padding bg-white relative overflow-hidden">
      {/* Background gradient elements */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-marketing-50 rounded-full opacity-60 blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-marketing-50 rounded-full opacity-60 blur-3xl"></div>
      
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block bg-marketing-50 text-marketing-600 px-4 py-1 rounded-full text-sm font-medium mb-4 animate-reveal" data-delay="0">
            Our Services
          </span>
          <h2 className="heading-xl mb-6 animate-reveal" data-delay="100">
            Comprehensive Digital Marketing Solutions
          </h2>
          <p className="body-lg text-gray-600 animate-reveal" data-delay="200">
            We offer a wide range of digital marketing services to help your business thrive online.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div 
              key={service.id} 
              className="glass p-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 animate-reveal"
              data-delay={service.delay}
            >
              <div className="bg-marketing-50 rounded-xl w-16 h-16 flex items-center justify-center mb-6">
                {service.icon}
              </div>
              <h3 className="heading-sm mb-3 text-secondary">{service.title}</h3>
              <p className="text-gray-600 mb-6">{service.description}</p>
              <Link
                to={service.link}
                className="text-marketing-600 font-medium hover:text-marketing-700 inline-flex items-center group"
              >
                Learn More
                <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center animate-reveal" data-delay="700">
          <Link to="/services" className="btn-primary shadow-md hover:shadow-lg">
            Explore All Services
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
