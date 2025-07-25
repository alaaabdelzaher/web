import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Shield, ChevronDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageToggle from './LanguageToggle';

const Navbar = () => {
  const { language, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/a-professional-logo-design-featuring-the_mnJr88-WTni4jIkiKkhWJg_wHXCDmHAS-ynu2s4ZPeQhg-removebg-preview (1).png" 
              alt="aabdelzaher Logo" 
              className="h-8 w-8" 
            />
            <span className="text-xl font-bold text-gray-900">aabdelzaher</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 space-x-reverse">
            <Link
              to="/"
              className={`text-gray-700 hover:text-blue-800 transition-colors ${
                isActive('/') ? 'text-blue-800 font-medium' : ''
              }`}
            >
              {t('nav.home')}
            </Link>
            
            <div className="relative">
              <button
                onClick={() => setServicesOpen(!servicesOpen)}
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-800 transition-colors"
              >
                <span>{t('nav.services')}</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              
              {servicesOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <Link
                    to="/services/civil-protection"
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-800 transition-colors"
                    onClick={() => setServicesOpen(false)}
                  >
                    {t('nav.civilProtection')}
                  </Link>
                  <Link
                    to="/services/forensics"
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-800 transition-colors"
                    onClick={() => setServicesOpen(false)}
                  >
                    {t('nav.forensics')}
                  </Link>
                  <Link
                    to="/services/explosives-analysis"
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-800 transition-colors"
                    onClick={() => setServicesOpen(false)}
                  >
                    {t('nav.explosivesAnalysis')}
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
              {t('nav.about')}
            </Link>
            
            <Link
              to="/blog"
              className={`text-gray-700 hover:text-blue-800 transition-colors ${
                isActive('/blog') ? 'text-blue-800 font-medium' : ''
              }`}
            >
              {t('nav.blog')}
            </Link>
            
            <LanguageToggle />
            
            <Link
              to="/contact"
              className="bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors"
            >
              {t('nav.contact')}
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
                {t('nav.home')}
              </Link>
              
              <div className="pl-4 space-y-2">
                <Link
                  to="/services/civil-protection"
                  className="block text-gray-700 hover:text-blue-800 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {t('nav.civilProtection')}
                </Link>
                <Link
                  to="/services/forensics"
                  className="block text-gray-700 hover:text-blue-800 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {t('nav.forensics')}
                </Link>
                <Link
                  to="/services/explosives-analysis"
                  className="block text-gray-700 hover:text-blue-800 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {t('nav.explosivesAnalysis')}
                </Link>
              </div>
              
              <Link
                to="/about"
                className={`text-gray-700 hover:text-blue-800 transition-colors ${
                  isActive('/about') ? 'text-blue-800 font-medium' : ''
                }`}
                onClick={() => setIsOpen(false)}
              >
                {t('nav.about')}
              </Link>
              
              <Link
                to="/blog"
                className={`text-gray-700 hover:text-blue-800 transition-colors ${
                  isActive('/blog') ? 'text-blue-800 font-medium' : ''
                }`}
                onClick={() => setIsOpen(false)}
              >
                {t('nav.blog')}
              </Link>

              <div className="py-2">
                <LanguageToggle />
              </div>
              
              <Link
                to="/contact"
                className="bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors text-center"
                onClick={() => setIsOpen(false)}
              >
                {t('nav.contact')}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;