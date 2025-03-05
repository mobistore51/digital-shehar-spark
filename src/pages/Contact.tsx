
import React, { useEffect, useState } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ScrollToTop from "../components/common/ScrollToTop";
import { motion } from "framer-motion";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin 
} from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Add metadata for better SEO
  useEffect(() => {
    document.title = "Contact Us | DigitalShehar";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Contact DigitalShehar for your digital marketing needs. Get in touch with our team of experts.");
    }
  }, []);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Your message has been sent successfully. We'll get back to you soon!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
      setIsSubmitting(false);
    }, 1500);
  };

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
              <h1 className="heading-xl mb-6">Contact Us</h1>
              <p className="body-lg text-gray-600">
                Have questions or ready to start your next project? Get in touch with our team.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="heading-md mb-6">Get in Touch</h2>
                <p className="text-gray-600 mb-8">
                  Our team is ready to answer your questions and discuss your project requirements. Reach out to us using any of the following contact methods.
                </p>
                
                <div className="space-y-6 mb-10">
                  <div className="flex items-start">
                    <div className="mr-4 h-12 w-12 rounded-full bg-marketing-50 flex items-center justify-center flex-shrink-0">
                      <Mail className="h-6 w-6 text-marketing-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-1">Email Us</h4>
                      <a 
                        href="mailto:info@digitalshehar.com" 
                        className="text-gray-600 hover:text-marketing-600 transition-colors"
                      >
                        info@digitalshehar.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mr-4 h-12 w-12 rounded-full bg-marketing-50 flex items-center justify-center flex-shrink-0">
                      <Phone className="h-6 w-6 text-marketing-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-1">Call Us</h4>
                      <a 
                        href="tel:+919509913792" 
                        className="text-gray-600 hover:text-marketing-600 transition-colors"
                      >
                        +91 9509913792
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mr-4 h-12 w-12 rounded-full bg-marketing-50 flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-marketing-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-1">Visit Us</h4>
                      <address className="text-gray-600 not-italic">
                        Digital Marketing Agency, <br />
                        DigitalShehar.com
                      </address>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
                  <div className="flex space-x-4">
                    <a 
                      href="https://facebook.com" 
                      target="_blank" 
                      rel="noreferrer" 
                      className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-marketing-50 hover:text-marketing-600 transition-colors duration-300"
                    >
                      <Facebook className="h-5 w-5" />
                    </a>
                    <a 
                      href="https://twitter.com" 
                      target="_blank" 
                      rel="noreferrer" 
                      className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-marketing-50 hover:text-marketing-600 transition-colors duration-300"
                    >
                      <Twitter className="h-5 w-5" />
                    </a>
                    <a 
                      href="https://instagram.com" 
                      target="_blank" 
                      rel="noreferrer" 
                      className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-marketing-50 hover:text-marketing-600 transition-colors duration-300"
                    >
                      <Instagram className="h-5 w-5" />
                    </a>
                    <a 
                      href="https://linkedin.com" 
                      target="_blank" 
                      rel="noreferrer" 
                      className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-marketing-50 hover:text-marketing-600 transition-colors duration-300"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </motion.div>
              
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-2xl shadow-xl p-8"
              >
                <h2 className="heading-md mb-6">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Name <span className="text-red-500">*</span>
                      </label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        required 
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-marketing-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        required 
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-marketing-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input 
                        type="tel" 
                        id="phone" 
                        name="phone" 
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-marketing-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                        Subject <span className="text-red-500">*</span>
                      </label>
                      <select 
                        id="subject" 
                        name="subject" 
                        required 
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-marketing-500 focus:border-transparent"
                      >
                        <option value="">Select a subject</option>
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Service Inquiry">Service Inquiry</option>
                        <option value="Quote Request">Quote Request</option>
                        <option value="Partnership">Partnership</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Message <span className="text-red-500">*</span>
                    </label>
                    <textarea 
                      id="message" 
                      name="message" 
                      rows={5} 
                      required 
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-marketing-500 focus:border-transparent"
                    ></textarea>
                  </div>
                  
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="btn-primary w-full flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="heading-lg mb-6">Find Us on the Map</h2>
              <p className="body-md text-gray-600">
                Visit our office or contact us for directions.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg h-[400px] bg-gray-200">
              {/* Placeholder for map - In a real app, replace this with an actual map component */}
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-marketing-500 mx-auto mb-4" />
                  <p className="text-lg font-medium">Map Placeholder</p>
                  <p className="text-gray-600">In a real application, a Google Map would be displayed here.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Contact;
