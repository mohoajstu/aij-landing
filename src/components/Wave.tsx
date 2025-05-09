import { FC, useEffect, useState } from 'react';

import { useCanvasContext } from '../hooks/useCanvas';
import useResponsiveSize from '../hooks/useResponsiveSize';
import WaveObj from '../lib/wave';

const Wave: FC = () => {
  const { context } = useCanvasContext();
  const { width } = useResponsiveSize();
  const height = 10;
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

  const waves = {
    frontWave: new WaveObj([0.0211, 0.028, 0.015], waveColors.frontWave),
    backWave: new WaveObj([0.0122, 0.018, 0.005], waveColors.backWave),
  };

  const render = () => {
    context?.clearRect(0, 0, width, height);
    Object.entries(waves).forEach(([, wave]) => {
      wave.draw(context!, width, height, frequency);
    });
    frequency += 0.013;
    requestAnimationFrame(render);
  };
  
  useEffect(() => {
    if (context) {
      const animationId = requestAnimationFrame(render);
      return () => cancelAnimationFrame(animationId);
    }
  }, [context, width]);
  
  return null;
};

export default Wave; 