
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const CaseStudies = () => {
  const cases = [
    {
      company: "Financial Tech Inc.",
      result: "150% boost in customer satisfaction",
      description: "Implemented AI chatbots to handle customer inquiries, resulting in faster response times and improved customer experience.",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
      delay: "0s"
    },
    {
      company: "LogiTech Solutions",
      result: "99% improvement in testing turnaround",
      description: "Developed AI-powered testing systems that dramatically reduced quality assurance timelines and improved product reliability.",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      delay: "0.1s"
    },
    {
      company: "Global Events Co.",
      result: "80% enhanced ticketing efficiency",
      description: "Streamlined ticketing processes with AI algorithms to optimize seating arrangements and manage capacity more effectively.",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
      delay: "0.2s"
    },
    {
      company: "Resource Management Corp.",
      result: "40% reduced cloud operating costs",
      description: "Implemented AI resource allocation to automatically scale cloud infrastructure based on actual usage patterns.",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
      delay: "0.3s"
    }
  ];
  
  return (
    <section className="section-padding bg-white" id="case-studies">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Real-World Impact</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            See how our AI solutions have transformed businesses across industries and delivered measurable results.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cases.map((caseStudy, index) => (
            <Card key={index} className="overflow-hidden border-none shadow-lg animate-fade-in-up" style={{ animationDelay: caseStudy.delay }}>
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={caseStudy.image} 
                  alt={caseStudy.company} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold">{caseStudy.company}</h3>
                  <span className="text-aij-teal font-semibold">{caseStudy.result}</span>
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
            View All Case Studies
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
