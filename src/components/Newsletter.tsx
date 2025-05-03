
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Newsletter = () => {
  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Stay Updated with AI Trends</h2>
          <p className="text-gray-600 mb-8">
            Subscribe to our newsletter to receive the latest insights on AI technology and how businesses are leveraging it for success.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-3">
            <Input 
              type="email" 
              placeholder="Enter your email address" 
              className="flex-grow" 
              required
            />
            <Button className="bg-aij-blue hover:bg-aij-teal text-white transition-colors">
              Subscribe Now
            </Button>
          </form>
          
          <p className="text-xs text-gray-500 mt-4">
            By subscribing, you agree to our Privacy Policy and consent to receive updates from AiJ Solutions.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
