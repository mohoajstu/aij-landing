import React from 'react';
import { useIndustriesData } from '@/context/LandingContext';
import { MessageSquareDot, RefreshCw, Users, PieChart, Truck, Building } from 'lucide-react';

const Industries = () => {
  const industriesData = useIndustriesData();
  
  // Icon mapping
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'message-dots':
        return <MessageSquareDot className="w-8 h-8" />;
      case 'arrows-repeat':
        return <RefreshCw className="w-8 h-8" />;
      case 'users':
        return <Users className="w-8 h-8" />;
      case 'chart-pie':
        return <PieChart className="w-8 h-8" />;
      case 'truck':
        return <Truck className="w-8 h-8" />;
      case 'building':
        return <Building className="w-8 h-8" />;
      default:
        return <div className="w-8 h-8"></div>;
    }
  };

  return (
    <section className="section-padding bg-gradient-to-b from-aij-blue to-aij-teal text-white" id="industries">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{industriesData.title}</h2>
          <p className="text-lg text-white/90 max-w-3xl mx-auto">
            {industriesData.subtitle}
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {industriesData.sectors.map((sector, index) => (
            <div 
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 hover:bg-white/20 transition-colors animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-4xl mb-4">{getIcon(sector.icon)}</div>
              <h3 className="text-xl font-bold mb-2">{sector.title}</h3>
              <p className="text-white/80">{sector.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Industries;
