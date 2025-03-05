
import React, { useEffect } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Hero from "../components/home/Hero";
import ServicesSection from "../components/home/ServicesSection";
import AboutSection from "../components/home/AboutSection";
import TestimonialsSection from "../components/home/TestimonialsSection";
import WorkSection from "../components/home/WorkSection";
import CtaSection from "../components/home/CtaSection";
import ScrollToTop from "../components/common/ScrollToTop";

const Index = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Add metadata for better SEO
  useEffect(() => {
    document.title = "DigitalShehar - Digital Marketing Agency";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "DigitalShehar is a premier digital marketing agency offering SEO, social media, web development and branding services to help businesses grow online.");
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <ServicesSection />
        <AboutSection />
        <TestimonialsSection />
        <WorkSection />
        <CtaSection />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
