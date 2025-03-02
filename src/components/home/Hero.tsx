
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Parallax effect
  useEffect(() => {
    const handleScroll = () => {
      if (bgRef.current && contentRef.current) {
        const scrollPosition = window.scrollY;
        bgRef.current.style.transform = `translateY(${scrollPosition * 0.1}px)`;
        contentRef.current.style.transform = `translateY(${scrollPosition * 0.05}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div 
        ref={bgRef}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1483058712412-4245e9b90334?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-secondary/70 backdrop-blur-sm"></div>
      </div>

      {/* Content */}
      <div className="container relative z-10 pt-24 pb-12" ref={contentRef}>
        <div className="max-w-3xl text-white">
          <span className="inline-block bg-marketing-500/20 text-marketing-300 px-4 py-1 rounded-full text-sm font-medium mb-6 animate-fade-in">
            Digital Marketing Agency
          </span>
          <h1 className="hero-heading animate-fade-in-up" style={{ animationDelay: "200ms" }}>
            Transform Your Digital Presence with Strategic Marketing
          </h1>
          <p className="body-lg text-white/80 mt-6 mb-8 animate-fade-in-up" style={{ animationDelay: "400ms" }}>
            We help businesses grow their online presence and achieve remarkable results through data-driven digital marketing strategies and stunning web development.
          </p>
          <div className="flex flex-wrap gap-4 animate-fade-in-up" style={{ animationDelay: "600ms" }}>
            <Link 
              to="/contact"
              className="btn-primary"
            >
              Get a Free Consultation
            </Link>
            <Link 
              to="/services"
              className="btn-outline !text-white !border-white/30 hover:!bg-white/10"
            >
              Explore Our Services <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Wave Shape */}
      <div className="absolute bottom-0 left-0 right-0 text-background">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
          <path fill="currentColor" fillOpacity="1" d="M0,192L48,176C96,160,192,128,288,122.7C384,117,480,139,576,154.7C672,171,768,181,864,186.7C960,192,1056,192,1152,170.7C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
