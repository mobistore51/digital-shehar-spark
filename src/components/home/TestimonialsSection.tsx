
import React, { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
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

  const testimonials = [
    {
      id: 1,
      name: "John Mitchell",
      title: "CEO, TechStart",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
      quote: "Working with DigitalShehar has transformed our online presence. Their expertise in SEO and social media marketing has helped us reach new customers and grow our business exponentially.",
      rating: 5,
    },
    {
      id: 2,
      name: "Sarah Johnson",
      title: "Marketing Director, StyleHouse",
      image: "https://randomuser.me/api/portraits/women/2.jpg",
      quote: "The team at DigitalShehar consistently delivers exceptional results. Their strategic approach to digital marketing has helped us increase our online sales by 150% in just six months.",
      rating: 5,
    },
    {
      id: 3,
      name: "Robert Chen",
      title: "Founder, EcoLiving",
      image: "https://randomuser.me/api/portraits/men/3.jpg",
      quote: "DigitalShehar's web development services are second to none. They created a beautiful, user-friendly website for our brand that has significantly improved our conversion rate and customer engagement.",
      rating: 5,
    },
    {
      id: 4,
      name: "Priya Sharma",
      title: "COO, GlobalReach",
      image: "https://randomuser.me/api/portraits/women/4.jpg",
      quote: "I'm impressed by the creativity and professionalism of the DigitalShehar team. Their brand development services have helped us establish a strong identity in a competitive market.",
      rating: 5,
    },
  ];

  const handlePrev = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setTimeout(() => {
      setActiveIndex((prevIndex) => 
        prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
      );
      setIsAnimating(false);
    }, 300);
  };

  const handleNext = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setTimeout(() => {
      setActiveIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
      setIsAnimating(false);
    }, 300);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`h-5 w-5 ${
          index < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white relative overflow-hidden">
      <div className="container px-4">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
          <span className="inline-block bg-marketing-50 text-marketing-600 px-4 py-1 rounded-full text-sm font-medium mb-3 animate-reveal">
            Client Testimonials
          </span>
          <h2 className="heading-xl animate-reveal">
            What Our Clients Say About Us
          </h2>
          <p className="body-lg text-gray-600 mt-3 animate-reveal">
            Don't just take our word for it. Hear from our satisfied clients about their experience working with DigitalShehar.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto animate-reveal">
          <div 
            className={`glass rounded-3xl p-6 md:p-8 transition-opacity duration-300 ${
              isAnimating ? "opacity-0" : "opacity-100"
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-8">
              <div className="md:w-1/3 flex flex-col items-center md:items-start">
                <div className="w-20 h-20 rounded-full overflow-hidden mb-3">
                  <img 
                    src={testimonials[activeIndex].image} 
                    alt={testimonials[activeIndex].name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-xl font-bold">{testimonials[activeIndex].name}</h4>
                <p className="text-gray-600">{testimonials[activeIndex].title}</p>
                <div className="flex mt-2">
                  {renderStars(testimonials[activeIndex].rating)}
                </div>
              </div>
              <div className="md:w-2/3">
                <div className="text-xl md:text-2xl italic font-light text-gray-800 mb-6">
                  "{testimonials[activeIndex].quote}"
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-center mt-6">
            <button 
              onClick={handlePrev}
              className="h-12 w-12 rounded-full bg-white shadow-md flex items-center justify-center mr-4 hover:bg-marketing-50 transition-colors"
              aria-label="Previous testimonial"
            >
              <ArrowLeft className="h-5 w-5 text-gray-700" />
            </button>
            
            {/* Dots */}
            <div className="flex items-center space-x-2 mx-4">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`h-3 w-3 rounded-full transition-all duration-300 ${
                    activeIndex === index
                      ? "bg-marketing-500 w-8"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <button 
              onClick={handleNext}
              className="h-12 w-12 rounded-full bg-white shadow-md flex items-center justify-center ml-4 hover:bg-marketing-50 transition-colors"
              aria-label="Next testimonial"
            >
              <ArrowRight className="h-5 w-5 text-gray-700" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
