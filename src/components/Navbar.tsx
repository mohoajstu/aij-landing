import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import '../styles/Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    // Check initial scroll position
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node) && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close mobile menu on navigation
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Determine if a link is active
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className={`navbar ${isScrolled || mobileMenuOpen || !isHomePage ? 'navbar-solid' : 'navbar-transparent'}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <Link to="/" className="navbar-logo">
            <img 
              src="/lovable-uploads/aij-logo.png" 
              alt="AiJ Solutions Logo" 
              className={isScrolled ? 'h-8 md:h-10' : 'h-10 md:h-12'}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="desktop-nav">
            <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>Home</Link>
            <Link to="/solutions" className={`nav-link ${isActive('/solutions') ? 'active' : ''}`}>Solutions</Link>
            <Link to="/about" className={`nav-link ${isActive('/about') ? 'active' : ''}`}>About</Link>
            <Link to="/contact">
              <button className="contact-button">
                Contact Us
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div 
        ref={mobileMenuRef}
        className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}
      >
        <div className="container mx-auto px-4">
          <div className="mobile-menu-content">
            <Link 
              to="/" 
              className={`mobile-nav-link ${isActive('/') ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/solutions" 
              className={`mobile-nav-link ${isActive('/solutions') ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Solutions
            </Link>
            <Link 
              to="/about" 
              className={`mobile-nav-link ${isActive('/about') ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="mobile-contact-button">
                Contact Us
              </div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
