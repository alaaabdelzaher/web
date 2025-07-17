import React, { createContext, useContext, useState, useEffect } from 'react';

interface LanguageContextType {
  language: 'en' | 'ar';
  setLanguage: (lang: 'en' | 'ar') => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.about': 'About',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact Us',
    'nav.civilProtection': 'Civil Protection',
    'nav.forensics': 'Forensics',
    'nav.explosivesAnalysis': 'Explosives Analysis',

    // Home Page
    'home.hero.title': 'ForensicPro - Trusted Expertise in Civil Protection & Forensics',
    'home.hero.subtitle': 'With over 20 years of experience, we provide comprehensive forensic analysis, civil protection services, and expert consultation for legal and emergency situations.',
    'home.cta.consultation': 'Book Consultation',
    'home.cta.contact': 'Contact Us',
    'home.cta.services': 'View Services',
    'home.certifications.title': 'Professional Certifications',
    'home.certifications.subtitle': 'Recognized expertise and industry credentials',
    'home.services.title': 'Our Core Services',
    'home.services.subtitle': 'Comprehensive expertise across multiple disciplines',
    'home.testimonials.title': 'Client Testimonials',
    'home.testimonials.subtitle': 'Trusted by legal professionals and organizations',
    'home.cta.final.title': 'Ready to Get Started?',
    'home.cta.final.subtitle': 'Contact us today for a consultation and discover how our expertise can help your case.',

    // Services
    'services.civil.title': 'Civil Protection',
    'services.civil.desc': 'Building inspection reports, fire cause analysis, emergency planning',
    'services.forensics.title': 'Forensics',
    'services.forensics.desc': 'Crime scene analysis, physical evidence examination, death cause determination',
    'services.explosives.title': 'Explosives Analysis',
    'services.explosives.desc': 'Components analysis, technical reports, expert testimony',

    // Common
    'common.learnMore': 'Learn More',
    'common.readMore': 'Read More',
    'common.viewAll': 'View All',
    'common.loading': 'Loading...',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.add': 'Add',
    'common.search': 'Search',
    'common.filter': 'Filter',

    // Dashboard
    'dashboard.title': 'Comprehensive Dashboard',
    'dashboard.subtitle': 'Complete management for forensic and civil protection consulting website',
    'dashboard.overview': 'Overview',
    'dashboard.pages': 'Page Management',
    'dashboard.content': 'Content Management',
    'dashboard.blog': 'Blog Management',
    'dashboard.media': 'Media Library',
    'dashboard.messages': 'Messages',
    'dashboard.chatbot': 'Chatbot',
    'dashboard.settings': 'Settings',
    'dashboard.seo': 'SEO Management',
    'dashboard.analytics': 'Analytics',
    'dashboard.security': 'Security',

    // Footer
    'footer.services': 'Services',
    'footer.quickLinks': 'Quick Links',
    'footer.contactInfo': 'Contact Info',
    'footer.copyright': '© 2024 ForensicPro. All rights reserved.',
  },
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.services': 'الخدمات',
    'nav.about': 'من نحن',
    'nav.blog': 'المدونة',
    'nav.contact': 'اتصل بنا',
    'nav.civilProtection': 'الحماية المدنية',
    'nav.forensics': 'الطب الشرعي',
    'nav.explosivesAnalysis': 'تحليل المتفجرات',

    // Home Page
    'home.hero.title': 'فورنسيك برو - خبرة موثوقة في الحماية المدنية والطب الشرعي',
    'home.hero.subtitle': 'مع أكثر من 20 عاماً من الخبرة، نقدم تحليلاً شرعياً شاملاً وخدمات الحماية المدنية والاستشارات الخبيرة للحالات القانونية والطوارئ.',
    'home.cta.consultation': 'احجز استشارة',
    'home.cta.contact': 'اتصل بنا',
    'home.cta.services': 'عرض الخدمات',
    'home.certifications.title': 'الشهادات المهنية',
    'home.certifications.subtitle': 'خبرة معترف بها وأوراق اعتماد صناعية',
    'home.services.title': 'خدماتنا الأساسية',
    'home.services.subtitle': 'خبرة شاملة عبر تخصصات متعددة',
    'home.testimonials.title': 'شهادات العملاء',
    'home.testimonials.subtitle': 'موثوق من قبل المهنيين القانونيين والمؤسسات',
    'home.cta.final.title': 'مستعد للبدء؟',
    'home.cta.final.subtitle': 'اتصل بنا اليوم للحصول على استشارة واكتشف كيف يمكن لخبرتنا أن تساعد قضيتك.',

    // Services
    'services.civil.title': 'الحماية المدنية',
    'services.civil.desc': 'تقارير فحص المباني، تحليل أسباب الحرائق، التخطيط للطوارئ',
    'services.forensics.title': 'الطب الشرعي',
    'services.forensics.desc': 'تحليل مسرح الجريمة، فحص الأدلة المادية، تحديد سبب الوفاة',
    'services.explosives.title': 'تحليل المتفجرات',
    'services.explosives.desc': 'تحليل المكونات، التقارير الفنية، الشهادة الخبيرة',

    // Common
    'common.learnMore': 'اعرف المزيد',
    'common.readMore': 'اقرأ المزيد',
    'common.viewAll': 'عرض الكل',
    'common.loading': 'جاري التحميل...',
    'common.save': 'حفظ',
    'common.cancel': 'إلغاء',
    'common.delete': 'حذف',
    'common.edit': 'تحرير',
    'common.add': 'إضافة',
    'common.search': 'بحث',
    'common.filter': 'فلترة',

    // Dashboard
    'dashboard.title': 'لوحة التحكم الشاملة',
    'dashboard.subtitle': 'إدارة كاملة لموقع الاستشارات الجنائية والحماية المدنية',
    'dashboard.overview': 'نظرة عامة',
    'dashboard.pages': 'إدارة الصفحات',
    'dashboard.content': 'إدارة المحتوى',
    'dashboard.blog': 'إدارة المدونة',
    'dashboard.media': 'مكتبة الوسائط',
    'dashboard.messages': 'الرسائل',
    'dashboard.chatbot': 'الشات بوت',
    'dashboard.settings': 'الإعدادات',
    'dashboard.seo': 'إدارة تحسين محركات البحث',
    'dashboard.analytics': 'التحليلات',
    'dashboard.security': 'الأمان',

    // Footer
    'footer.services': 'الخدمات',
    'footer.quickLinks': 'روابط سريعة',
    'footer.contactInfo': 'معلومات الاتصال',
    'footer.copyright': '© 2024 فورنسيك برو. جميع الحقوق محفوظة.',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'en' | 'ar'>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as 'en' | 'ar';
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: 'en' | 'ar') => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};