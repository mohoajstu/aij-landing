import React, { createContext, useContext, ReactNode } from 'react';
import landingData from '../data/landing.json';

// Define the type for our landing page data
export type LandingDataType = typeof landingData;

// Create context with default value
const LandingContext = createContext<LandingDataType>(landingData);

// Provider component
interface LandingProviderProps {
  children: ReactNode;
  data?: LandingDataType;
}

export const LandingProvider: React.FC<LandingProviderProps> = ({ 
  children, 
  data = landingData 
}) => {
  return (
    <LandingContext.Provider value={data}>
      {children}
    </LandingContext.Provider>
  );
};

// Custom hook to use the landing data
export const useLandingData = () => useContext(LandingContext);

// Helper hooks for specific sections
export const useSolutionsData = () => {
  const data = useContext(LandingContext);
  return data.solutions;
};

export const useCaseStudiesData = () => {
  const data = useContext(LandingContext);
  return data.caseStudies;
};

export const useIndustriesData = () => {
  const data = useContext(LandingContext);
  return data.industries;
}; 