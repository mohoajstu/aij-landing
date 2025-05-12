import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { svgLogo } from '../../public/imgs/img';
import '../styles/Hero.css';

const SLICE_COUNT = 100;
const SVG_HEIGHT = 500;
const overlap = 2;
const CIRCLE_COUNT = 8; // Reduced for better mobile performance

// Generate random properties for circles with mobile optimization
const generateCircles = () => Array.from({ length: CIRCLE_COUNT }).map((_, i) => {
  const size = Math.random() * 80 + 40; // Smaller sizes for mobile
  const colorIdx = Math.floor(Math.random() * 3);
  const colors = [
    'bg-blue-200',
    'bg-blue-300',
    'bg-blue-400',
    'bg-white',
  ];
  const color = colors[colorIdx];
  const opacity = (Math.random() * 0.1 + 0.05).toFixed(2); // Reduced opacity for better contrast
  const left = Math.random() * 80;
  const top = Math.random() * 80;
  const amplitude = Math.random() * 20 + 5; // Reduced amplitude for smoother animation
  const speed = Math.random() * 1.2 + 0.5;
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
  
  // Touch and mouse ripple effect
  useEffect(() => {
    const handleInteraction = (e: MouseEvent | TouchEvent) => {
      if (!heroSectionRef.current) return;
      const rect = heroSectionRef.current.getBoundingClientRect();
      const x = 'touches' in e ? e.touches[0].clientX - rect.left : (e as MouseEvent).clientX - rect.left;
      const y = 'touches' in e ? e.touches[0].clientY - rect.top : (e as MouseEvent).clientY - rect.top;
      setMousePosition({ x, y });
      
      const ripple = document.createElement('div');
      ripple.className = 'ripple';
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      heroSectionRef.current.appendChild(ripple);
      setTimeout(() => ripple.remove(), 1000);
    };

    heroSectionRef.current?.addEventListener('mousemove', handleInteraction);
    heroSectionRef.current?.addEventListener('touchmove', handleInteraction);
    
    return () => {
      heroSectionRef.current?.removeEventListener('mousemove', handleInteraction);
      heroSectionRef.current?.removeEventListener('touchmove', handleInteraction);
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
        className="svg-slice"
        style={{
          top: `${top}px`,
          height: `${height}px`,
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
    <section ref={heroSectionRef} className="hero-section" style={{ background: '#ffffff' }}>
      {/* Animated background elements */}
      <div ref={animationRef} className="animation-container">
        {circles.map((circle, i) => (
          <div
            key={i}
            className={`bg-circle ${circle.color}`}
            style={{
              width: `${circle.size}px`,
              height: `${circle.size}px`,
              left: `${circle.left}%`,
              top: `${circle.top}%`,
              opacity: circle.opacity,
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 content-container">
        <div className="hero-content-grid">
          <div>
            <h1 className="hero-title">
              Empowering Businesses with Custom AI Tools
            </h1>
            <p className="hero-description">
              At AiJ Solutions, we craft automation and AI-powered software tailored to your workflow – 
              transforming complexity into clarity.
            </p>
            <div className="hero-buttons">
              <Link to="/solutions">
                <button className="hero-btn primary-btn">
                  Explore Our Solutions
                  <ArrowRight className="btn-icon" />
                </button>
              </Link>
              <Link to="/contact">
                <button className="hero-btn secondary-btn">
                  Let's Talk
                  <ArrowRight className="btn-icon" />
                </button>
              </Link>
            </div>
          </div>
          
          <div className="illustration-container">
            <div className="svg-container" ref={svgRef}>
              <div 
                className="svg-background"
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  top: 0,
                  left: 0,
                  opacity: 0.15,
                  zIndex: 0,
                  pointerEvents: 'none',
                  filter: 'drop-shadow(0 0 2px #222) drop-shadow(0 0 1px #222)',
                }}
              >
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
