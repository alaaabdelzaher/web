import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Phone, Mail, MapPin, Facebook, Twitter, Linkedin } from 'lucide-react';
import { DatabaseService } from '../lib/supabase';
import { useLanguage } from '../contexts/LanguageContext';

const Footer = () => {
  const { language } = useLanguage();
  const [contactInfo, setContactInfo] = React.useState({
    phone: '+966 XX XXX XXXX',
    email: 'info@aabdelzaher.com',
    address_ar: 'مدينة الفسطاط',
    address_en: 'Saudi Arabia, Riyadh'
  });

  React.useEffect(() => {
    const loadContactInfo = async () => {
      try {
        const contactData = await DatabaseService.getContentSection('contact_info');
        if (contactData?.content) {
          const parsedContact = JSON.parse(contactData.content);
          setContactInfo(prev => ({ ...prev, ...parsedContact }));
        }
      } catch (error) {
        console.log('Using default contact info');
      }
    };
    loadContactInfo();
  }, []);

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img 
                src="/a-professional-logo-design-featuring-the_mnJr88-WTni4jIkiKkhWJg_wHXCDmHAS-ynu2s4ZPeQhg-removebg-preview (1).png" 
                alt="aabdelzaher Logo" 
                className="h-6 w-6" 
              />
              <span className="text-xl font-bold">aabdelzaher</span>
            </div>
            <p className="text-gray-400 text-sm">
              Specialized technical and legal consulting with over 20 years of professional experience in civil protection, forensic evidence, and fire & explosives control.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
              <Linkedin className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <div className="space-y-2">
              <Link to="/services/civil-protection" className="block text-gray-400 hover:text-white transition-colors">
                Civil Protection
              </Link>
              <Link to="/services/forensics" className="block text-gray-400 hover:text-white transition-colors">
                Forensics
              </Link>
              <Link to="/services/explosives-analysis" className="block text-gray-400 hover:text-white transition-colors">
                Explosives Analysis
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/about" className="block text-gray-400 hover:text-white transition-colors">
                About Us
              </Link>
              <Link to="/blog" className="block text-gray-400 hover:text-white transition-colors">
                Blog
              </Link>
              <Link to="/contact" className="block text-gray-400 hover:text-white transition-colors">
                Contact
              </Link>
              <Link to="/dashboard" className="block text-gray-400 hover:text-white transition-colors">
                Dashboard
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-blue-400" />
                <span className="text-gray-400 text-sm">{contactInfo.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-blue-400" />
                <span className="text-gray-400 text-sm">{contactInfo.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-blue-400" />
                <span className="text-gray-400 text-sm">
                  {language === 'ar' ? contactInfo.address_ar : contactInfo.address_en}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 aabdelzaher. All rights reserved. | Privacy Policy | Terms of Service
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;