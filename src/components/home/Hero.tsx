
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Hero = () => {
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  // Improved parallax effect with better performance using requestAnimationFrame
  useEffect(() => {
    let animationFrameId: number;
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (bgRef.current && contentRef.current) {
        const scrollPosition = window.scrollY;
        // Only update when scroll position changes significantly (performance optimization)
        if (Math.abs(scrollPosition - lastScrollY) > 5) {
          bgRef.current.style.transform = `translateY(${scrollPosition * 0.08}px)`;
          contentRef.current.style.transform = `translateY(${scrollPosition * 0.04}px)`;
          lastScrollY = scrollPosition;
        }
      }
      animationFrameId = requestAnimationFrame(handleScroll);
    };

    handleScroll(); // Initial call
    window.addEventListener("scroll", () => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(handleScroll);
    });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToNextSection = () => {
    const servicesSection = document.querySelector('#services-section');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden">
      {/* Background with improved image quality and overlay */}
      <div 
        ref={bgRef}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1483058712412-4245e9b90334?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=90")',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 to-secondary/70 backdrop-blur-[2px]"></div>
      </div>

      {/* Content with improved spacing and typography */}
      <div className="container relative z-10 py-12 md:py-16" ref={contentRef}>
        <div className="max-w-3xl mx-auto md:mx-0 text-white">
          <span className="inline-block bg-marketing-500/30 text-marketing-50 px-5 py-2 rounded-full text-sm font-medium mb-4 animate-fade-in-up shadow-lg">
            Leading Digital Marketing Agency
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight animate-fade-in-up" style={{ animationDelay: "200ms" }}>
            Transform Your <span className="text-marketing-300">Digital Presence</span> with Strategic Marketing
          </h1>
          <p className="text-lg md:text-xl mt-4 mb-6 text-white/90 font-light max-w-2xl animate-fade-in-up" style={{ animationDelay: "400ms" }}>
            We help businesses grow their online presence and achieve remarkable results through data-driven digital marketing strategies and stunning web development.
          </p>
          <div className="flex flex-wrap gap-4 animate-fade-in-up" style={{ animationDelay: "600ms" }}>
            <Link 
              to="/contact"
              className="btn-primary shadow-lg transform hover:scale-105 transition-all"
            >
              Get a Free Consultation
            </Link>
            <Link 
              to="/services"
              className="btn-outline !text-white !border-white/40 hover:!bg-white/15 shadow-lg"
            >
              Explore Our Services <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll down indicator */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center animate-bounce text-white z-10">
        <button 
          onClick={scrollToNextSection}
          className="flex flex-col items-center opacity-80 hover:opacity-100 transition-opacity"
          aria-label="Scroll down to services"
        >
          <span className="text-sm mb-1 font-medium">Scroll Down</span>
          <ChevronDown className="h-6 w-6" />
        </button>
      </div>

      {/* Enhanced wave shape with smoother animation */}
      <div className="absolute bottom-0 left-0 right-0 text-background">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
          <path fill="currentColor" fillOpacity="1" d="M0,192L48,186.7C96,181,192,171,288,176C384,181,480,203,576,202.7C672,203,768,181,864,181.3C960,181,1056,203,1152,202.7C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
