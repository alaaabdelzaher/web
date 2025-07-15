import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, FileText, Flame, AlertTriangle, CheckCircle } from 'lucide-react';

const CivilProtection = () => {
  return (
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Shield className="h-16 w-16 text-blue-800 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Civil Protection Services</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive civil protection services including building inspections, fire analysis, 
            and emergency planning to ensure safety and compliance.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <FileText className="h-12 w-12 text-blue-800 mb-4" />
            <h3 className="text-2xl font-semibold mb-4">Building Inspection Reports</h3>
            <p className="text-gray-600 mb-6">
              Detailed structural and safety assessments of buildings and facilities to ensure 
              compliance with safety standards and regulations.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-sm">Structural integrity assessment</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-sm">Safety compliance evaluation</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-sm">Code violation identification</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <Flame className="h-12 w-12 text-blue-800 mb-4" />
            <h3 className="text-2xl font-semibold mb-4">Fire Cause Analysis</h3>
            <p className="text-gray-600 mb-6">
              Expert investigation of fire origins and causes using advanced forensic techniques 
              and scientific analysis methods.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-sm">Origin and cause determination</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-sm">Evidence collection and analysis</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-sm">Expert testimony services</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <AlertTriangle className="h-12 w-12 text-blue-800 mb-4" />
            <h3 className="text-2xl font-semibold mb-4">Emergency Planning</h3>
            <p className="text-gray-600 mb-6">
              Comprehensive emergency response protocols and planning services to prepare 
              organizations for various emergency scenarios.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-sm">Risk assessment and mitigation</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-sm">Evacuation procedures</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-sm">Training and drills coordination</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Process Section */}
        <div className="bg-gray-50 rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-blue-800 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="font-bold">1</span>
              </div>
              <h3 className="font-semibold mb-2">Initial Assessment</h3>
              <p className="text-sm text-gray-600">Comprehensive evaluation of your specific needs and requirements</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-800 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="font-bold">2</span>
              </div>
              <h3 className="font-semibold mb-2">Investigation</h3>
              <p className="text-sm text-gray-600">Detailed examination using advanced techniques and equipment</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-800 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="font-bold">3</span>
              </div>
              <h3 className="font-semibold mb-2">Analysis & Reporting</h3>
              <p className="text-sm text-gray-600">Comprehensive analysis and detailed documentation of findings</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-800 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="font-bold">4</span>
              </div>
              <h3 className="font-semibold mb-2">Expert Consultation</h3>
              <p className="text-sm text-gray-600">Ongoing support and expert testimony if required</p>
            </div>
          </div>
        </div>

        {/* Case Studies */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Case Studies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Commercial Building Fire Investigation</h3>
              <p className="text-gray-600 mb-4">
                Comprehensive investigation of a commercial building fire that resulted in significant 
                property damage. Our analysis identified electrical system failures as the primary cause.
              </p>
              <div className="text-sm text-gray-500">
                <strong>Outcome:</strong> Insurance claim resolved, building owner exonerated
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Emergency Planning for Healthcare Facility</h3>
              <p className="text-gray-600 mb-4">
                Developed comprehensive emergency response protocols for a 200-bed hospital, 
                including evacuation procedures and disaster response planning.
              </p>
              <div className="text-sm text-gray-500">
                <strong>Outcome:</strong> Improved emergency preparedness, compliance achieved
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-blue-800 text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Need Civil Protection Services?</h2>
          <p className="text-xl text-blue-100 mb-6">
            Contact us today to discuss your civil protection needs and get expert consultation.
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

export default CivilProtection;