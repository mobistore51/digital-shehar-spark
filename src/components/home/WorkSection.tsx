
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const WorkSection = () => {
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-reveal');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, { threshold: 0.1 });

    elements.forEach(el => {
      observer.observe(el);
    });
    
    return () => {
      elements.forEach(el => {
        observer.unobserve(el);
      });
    };
  };

  useEffect(() => {
    const cleanup = animateOnScroll();
    return cleanup;
  }, []);

  const projects = [
    {
      id: 1,
      title: "E-commerce Website Redesign",
      category: "Web Development",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      link: "/work/ecommerce-redesign",
      delay: 0,
    },
    {
      id: 2,
      title: "Social Media Campaign",
      category: "Social Media Marketing",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      link: "/work/social-media-campaign",
      delay: 100,
    },
    {
      id: 3,
      title: "Brand Identity Design",
      category: "Brand Development",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      link: "/work/brand-identity",
      delay: 200,
    },
  ];

  return (
    <section className="py-10 md:py-12 bg-gray-50">
      <div className="container px-4">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <span className="inline-block bg-marketing-50 text-marketing-600 px-4 py-1 rounded-full text-sm font-medium mb-2 animate-reveal">
            Our Portfolio
          </span>
          <h2 className="text-3xl font-bold animate-reveal">
            Recent Success Stories
          </h2>
          <p className="text-gray-600 mt-2 animate-reveal">
            Take a look at some of our recent projects and see how we've helped businesses achieve their goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {projects.map((project) => (
            <Link 
              key={project.id} 
              to={project.link}
              className="group animate-reveal"
              style={{ animationDelay: `${project.delay}ms` }}
            >
              <div className="relative overflow-hidden rounded-2xl shadow-lg">
                <div className="relative h-52 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                  <span className="inline-block bg-marketing-500/20 text-marketing-50 px-3 py-1 rounded-full text-xs font-medium mb-1">
                    {project.category}
                  </span>
                  <h3 className="text-lg font-bold mb-1">{project.title}</h3>
                  <div className="flex items-center font-medium text-sm transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    View Project <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-6 md:mt-8 text-center animate-reveal">
          <Link to="/work" className="btn-primary">
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WorkSection;
