import React, { createContext, useContext, useRef, useEffect, ReactNode } from 'react';

interface CanvasContextType {
  context: CanvasRenderingContext2D | null;
  canvas: HTMLCanvasElement | null;
}

const CanvasContext = createContext<CanvasContextType>({
  context: null,
  canvas: null,
});

interface CanvasProviderProps {
  children: ReactNode;
  className?: string;
  height?: number;
}

export const CanvasProvider: React.FC<CanvasProviderProps> = ({ 
  children, 
  className = '',
  height = 600
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [context, setContext] = React.useState<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Make canvas responsive
    const handleResize = () => {
      canvas.width = canvas.clientWidth * 2;
      canvas.height = height * 2;
      ctx.scale(2, 2); // Retina display support
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    setContext(ctx);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [height]);

  return (
    <>
      <canvas 
        ref={canvasRef} 
        className={`w-full ${className}`}
        style={{ height }}
      />
      <CanvasContext.Provider value={{ context, canvas: canvasRef.current }}>
        {children}
      </CanvasContext.Provider>
    </>
  );
};

export const useCanvasContext = () => useContext(CanvasContext); 