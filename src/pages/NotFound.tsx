
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center p-6 md:p-10 lg:p-16">
        <div className="text-center max-w-2xl mx-auto glass p-8 md:p-12 rounded-3xl">
          <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-marketing-50 text-marketing-500 mb-6">
            <span className="text-4xl font-bold">404</span>
          </div>
          <h1 className="heading-lg mb-4">Page Not Found</h1>
          <p className="body-md text-gray-600 mb-8">
            Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or never existed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/" className="btn-primary flex items-center justify-center">
              <Home className="mr-2 h-5 w-5" />
              Go to Homepage
            </Link>
            <button 
              onClick={() => window.history.back()} 
              className="btn-outline flex items-center justify-center"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Go Back
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
