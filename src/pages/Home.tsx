import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Award, Users, CheckCircle, ArrowRight, Star } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { DatabaseService } from '../lib/supabase';

const Home = () => {
  const { language, t } = useLanguage();
  const [loading, setLoading] = React.useState(true);
  const [certifications, setCertifications] = React.useState<any[]>([]);
  const [services, setServices] = React.useState<any[]>([]);
  const [testimonials, setTestimonials] = React.useState<any[]>([]);
  const [stats, setStats] = React.useState<any[]>([]);
  const [homeContent, setHomeContent] = React.useState<any>({
    hero_title_ar: 'فورنسيك برو - خبرة موثوقة في الحماية المدنية والطب الشرعي',
    hero_title_en: 'ForensicPro - Trusted Expertise in Civil Protection & Forensics',
    hero_subtitle_ar: 'مع أكثر من 20 عاماً من الخبرة، نقدم تحليلاً شرعياً شاملاً وخدمات الحماية المدنية والاستشارات الخبيرة للحالات القانونية والطوارئ.',
    hero_subtitle_en: 'With over 20 years of experience, we provide comprehensive forensic analysis, civil protection services, and expert consultation for legal and emergency situations.',
    cta1_text_ar: 'احجز استشارة',
    cta1_text_en: 'Book Consultation',
    cta2_text_ar: 'اتصل بنا',
    cta2_text_en: 'Contact Us'
  });

  React.useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [
          homeData,
          certificationsData,
          servicesData,
          testimonialsData,
          statsData
        ] = await Promise.all([
          DatabaseService.getContentSection('home_content'),
          DatabaseService.getCertifications(),
          DatabaseService.getServices(),
          DatabaseService.getTestimonials(),
          DatabaseService.getStats()
        ]);
        
        // Parse home content
        if (homeData?.content) {
          try {
            const parsedContent = JSON.parse(homeData.content);
            setHomeContent(prev => ({ ...prev, ...parsedContent }));
          } catch {
            // Keep default content if parsing fails
          }
        }
        
        setCertifications(certificationsData);
        setServices(servicesData);
        setTestimonials(testimonialsData);
        setStats(statsData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const getHomeContent = (key: string, fallback: string) => {
    const langKey = `${key}_${language}`;
    return homeContent[langKey] || homeContent[key] || fallback;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                {getHomeContent('hero_title', t('home.hero.title'))}
              </h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                {getHomeContent('hero_subtitle', t('home.hero.subtitle'))}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contact"
                  className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors text-center"
                >
                  {getHomeContent('cta1_text', t('home.cta.consultation'))}
                </Link>
                <Link
                  to="/contact"
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-800 transition-colors text-center"
                >
                  {getHomeContent('cta2_text', t('home.cta.contact'))}
                </Link>
                <Link
                  to="/services"
                  className="bg-transparent border-2 border-blue-300 text-blue-100 px-8 py-3 rounded-lg font-semibold hover:bg-blue-300 hover:text-blue-900 transition-colors text-center"
                >
                  {t('home.cta.services')}
                </Link>
              </div>
            </div>
            <div className="lg:text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20">
                <div className="flex items-center justify-center mb-4">
                  <Shield className="h-16 w-16 text-blue-300" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">
                  {language === 'ar' ? '20+ سنة من التميز' : '20+ Years of Excellence'}
                </h3>
                <p className="text-blue-100">
                  {language === 'ar' ? 'شهادات مهنية وشهادة خبيرة في أكثر من 1000 قضية' : 'Professional certifications and expert testimony in over 1,000 cases'}
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('home.certifications.title')}</h2>
            <p className="text-xl text-gray-600">{t('home.certifications.subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {certifications.slice(0, 3).map((cert, index) => (
              <div key={cert.id} className="bg-white p-6 rounded-lg shadow-md text-center">
                <Award className="h-12 w-12 text-blue-800 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">{cert.name}</h3>
                <p className="text-gray-600">{cert.organization}</p>
                {cert.year_obtained && (
                  <p className="text-sm text-gray-500 mt-2">{cert.year_obtained}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('home.services.title')}</h2>
            <p className="text-xl text-gray-600">{t('home.services.subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.slice(0, 3).map((service, index) => (
              <div key={service.id} className="bg-white p-8 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                <Shield className="h-12 w-12 text-blue-800 mb-4" />
                <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <ul className="space-y-2 text-gray-600 mb-6">
                  {service.features?.slice(0, 3).map((feature: string, idx: number) => (
                    <li key={idx} className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to={`/services/${service.category}`}
                  className="inline-flex items-center text-blue-800 hover:text-blue-900 font-semibold"
                >
                  {t('common.learnMore')} <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('home.testimonials.title')}</h2>
            <p className="text-xl text-gray-600">{t('home.testimonials.subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.slice(0, 2).map((testimonial, index) => (
              <div key={testimonial.id} className="bg-white p-8 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating || 5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">"{testimonial.testimonial}"</p>
                <div className="font-semibold">
                  — {testimonial.client_name}
                  {testimonial.client_title && `, ${testimonial.client_title}`}
                  {testimonial.company && ` at ${testimonial.company}`}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">{t('home.cta.final.title')}</h2>
          <p className="text-xl text-blue-100 mb-8">
            {t('home.cta.final.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
            >
              {t('home.cta.consultation')}
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-800 transition-colors"
            >
              {t('home.cta.contact')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;