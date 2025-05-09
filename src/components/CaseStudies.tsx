import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCaseStudiesData } from '@/context/LandingContext';

const CaseStudies = () => {
  const caseStudiesData = useCaseStudiesData();
  
  // Default delays for animations
  const delays = ['0s', '0.1s', '0.2s', '0.3s'];
  
  return (
    <section className="section-padding bg-white" id="case-studies">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{caseStudiesData.title}</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {caseStudiesData.description}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {caseStudiesData.cases.map((caseStudy, index) => (
            <Card key={index} className="overflow-hidden border-none shadow-lg animate-fade-in-up" style={{ animationDelay: delays[index % delays.length] }}>
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={caseStudy.image || "https://images.unsplash.com/photo-1605810230434-7631ac76ec81"} 
                  alt={caseStudy.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold">{caseStudy.title}</h3>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{caseStudy.description}</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="border-aij-blue text-aij-blue hover:bg-aij-blue hover:text-white">
                  Read Case Study
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button className="bg-aij-blue hover:bg-aij-teal text-white px-8 py-6 text-lg">
            {caseStudiesData.ctaText || "View All Case Studies"}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
