import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Solutions from '@/components/Solutions';
import Industries from '@/components/Industries';
import CTASection from '@/components/CTASection';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';
import WaveCanvas from '@/components/WaveCanvas';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      
      <Solutions />
      
      <div className="wave-section">
        <WaveCanvas height={80} />
      </div>
      
      <Industries />
      
      <CTASection />
      
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Index;
