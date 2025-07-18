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
    'nav.dashboard': 'Dashboard',
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

    // About Page
    'about.title': 'About ForensicPro',
    'about.subtitle': 'With over 20 years of experience, we are a leading forensic and civil protection consulting firm dedicated to providing expert analysis and testimony.',
    'about.mission.title': 'Our Mission',
    'about.mission.desc': 'To provide accurate, reliable, and scientifically sound forensic analysis and civil protection services that serve justice and protect communities.',
    'about.team.title': 'Our Team',
    'about.team.desc': 'A dedicated team of certified professionals with extensive experience in forensic science, civil protection, and expert witness testimony.',
    'about.values.title': 'Our Values',
    'about.values.desc': 'Integrity, accuracy, and scientific rigor guide everything we do. We are committed to the highest standards of professional excellence.',
    'about.history.title': 'Our History',
    'about.whyChoose.title': 'Why Choose ForensicPro?',
    'about.cta.title': 'Ready to Work with Us?',
    'about.cta.subtitle': 'Contact us today to discuss your forensic and civil protection needs.',

    // Services Page
    'services.title': 'Our Services',
    'services.subtitle': 'Comprehensive forensic and civil protection services backed by 20+ years of expertise and professional certifications.',
    'services.cta.title': 'Need Expert Consultation?',
    'services.cta.subtitle': 'Contact us today to discuss your specific needs and learn how we can help.',

    // Blog Page
    'blog.title': 'Expert Insights & Articles',
    'blog.subtitle': 'Stay informed with the latest developments in forensic science, civil protection, and investigative techniques from our expert team.',
    'blog.search.placeholder': 'Search articles...',
    'blog.categories.all': 'All Categories',
    'blog.noResults': 'No articles found matching your search criteria.',
    'blog.newsletter.title': 'Stay Updated',
    'blog.newsletter.subtitle': 'Subscribe to our newsletter for the latest insights and updates from our expert team.',
    'blog.newsletter.placeholder': 'Enter your email',
    'blog.newsletter.subscribe': 'Subscribe',

    // Contact Page
    'contact.title': 'Contact Us',
    'contact.subtitle': 'Get in touch with our expert team for consultation on forensic analysis and civil protection services.',
    'contact.form.title': 'Send us a Message',
    'contact.form.name': 'Full Name',
    'contact.form.email': 'Email Address',
    'contact.form.phone': 'Phone Number',
    'contact.form.subject': 'Subject',
    'contact.form.message': 'Message',
    'contact.form.messagePlaceholder': 'Please provide details about your case or inquiry...',
    'contact.form.send': 'Send Message',
    'contact.info.title': 'Contact Information',
    'contact.info.phone': 'Phone',
    'contact.info.email': 'Email',
    'contact.info.address': 'Address',
    'contact.hours.title': 'Business Hours',
    'contact.hours.emergency': '24/7 Emergency Services Available',
    'contact.emergency.title': 'Emergency Contact',
    'contact.emergency.desc': 'For urgent forensic analysis or emergency consultations, contact our 24/7 emergency hotline:',
    'contact.emergency.available': 'Available 24 hours a day, 7 days a week',

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
    'common.required': 'Required',
    'common.optional': 'Optional',

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
    'dashboard.users': 'User Management',
    'dashboard.permissions': 'Permissions',
    'dashboard.navigation': 'Navigation Management',
    'dashboard.appearance': 'Appearance',
    'dashboard.backup': 'Backup & Restore',

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
    'nav.dashboard': 'لوحة التحكم',
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

    // About Page
    'about.title': 'حول فورنسيك برو',
    'about.subtitle': 'مع أكثر من 20 عاماً من الخبرة، نحن شركة استشارات رائدة في الطب الشرعي والحماية المدنية مكرسة لتقديم التحليل الخبير والشهادة.',
    'about.mission.title': 'مهمتنا',
    'about.mission.desc': 'تقديم تحليل جنائي دقيق وموثوق وسليم علمياً وخدمات الحماية المدنية التي تخدم العدالة وتحمي المجتمعات.',
    'about.team.title': 'فريقنا',
    'about.team.desc': 'فريق مخصص من المهنيين المعتمدين مع خبرة واسعة في علوم الطب الشرعي والحماية المدنية وشهادة الخبراء.',
    'about.values.title': 'قيمنا',
    'about.values.desc': 'النزاهة والدقة والصرامة العلمية توجه كل ما نقوم به. نحن ملتزمون بأعلى معايير التميز المهني.',
    'about.history.title': 'تاريخنا',
    'about.whyChoose.title': 'لماذا تختار فورنسيك برو؟',
    'about.cta.title': 'مستعد للعمل معنا؟',
    'about.cta.subtitle': 'اتصل بنا اليوم لمناقشة احتياجاتك في الطب الشرعي والحماية المدنية.',

    // Services Page
    'services.title': 'خدماتنا',
    'services.subtitle': 'خدمات شاملة في الطب الشرعي والحماية المدنية مدعومة بأكثر من 20 عاماً من الخبرة والشهادات المهنية.',
    'services.cta.title': 'تحتاج استشارة خبير؟',
    'services.cta.subtitle': 'اتصل بنا اليوم لمناقشة احتياجاتك المحددة وتعلم كيف يمكننا المساعدة.',

    // Blog Page
    'blog.title': 'رؤى ومقالات الخبراء',
    'blog.subtitle': 'ابق على اطلاع بأحدث التطورات في علوم الطب الشرعي والحماية المدنية وتقنيات التحقيق من فريق الخبراء لدينا.',
    'blog.search.placeholder': 'البحث في المقالات...',
    'blog.categories.all': 'جميع الفئات',
    'blog.noResults': 'لم يتم العثور على مقالات تطابق معايير البحث الخاصة بك.',
    'blog.newsletter.title': 'ابق محدثاً',
    'blog.newsletter.subtitle': 'اشترك في نشرتنا الإخبارية للحصول على أحدث الرؤى والتحديثات من فريق الخبراء لدينا.',
    'blog.newsletter.placeholder': 'أدخل بريدك الإلكتروني',
    'blog.newsletter.subscribe': 'اشترك',

    // Contact Page
    'contact.title': 'اتصل بنا',
    'contact.subtitle': 'تواصل مع فريق الخبراء لدينا للاستشارة حول تحليل الطب الشرعي وخدمات الحماية المدنية.',
    'contact.form.title': 'أرسل لنا رسالة',
    'contact.form.name': 'الاسم الكامل',
    'contact.form.email': 'عنوان البريد الإلكتروني',
    'contact.form.phone': 'رقم الهاتف',
    'contact.form.subject': 'الموضوع',
    'contact.form.message': 'الرسالة',
    'contact.form.messagePlaceholder': 'يرجى تقديم تفاصيل حول قضيتك أو استفسارك...',
    'contact.form.send': 'إرسال الرسالة',
    'contact.info.title': 'معلومات الاتصال',
    'contact.info.phone': 'الهاتف',
    'contact.info.email': 'البريد الإلكتروني',
    'contact.info.address': 'العنوان',
    'contact.hours.title': 'ساعات العمل',
    'contact.hours.emergency': 'خدمات الطوارئ متاحة 24/7',
    'contact.emergency.title': 'اتصال الطوارئ',
    'contact.emergency.desc': 'للتحليل الجنائي العاجل أو استشارات الطوارئ، اتصل بخط الطوارئ لدينا على مدار 24/7:',
    'contact.emergency.available': 'متاح 24 ساعة في اليوم، 7 أيام في الأسبوع',

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
    'common.required': 'مطلوب',
    'common.optional': 'اختياري',

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
    'dashboard.users': 'إدارة المستخدمين',
    'dashboard.permissions': 'الصلاحيات',
    'dashboard.navigation': 'إدارة التنقل',
    'dashboard.appearance': 'المظهر',
    'dashboard.backup': 'النسخ الاحتياطي والاستعادة',

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