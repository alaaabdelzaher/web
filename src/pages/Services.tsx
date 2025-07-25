import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Users, Award, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { DatabaseService } from '../lib/supabase';

const Services = () => {
  const { language, t } = useLanguage();
  const [services, setServices] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const loadServices = async () => {
      try {
        setLoading(true);
        const data = await DatabaseService.getServices();
        setServices(data);
      } catch (error) {
        console.error('Error loading services:', error);
      } finally {
        setLoading(false);
      }
    };
    loadServices();
  }, []);

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
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('services.title')}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={service.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-r from-blue-800 to-blue-900 p-6">
                {service.image_url ? (
                  <img 
                    src={service.image_url} 
                    alt={service.title}
                    className="h-12 w-12 text-white mb-4 object-contain"
                  />
                ) : (
                  <Shield className="h-12 w-12 text-white mb-4" />
                )}
                <h2 className="text-2xl font-bold text-white">{service.title}</h2>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-6">
                  {service.description}
                </p>
                <div className="space-y-3 mb-6">
                  {service.features?.slice(0, 4).map((feature: string, idx: number) => (
                    <div key={idx} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-800 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm text-gray-600">{feature}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Link
                  to={`/services/${service.category}`}
                  className="inline-flex items-center text-blue-800 hover:text-blue-900 font-semibold"
                >
                  {t('common.learnMore')} <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </div>
          ))}
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