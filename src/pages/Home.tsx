import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Award, Users, CheckCircle, ArrowRight, Phone, Mail } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { DatabaseService } from '../lib/supabase';

const Home = () => {
  const { language, t } = useLanguage();
  const [contactInfo, setContactInfo] = useState({
    phone: '+966 XX XXX XXXX',
    email: 'info@aabdelzaher.com'
  });
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
        
        // Load contact info
        const contactData = await DatabaseService.getContentSection('contact_info');
        if (contactData?.content) {
          try {
            const parsedContact = JSON.parse(contactData.content);
            setContactInfo(prev => ({ ...prev, ...parsedContact }));
          } catch (e) {
            console.log('Using default contact info');
          }
        }
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
        ar: 'aabdelzaher - استشارات فنية وقانونية متخصصة',
        en: 'aabdelzaher - Specialized Technical and Legal Consulting'
      },
      subtitle: {
        ar: 'نتخصص في تقديم الاستشارات الفنية والقانونية في مجالات الحماية المدنية والأدلة الجنائية ومكافحة الحرائق والمفرقعات، بخبرة عملية تتجاوز 20 عاماً.',
        en: 'We specialize in providing technical and legal consulting services in civil protection, forensic evidence, fire and explosives control, with over 20 years of professional experience.'
      },
      buttons: {
        consultation: { ar: 'احجز استشارة', en: 'Book Consultation' },
        contact: { ar: 'اتصل بنا', en: 'Contact Us' },
        services: { ar: 'عرض الخدمات', en: 'View Services' }
      },
      experience: { ar: '20+ سنة خبرة', en: '20+ Years Experience' }
    },
    certifications: {
      title: { ar: 'الشهادات المهنية والخبرات', en: 'Professional Certifications & Expertise' },
      subtitle: { ar: 'شهادات رسمية وخبرات موثقة من جهات حكومية ومؤسسات تدريبية دولية', en: 'Official certifications and documented expertise from government and international training institutions' }
    },
    services: {
      title: { ar: 'خدماتنا الأساسية', en: 'Our Core Services' },
      subtitle: { ar: 'استشارات فنية وقانونية متخصصة عبر تخصصات متعددة في الأدلة الجنائية والحماية المدنية', en: 'Specialized technical and legal consulting across multiple forensic and civil protection disciplines' }
    },
    testimonials: {
      title: { ar: 'شهادات العملاء', en: 'Client Testimonials' },
      subtitle: { ar: 'موثوق من قبل المحامين والشركات والمؤسسات في إعداد التقارير الفنية والاستشارات المتخصصة', en: 'Trusted by lawyers, companies, and institutions for technical reports and expert consultation' }
    },
    cta: {
      title: { ar: 'مستعد للبدء؟', en: 'Ready to Get Started?' },
      subtitle: { ar: 'اتصل بنا اليوم للحصول على استشارة فنية متخصصة واكتشف كيف يمكن لخبرتنا أن تدعم قضيتك أو مشروعك.', en: 'Contact us today for specialized technical consultation and discover how our expertise can support your case or project.' },
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
      title: language === 'ar' ? 'استشارات الحماية المدنية' : 'Civil Protection Consulting',
      description: language === 'ar' ? 
        'إطفاء، إنقاذ بري ونهري، تفتيش منشآت هامة، تحرير تقارير فنية بعد المعاينة' :
        'Fire safety, rescue operations, facility inspections, technical reports after site examination',
      category: 'civil-protection',
      features: [
        language === 'ar' ? 'خدمات الإطفاء والإنقاذ' : 'Fire and rescue services',
        language === 'ar' ? 'تفتيش المنشآت الهامة' : 'Critical facility inspections',
        language === 'ar' ? 'التقارير الفنية المتخصصة' : 'Specialized technical reports',
        language === 'ar' ? 'استشارات السلامة' : 'Safety consulting'
      ]
    },
    {
      id: '2',
      title: language === 'ar' ? 'الأدلة الجنائية والطب الشرعي' : 'Forensic Evidence & Medicine',
      description: language === 'ar' ? 
        'تحليل مسارح الجرائم، الأسلحة، الحرائق، المفرقعات، قضايا التزييف والتزوير، التحاليل البيولوجية، تحديد أسباب الوفاة' :
        'Crime scene analysis, weapons examination, fires, explosives, forgery cases, biological analysis, cause of death determination',
      category: 'forensics',
      features: [
        language === 'ar' ? 'تحليل مسرح الجريمة' : 'Crime scene analysis',
        language === 'ar' ? 'فحص الأسلحة والمفرقعات' : 'Weapons and explosives examination',
        language === 'ar' ? 'قضايا التزييف والتزوير' : 'Forgery and counterfeiting cases',
        language === 'ar' ? 'تحديد سبب الوفاة' : 'Death cause determination',
        language === 'ar' ? 'التحاليل البيولوجية' : 'Biological analysis'
      ]
    },
    {
      id: '3',
      title: language === 'ar' ? 'مكافحة الحرائق والمفرقعات' : 'Fire & Explosives Control',
      description: language === 'ar' ? 
        'تحقيقات الحرائق، تحليل المفرقعات، التقارير الفنية، الرد العلمي والفني على تقارير الخبراء' :
        'Fire investigation, explosives analysis, technical reports, expert responses to official reports',
      category: 'explosives-analysis',
      features: [
        language === 'ar' ? 'تحقيقات الحرائق' : 'Fire investigations',
        language === 'ar' ? 'تحليل المفرقعات' : 'Explosives analysis',
        language === 'ar' ? 'التقارير الفنية' : 'Technical reports',
        language === 'ar' ? 'الرد على تقارير الخبراء' : 'Expert report responses'
      ]
    }
  ];

  // Default certifications if none loaded
  const defaultCertifications = [
    {
      id: '1',
      name: language === 'ar' ? 'شهادات الحماية المدنية' : 'Civil Protection Certifications',
      organization: language === 'ar' ? 'جهات رسمية حكومية' : 'Official Government Institutions',
      year_obtained: 2020,
      is_featured: true
    },
    {
      id: '2',
      name: language === 'ar' ? 'شهادات الطب الشرعي' : 'Forensic Medicine Certifications',
      organization: language === 'ar' ? 'مؤسسات تدريبية دولية' : 'International Training Institutions',
      year_obtained: 2018,
      is_featured: true
    },
    {
      id: '3',
      name: language === 'ar' ? 'شهادات الأدلة الجنائية' : 'Forensic Evidence Certifications',
      organization: language === 'ar' ? 'جهات تدريبية متخصصة' : 'Specialized Training Organizations',
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
        'تقارير فنية متميزة ودقيقة ساعدتنا في دعم قضايانا القانونية. خبرة عملية واضحة في مجال الأدلة الجنائية.' :
        'Outstanding and accurate technical reports that helped us support our legal cases. Clear practical expertise in forensic evidence.',
      rating: 5,
      featured: true
    },
    {
      id: '2',
      client_name: language === 'ar' ? 'سارة أحمد' : 'Sarah Johnson',
      client_title: language === 'ar' ? 'مديرة السلامة' : 'Safety Manager',
      company: language === 'ar' ? 'شركة البناء الكبرى' : 'Major Construction Company',
      testimonial: language === 'ar' ? 
        'استشارات فنية متخصصة في مجال الحماية المدنية ساعدتنا في تطوير معايير السلامة في مشاريعنا.' :
        'Specialized technical consulting in civil protection helped us develop safety standards in our projects.',
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
                  <img 
                    src="/a-professional-logo-design-featuring-the_mnJr88-WTni4jIkiKkhWJg_wHXCDmHAS-ynu2s4ZPeQhg-removebg-preview (1).png" 
                    alt="Service Icon" 
                    className="h-12 w-12 mb-4 filter brightness-0 invert" 
                  />
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
                    to={service.category === 'civil-protection' ? '/services/civil-protection' : 
                         service.category === 'forensics' ? '/services/forensics' : 
                         service.category === 'explosives-analysis' ? '/services/explosives-analysis' : 
                         '/services'}
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
            {(certifications.length > 0 ? certifications : defaultCertifications)
              .filter(cert => cert.is_featured)
              .map((cert) => (
              <div key={cert.id} className="bg-white rounded-lg shadow-lg p-8 text-center">
                <Award className="h-16 w-16 text-blue-800 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">{cert.name}</h3>
                <p className="text-gray-600 mb-2">{cert.organization}</p>
                {cert.description && (
                  <p className="text-sm text-gray-500 mb-2">{cert.description}</p>
                )}
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
                <span className="text-blue-100">{contactInfo.phone}</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <Mail className="h-5 w-5 text-blue-300" />
                <span className="text-blue-100">{contactInfo.email}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;