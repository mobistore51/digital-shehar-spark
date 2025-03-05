
import React from "react";
import { Loader2 } from "lucide-react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

export const PageLoadingState: React.FC = () => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-1 flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto text-marketing-500" />
        <p className="mt-2 text-gray-600">Loading page...</p>
      </div>
    </main>
    <Footer />
  </div>
);
