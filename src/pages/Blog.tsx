
import React, { useEffect, useState } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ScrollToTop from "../components/common/ScrollToTop";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Search, Calendar, User, ArrowRight } from "lucide-react";

const Blog = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Add metadata for better SEO
  useEffect(() => {
    document.title = "Blog | DigitalShehar";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Explore DigitalShehar's blog for the latest insights, tips, and trends in digital marketing.");
    }
  }, []);

  // Search state
  const [searchTerm, setSearchTerm] = useState("");

  // Blog posts data
  const blogPosts = [
    {
      id: 1,
      title: "10 Ways to Improve Your Social Media Strategy",
      excerpt: "Learn effective strategies to enhance your social media presence and engage with your audience.",
      category: "Social Media",
      image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      author: "Sarah Johnson",
      date: "May 15, 2023",
      slug: "improve-social-media-strategy"
    },
    {
      id: 2,
      title: "The Ultimate Guide to SEO in 2024",
      excerpt: "Stay ahead of the competition with the latest SEO techniques and algorithm updates.",
      category: "SEO",
      image: "https://images.unsplash.com/photo-1432888622747-4eb9a8f5a70d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      author: "Michael Chen",
      date: "June 3, 2023",
      slug: "seo-guide-2024"
    },
    {
      id: 3,
      title: "How to Create a Content Marketing Strategy That Works",
      excerpt: "Develop a content marketing plan that drives traffic, engages your audience, and converts leads.",
      category: "Content Marketing",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      author: "Alex Rivera",
      date: "July 12, 2023",
      slug: "content-marketing-strategy"
    },
    {
      id: 4,
      title: "Email Marketing Best Practices for Higher Open Rates",
      excerpt: "Improve your email open rates and engagement with these proven best practices.",
      category: "Email Marketing",
      image: "https://images.unsplash.com/photo-1596558450255-7c0b7be9d56a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      author: "Emma Wilson",
      date: "August 22, 2023",
      slug: "email-marketing-practices"
    },
    {
      id: 5,
      title: "Web Design Trends to Watch in 2024",
      excerpt: "Discover the latest web design trends that are shaping the digital landscape this year.",
      category: "Web Design",
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      author: "Daniel Kim",
      date: "September 9, 2023",
      slug: "web-design-trends-2024"
    },
    {
      id: 6,
      title: "How to Measure ROI on Your Digital Marketing Campaigns",
      excerpt: "Learn effective methods to track and measure the return on investment for your marketing efforts.",
      category: "Digital Marketing",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      author: "Rachel Patel",
      date: "October 18, 2023",
      slug: "measure-digital-marketing-roi"
    },
  ];

  // Filter blog posts based on search term
  const filteredPosts = blogPosts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              <h1 className="heading-xl mb-6">Our Blog</h1>
              <p className="body-lg text-gray-600 mb-8">
                Insights, tips, and trends to help you succeed in the digital world.
              </p>
              <div className="relative max-w-md mx-auto">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="pl-10 pr-4 py-3 w-full rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-marketing-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Blog Posts Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post, index) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <Link to={`/blog/${post.slug}`} className="block">
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={post.image} 
                          alt={post.title} 
                          className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                        />
                        <span className="absolute top-4 left-4 bg-marketing-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                          {post.category}
                        </span>
                      </div>
                    </Link>
                    <div className="p-6">
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span className="mr-4">{post.date}</span>
                        <User className="h-4 w-4 mr-1" />
                        <span>{post.author}</span>
                      </div>
                      <Link to={`/blog/${post.slug}`} className="block">
                        <h3 className="text-xl font-bold mb-2 hover:text-marketing-600 transition-colors">
                          {post.title}
                        </h3>
                      </Link>
                      <p className="text-gray-600 mb-4">{post.excerpt}</p>
                      <Link
                        to={`/blog/${post.slug}`}
                        className="text-marketing-600 font-medium hover:text-marketing-700 inline-flex items-center group"
                      >
                        Read More
                        <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-2 transition-transform" />
                      </Link>
                    </div>
                  </motion.article>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <h3 className="text-xl font-semibold mb-2">No articles found</h3>
                  <p className="text-gray-600">Try adjusting your search criteria.</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="bg-marketing-50 py-16 md:py-24">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="heading-lg mb-6">Subscribe to Our Newsletter</h2>
              <p className="body-md text-gray-600 mb-8">
                Stay updated with the latest digital marketing insights, trends, and tips delivered straight to your inbox.
              </p>
              <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-marketing-500 focus:border-transparent"
                  required
                />
                <button
                  type="submit"
                  className="btn-primary whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Blog;
