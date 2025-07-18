import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Users, Award, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Services = () => {
  const { language, t } = useLanguage();

  return (
    <div className="min-h-screen py-16" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('services.title')}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Civil Protection */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="bg-gradient-to-r from-blue-800 to-blue-900 p-6">
              <Shield className="h-12 w-12 text-white mb-4" />
              <h2 className="text-2xl font-bold text-white">{t('services.civil.title')}</h2>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-6">
                {t('services.civil.desc')}
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-800 rounded-full mt-2"></div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Building Inspection Reports</h3>
                    <p className="text-sm text-gray-600">Detailed structural and safety assessments</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-800 rounded-full mt-2"></div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Fire Cause Analysis</h3>
                    <p className="text-sm text-gray-600">Expert investigation of fire origins and causes</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-800 rounded-full mt-2"></div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Emergency Planning</h3>
                    <p className="text-sm text-gray-600">Comprehensive emergency response protocols</p>
                  </div>
                </div>
              </div>
              <Link
                to="/services/civil-protection"
                className="inline-flex items-center text-blue-800 hover:text-blue-900 font-semibold"
              >
                Learn More <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>

          {/* Forensics */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="bg-gradient-to-r from-blue-800 to-blue-900 p-6">
              <Users className="h-12 w-12 text-white mb-4" />
              <h2 className="text-2xl font-bold text-white">Forensics</h2>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-6">
                Professional forensic analysis services including crime scene investigation, 
                evidence examination, and expert testimony for legal proceedings.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-800 rounded-full mt-2"></div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Crime Scene Analysis</h3>
                    <p className="text-sm text-gray-600">Systematic investigation and documentation</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-800 rounded-full mt-2"></div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Physical Evidence Examination</h3>
                    <p className="text-sm text-gray-600">Laboratory analysis of physical materials</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-800 rounded-full mt-2"></div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Death Cause Determination</h3>
                    <p className="text-sm text-gray-600">Expert analysis of mortality factors</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-800 rounded-full mt-2"></div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Forgery Investigation</h3>
                    <p className="text-sm text-gray-600">Document and signature authenticity analysis</p>
                  </div>
                </div>
              </div>
              <Link
                to="/services/forensics"
                className="inline-flex items-center text-blue-800 hover:text-blue-900 font-semibold"
              >
                Learn More <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>

          {/* Explosives Analysis */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="bg-gradient-to-r from-blue-800 to-blue-900 p-6">
              <Award className="h-12 w-12 text-white mb-4" />
              <h2 className="text-2xl font-bold text-white">Explosives Analysis</h2>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-6">
                Specialized explosives analysis services including component identification, 
                technical reporting, and expert consultation for legal and investigative purposes.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-800 rounded-full mt-2"></div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Components Analysis</h3>
                    <p className="text-sm text-gray-600">Detailed examination of explosive materials</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-800 rounded-full mt-2"></div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Technical Reports</h3>
                    <p className="text-sm text-gray-600">Comprehensive documentation and findings</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-800 rounded-full mt-2"></div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Expert Testimony</h3>
                    <p className="text-sm text-gray-600">Court-qualified expert witness services</p>
                  </div>
                </div>
              </div>
              <Link
                to="/services/explosives-analysis"
                className="inline-flex items-center text-blue-800 hover:text-blue-900 font-semibold"
              >
                Learn More <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-blue-800 text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Need Expert Consultation?</h2>
          <p className="text-xl text-blue-100 mb-6">
            Contact us today to discuss your specific needs and learn how we can help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
            >
              Book Consultation
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-800 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;