
import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, ArrowRight } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-secondary text-white relative z-10 overflow-hidden">
      {/* Main Footer Content */}
      <div className="container-tight pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1 - About */}
          <div className="space-y-6">
            <Link to="/" className="inline-block">
              <span className="font-display text-2xl font-bold">
                <span className="text-marketing-300">Digital</span>Shehar
              </span>
            </Link>
            <p className="text-white/70">
              We're a digital marketing agency specializing in helping businesses grow their online presence and achieve remarkable results.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer" 
                className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-marketing-500 transition-colors duration-300"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noreferrer" 
                className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-marketing-500 transition-colors duration-300"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer" 
                className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-marketing-500 transition-colors duration-300"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer" 
                className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-marketing-500 transition-colors duration-300"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-white/70 hover:text-marketing-300 transition-colors flex items-center group">
                  <ArrowRight className="h-4 w-0 mr-0 opacity-0 group-hover:w-4 group-hover:mr-2 group-hover:opacity-100 transition-all duration-300" />
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white/70 hover:text-marketing-300 transition-colors flex items-center group">
                  <ArrowRight className="h-4 w-0 mr-0 opacity-0 group-hover:w-4 group-hover:mr-2 group-hover:opacity-100 transition-all duration-300" />
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-white/70 hover:text-marketing-300 transition-colors flex items-center group">
                  <ArrowRight className="h-4 w-0 mr-0 opacity-0 group-hover:w-4 group-hover:mr-2 group-hover:opacity-100 transition-all duration-300" />
                  Services
                </Link>
              </li>
              <li>
                <Link to="/industries" className="text-white/70 hover:text-marketing-300 transition-colors flex items-center group">
                  <ArrowRight className="h-4 w-0 mr-0 opacity-0 group-hover:w-4 group-hover:mr-2 group-hover:opacity-100 transition-all duration-300" />
                  Industries
                </Link>
              </li>
              <li>
                <Link to="/work" className="text-white/70 hover:text-marketing-300 transition-colors flex items-center group">
                  <ArrowRight className="h-4 w-0 mr-0 opacity-0 group-hover:w-4 group-hover:mr-2 group-hover:opacity-100 transition-all duration-300" />
                  Our Work
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-white/70 hover:text-marketing-300 transition-colors flex items-center group">
                  <ArrowRight className="h-4 w-0 mr-0 opacity-0 group-hover:w-4 group-hover:mr-2 group-hover:opacity-100 transition-all duration-300" />
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/70 hover:text-marketing-300 transition-colors flex items-center group">
                  <ArrowRight className="h-4 w-0 mr-0 opacity-0 group-hover:w-4 group-hover:mr-2 group-hover:opacity-100 transition-all duration-300" />
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Our Services</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/services/social-media-marketing" className="text-white/70 hover:text-marketing-300 transition-colors flex items-center group">
                  <ArrowRight className="h-4 w-0 mr-0 opacity-0 group-hover:w-4 group-hover:mr-2 group-hover:opacity-100 transition-all duration-300" />
                  Social Media Marketing
                </Link>
              </li>
              <li>
                <Link to="/services/web-development" className="text-white/70 hover:text-marketing-300 transition-colors flex items-center group">
                  <ArrowRight className="h-4 w-0 mr-0 opacity-0 group-hover:w-4 group-hover:mr-2 group-hover:opacity-100 transition-all duration-300" />
                  Web Development
                </Link>
              </li>
              <li>
                <Link to="/services/brand-development" className="text-white/70 hover:text-marketing-300 transition-colors flex items-center group">
                  <ArrowRight className="h-4 w-0 mr-0 opacity-0 group-hover:w-4 group-hover:mr-2 group-hover:opacity-100 transition-all duration-300" />
                  Brand Development
                </Link>
              </li>
              <li>
                <Link to="/services/seo" className="text-white/70 hover:text-marketing-300 transition-colors flex items-center group">
                  <ArrowRight className="h-4 w-0 mr-0 opacity-0 group-hover:w-4 group-hover:mr-2 group-hover:opacity-100 transition-all duration-300" />
                  Search Engine Optimization
                </Link>
              </li>
              <li>
                <Link to="/services/google-ads" className="text-white/70 hover:text-marketing-300 transition-colors flex items-center group">
                  <ArrowRight className="h-4 w-0 mr-0 opacity-0 group-hover:w-4 group-hover:mr-2 group-hover:opacity-100 transition-all duration-300" />
                  Google Ads
                </Link>
              </li>
              <li>
                <Link to="/services/facebook-ads" className="text-white/70 hover:text-marketing-300 transition-colors flex items-center group">
                  <ArrowRight className="h-4 w-0 mr-0 opacity-0 group-hover:w-4 group-hover:mr-2 group-hover:opacity-100 transition-all duration-300" />
                  Facebook Ads
                </Link>
              </li>
              <li>
                <Link to="/services/social-media-ads" className="text-white/70 hover:text-marketing-300 transition-colors flex items-center group">
                  <ArrowRight className="h-4 w-0 mr-0 opacity-0 group-hover:w-4 group-hover:mr-2 group-hover:opacity-100 transition-all duration-300" />
                  Social Media Ads
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 - Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Mail className="h-5 w-5 text-marketing-300 mt-0.5 mr-3 flex-shrink-0" />
                <a 
                  href="mailto:info@digitalshehar.com" 
                  className="text-white/70 hover:text-marketing-300 transition-colors"
                >
                  info@digitalshehar.com
                </a>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 text-marketing-300 mt-0.5 mr-3 flex-shrink-0" />
                <a 
                  href="tel:+919509913792" 
                  className="text-white/70 hover:text-marketing-300 transition-colors"
                >
                  +91 9509913792
                </a>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-marketing-300 mt-0.5 mr-3 flex-shrink-0" />
                <span className="text-white/70">
                  Digital Marketing Agency, DigitalShehar.com
                </span>
              </li>
            </ul>

            <div className="mt-6">
              <Link to="/contact" className="inline-flex items-center justify-center rounded-lg bg-marketing-500 px-5 py-3 text-base font-medium text-white shadow-sm hover:bg-marketing-400 focus:outline-none focus:ring-2 focus:ring-marketing-400 focus:ring-offset-2 transition-all duration-200">
                Get in Touch
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-white/10 text-center md:text-left md:flex items-center justify-between">
          <p className="text-white/50">
            &copy; {currentYear} DigitalShehar.com. All Rights Reserved.
          </p>
          <div className="mt-4 md:mt-0 flex items-center space-x-6 justify-center md:justify-start">
            <Link to="/privacy-policy" className="text-white/50 hover:text-marketing-300 transition-colors text-sm">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="text-white/50 hover:text-marketing-300 transition-colors text-sm">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
