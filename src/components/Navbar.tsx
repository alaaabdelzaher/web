import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Shield, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-blue-800" />
            <span className="text-xl font-bold text-gray-900">ForensicPro</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-gray-700 hover:text-blue-800 transition-colors ${
                isActive('/') ? 'text-blue-800 font-medium' : ''
              }`}
            >
              Home
            </Link>
            
            <div className="relative">
              <button
                onClick={() => setServicesOpen(!servicesOpen)}
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-800 transition-colors"
              >
                <span>Services</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              
              {servicesOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <Link
                    to="/services/civil-protection"
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-800 transition-colors"
                    onClick={() => setServicesOpen(false)}
                  >
                    Civil Protection
                  </Link>
                  <Link
                    to="/services/forensics"
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-800 transition-colors"
                    onClick={() => setServicesOpen(false)}
                  >
                    Forensics
                  </Link>
                  <Link
                    to="/services/explosives-analysis"
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-800 transition-colors"
                    onClick={() => setServicesOpen(false)}
                  >
                    Explosives Analysis
                  </Link>
                </div>
              )}
            </div>

            <Link
              to="/about"
              className={`text-gray-700 hover:text-blue-800 transition-colors ${
                isActive('/about') ? 'text-blue-800 font-medium' : ''
              }`}
            >
              About
            </Link>
            
            <Link
              to="/blog"
              className={`text-gray-700 hover:text-blue-800 transition-colors ${
                isActive('/blog') ? 'text-blue-800 font-medium' : ''
              }`}
            >
              Blog
            </Link>
            
            <Link
              to="/contact"
              className="bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors"
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-800 transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className={`text-gray-700 hover:text-blue-800 transition-colors ${
                  isActive('/') ? 'text-blue-800 font-medium' : ''
                }`}
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              
              <div className="pl-4 space-y-2">
                <Link
                  to="/services/civil-protection"
                  className="block text-gray-700 hover:text-blue-800 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Civil Protection
                </Link>
                <Link
                  to="/services/forensics"
                  className="block text-gray-700 hover:text-blue-800 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Forensics
                </Link>
                <Link
                  to="/services/explosives-analysis"
                  className="block text-gray-700 hover:text-blue-800 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Explosives Analysis
                </Link>
              </div>
              
              <Link
                to="/about"
                className={`text-gray-700 hover:text-blue-800 transition-colors ${
                  isActive('/about') ? 'text-blue-800 font-medium' : ''
                }`}
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              
              <Link
                to="/blog"
                className={`text-gray-700 hover:text-blue-800 transition-colors ${
                  isActive('/blog') ? 'text-blue-800 font-medium' : ''
                }`}
                onClick={() => setIsOpen(false)}
              >
                Blog
              </Link>
              
              <Link
                to="/contact"
                className="bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors text-center"
                onClick={() => setIsOpen(false)}
              >
                Contact Us
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;