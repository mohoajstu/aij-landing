import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { svgLogo } from '../../public/lovable-uploads/img';

const SLICE_COUNT = 100;
const SVG_HEIGHT = 500; // or whatever your SVG height is
const overlap = 2; // pixels to overlap
const CIRCLE_COUNT = 12; // More animated circles

// Generate random properties for circles
const generateCircles = () => Array.from({ length: CIRCLE_COUNT }).map((_, i) => {
  const size = Math.random() * 120 + 60; // 60px to 180px
  const colorIdx = Math.floor(Math.random() * 3);
  const colors = [
    'bg-blue-200',
    'bg-blue-300',
    'bg-blue-400',
    'bg-white',
  ];
  const color = colors[colorIdx];
  const opacity = (Math.random() * 0.15 + 0.05).toFixed(2); // 0.05 to 0.2
  const left = Math.random() * 80; // percent
  const top = Math.random() * 80; // percent
  const amplitude = Math.random() * 30 + 10; // px
  const speed = Math.random() * 1.5 + 0.5; // seconds
  return {
    size,
    color,
    opacity,
    left,
    top,
    amplitude,
    speed,
    key: i,
  };
});

const Hero = () => {
  const animationRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const slicesRef = useRef([]);
  const [phase, setPhase] = useState<'build' | 'pauseAfterBuild' | 'collapse' | 'pauseAfterCollapse'>('build');
  const [circles] = useState(generateCircles());
  
  // Mouse ripple effect on the whole hero section
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroSectionRef.current) return;
      const rect = heroSectionRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePosition({ x, y });
      // Create ripple effect
      const ripple = document.createElement('div');
      ripple.className = 'ripple';
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      heroSectionRef.current.appendChild(ripple);
      setTimeout(() => {
        ripple.remove();
      }, 1000);
    };
    heroSectionRef.current?.addEventListener('mousemove', handleMouseMove);
    return () => {
      heroSectionRef.current?.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  useEffect(() => {
    let running = true;
    const animateBuild = () => {
      slicesRef.current.forEach((el, i) => {
        if (el) {
          setTimeout(() => {
            el.style.transform = 'translateX(0)';
            el.style.opacity = '1';
          }, i * 30);
        }
      });
      setTimeout(() => {
        if (running) setPhase('pauseAfterBuild');
      }, SLICE_COUNT * 30 + 500);
    };
    const animateCollapse = () => {
      slicesRef.current.forEach((el, i) => {
        if (el) {
          setTimeout(() => {
            el.style.transform = `translateX(${i % 2 === 0 ? '-100vw' : '100vw'})`;
            el.style.opacity = '0.5';
          }, i * 30);
        }
      });
      setTimeout(() => {
        if (running) setPhase('pauseAfterCollapse');
      }, SLICE_COUNT * 30 + 500);
    };
    if (phase === 'build') {
      animateBuild();
    } else if (phase === 'pauseAfterBuild') {
      setTimeout(() => {
        if (running) setPhase('collapse');
      }, 1500);
    } else if (phase === 'collapse') {
      animateCollapse();
    } else if (phase === 'pauseAfterCollapse') {
      setTimeout(() => {
        if (running) setPhase('build');
      }, 500); // Shorter pause when offscreen
    }
    return () => { running = false; };
  }, [phase]);
  
  // Animate circles
  useEffect(() => {
    let rafId: number;
    const animate = () => {
      if (!animationRef.current) return;
      circles.forEach((circle, i) => {
        const el = animationRef.current!.children[i] as HTMLElement;
        if (el) {
          const now = Date.now() / 1000;
          el.style.transform = `translateY(${Math.sin(now * circles[i].speed + i) * circles[i].amplitude}px)`;
        }
      });
      rafId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(rafId);
  }, [circles]);
  
  const svgContent = svgLogo;

  // Create slices using pixel overlap and full off-screen collapse
  const slices = Array.from({ length: SLICE_COUNT }).map((_, i) => {
    const top = (i * SVG_HEIGHT) / SLICE_COUNT - (i === 0 ? 0 : overlap);
    const height = SVG_HEIGHT / SLICE_COUNT + (i === 0 || i === SLICE_COUNT - 1 ? overlap : 2 * overlap);

    return (
      <div
        key={i}
        ref={el => (slicesRef.current[i] = el)}
        style={{
          position: 'absolute',
          top: `${top}px`,
          left: 0,
          width: '100%',
          height: `${height}px`,
          overflow: 'hidden',
          transition: 'transform 0.3s, opacity 0.3s',
          willChange: 'transform, opacity',
          pointerEvents: 'none',
          transform: `translateX(${i % 2 === 0 ? '-100vw' : '100vw'})`,
          opacity: 0.5,
        }}
      >
        <div style={{ width: '100%', height: '100%', transform: `translateY(-${top}px)` }}>
          <div
            dangerouslySetInnerHTML={{ __html: svgContent }}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      </div>
    );
  });
  
  return (
    <section ref={heroSectionRef} className="relative min-h-screen flex items-center overflow-hidden bg-gray-50">
      {/* Add CSS for the animation */}
      <style>
        {`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .hero-gradient {
          background: linear-gradient(135deg, rgba(249, 249, 249, 1) 0%, rgba(240, 240, 240, 1) 100%);
        }
        .svg-container {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          pointer-events: none;
        }
        .svg-container object {
          width: 100%;
          height: 100%;
          max-width: 500px;
          pointer-events: none;
        }
        .ripple {
          position: absolute;
          width: 100px;
          height: 100px;
          background: radial-gradient(circle, rgba(0,198,255,0.2) 0%, rgba(0,198,255,0) 70%);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
          animation: ripple 1s ease-out;
        }
        @keyframes ripple {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(2);
            opacity: 0;
          }
        }
        `}
      </style>
      {/* Animated background elements - now covers the whole hero section */}
      <div ref={animationRef} className="absolute inset-0 w-full h-full pointer-events-none z-0">
        {circles.map((circle, i) => (
          <div
            key={i}
            className={`absolute rounded-full ${circle.color}`}
            style={{
              width: `${circle.size}px`,
              height: `${circle.size}px`,
              left: `${circle.left}%`,
              top: `${circle.top}%`,
              opacity: circle.opacity,
              zIndex: 0,
              filter: 'blur(2px)',
              transition: 'opacity 0.5s',
            }}
          />
        ))}
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
            <div style={{ position: 'relative', width: '100%', height: '100%' }} ref={svgRef}>
              <div style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                top: 0,
                left: 0,
                opacity: 0.15,
                zIndex: 0,
                pointerEvents: 'none',
                filter: 'drop-shadow(0 0 2px #222) drop-shadow(0 0 1px #222)',
              }}>
                <div
                  dangerouslySetInnerHTML={{ __html: svgContent }}
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
              {slices}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
