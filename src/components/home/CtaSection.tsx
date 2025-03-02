
import React, { FormEvent, useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { toast } from "sonner";

const CtaSection = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setEmail("");
      setName("");
      setMessage("");
      
      toast("Thank you for your message", {
        description: "We'll get back to you as soon as possible.",
        icon: <Check className="h-4 w-4 text-green-500" />,
      });
    }, 1500);
  };

  return (
    <section className="section-padding bg-marketing-600 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-marketing-400 rounded-full -translate-y-1/2 translate-x-1/2 opacity-20 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-marketing-700 rounded-full translate-y-1/2 -translate-x-1/2 opacity-20 blur-3xl"></div>
      
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <span className="inline-block bg-white/10 text-white/90 px-4 py-1 rounded-full text-sm font-medium mb-4 animate-reveal">
              Get Started Today
            </span>
            <h2 className="heading-xl text-white animate-reveal">
              Ready to Transform Your Digital Presence?
            </h2>
            <p className="body-lg text-white/80 mt-4 mb-6 animate-reveal">
              Contact us today for a free consultation and learn how our digital marketing services can help your business grow.
            </p>
            
            <div className="space-y-4 mb-8 animate-reveal">
              <div className="flex items-start">
                <div className="bg-white/10 rounded-full p-1 mt-1 mr-4">
                  <Check className="h-4 w-4 text-white" />
                </div>
                <p className="text-white/90">Expert team ready to help you succeed</p>
              </div>
              <div className="flex items-start">
                <div className="bg-white/10 rounded-full p-1 mt-1 mr-4">
                  <Check className="h-4 w-4 text-white" />
                </div>
                <p className="text-white/90">Customized strategies for your specific needs</p>
              </div>
              <div className="flex items-start">
                <div className="bg-white/10 rounded-full p-1 mt-1 mr-4">
                  <Check className="h-4 w-4 text-white" />
                </div>
                <p className="text-white/90">Measurable results and transparent reporting</p>
              </div>
            </div>
          </div>
          
          {/* Form */}
          <div className="animate-reveal">
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl">
              <h3 className="heading-md mb-6">Get a Free Consultation</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-marketing-400 focus:border-marketing-400 transition-colors"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-marketing-400 focus:border-marketing-400 transition-colors"
                    placeholder="john@example.com"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-marketing-400 focus:border-marketing-400 transition-colors"
                    placeholder="Tell us about your project..."
                    required
                  />
                </div>
                <button
                  type="submit"
                  className={`w-full px-6 py-3 bg-marketing-500 text-white font-medium rounded-lg shadow hover:bg-marketing-600 focus:outline-none focus:ring-2 focus:ring-marketing-400 focus:ring-offset-2 transition-colors flex items-center justify-center ${
                    isSubmitting ? "opacity-80 cursor-not-allowed" : ""
                  }`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      Get Started <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
