
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export const DefaultLayout: React.FC<LayoutProps> = ({ children }) => (
  <div className="container max-w-4xl mx-auto px-4 py-12">{children}</div>
);

export const LandingLayout: React.FC<LayoutProps> = ({ children }) => (
  <div className="container mx-auto px-4 py-6">{children}</div>
);

export const FullWidthLayout: React.FC<LayoutProps> = ({ children }) => (
  <div className="container max-w-6xl mx-auto px-4 py-12">{children}</div>
);

export const SidebarLayout: React.FC<LayoutProps> = ({ children }) => (
  <div className="container max-w-6xl mx-auto px-4 py-12">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">{children}</div>
      <div className="space-y-6">
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/" className="text-marketing-600 hover:underline">Home</a></li>
            <li><a href="/about" className="text-marketing-600 hover:underline">About Us</a></li>
            <li><a href="/services" className="text-marketing-600 hover:underline">Services</a></li>
            <li><a href="/contact" className="text-marketing-600 hover:underline">Contact Us</a></li>
          </ul>
        </div>
        <div className="bg-marketing-50 p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-bold mb-4">Need Help?</h3>
          <p className="mb-4">Contact our team for assistance with your digital marketing needs.</p>
          <a href="/contact" className="btn-primary inline-block">Contact Us</a>
        </div>
      </div>
    </div>
  </div>
);
