import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <img 
              src="/lovable-uploads/aij-logo.png" 
              alt="AiJ Solutions Logo" 
              className="h-10 md:h-12"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-aij-darkgray hover:text-aij-blue transition-colors">Home</Link>
            <Link to="/solutions" className="text-aij-darkgray hover:text-aij-blue transition-colors">Solutions</Link>
            <Link to="/about" className="text-aij-darkgray hover:text-aij-blue transition-colors">About</Link>
            <Link to="/contact">
              <Button className="bg-aij-blue hover:bg-aij-teal text-white transition-colors ml-2">
                Contact Us
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-aij-blue" />
              ) : (
                <Menu className="h-6 w-6 text-aij-blue" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-4 pb-2 animate-fade-in">
            <div className="flex flex-col gap-4">
              <Link 
                to="/" 
                className="text-aij-darkgray hover:text-aij-blue transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/solutions" 
                className="text-aij-darkgray hover:text-aij-blue transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Solutions
              </Link>
              <Link 
                to="/about" 
                className="text-aij-darkgray hover:text-aij-blue transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Button className="bg-aij-blue hover:bg-aij-teal text-white transition-colors w-full">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
