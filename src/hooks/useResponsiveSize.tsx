import { useState, useEffect } from 'react';

interface ResponsiveSize {
  width: number;
  height: number;
}

const useResponsiveSize = (): ResponsiveSize => {
  const [size, setSize] = useState<ResponsiveSize>({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return size;
};

export default useResponsiveSize; 