
import React, { useEffect, useState } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ScrollToTop from "../components/common/ScrollToTop";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Portfolio = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Add metadata for better SEO
  useEffect(() => {
    document.title = "Our Portfolio | DigitalShehar";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Explore DigitalShehar's portfolio showcasing our successful digital marketing projects and client success stories.");
    }
  }, []);

  // Filter state
  const [filter, setFilter] = useState("all");

  // Portfolio projects data
  const projects = [
    {
      id: 1,
      title: "E-Commerce Conversion Boost",
      category: "social-media",
      image: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "Increased online sales by 150% through strategic social media marketing and targeted ad campaigns.",
      client: "Fashion Retailer"
    },
    {
      id: 2,
      title: "Corporate Website Redesign",
      category: "web-development",
      image: "https://images.unsplash.com/photo-1517292987719-0369a794ec0f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "Complete website overhaul with modern design, improved UX, and optimization for conversions.",
      client: "Financial Services Firm"
    },
    {
      id: 3,
      title: "Local Business SEO",
      category: "seo",
      image: "https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "Increased organic traffic by 200% and improved local search rankings for key industry terms.",
      client: "Restaurant Chain"
    },
    {
      id: 4,
      title: "Brand Identity Development",
      category: "branding",
      image: "https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "Created comprehensive brand identity including logo, color palette, typography, and brand guidelines.",
      client: "Tech Startup"
    },
    {
      id: 5,
      title: "Lead Generation Campaign",
      category: "advertising",
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "Generated 500+ qualified leads per month through strategic PPC and content marketing.",
      client: "B2B Software Company"
    },
    {
      id: 6,
      title: "Social Media Growth",
      category: "social-media",
      image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "Grew Instagram following from 5K to 50K in 6 months with strategic content and engagement tactics.",
      client: "Beauty Brand"
    },
  ];

  // Filter projects based on selected category
  const filteredProjects = filter === "all" 
    ? projects 
    : projects.filter(project => project.category === filter);

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
              <h1 className="heading-xl mb-6">Our Portfolio</h1>
              <p className="body-lg text-gray-600 mb-8">
                Explore our case studies and see how we've helped businesses achieve their digital marketing goals.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container">
            {/* Filters */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <button 
                onClick={() => setFilter("all")}
                className={`px-6 py-2 rounded-full transition-all ${filter === "all" ? "bg-marketing-500 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-700"}`}
              >
                All
              </button>
              <button 
                onClick={() => setFilter("social-media")}
                className={`px-6 py-2 rounded-full transition-all ${filter === "social-media" ? "bg-marketing-500 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-700"}`}
              >
                Social Media
              </button>
              <button 
                onClick={() => setFilter("web-development")}
                className={`px-6 py-2 rounded-full transition-all ${filter === "web-development" ? "bg-marketing-500 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-700"}`}
              >
                Web Development
              </button>
              <button 
                onClick={() => setFilter("seo")}
                className={`px-6 py-2 rounded-full transition-all ${filter === "seo" ? "bg-marketing-500 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-700"}`}
              >
                SEO
              </button>
              <button 
                onClick={() => setFilter("branding")}
                className={`px-6 py-2 rounded-full transition-all ${filter === "branding" ? "bg-marketing-500 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-700"}`}
              >
                Branding
              </button>
              <button 
                onClick={() => setFilter("advertising")}
                className={`px-6 py-2 rounded-full transition-all ${filter === "advertising" ? "bg-marketing-500 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-700"}`}
              >
                Advertising
              </button>
            </div>

            {/* Project Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="relative h-60 overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-xs font-semibold uppercase tracking-wider text-marketing-500 bg-marketing-50 rounded-full px-3 py-1">
                      {project.category.replace("-", " ")}
                    </span>
                    <h3 className="text-xl font-bold mt-3 mb-2">{project.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{project.description}</p>
                    <p className="text-sm text-gray-500">Client: {project.client}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-marketing-50 py-16 md:py-24">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="heading-lg mb-6">Ready to Be Our Next Success Story?</h2>
              <p className="body-md text-gray-600 mb-8">
                Contact us today to discuss how we can help your business achieve remarkable results.
              </p>
              <Link to="/contact" className="btn-primary">
                Start Your Project
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

export default Portfolio;
