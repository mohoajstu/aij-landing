
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const CaseStudiesPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 md:px-6 pt-32 pb-16">
        <h1 className="text-4xl font-bold mb-8">Case Studies</h1>
        <p className="text-lg mb-8">
          Our detailed case studies page is coming soon. Check back to explore how we've helped businesses transform with AI.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default CaseStudiesPage;
