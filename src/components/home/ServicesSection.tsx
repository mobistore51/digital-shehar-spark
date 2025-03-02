
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { 
  Share2, Code, PenTool, Search, BarChart, Facebook, Instagram, ArrowRight
} from "lucide-react";

const ServicesSection = () => {
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-reveal');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, { threshold: 0.1 });

    elements.forEach(el => {
      observer.observe(el);
    });
    
    return () => {
      elements.forEach(el => {
        observer.unobserve(el);
      });
    };
  };

  useEffect(() => {
    const cleanup = animateOnScroll();
    return cleanup;
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
    <section className="section-padding bg-white relative">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block bg-marketing-50 text-marketing-600 px-4 py-1 rounded-full text-sm font-medium mb-4 animate-reveal">
            Our Services
          </span>
          <h2 className="heading-xl animate-reveal">
            Comprehensive Digital Marketing Solutions
          </h2>
          <p className="body-lg text-gray-600 mt-4 animate-reveal">
            We offer a wide range of digital marketing services to help your business thrive online.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div 
              key={service.id} 
              className="glass p-8 rounded-2xl animate-reveal"
              style={{ animationDelay: `${service.delay}ms` }}
            >
              <div className="bg-marketing-50 rounded-xl w-16 h-16 flex items-center justify-center mb-6">
                {service.icon}
              </div>
              <h3 className="heading-sm mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-6">{service.description}</p>
              <Link
                to={service.link}
                className="text-marketing-600 font-medium hover:text-marketing-700 inline-flex items-center group"
              >
                Learn More
                <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center animate-reveal">
          <Link to="/services" className="btn-primary">
            Explore All Services
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
