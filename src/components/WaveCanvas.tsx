import { useRef, FC, useEffect, useState, createContext, useContext } from 'react';
import useResponsiveSize from '../hooks/useResponsiveSize';
import WaveObj from '../lib/wave';

// Create a simplified Canvas context
export const CanvasContext = createContext<{
  context: CanvasRenderingContext2D | null;
}>({
  context: null,
});

export const useCanvasContext = () => useContext(CanvasContext);

interface WaveCanvasProps {
  height?: number;
  className?: string;
  inverted?: boolean;
}

const WaveCanvas: FC<WaveCanvasProps> = ({ 
  height = 80, 
  className = '', 
  inverted = false 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { width } = useResponsiveSize();
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  let frequency = 0.013;

  // State for wave colors
  const [waveColors, setWaveColors] = useState({
    frontWave: 'rgba(0, 136, 204, 0.3)', // Default colors
    backWave: 'rgba(120, 183, 196, 0.2)',
  });

  useEffect(() => {
    // Ensure window is available before accessing styles
    if (typeof window !== 'undefined') {
      setWaveColors({
        frontWave:
          getComputedStyle(document.documentElement)
            .getPropertyValue('--wave-front')
            .trim() || 'rgba(0, 136, 204, 0.3)',
        backWave:
          getComputedStyle(document.documentElement)
            .getPropertyValue('--wave-back')
            .trim() || 'rgba(120, 183, 196, 0.2)',
      });
    }
  }, []);

  // Initialize canvas and context
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Make canvas responsive and support retina displays
    const handleResize = () => {
      canvas.width = canvas.clientWidth * 2;
      canvas.height = height * 2;
      ctx.scale(2, 2);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    setContext(ctx);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [height]);

  // Render waves
  useEffect(() => {
    if (!context) return;

    const waves = {
      frontWave: new WaveObj([0.0211, 0.028, 0.015], waveColors.frontWave),
      backWave: new WaveObj([0.0122, 0.018, 0.005], waveColors.backWave),
    };

    const render = () => {
      if (!context) return;
      
      context.clearRect(0, 0, width, height * 2);
      Object.entries(waves).forEach(([, wave]) => {
        // Use a smaller amplitude value (120 instead of 200) to make waves less tall
        wave.draw(context, width, height * 2, frequency, 120);
      });
      frequency += 0.013;
      requestAnimationFrame(render);
    };

    const animationId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animationId);
  }, [context, width, height, waveColors]);

  const transform = inverted ? 'transform rotate-180' : '';

  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <div className={`${transform}`}>
        <canvas
          ref={canvasRef}
          className="w-full block"
          style={{ height, background: 'transparent' }}
        />
      </div>
    </div>
  );
};

export default WaveCanvas; 