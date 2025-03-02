
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Check if page is scrolled
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Services submenu
  const services = [
    { name: "Social Media Marketing", href: "/services/social-media-marketing" },
    { name: "Web Development", href: "/services/web-development" },
    { name: "Brand Development", href: "/services/brand-development" },
    { name: "Search Engine Optimization", href: "/services/seo" },
    { name: "Google Ads", href: "/services/google-ads" },
    { name: "Facebook Ads", href: "/services/facebook-ads" },
    { name: "Social Media Ads", href: "/services/social-media-ads" },
  ];

  const navigationItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "#", hasSubmenu: true, submenu: services },
    { name: "Industries", href: "/industries" },
    { name: "Our Work", href: "/work" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/80 backdrop-blur-lg shadow-sm py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="container-tight flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center font-display text-xl md:text-2xl font-bold text-secondary hover:text-marketing-600 transition-colors"
        >
          <span className="text-marketing-500">Digital</span>Shehar
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-6">
          {navigationItems.map((item) => (
            <div key={item.name} className="relative group">
              {item.hasSubmenu ? (
                <button className="flex items-center space-x-1 font-medium text-gray-600 hover:text-marketing-500 transition-colors">
                  <span>{item.name}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
              ) : (
                <Link
                  to={item.href}
                  className="font-medium text-gray-600 hover:text-marketing-500 transition-colors"
                >
                  {item.name}
                </Link>
              )}

              {/* Submenu */}
              {item.hasSubmenu && (
                <div className="absolute left-0 mt-2 w-56 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 origin-top-left">
                  <div className="glass rounded-lg py-2 overflow-hidden">
                    {item.submenu?.map((subItem) => (
                      <Link
                        key={subItem.name}
                        to={subItem.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-marketing-50 hover:text-marketing-600 transition-colors"
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden lg:block">
          <Link to="/contact" className="btn-primary">
            Get a Free Consultation
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden text-gray-600 hover:text-marketing-500 transition-colors"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 bg-white z-40 transition-transform duration-300 transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 h-full overflow-y-auto">
          <div className="flex items-center justify-between mb-8">
            <Link 
              to="/" 
              className="flex items-center font-display text-xl font-bold text-secondary"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="text-marketing-500">Digital</span>Shehar
            </Link>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-gray-600 hover:text-marketing-500 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <nav className="space-y-6">
            {navigationItems.map((item) => (
              <div key={item.name} className="space-y-2">
                {item.hasSubmenu ? (
                  <>
                    <div className="font-medium text-lg text-gray-900">{item.name}</div>
                    <div className="space-y-2 pl-4">
                      {item.submenu?.map((subItem) => (
                        <Link
                          key={subItem.name}
                          to={subItem.href}
                          className="block text-gray-600 hover:text-marketing-500 transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    to={item.href}
                    className="block font-medium text-lg text-gray-900 hover:text-marketing-500 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          <div className="mt-8">
            <Link 
              to="/contact" 
              className="btn-primary w-full justify-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Get a Free Consultation
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
