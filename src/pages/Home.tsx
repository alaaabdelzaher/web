import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Award, Users, CheckCircle, ArrowRight, Star } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                ForensicPro - Trusted Expertise in Civil Protection & Forensics
              </h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                With over 20 years of experience, we provide comprehensive forensic analysis, 
                civil protection services, and expert consultation for legal and emergency situations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contact"
                  className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors text-center"
                >
                  Book Consultation
                </Link>
                <Link
                  to="/contact"
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-800 transition-colors text-center"
                >
                  Contact Us
                </Link>
                <Link
                  to="/services"
                  className="bg-transparent border-2 border-blue-300 text-blue-100 px-8 py-3 rounded-lg font-semibold hover:bg-blue-300 hover:text-blue-900 transition-colors text-center"
                >
                  View Services
                </Link>
              </div>
            </div>
            <div className="lg:text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20">
                <div className="flex items-center justify-center mb-4">
                  <Shield className="h-16 w-16 text-blue-300" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">20+ Years of Excellence</h3>
                <p className="text-blue-100">
                  Professional certifications and expert testimony in over 1,000 cases
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Certifications */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Professional Certifications</h2>
            <p className="text-xl text-gray-600">Recognized expertise and industry credentials</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Award className="h-12 w-12 text-blue-800 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Certified Fire Investigator</h3>
              <p className="text-gray-600">International Association of Fire Chiefs</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Award className="h-12 w-12 text-blue-800 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Forensic Science Specialist</h3>
              <p className="text-gray-600">American Board of Criminalistics</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Award className="h-12 w-12 text-blue-800 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Explosives Expert</h3>
              <p className="text-gray-600">International Association of Bomb Technicians</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Services</h2>
            <p className="text-xl text-gray-600">Comprehensive expertise across multiple disciplines</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
              <Shield className="h-12 w-12 text-blue-800 mb-4" />
              <h3 className="text-2xl font-semibold mb-4">Civil Protection</h3>
              <ul className="space-y-2 text-gray-600 mb-6">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Building inspection reports
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Fire cause analysis
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Emergency planning
                </li>
              </ul>
              <Link
                to="/services/civil-protection"
                className="inline-flex items-center text-blue-800 hover:text-blue-900 font-semibold"
              >
                Learn More <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
              <Users className="h-12 w-12 text-blue-800 mb-4" />
              <h3 className="text-2xl font-semibold mb-4">Forensics</h3>
              <ul className="space-y-2 text-gray-600 mb-6">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Crime scene analysis
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Physical evidence examination
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Death cause determination
                </li>
              </ul>
              <Link
                to="/services/forensics"
                className="inline-flex items-center text-blue-800 hover:text-blue-900 font-semibold"
              >
                Learn More <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
              <Award className="h-12 w-12 text-blue-800 mb-4" />
              <h3 className="text-2xl font-semibold mb-4">Explosives Analysis</h3>
              <ul className="space-y-2 text-gray-600 mb-6">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Components analysis
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Technical reports
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Expert testimony
                </li>
              </ul>
              <Link
                to="/services/explosives-analysis"
                className="inline-flex items-center text-blue-800 hover:text-blue-900 font-semibold"
              >
                Learn More <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Client Testimonials</h2>
            <p className="text-xl text-gray-600">Trusted by legal professionals and organizations</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "ForensicPro provided exceptional forensic analysis that was crucial to our case. 
                Their detailed reports and expert testimony were instrumental in achieving justice."
              </p>
              <div className="font-semibold">— Sarah Johnson, District Attorney</div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "The civil protection consultation helped us implement comprehensive emergency 
                protocols. Their expertise saved us time and potentially prevented disasters."
              </p>
              <div className="font-semibold">— Michael Chen, Facility Manager</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Contact us today for a consultation and discover how our expertise can help your case.
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
      </section>
    </div>
  );
};

export default Home;