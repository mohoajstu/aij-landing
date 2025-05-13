import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface FounderProps {
  name: string;
  title: string;
  role: string;
  bio: string;
  image: string;
}

const Founder: React.FC<FounderProps> = ({ name, title, role, bio, image }) => {
  return (
    <Card className="overflow-hidden">
      <div className="flex justify-center pt-6">
        <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-aij-blue">
          <img 
            src={image} 
            alt={`${name} - ${title}`} 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <CardHeader>
        <h3 className="text-xl font-bold text-center">{name}</h3>
        <p className="text-aij-blue font-medium text-center">{title} - {role}</p>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700">{bio}</p>
      </CardContent>
    </Card>
  );
};

const AboutPage = () => {
  const founders = [
    {
      name: "Mohammed Abdul Jabbar",
      title: "CTO",
      role: "Founder",
      bio: "With extensive experience in AI and software development, Mohammed leads our technical strategy and innovation. His vision drives our cutting-edge solutions that transform businesses across industries.",
      image: "/team/moho.jpg"
    },
    {
      name: "Ovaise Murtuza",
      title: "CFO",
      role: "Founder",
      bio: "Ovaise brings financial expertise and strategic insight to AiJ Solutions. His leadership ensures sustainable growth while delivering maximum value to our clients and stakeholders.",
      image: "/team/ovaise-murtuza.jpeg"
    },
    {
      name: "Ibrahim Murtuza",
      title: "COO",
      role: "Founder",
      bio: "Ibrahim oversees our day-to-day operations with a focus on efficiency and excellence. His operational expertise ensures seamless delivery of solutions that exceed client expectations.",
      image: "/team/ibrahim-murtuza.jpeg"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>About Us | AiJ Solutions</title>
        <meta name="description" content="Learn about AiJ Solutions, our mission, and the team behind our innovative AI solutions." />
      </Helmet>
      <Navbar />
      <div className="container mx-auto px-4 md:px-6 pt-24 pb-16">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-aij-blue">About AiJ Solutions</h1>
          
          <section className="mb-16">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <div className="bg-blue-50 p-6 rounded-lg">
              <p className="text-lg text-gray-700">
                At AiJ Solutions, we're committed to democratizing AI technology by creating accessible, 
                ethical, and innovative solutions that empower organizations to thrive in the digital age. 
                We bridge the gap between cutting-edge AI capabilities and practical business applications, 
                delivering customized tools that solve real-world challenges across diverse industries.
              </p>
            </div>
          </section>
        </div>
        
        <section>
          <h2 className="text-2xl font-semibold mb-8 text-center">Our Leadership Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {founders.map((founder, index) => (
              <Founder key={index} {...founder} />
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;
