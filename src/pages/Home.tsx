import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Award, Users, CheckCircle, ArrowRight, Phone, Mail } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { DatabaseService } from '../lib/supabase';

const Home = () => {
  const { language, t } = useLanguage();
  const [services, setServices] = useState<any[]>([]);
  const [certifications, setCertifications] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [stats, setStats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [servicesData, certificationsData, testimonialsData, statsData] = await Promise.all([
          DatabaseService.getServices().catch(() => []),
          DatabaseService.getCertifications().catch(() => []),
          DatabaseService.getTestimonials().catch(() => []),
          DatabaseService.getStats().catch(() => [])
        ]);
        
        setServices(servicesData);
        setCertifications(certificationsData);
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

  // Default content
  const defaultContent = {
    hero: {
      title: {
        ar: 'فورنسيك برو - خبرة موثوقة في الحماية المدنية والطب الشرعي',
        en: 'ForensicPro - Trusted Expertise in Civil Protection & Forensics'
      },
      subtitle: {
        ar: 'مع أكثر من 20 عاماً من الخبرة، نقدم تحليلاً شرعياً شاملاً وخدمات الحماية المدنية والاستشارات الخبيرة للحالات القانونية والطوارئ.',
        en: 'With over 20 years of experience, we provide comprehensive forensic analysis, civil protection services, and expert consultation for legal and emergency situations.'
      },
      buttons: {
        consultation: { ar: 'احجز استشارة', en: 'Book Consultation' },
        contact: { ar: 'اتصل بنا', en: 'Contact Us' },
        services: { ar: 'عرض الخدمات', en: 'View Services' }
      },
      experience: { ar: '20+ سنة خبرة', en: '20+ Years Experience' }
    },
    certifications: {
      title: { ar: 'الشهادات المهنية', en: 'Professional Certifications' },
      subtitle: { ar: 'خبرة معترف بها وأوراق اعتماد صناعية', en: 'Recognized expertise and industry credentials' }
    },
    services: {
      title: { ar: 'خدماتنا الأساسية', en: 'Our Core Services' },
      subtitle: { ar: 'خبرة شاملة عبر تخصصات متعددة', en: 'Comprehensive expertise across multiple disciplines' }
    },
    testimonials: {
      title: { ar: 'شهادات العملاء', en: 'Client Testimonials' },
      subtitle: { ar: 'موثوق من قبل المهنيين القانونيين والمؤسسات', en: 'Trusted by legal professionals and organizations' }
    },
    cta: {
      title: { ar: 'مستعد للبدء؟', en: 'Ready to Get Started?' },
      subtitle: { ar: 'اتصل بنا اليوم للحصول على استشارة واكتشف كيف يمكن لخبرتنا أن تساعد قضيتك.', en: 'Contact us today for a consultation and discover how our expertise can help your case.' },
      buttons: {
        consultation: { ar: 'احجز استشارة', en: 'Book Consultation' },
        contact: { ar: 'اتصل بنا', en: 'Contact Us' }
      }
    }
  };

  // Default services if none loaded
  const defaultServices = [
    {
      id: '1',
      title: language === 'ar' ? 'الحماية المدنية' : 'Civil Protection',
      description: language === 'ar' ? 
        'تقارير فحص المباني، تحليل أسباب الحرائق، التخطيط للطوارئ' :
        'Building inspection reports, fire cause analysis, emergency planning',
      category: 'civil-protection',
      features: [
        language === 'ar' ? 'تقييم السلامة الهيكلية' : 'Structural safety assessment',
        language === 'ar' ? 'تحليل أسباب الحرائق' : 'Fire cause analysis',
        language === 'ar' ? 'التخطيط للطوارئ' : 'Emergency planning',
        language === 'ar' ? 'تقارير الامتثال' : 'Compliance reports'
      ]
    },
    {
      id: '2',
      title: language === 'ar' ? 'الطب الشرعي' : 'Forensics',
      description: language === 'ar' ? 
        'تحليل مسرح الجريمة، فحص الأدلة المادية، تحديد سبب الوفاة' :
        'Crime scene analysis, physical evidence examination, death cause determination',
      category: 'forensics',
      features: [
        language === 'ar' ? 'تحليل مسرح الجريمة' : 'Crime scene analysis',
        language === 'ar' ? 'فحص الأدلة المادية' : 'Physical evidence examination',
        language === 'ar' ? 'تحديد سبب الوفاة' : 'Death cause determination',
        language === 'ar' ? 'الشهادة الخبيرة' : 'Expert testimony'
      ]
    },
    {
      id: '3',
      title: language === 'ar' ? 'تحليل المتفجرات' : 'Explosives Analysis',
      description: language === 'ar' ? 
        'تحليل المكونات، التقارير الفنية، الشهادة الخبيرة' :
        'Components analysis, technical reports, expert testimony',
      category: 'explosives-analysis',
      features: [
        language === 'ar' ? 'تحليل المكونات' : 'Component analysis',
        language === 'ar' ? 'التقارير الفنية' : 'Technical reports',
        language === 'ar' ? 'الشهادة الخبيرة' : 'Expert testimony',
        language === 'ar' ? 'تحليل البقايا' : 'Residue analysis'
      ]
    }
  ];

  // Default certifications if none loaded
  const defaultCertifications = [
    {
      id: '1',
      name: language === 'ar' ? 'معتمد من IABTI' : 'IABTI Certified',
      organization: language === 'ar' ? 'الجمعية الدولية لفنيي القنابل والمحققين' : 'International Association of Bomb Technicians',
      year_obtained: 2020,
      is_featured: true
    },
    {
      id: '2',
      name: language === 'ar' ? 'معتمد من ATF' : 'ATF Certified',
      organization: language === 'ar' ? 'مكتب الكحول والتبغ والأسلحة النارية والمتفجرات' : 'Bureau of Alcohol, Tobacco, Firearms and Explosives',
      year_obtained: 2018,
      is_featured: true
    },
    {
      id: '3',
      name: language === 'ar' ? 'مدرب من FBI' : 'FBI Trained',
      organization: language === 'ar' ? 'مكتب التحقيقات الفيدرالي - وحدة المتفجرات' : 'Federal Bureau of Investigation - Explosives Unit',
      year_obtained: 2015,
      is_featured: true
    }
  ];

  // Default testimonials if none loaded
  const defaultTestimonials = [
    {
      id: '1',
      client_name: language === 'ar' ? 'أحمد محمد' : 'John Smith',
      client_title: language === 'ar' ? 'محامي أول' : 'Senior Attorney',
      company: language === 'ar' ? 'مكتب المحاماة الدولي' : 'International Law Firm',
      testimonial: language === 'ar' ? 
        'خبرة استثنائية وتحليل دقيق. ساعدونا في حل قضية معقدة بكفاءة عالية.' :
        'Exceptional expertise and precise analysis. They helped us solve a complex case with high efficiency.',
      rating: 5,
      featured: true
    },
    {
      id: '2',
      client_name: language === 'ar' ? 'سارة أحمد' : 'Sarah Johnson',
      client_title: language === 'ar' ? 'مديرة السلامة' : 'Safety Manager',
      company: language === 'ar' ? 'شركة البناء الكبرى' : 'Major Construction Company',
      testimonial: language === 'ar' ? 
        'تقارير شاملة ومهنية. أصبحوا شركاؤنا المفضلون في مجال السلامة.' :
        'Comprehensive and professional reports. They have become our preferred partners in safety.',
      rating: 5,
      featured: true
    }
  ];

  // Use loaded data or defaults
  const displayServices = services.length > 0 ? services : defaultServices;
  const displayCertifications = certifications.length > 0 ? certifications : defaultCertifications;
  const displayTestimonials = testimonials.length > 0 ? testimonials : defaultTestimonials;

  return (
    <div className="min-h-screen" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {defaultContent.hero.title[language]}
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-4xl mx-auto leading-relaxed">
              {defaultContent.hero.subtitle[language]}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link
                to="/contact"
                className="bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-600 transition-colors text-lg"
              >
                {defaultContent.hero.buttons.consultation[language]}
              </Link>
              <Link
                to="/contact"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-800 transition-colors text-lg"
              >
                {defaultContent.hero.buttons.contact[language]}
              </Link>
              <Link
                to="/services"
                className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-lg"
              >
                {defaultContent.hero.buttons.services[language]}
              </Link>
            </div>
            <div className="text-blue-200 text-lg">
              <span className="font-semibold">{defaultContent.hero.experience[language]}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {stats.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.id} className="text-center">
                  <div className="text-4xl font-bold text-blue-800 mb-2">{stat.stat_value}</div>
                  <div className="text-gray-600">{stat.stat_label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {defaultContent.services.title[language]}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {defaultContent.services.subtitle[language]}
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {displayServices.slice(0, 3).map((service) => (
              <div key={service.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="bg-gradient-to-r from-blue-800 to-blue-900 p-6">
                  <Shield className="h-12 w-12 text-white mb-4" />
                  <h3 className="text-2xl font-bold text-white">{service.title}</h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <div className="space-y-3 mb-6">
                    {service.features?.slice(0, 4).map((feature: string, idx: number) => (
                      <div key={idx} className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Link
                    to={`/services/${service.category}`}
                    className="inline-flex items-center text-blue-800 hover:text-blue-900 font-semibold transition-colors"
                  >
                    {language === 'ar' ? 'اعرف المزيد' : 'Learn More'}
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {defaultContent.certifications.title[language]}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {defaultContent.certifications.subtitle[language]}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {displayCertifications.filter(cert => cert.is_featured).map((cert) => (
              <div key={cert.id} className="bg-white rounded-lg shadow-lg p-8 text-center">
                <Award className="h-16 w-16 text-blue-800 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">{cert.name}</h3>
                <p className="text-gray-600 mb-2">{cert.organization}</p>
                {cert.year_obtained && (
                  <p className="text-sm text-gray-500">{cert.year_obtained}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {defaultContent.testimonials.title[language]}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {defaultContent.testimonials.subtitle[language]}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {displayTestimonials.filter(testimonial => testimonial.featured).map((testimonial) => (
              <div key={testimonial.id} className="bg-gray-50 rounded-lg p-8">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">★</span>
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.testimonial}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.client_name}</div>
                  <div className="text-sm text-gray-600">{testimonial.client_title}</div>
                  <div className="text-sm text-gray-500">{testimonial.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">
            {defaultContent.cta.title[language]}
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            {defaultContent.cta.subtitle[language]}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
            >
              {defaultContent.cta.buttons.consultation[language]}
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-800 transition-colors"
            >
              {defaultContent.cta.buttons.contact[language]}
            </Link>
          </div>
          
          {/* Contact Info */}
          <div className="mt-12 pt-8 border-t border-blue-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
              <div className="flex items-center justify-center space-x-3">
                <Phone className="h-5 w-5 text-blue-300" />
                <span className="text-blue-100">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <Mail className="h-5 w-5 text-blue-300" />
                <span className="text-blue-100">info@forensicpro.com</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;