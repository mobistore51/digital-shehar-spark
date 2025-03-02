
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-marketing-600">
              DigitalShehar
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className="text-sm font-medium hover:text-marketing-600 transition-colors"
            >
              Home
            </Link>
            <Link
              to="/services"
              className="text-sm font-medium hover:text-marketing-600 transition-colors"
            >
              Services
            </Link>
            <Link
              to="/about"
              className="text-sm font-medium hover:text-marketing-600 transition-colors"
            >
              About
            </Link>
            <Link
              to="/portfolio"
              className="text-sm font-medium hover:text-marketing-600 transition-colors"
            >
              Portfolio
            </Link>
            <Link
              to="/blog"
              className="text-sm font-medium hover:text-marketing-600 transition-colors"
            >
              Blog
            </Link>
            <Link
              to="/contact"
              className="text-sm font-medium hover:text-marketing-600 transition-colors"
            >
              Contact
            </Link>
            
            {/* Dashboard Link for logged in users */}
            {user && (
              <Link
                to="/dashboard"
                className="text-sm font-medium text-marketing-600 hover:text-marketing-700 transition-colors"
              >
                Dashboard
              </Link>
            )}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button asChild>
              <Link to="/contact">Get a Free Quote</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 space-y-4 pb-4">
            <Link
              to="/"
              className="block py-2 text-base font-medium hover:text-marketing-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/services"
              className="block py-2 text-base font-medium hover:text-marketing-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              to="/about"
              className="block py-2 text-base font-medium hover:text-marketing-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/portfolio"
              className="block py-2 text-base font-medium hover:text-marketing-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Portfolio
            </Link>
            <Link
              to="/blog"
              className="block py-2 text-base font-medium hover:text-marketing-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              to="/contact"
              className="block py-2 text-base font-medium hover:text-marketing-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
            
            {/* Dashboard Link for logged in users */}
            {user && (
              <Link
                to="/dashboard"
                className="block py-2 text-base font-medium text-marketing-600 hover:text-marketing-700 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
            )}
            
            <Button asChild className="w-full mt-2">
              <Link 
                to="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Get a Free Quote
              </Link>
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
