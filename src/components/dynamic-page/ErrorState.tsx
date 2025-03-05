
import React from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

interface ErrorStateProps {
  error: string | null;
}

export const PageErrorState: React.FC<ErrorStateProps> = ({ error }) => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-1 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800">Error</h1>
        <p className="mt-2 text-gray-600">{error || 'Page not found'}</p>
      </div>
    </main>
    <Footer />
  </div>
);
