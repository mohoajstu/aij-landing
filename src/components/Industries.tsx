
import React from 'react';

const Industries = () => {
  const industries = [
    {
      title: "Customer Service",
      description: "AI-powered chatbots and virtual assistants that improve response times and customer satisfaction.",
      icon: "💬"
    },
    {
      title: "Application Modernization",
      description: "Update legacy systems with AI capabilities to enhance functionality and user experience.",
      icon: "🔄"
    },
    {
      title: "Human Resources",
      description: "Streamline recruitment, onboarding, and talent management with intelligent automation.",
      icon: "👥"
    },
    {
      title: "Marketing",
      description: "Create personalized customer experiences and campaigns with AI-powered insights.",
      icon: "📊"
    },
    {
      title: "Finance",
      description: "Enhance financial forecasting, fraud detection, and process automation with AI.",
      icon: "💰"
    },
    {
      title: "IT Operations",
      description: "Improve system reliability and reduce downtime with predictive maintenance and monitoring.",
      icon: "🖥️"
    }
  ];

  return (
    <section className="section-padding bg-gradient-to-b from-aij-blue to-aij-teal text-white" id="industries">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">AI Applications Across Industries</h2>
          <p className="text-lg text-white/90 max-w-3xl mx-auto">
            Our AI solutions can be tailored to address specific challenges across various business areas and industries.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {industries.map((industry, index) => (
            <div 
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 hover:bg-white/20 transition-colors animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-4xl mb-4">{industry.icon}</div>
              <h3 className="text-xl font-bold mb-2">{industry.title}</h3>
              <p className="text-white/80">{industry.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Industries;
