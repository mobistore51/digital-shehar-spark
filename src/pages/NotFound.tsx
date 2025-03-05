
import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { ArrowLeft, Home, Search } from "lucide-react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { motion } from "framer-motion";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    // Set title for the 404 page
    document.title = "Page Not Found | DigitalShehar";
    
    // Log the error for debugging
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center p-6 md:p-10 lg:p-16 bg-gradient-to-b from-slate-50 to-slate-100">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto glass p-8 md:p-12 rounded-3xl shadow-xl"
        >
          <motion.div 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ 
              duration: 0.5,
              delay: 0.2,
              type: "spring",
              stiffness: 200
            }}
            className="inline-flex items-center justify-center h-28 w-28 rounded-full bg-marketing-50 text-marketing-500 mb-8 mx-auto"
          >
            <span className="text-5xl font-bold">404</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="heading-lg mb-4 text-marketing-700"
          >
            Oops! Page Not Found
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.6 }}
            className="body-md text-gray-600 mb-8"
          >
            The page you're looking for doesn't exist or may have been moved. 
            Let us help you find your way back.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/" className="btn-primary flex items-center justify-center group">
              <Home className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Back to Homepage
            </Link>
            <button 
              onClick={() => window.history.back()} 
              className="btn-secondary flex items-center justify-center group"
            >
              <ArrowLeft className="mr-2 h-5 w-5 group-hover:translate-x-[-2px] transition-transform" />
              Go Back
            </button>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 1 }}
            className="mt-8 pt-6 border-t border-gray-200"
          >
            <p className="text-sm text-gray-500 mb-4">Looking for something specific?</p>
            <Link to="/contact" className="btn-outline flex items-center justify-center mx-auto max-w-xs group">
              <Search className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
              Contact Us For Help
            </Link>
          </motion.div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
