import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useSolutionsData } from '@/context/LandingContext';

type SolutionCardProps = {
  title: string;
  description: string;
  icon: string;
  delay: string;
  cta?: string;
  image?: string;
};

const SolutionCard = ({ title, description, icon, delay, cta, image }: SolutionCardProps) => (
  <Card className="card-hover border-none shadow-lg animate-fade-in-up flex flex-col h-full overflow-hidden" style={{ animationDelay: delay }}>
    {image && (
      <div className="w-full h-40 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-contain p-4 bg-gray-50" />
      </div>
    )}
    <CardHeader className="pb-2">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 bg-gradient-to-r from-aij-teal to-aij-blue rounded-xl flex items-center justify-center flex-shrink-0">
          <img src={`/icons/${icon}.svg`} alt={title} className="w-7 h-7 text-white" />
        </div>
        <CardTitle className="text-xl md:text-2xl font-bold">{title}</CardTitle>
      </div>
    </CardHeader>
    <CardContent className="flex-grow">
      <CardDescription className="text-base text-gray-600">
        {description}
      </CardDescription>
    </CardContent>
    <CardFooter>
      <Button variant="link" className="p-0 text-aij-blue hover:text-aij-teal flex items-center">
        {cta || "Learn more"} <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </CardFooter>
  </Card>
);

const Solutions = () => {
  const solutionsData = useSolutionsData();
  
  // Default delay values for animations
  const delays = ['0s', '0.1s', '0.2s', '0.3s', '0.4s', '0.5s'];

  return (
    <section className="section-padding bg-gray-50" id="solutions">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{solutionsData.title}</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {solutionsData.description}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutionsData.solutions.map((solution, index) => (
            <SolutionCard
              key={index}
              title={solution.title}
              description={solution.description}
              icon={solution.icon}
              cta={solution.cta}
              image={solution.image}
              delay={delays[index % delays.length]}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Solutions;
