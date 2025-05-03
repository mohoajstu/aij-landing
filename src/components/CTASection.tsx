
import React from 'react';
import { Button } from '@/components/ui/button';

const CTASection = () => {
  return (
    <section className="section-padding bg-aij-blue relative overflow-hidden" id="contact">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute blob-animation w-64 h-64 md:w-96 md:h-96 -top-24 -right-24 bg-aij-teal opacity-10"></div>
        <div className="absolute blob-animation w-64 h-64 md:w-96 md:h-96 -bottom-24 -left-24 bg-white opacity-5"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 animate-fade-in-up">
            Ready to Transform Your Business with AI?
          </h2>
          
          <p className="text-lg md:text-xl text-white/80 mb-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Contact us today for a personalized consultation and discover how our AI solutions can address your specific business challenges.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <Button className="bg-white text-aij-blue hover:bg-gray-100 text-lg px-8 py-6">
              Schedule a Consultation
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8 py-6">
              Explore Solutions
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
