
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

type SolutionCardProps = {
  title: string;
  description: string;
  icon: string;
  delay: string;
};

const SolutionCard = ({ title, description, icon, delay }: SolutionCardProps) => (
  <Card className="card-hover border-none shadow-lg animate-fade-in-up" style={{ animationDelay: delay }}>
    <CardHeader className="pb-2">
      <div className="w-16 h-16 mb-4 bg-gradient-to-r from-aij-teal to-aij-blue rounded-xl flex items-center justify-center">
        <img src={icon} alt={title} className="w-8 h-8 text-white" />
      </div>
      <CardTitle className="text-2xl font-bold">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <CardDescription className="text-base text-gray-600 min-h-[100px]">
        {description}
      </CardDescription>
    </CardContent>
    <CardFooter>
      <Button variant="link" className="p-0 text-aij-blue hover:text-aij-teal flex items-center">
        Learn more <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </CardFooter>
  </Card>
);

const Solutions = () => {
  const solutions = [
    {
      title: "AI Assistants",
      description: "Customizable AI entities that automate tasks and enhance productivity across your organization.",
      icon: "/placeholder.svg", // You can replace with actual icons later
      delay: "0s"
    },
    {
      title: "Advanced AI Models",
      description: "Scalable AI models tailored specifically for your unique business applications and needs.",
      icon: "/placeholder.svg",
      delay: "0.1s"
    },
    {
      title: "AI Consulting",
      description: "Expert guidance to redesign workflows and implement AI strategies effectively.",
      icon: "/placeholder.svg",
      delay: "0.2s"
    },
    {
      title: "AI Infrastructure",
      description: "Scalable and optimized infrastructure solutions to support AI workloads and applications.",
      icon: "/placeholder.svg",
      delay: "0.3s"
    },
    {
      title: "Process Automation",
      description: "Streamline repetitive tasks and workflows with intelligent automation solutions.",
      icon: "/placeholder.svg",
      delay: "0.4s"
    },
    {
      title: "Custom Software",
      description: "Tailored software applications that leverage AI to solve your specific business challenges.",
      icon: "/placeholder.svg",
      delay: "0.5s"
    }
  ];

  return (
    <section className="section-padding bg-gray-50" id="solutions">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">AI Solutions Overview</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We provide a comprehensive range of AI solutions designed to transform how your business operates and competes in today's digital landscape.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <SolutionCard
              key={index}
              title={solution.title}
              description={solution.description}
              icon={solution.icon}
              delay={solution.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Solutions;
