
import React, { useEffect } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ScrollToTop from "../components/common/ScrollToTop";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Services = () => {
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

  const services = [
    {
      id: 1,
      title: "Social Media Marketing",
      description: "Boost your brand visibility and engagement with strategic social media campaigns.",
      icon: "Share2",
      link: "/services/social-media-marketing",
    },
    {
      id: 2,
      title: "Web Development",
      description: "Create stunning, responsive websites that convert visitors into customers.",
      icon: "Code",
      link: "/services/web-development",
    },
    {
      id: 3,
      title: "Brand Development",
      description: "Build a distinctive brand identity that resonates with your target audience.",
      icon: "PenTool",
      link: "/services/brand-development",
    },
    {
      id: 4,
      title: "Search Engine Optimization",
      description: "Improve your website's visibility in search results and drive organic traffic.",
      icon: "Search",
      link: "/services/seo",
    },
    {
      id: 5,
      title: "Google Ads",
      description: "Target potential customers with precision and maximize your ROI with Google Ads.",
      icon: "BarChart",
      link: "/services/google-ads",
    },
    {
      id: 6,
      title: "Facebook Ads",
      description: "Reach your ideal audience and grow your business with effective Facebook advertising.",
      icon: "Facebook",
      link: "/services/facebook-ads",
    },
    {
      id: 7,
      title: "Social Media Ads",
      description: "Engage with potential customers across various social media platforms.",
      icon: "Instagram",
      link: "/services/social-media-ads",
    },
  ];

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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass p-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="bg-marketing-50 rounded-xl w-16 h-16 flex items-center justify-center mb-6">
                    <span className="text-marketing-500 text-2xl">
                      {/* Service icon placeholder */}
                      {service.icon}
                    </span>
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
                </motion.div>
              ))}
            </div>
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
