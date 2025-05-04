
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const animationRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const logoSlicesRef = useRef<HTMLDivElement[]>([]);
  
  useEffect(() => {
    // Create logo slices animation
    const createLogoAnimation = () => {
      if (!logoRef.current) return;
      
      // Clear any existing slices
      while (logoRef.current.firstChild) {
        logoRef.current.removeChild(logoRef.current.firstChild);
      }
      
      // Number of slices to create
      const sliceCount = 15;
      logoSlicesRef.current = [];
      
      // Create slices
      for (let i = 0; i < sliceCount; i++) {
        const slice = document.createElement('div');
        slice.classList.add('logo-slice');
        slice.style.backgroundImage = `url('/lovable-uploads/fcdde558-e12c-4ec5-ae40-b9d445e1ca98.png')`;
        slice.style.backgroundSize = '100% 1500%'; // Scale to show only a portion
        slice.style.backgroundPosition = `center ${(i / (sliceCount - 1)) * 100}%`;
        slice.style.height = `${100 / sliceCount}%`;
        slice.style.top = `${(i / sliceCount) * 100}%`;
        slice.style.opacity = '0';
        slice.style.transform = 'translateX(-50px)';
        slice.style.animationDelay = `${i * 0.1}s`;
        
        logoRef.current.appendChild(slice);
        logoSlicesRef.current.push(slice);
      }
      
      // Animate slices
      setTimeout(() => {
        logoSlicesRef.current.forEach((slice, index) => {
          slice.classList.add('animate-slice');
        });
      }, 300);
    };
    
    createLogoAnimation();
    
    // Background animation for floating elements
    const animateBackground = () => {
      if (!animationRef.current) return;
      
      const circles = Array.from(animationRef.current.children);
      circles.forEach((circle, index) => {
        const htmlCircle = circle as HTMLElement;
        htmlCircle.style.transform = `translateY(${Math.sin(Date.now() / 1000 + index) * 10}px)`;
      });
      
      requestAnimationFrame(animateBackground);
    };
    
    const animationId = requestAnimationFrame(animateBackground);
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);
  
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gray-50">
      {/* Add CSS for the animation */}
      <style jsx>{`
        .logo-slice {
          position: absolute;
          width: 100%;
          left: 0;
          transition: all 0.5s ease;
        }
        
        .animate-slice {
          opacity: 1;
          transform: translateX(0);
          box-shadow: 0 0 15px rgba(0, 198, 255, 0.25);
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .hero-gradient {
          background: linear-gradient(135deg, rgba(249, 249, 249, 1) 0%, rgba(240, 240, 240, 1) 100%);
        }
      `}</style>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div ref={animationRef} className="relative w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-16 h-16 md:w-32 md:h-32 bg-white opacity-10 rounded-full"></div>
          <div className="absolute top-2/3 left-1/2 w-24 h-24 md:w-40 md:h-40 bg-blue-300 opacity-10 rounded-full"></div>
          <div className="absolute top-1/3 right-1/4 w-20 h-20 md:w-36 md:h-36 bg-blue-400 opacity-10 rounded-full"></div>
          <div className="absolute bottom-1/4 right-1/3 w-12 h-12 md:w-24 md:h-24 bg-white opacity-5 rounded-full"></div>
          <div className="absolute blob-animation w-40 h-40 md:w-64 md:h-64 top-[15%] right-[10%] bg-blue-200 opacity-5"></div>
          <div className="absolute blob-animation w-32 h-32 md:w-52 md:h-52 bottom-[15%] left-[5%] bg-white opacity-5"></div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#005b96] mb-6 animate-fade-in-up">
              Empowering Businesses with Custom AI Tools
            </h1>
            
            <p className="text-lg md:text-xl text-gray-700 mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              At AiJ Solutions, we craft automation and AI-powered software tailored to your workflow – 
              transforming complexity into clarity.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <Link to="/solutions">
                <Button className="bg-[#00c6ff] hover:bg-[#0099cc] text-white rounded-md text-lg px-8 py-6 flex items-center">
                  Explore Our Solutions
                  <ArrowRight className="ml-2" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" className="border-[#005b96] text-[#005b96] hover:bg-[#005b96] hover:text-white rounded-md text-lg px-8 py-6">
                  Let's Talk
                  <ArrowRight className="ml-2" />
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="relative w-full h-[400px] lg:h-[500px] flex items-center justify-center">
            <div ref={logoRef} className="w-full h-full max-w-md relative">
              {/* Logo slices will be dynamically inserted here */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
