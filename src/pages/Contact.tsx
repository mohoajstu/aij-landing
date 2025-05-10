
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const ContactPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 md:px-6 pt-32 pb-16">
        <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <p className="text-lg mb-6">
              We're here to answer any questions you have about our AI solutions and services. Reach out to us and we'll respond as soon as possible.
            </p>
            
            <div className="space-y-4 mt-8">
              <div>
                <h3 className="font-medium text-lg">Email</h3>
                <p>aijsolutions.co@gmail.com</p>
              </div>
              <div>
                <h3 className="font-medium text-lg">Phone</h3>
                <p>+1 (343)-996-1725</p>
              </div>
              <div>
                <h3 className="font-medium text-lg">Address</h3>
                <p>Vancouver | Toronto<br /> Canada</p>
              </div>
            </div>
          </div>
          
          <div>
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium mb-1">First Name</label>
                  <Input id="firstName" placeholder="John" />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium mb-1">Last Name</label>
                  <Input id="lastName" placeholder="Doe" />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                <Input id="email" type="email" placeholder="john@example.com" />
              </div>
              
              <div>
                <label htmlFor="company" className="block text-sm font-medium mb-1">Company (Optional)</label>
                <Input id="company" placeholder="Your Company" />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
                <Textarea id="message" placeholder="How can we help you?" className="min-h-[120px]" />
              </div>
              
              <Button className="w-full bg-aij-blue hover:bg-aij-teal">Send Message</Button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;
