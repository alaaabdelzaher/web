import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Search, FileText, Shield, CheckCircle } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { DatabaseService } from '../../lib/supabase';

const ExplosivesAnalysis = () => {
  const { language, t } = useLanguage();
  const [pageContent, setPageContent] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const loadPageContent = async () => {
      try {
        setLoading(true);
        const content = await DatabaseService.getServicePageContent('explosives-analysis');
        setPageContent(content);
      } catch (error) {
        console.error('Error loading page content:', error);
      } finally {
        setLoading(false);
      }
    };
    loadPageContent();
  }, []);

  const getContentByKey = (key: string) => {
    const content = pageContent.find(item => item.section_key === key);
    if (!content) return null;
    return {
      title: language === 'ar' ? content.section_title_ar : content.section_title_en,
      content: language === 'ar' ? content.content_ar : content.content_en
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen py-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Award className="h-16 w-16 text-blue-800 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {language === 'ar' ? 'تحليل المتفجرات' : 'Explosives Analysis'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {getContentByKey('hero')?.content || (language === 'ar' ? 
              'خدمات متخصصة في تحليل المتفجرات تشمل تحديد المكونات والتقارير الفنية والاستشارة الخبيرة للأغراض القانونية والتحقيقية.' :
              'Specialized explosives analysis services including component identification, technical reporting, and expert consultation for legal and investigative purposes.'
            )}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <Search className="h-12 w-12 text-blue-800 mb-4" />
            <h3 className="text-2xl font-semibold mb-4">Components Analysis</h3>
            <p className="text-gray-600 mb-6">
              Detailed examination of explosive materials, devices, and residues using 
              advanced analytical techniques and specialized equipment.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-sm">Chemical composition identification</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-sm">Explosive residue analysis</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-sm">Device reconstruction</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <FileText className="h-12 w-12 text-blue-800 mb-4" />
            <h3 className="text-2xl font-semibold mb-4">Technical Reports</h3>
            <p className="text-gray-600 mb-6">
              Comprehensive documentation and findings presented in detailed technical 
              reports suitable for legal proceedings and investigations.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-sm">Detailed analytical findings</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-sm">Scientific methodology documentation</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-sm">Court-admissible evidence</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <Shield className="h-12 w-12 text-blue-800 mb-4" />
            <h3 className="text-2xl font-semibold mb-4">Expert Testimony</h3>
            <p className="text-gray-600 mb-6">
              Court-qualified expert witness services providing clear, professional 
              testimony on explosives-related matters.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-sm">Courtroom testimony</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-sm">Deposition services</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-sm">Case consultation</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <Award className="h-12 w-12 text-blue-800 mb-4" />
            <h3 className="text-2xl font-semibold mb-4">Specialized Equipment</h3>
            <p className="text-gray-600 mb-6">
              State-of-the-art analytical equipment and specialized tools for accurate 
              explosives identification and analysis.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-sm">Mass spectrometry</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-sm">X-ray crystallography</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-sm">Infrared spectroscopy</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Certifications */}
        <div className="bg-gray-50 rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Professional Certifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-800 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="font-semibold mb-2">IABTI Certified</h3>
              <p className="text-sm text-gray-600">International Association of Bomb Technicians and Investigators</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-800 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="font-semibold mb-2">ATF Certified</h3>
              <p className="text-sm text-gray-600">Bureau of Alcohol, Tobacco, Firearms and Explosives</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-800 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="font-semibold mb-2">FBI Trained</h3>
              <p className="text-sm text-gray-600">Federal Bureau of Investigation Explosives Unit</p>
            </div>
          </div>
        </div>

        {/* Safety Protocols */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Safety Protocols</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Laboratory Safety</h3>
              <p className="text-gray-600 mb-4">
                Our specialized laboratory maintains the highest safety standards for 
                handling and analyzing explosive materials.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">Blast-resistant facilities</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">Proper ventilation systems</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">Emergency response protocols</span>
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Personnel Training</h3>
              <p className="text-gray-600 mb-4">
                All personnel are extensively trained in explosive handling, safety 
                procedures, and emergency response protocols.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">Certified bomb technicians</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">Ongoing safety training</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">Regular safety audits</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-blue-800 text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Need Explosives Analysis?</h2>
          <p className="text-xl text-blue-100 mb-6">
            Contact us today to discuss your explosives analysis needs and get expert consultation.
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

export default ExplosivesAnalysis;