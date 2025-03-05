
import React, { useEffect } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ScrollToTop from "../components/common/ScrollToTop";
import { motion } from "framer-motion";
import { CheckCircle, Users, Award, Clock, Compass } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Add metadata for better SEO
  useEffect(() => {
    document.title = "About Us | DigitalShehar";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Learn about DigitalShehar, our mission, values, and the team behind our digital marketing success stories.");
    }
  }, []);

  const coreValues = [
    {
      icon: <Users className="h-10 w-10 text-marketing-500" />,
      title: "Client-Centered",
      description: "We put our clients' needs at the center of everything we do."
    },
    {
      icon: <Award className="h-10 w-10 text-marketing-500" />,
      title: "Excellence",
      description: "We strive for excellence in every project we undertake."
    },
    {
      icon: <Clock className="h-10 w-10 text-marketing-500" />,
      title: "Timeliness",
      description: "We respect deadlines and deliver results on time."
    },
    {
      icon: <Compass className="h-10 w-10 text-marketing-500" />,
      title: "Innovation",
      description: "We embrace new technologies and innovative approaches."
    }
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
              <h1 className="heading-xl mb-6">About DigitalShehar</h1>
              <p className="body-lg text-gray-600 mb-8">
                We're a team of digital marketing experts passionate about helping businesses grow online.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="inline-block bg-marketing-50 text-marketing-600 px-4 py-1 rounded-full text-sm font-medium mb-4">
                  Our Story
                </span>
                <h2 className="heading-lg mb-6">From Small Beginnings to Digital Excellence</h2>
                <p className="body-md text-gray-600 mb-6">
                  Founded in 2015, DigitalShehar began with a simple mission: to help businesses navigate the complex world of digital marketing. What started as a small team with big dreams has grown into a comprehensive digital marketing agency serving clients across various industries.
                </p>
                <p className="body-md text-gray-600 mb-6">
                  Our journey has been marked by continuous learning, adaptation to evolving digital trends, and an unwavering commitment to delivering results for our clients. Today, we're proud to be recognized as a leader in digital marketing solutions.
                </p>
                <div className="space-y-3 mb-8">
                  {['Results-driven strategies', 'Transparent communication', 'Customized solutions', 'Continuous improvement'].map((point, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-marketing-500 mt-1 mr-3 flex-shrink-0" />
                      <p className="text-gray-700">{point}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-marketing-500/10 rounded-3xl transform -rotate-6"></div>
                <img 
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Our Team" 
                  className="relative z-10 rounded-3xl shadow-xl"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Core Values Section */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <span className="inline-block bg-marketing-50 text-marketing-600 px-4 py-1 rounded-full text-sm font-medium mb-4">
                Our Values
              </span>
              <h2 className="heading-lg mb-6">The Core Values That Drive Us</h2>
              <p className="body-md text-gray-600">
                These principles guide everything we do and how we work with our clients.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {coreValues.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white p-8 rounded-2xl shadow-md text-center"
                >
                  <div className="mx-auto w-16 h-16 bg-marketing-50 rounded-full flex items-center justify-center mb-6">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-marketing-600 text-white py-16 md:py-24">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="heading-lg mb-6">Ready to Work With Us?</h2>
              <p className="body-md opacity-80 mb-8">
                Contact us today to discuss your digital marketing needs and discover how we can help you achieve your business goals.
              </p>
              <Link to="/contact" className="btn-light">
                Get In Touch
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

export default About;
