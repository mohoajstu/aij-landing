
import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const animationRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Simple animation for floating elements
    const animateCircles = () => {
      if (!animationRef.current) return;
      
      const circles = Array.from(animationRef.current.children);
      circles.forEach((circle, index) => {
        const htmlCircle = circle as HTMLElement;
        htmlCircle.style.transform = `translateY(${Math.sin(Date.now() / 1000 + index) * 10}px)`;
      });
      
      requestAnimationFrame(animateCircles);
    };
    
    const animationId = requestAnimationFrame(animateCircles);
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);
  
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden hero-gradient">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div ref={animationRef} className="relative w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-16 h-16 md:w-32 md:h-32 bg-white opacity-10 rounded-full"></div>
          <div className="absolute top-2/3 left-1/2 w-24 h-24 md:w-40 md:h-40 bg-aij-teal opacity-10 rounded-full"></div>
          <div className="absolute top-1/3 right-1/4 w-20 h-20 md:w-36 md:h-36 bg-aij-blue opacity-10 rounded-full"></div>
          <div className="absolute bottom-1/4 right-1/3 w-12 h-12 md:w-24 md:h-24 bg-white opacity-5 rounded-full"></div>
          <div className="absolute blob-animation w-40 h-40 md:w-64 md:h-64 top-[15%] right-[10%] bg-aij-teal opacity-5"></div>
          <div className="absolute blob-animation w-32 h-32 md:w-52 md:h-52 bottom-[15%] left-[5%] bg-white opacity-5"></div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in-up">
            Empowering Business Transformation with AI
          </h1>
          
          <p className="text-lg md:text-xl text-white/90 mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Discover how AI solutions can drive innovation and efficiency across your organization.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <Button className="bg-white text-aij-blue hover:bg-gray-100 text-lg px-8 py-6">
              Explore AI Solutions
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8 py-6">
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
