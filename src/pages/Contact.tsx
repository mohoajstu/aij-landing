import React, { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Helmet } from 'react-helmet-async';

const ContactPage = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    message: '',
  });

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await emailjs.send(
        "service_dvs9yhu", 
        "template_bd5xghv", 
        formData,
        "GuIhwVwvrcIzORK6T" // EmailJS public key
      );
      
      toast.success('Message sent successfully!');
      setFormData({ firstName: '', lastName: '', email: '', company: '', message: '' });
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Contact Us | AiJ Solutions</title>
        <meta name="description" content="Contact AiJ Solutions for custom AI solutions and automation for your business. Let's discuss how we can transform your workflow with AI-powered tools." />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "AiJ Solutions Contact Page",
            "description": "Contact AiJ Solutions for custom AI solutions and automation for your business",
            "url": "https://aijsolutions.com/contact",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+1-343-996-1725",
              "email": "aijsolutions.co@gmail.com",
              "contactType": "customer service"
            }
          })}
        </script>
      </Helmet>
      <Navbar />
      <div className="container mx-auto px-4 md:px-6 pt-24 pb-8">
        <h1 className="text-3xl font-bold mb-4 text-aij-blue">Contact Us</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p className="text-base mb-4">
              We're here to answer any questions you have about our AI solutions and services. Reach out to us and we'll respond as soon as possible.
            </p>
            <div className="space-y-3 mt-4">
              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-aij-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <h3 className="font-medium">Email</h3>
                  <a href="mailto:aijsolutions.co@gmail.com" className="text-aij-blue hover:underline">aijsolutions.co@gmail.com</a>
                </div>
              </div>
              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-aij-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <h3 className="font-medium">Phone</h3>
                  <a href="tel:+13439961725" className="text-aij-blue hover:underline">+1 (343)-996-1725</a>
                </div>
              </div>
              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-aij-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <h3 className="font-medium">Address</h3>
                  <p>Vancouver | Toronto<br /> Canada</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
            <form ref={formRef} onSubmit={sendEmail} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium mb-1">First Name</label>
                  <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required className="h-9" />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium mb-1">Last Name</label>
                  <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required className="h-9" />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required className="h-9" />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium mb-1">Company (Optional)</label>
                <Input id="company" name="company" value={formData.company} onChange={handleChange} className="h-9" />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
                <Textarea id="message" name="message" value={formData.message} onChange={handleChange} required className="min-h-[80px] max-h-[80px]" />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-aij-blue hover:bg-aij-teal text-white h-9"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;
