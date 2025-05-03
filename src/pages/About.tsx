
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const AboutPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 md:px-6 pt-32 pb-16">
        <h1 className="text-4xl font-bold mb-8">About AiJ Solutions</h1>
        <p className="text-lg mb-8">
          Our about page is coming soon. Check back to learn more about our team, mission, and vision.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;
