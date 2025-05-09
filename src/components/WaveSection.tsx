import React from 'react';
import { CanvasProvider } from '../hooks/useCanvas';
import Wave from './Wave';

interface WaveSectionProps {
  className?: string;
  height?: number;
  position?: 'top' | 'bottom' | 'both' | 'none';
}

const WaveSection: React.FC<WaveSectionProps> = ({ 
  className = '', 
  height = 300,
  position = 'both'
}) => {
  const positionClass = position === 'both' 
    ? 'wave-section' 
    : position === 'top' 
      ? 'wave-section wave-top' 
      : position === 'bottom' 
        ? 'wave-section wave-bottom' 
        : '';

  return (
    <div className={`w-full relative ${positionClass} ${className}`}>
      <CanvasProvider height={height} className="absolute inset-0">
        <Wave />
      </CanvasProvider>
    </div>
  );
};

export default WaveSection; 