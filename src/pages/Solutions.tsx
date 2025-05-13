import React, { useRef, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Building, Briefcase, HeartPulse, ShoppingBag, ChevronRight } from 'lucide-react';
import '@/styles/Solutions.css';

// Define the industry solutions data
const industriesData = [
  {
    id: "education",
    name: "Education",
    icon: <BookOpen className="h-5 w-5 mr-2" />,
    description: "Transforming learning experiences with AI-powered educational tools and platforms.",
    clients: [
      {
        name: "Nur al Huda",
        logo: "/clients/Nuralhuda.png",
        description: "An Islamic education platform that bridges traditional Islamic education with the modern world by providing AI-driven tools and resources for learners of all ages.",
        challenge: "Needed to make traditional Islamic knowledge more accessible and engaging for contemporary learners while maintaining authenticity and scholarly integrity.",
        solution: "Developed presentation automation and specialized AI tools for educators that streamline content creation and delivery while preserving the depth and authenticity of Islamic teachings.",
        results: [
          "Increased student engagement by 45%",
          "Streamlined administrative processes through automation",
          "Successfully integrated AI with traditional teaching methods",
          "Expanded accessibility with multi-language support"
        ],
        testimonial: {
          quote: "AiJ Solutions transformed our educational approach by seamlessly integrating AI with traditional Islamic teaching methods, making knowledge more accessible and engaging for future generations.",
          author: "Nur al Huda"
        }
      },
      {
        name: "Tarbiyal Learning Academy",
        logo: "/clients/TLA_logo_simple.svg",
        description: "A modern educational institution focused on blending traditional Islamic knowledge with contemporary teaching methods.",
        challenge: "Struggled with managing student data across multiple programs and tracking individual learning journeys.",
        solution: "Implemented a comprehensive school management system with integrated attendance tracking, enabling real-time monitoring of student participation and progress.",
        results: [
          "Personalized learning paths for 500+ students",
          "Reduced administrative workload by 30%",
          "Improved student retention rates by 25%"
        ],
        testimonial: {
          quote: "The custom solutions provided by AiJ have revolutionized how we approach education and student development.",
          author: "Academic Director, Tarbiyal Learning Academy"
        }
      }
    ]
  },
  {
    id: "healthcare",
    name: "Healthcare",
    icon: <HeartPulse className="h-5 w-5 mr-2" />,
    description: "Enhancing patient care and operational efficiency with intelligent healthcare solutions.",
    clients: []
  },
  {
    id: "finance",
    name: "Finance",
    icon: <Briefcase className="h-5 w-5 mr-2" />,
    description: "Optimizing financial operations and decision-making with data-driven AI tools.",
    clients: []
  },
  {
    id: "retail",
    name: "Retail",
    icon: <ShoppingBag className="h-5 w-5 mr-2" />,
    description: "Elevating customer experiences and inventory management with smart retail solutions.",
    clients: []
  },
  {
    id: "corporate",
    name: "Corporate",
    icon: <Building className="h-5 w-5 mr-2" />,
    description: "Streamlining business processes and enhancing productivity with enterprise AI solutions.",
    clients: []
  }
];

