
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { CheckCircle, ArrowRight } from "lucide-react";

const AboutSection = () => {
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

  const features = [
    "Data-driven strategies for measurable results",
    "Experienced team of digital marketing experts",
    "Tailored solutions for your business needs",
    "Transparent reporting and communication",
    "Focus on ROI and business growth",
    "Cutting-edge technologies and techniques",
  ];

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gray-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-marketing-100 rounded-full -translate-y-1/2 translate-x-1/2 opacity-40 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-marketing-100 rounded-full translate-y-1/2 -translate-x-1/2 opacity-40 blur-3xl"></div>
      
      <div className="container px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Image Column */}
          <div className="order-2 lg:order-1">
            <div className="relative animate-reveal">
              <div className="absolute inset-0 bg-marketing-500/10 rounded-3xl transform -rotate-6"></div>
              <img 
                src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Digital Marketing Team" 
                className="relative z-10 rounded-3xl shadow-xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-white rounded-lg shadow-lg p-4 z-20 animate-float">
                <div className="bg-marketing-50 text-marketing-600 p-4 rounded-lg">
                  <div className="font-bold text-lg">9+ Years</div>
                  <div className="text-sm">Industry Experience</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Content Column */}
          <div className="order-1 lg:order-2">
            <span className="inline-block bg-marketing-50 text-marketing-600 px-4 py-1 rounded-full text-sm font-medium mb-3 animate-reveal">
              About DigitalShehar
            </span>
            <h2 className="heading-xl animate-reveal">
              Digital Solutions That Drive Business Growth
            </h2>
            <p className="body-lg text-gray-600 mt-4 mb-5 animate-reveal">
              At DigitalShehar, we're passionate about helping businesses succeed in the digital world. Our team of experts combines creativity with technical expertise to deliver results-driven solutions.
            </p>
            
            <div className="space-y-2 mb-6 animate-reveal">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-marketing-500 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-700">{feature}</p>
                </div>
              ))}
            </div>
            
            <div className="animate-reveal">
              <Link to="/about" className="btn-primary">
                Learn More About Us <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