const SolutionsPage = () => {
  // Reference to the active tab
  const activeTabRef = useRef<HTMLButtonElement | null>(null);
  const tabsListRef = useRef<HTMLDivElement | null>(null);
  const [showScrollHint, setShowScrollHint] = useState(true);
  const [hasScrolled, setHasScrolled] = useState(false);
  
  // Function to scroll active tab into view
  const scrollActiveTabIntoView = () => {
    if (activeTabRef.current) {
      activeTabRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start'
      });
    }
  };
  
  // Effect to handle scroll behavior and hints
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-state') {
          const target = mutation.target as HTMLElement;
          if (target.getAttribute('data-state') === 'active') {
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'nearest',
              inline: 'start'
            });
          }
        }
      });
    });
    
    const tabs = document.querySelectorAll('[role="tab"]');
    tabs.forEach(tab => {
      observer.observe(tab, { attributes: true });
      if (tab.getAttribute('data-state') === 'active') {
        activeTabRef.current = tab as HTMLButtonElement;
        
        // Initial positioning to ensure we start with the first two tabs visible
        if (!hasScrolled) {
          const tabsList = tabsListRef.current;
          if (tabsList) {
            tabsList.scrollLeft = 0;
          }
          
          setTimeout(() => {
            scrollActiveTabIntoView();
          }, 100);
        }
      }
    });
    
    // Hide scroll hint after user scrolls
    const handleScroll = () => {
      if (showScrollHint) {
        setShowScrollHint(false);
      }
      setHasScrolled(true);
    };
    
    const tabsList = tabsListRef.current;
    if (tabsList) {
      tabsList.addEventListener('scroll', handleScroll);
      
      // Ensure we start at scroll position 0 for initial load
      tabsList.scrollLeft = 0;
    }
    
    return () => {
      observer.disconnect();
      if (tabsList) {
        tabsList.removeEventListener('scroll', handleScroll);
      }
    };
  }, [showScrollHint, hasScrolled]);
  
  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>AI Solutions | AiJ Solutions</title>
        <meta name="description" content="Explore our industry specific AI solutions that transform businesses across education, healthcare, finance, retail, and corporate sectors." />
      </Helmet>
      <Navbar />
      <div className="w-full max-w-full px-4 md:container md:mx-auto md:px-6 pt-24 pb-16">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-aij-blue">Industry Specific AI Solutions</h1>
          <p className="text-lg text-gray-700">
            We craft custom AI solutions tailored to the unique challenges of different industries. 
            Explore our work and discover how we've helped organizations transform their operations.
          </p>
        </div>
        
        <Tabs defaultValue="education" className="w-full">
          <div className={`tabs-list-container ${showScrollHint ? 'has-scroll-hint' : ''}`}>
            <TabsList className="md:grid md:grid-cols-5 gap-2 mb-8" ref={tabsListRef}>
              {industriesData.map((industry, index) => (
                <TabsTrigger 
                  key={industry.id} 
                  value={industry.id}
                  className="tab-trigger flex items-center justify-center"
                  ref={industry.id === "education" ? activeTabRef : undefined}
                >
                  {industry.icon}
                  <span>{industry.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>
            {industriesData.length > 2 && showScrollHint && (
              <div className="scroll-hint md:hidden">
                <ChevronRight size={18} />
              </div>
            )}
          </div>
          
          {industriesData.map((industry) => (
            <TabsContent key={industry.id} value={industry.id} className="space-y-8">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h2 className="text-2xl font-semibold text-aij-blue mb-2">AI Solutions for {industry.name}</h2>
                <p className="text-gray-700">{industry.description}</p>
              </div>
              
              {industry.clients.length > 0 ? (
                <div className="space-y-8">
                  <h3 className="text-xl font-semibold">Client Success Stories</h3>
                  {industry.clients.map((client, index) => (
                    <Card key={index} className="overflow-hidden solution-card">
                      <CardHeader className="bg-gradient-to-r from-blue-50 to-white card-header">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                          <div>
                            <CardTitle>{client.name}</CardTitle>
                            <CardDescription className="mt-2">{client.description}</CardDescription>
                          </div>
                          <div className="h-16 w-16 flex-shrink-0 mt-4 md:mt-0">
                            <img 
                              src={client.logo} 
                              alt={`${client.name} logo`} 
                              className="h-full w-full object-contain"
                            />
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-6 card-content">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-medium text-aij-blue mb-2">Challenge</h4>
                            <p className="text-gray-700">{client.challenge}</p>
                          </div>
                          <div>
                            <h4 className="font-medium text-aij-blue mb-2">Our Solution</h4>
                            <p className="text-gray-700">{client.solution}</p>
                          </div>
                        </div>
                        
                        <div className="mt-6">
                          <h4 className="font-medium text-aij-blue mb-2">Results</h4>
                          <ul className="list-disc pl-5 space-y-1 results-list">
                            {client.results.map((result, idx) => (
                              <li key={idx} className="text-gray-700">{result}</li>
                            ))}
                          </ul>
                        </div>
                        
                        {client.testimonial && (
                          <div className="mt-6 bg-gray-50 p-4 rounded-lg border-l-4 border-aij-blue italic">
                            <p className="text-gray-700">"{client.testimonial.quote}"</p>
                            <p className="text-sm text-gray-500 mt-2">— {client.testimonial.author}</p>
                          </div>
                        )}
                      </CardContent>
                      <CardFooter className="bg-gray-50 flex justify-end">
                        <Button variant="outline" className="text-aij-blue request-button">
                          Request Similar Solution <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="bg-gray-50 p-8 rounded-lg text-center solution-card">
                  <h3 className="text-xl font-medium text-gray-700 mb-2">Coming Soon</h3>
                  <p className="text-gray-600 mb-4">
                    We're currently working on showcasing our success stories in the {industry.name} sector.
                    Check back soon or contact us to learn more about our solutions in this industry.
                  </p>
                  <Button className="bg-aij-blue hover:bg-aij-teal text-white request-button">
                    Contact Us <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default SolutionsPage;
