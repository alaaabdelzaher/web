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
    'home.hero.title': 'aabdelzaher - Specialized Technical and Legal Consulting',
    'home.hero.subtitle': 'We specialize in providing technical and legal consulting services in civil protection, forensic evidence, fire and explosives control, with over 20 years of professional experience.',
    'home.cta.consultation': 'Book Consultation',
    'home.cta.contact': 'Contact Us',
    'home.cta.services': 'View Services',
    'home.certifications.title': 'Professional Certifications & Expertise',
    'home.certifications.subtitle': 'Official certifications and documented expertise from government and international training institutions',
    'home.services.title': 'Our Core Services',
    'home.services.subtitle': 'Specialized technical and legal consulting across multiple forensic and civil protection disciplines',
    'home.testimonials.title': 'Client Testimonials',
    'home.testimonials.subtitle': 'Trusted by lawyers, companies, and institutions for technical reports and expert consultation',
    'home.cta.final.title': 'Ready to Get Started?',
    'home.cta.final.subtitle': 'Contact us today for specialized technical consultation and discover how our expertise can support your case or project.',

    // About Page
    'about.title': 'About aabdelzaher',
    'about.subtitle': 'We are a specialized consulting firm founded by experts who held leadership positions in civil protection, forensic evidence, and forensic medicine, with over 20 years of practical experience.',
    'about.mission.title': 'Our Mission',
    'about.mission.desc': 'To provide specialized technical and legal consulting services that support justice and help resolve complex technical and legal issues through scientific analysis and professional expertise.',
    'about.team.title': 'Our Team',
    'about.team.desc': 'A team of experts who held leadership positions in civil protection, forensic evidence, and forensic medicine, with documented experience in major investigations and technical training.',
    'about.values.title': 'Our Values',
    'about.values.desc': 'Scientific accuracy, professional integrity, and commitment to the highest technical and legal standards guide all our work and consulting services.',
    'about.history.title': 'Our History',
    'about.whyChoose.title': 'Why Choose ForensicPro?',
    'about.cta.title': 'Ready to Work with Us?',
    'about.cta.subtitle': 'Contact us today to discuss your technical and legal consulting needs.',

    // Services Page
    'services.title': 'Our Services',
    'services.subtitle': 'Specialized technical and legal consulting services backed by 20+ years of expertise and official certifications.',
    'services.cta.title': 'Need Expert Consultation?',
    'services.cta.subtitle': 'Contact us today to discuss your specific needs and learn how we can help.',

    // Blog Page
    'blog.title': 'Expert Insights & Articles',
    'blog.subtitle': 'Stay informed with the latest developments in forensic science, civil protection, and technical investigation methods from our expert team.',
    'blog.search.placeholder': 'Search articles...',
    'blog.categories.all': 'All Categories',
    'blog.noResults': 'No articles found matching your search criteria.',
    'blog.newsletter.title': 'Stay Updated',
    'blog.newsletter.subtitle': 'Subscribe to our newsletter for the latest insights and updates from our expert team.',
    'blog.newsletter.placeholder': 'Enter your email',
    'blog.newsletter.subscribe': 'Subscribe',

    // Contact Page
    'contact.title': 'Contact Us',
    'contact.subtitle': 'Get in touch with our expert team for specialized technical and legal consulting services.',
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
    'contact.emergency.desc': 'For urgent technical consultations or emergency cases, contact our 24/7 emergency hotline:',
    'contact.emergency.available': 'Available 24 hours a day, 7 days a week',

    // Services
    'services.civil.title': 'Civil Protection Consulting',
    'services.civil.desc': 'Fire safety, rescue operations, facility inspections, technical reports after site examination',
    'services.forensics.title': 'Forensic Evidence & Medicine',
    'services.forensics.desc': 'Crime scene analysis, weapons examination, fires, explosives, forgery cases, biological analysis, cause of death determination',
    'services.explosives.title': 'Fire & Explosives Control',
    'services.explosives.desc': 'Fire investigation, explosives analysis, technical reports, expert responses to official reports',

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
    'dashboard.subtitle': 'Complete management for technical and legal consulting website',
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
    'footer.copyright': '© 2024 aabdelzaher. All rights reserved.',
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
    'home.hero.title': 'aabdelzaher - استشارات فنية وقانونية متخصصة',
    'home.hero.subtitle': 'نتخصص في تقديم الاستشارات الفنية والقانونية في مجالات الحماية المدنية والأدلة الجنائية ومكافحة الحرائق والمفرقعات، بخبرة عملية تتجاوز 20 عاماً.',
    'home.cta.consultation': 'احجز استشارة',
    'home.cta.contact': 'اتصل بنا',
    'home.cta.services': 'عرض الخدمات',
    'home.certifications.title': 'الشهادات المهنية والخبرات',
    'home.certifications.subtitle': 'شهادات رسمية وخبرات موثقة من جهات حكومية ومؤسسات تدريبية دولية',
    'home.services.title': 'خدماتنا الأساسية',
    'home.services.subtitle': 'استشارات فنية وقانونية متخصصة عبر تخصصات متعددة في الأدلة الجنائية والحماية المدنية',
    'home.testimonials.title': 'شهادات العملاء',
    'home.testimonials.subtitle': 'موثوق من قبل المحامين والشركات والمؤسسات في إعداد التقارير الفنية والاستشارات المتخصصة',
    'home.cta.final.title': 'مستعد للبدء؟',
    'home.cta.final.subtitle': 'اتصل بنا اليوم للحصول على استشارة فنية متخصصة واكتشف كيف يمكن لخبرتنا أن تدعم قضيتك أو مشروعك.',

    // About Page
    'about.title': 'حول aabdelzaher',
    'about.subtitle': 'نحن شركة استشارات متخصصة تأسست على يد نخبة من الخبراء الذين شغلوا مناصب قيادية في مجالات الحماية المدنية والأدلة الجنائية والطب الشرعي، بخبرة عملية تتجاوز 20 عاماً.',
    'about.mission.title': 'مهمتنا',
    'about.mission.desc': 'تقديم استشارات فنية وقانونية متخصصة تدعم العدالة وتساعد في حل القضايا الفنية والقانونية المعقدة من خلال التحليل العلمي والخبرة المهنية.',
    'about.team.title': 'فريقنا',
    'about.team.desc': 'فريق من الخبراء الذين شغلوا مناصب قيادية في مجالات الحماية المدنية والأدلة الجنائية والطب الشرعي، بخبرة موثقة في التحقيقات الكبرى والتدريب الفني.',
    'about.values.title': 'قيمنا',
    'about.values.desc': 'الدقة العلمية والنزاهة المهنية والالتزام بأعلى المعايير الفنية والقانونية توجه جميع أعمالنا وخدماتنا الاستشارية.',
    'about.history.title': 'تاريخنا',
    'about.whyChoose.title': 'لماذا تختار فورنسيك برو؟',
    'about.cta.title': 'مستعد للعمل معنا؟',
    'about.cta.subtitle': 'اتصل بنا اليوم لمناقشة احتياجاتك في الاستشارات الفنية والقانونية.',

    // Services Page
    'services.title': 'خدماتنا',
    'services.subtitle': 'خدمات استشارية فنية وقانونية متخصصة مدعومة بأكثر من 20 عاماً من الخبرة والشهادات الرسمية.',
    'services.cta.title': 'تحتاج استشارة خبير؟',
    'services.cta.subtitle': 'اتصل بنا اليوم لمناقشة احتياجاتك المحددة وتعلم كيف يمكننا المساعدة.',

    // Blog Page
    'blog.title': 'رؤى ومقالات الخبراء',
    'blog.subtitle': 'ابق على اطلاع بأحدث التطورات في علوم الطب الشرعي والحماية المدنية وأساليب التحقيق الفني من فريق الخبراء لدينا.',
    'blog.search.placeholder': 'البحث في المقالات...',
    'blog.categories.all': 'جميع الفئات',
    'blog.noResults': 'لم يتم العثور على مقالات تطابق معايير البحث الخاصة بك.',
    'blog.newsletter.title': 'ابق محدثاً',
    'blog.newsletter.subtitle': 'اشترك في نشرتنا الإخبارية للحصول على أحدث الرؤى والتحديثات من فريق الخبراء لدينا.',
    'blog.newsletter.placeholder': 'أدخل بريدك الإلكتروني',
    'blog.newsletter.subscribe': 'اشترك',

    // Contact Page
    'contact.title': 'اتصل بنا',
    'contact.subtitle': 'تواصل مع فريق الخبراء لدينا للحصول على استشارات فنية وقانونية متخصصة.',
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
    'contact.emergency.desc': 'للاستشارات الفنية العاجلة أو حالات الطوارئ، اتصل بخط الطوارئ لدينا على مدار 24/7:',
    'contact.emergency.available': 'متاح 24 ساعة في اليوم، 7 أيام في الأسبوع',

    // Services
    'services.civil.title': 'استشارات الحماية المدنية',
    'services.civil.desc': 'إطفاء، إنقاذ بري ونهري، تفتيش منشآت هامة، تحرير تقارير فنية بعد المعاينة',
    'services.forensics.title': 'الأدلة الجنائية والطب الشرعي',
    'services.forensics.desc': 'تحليل مسارح الجرائم، الأسلحة، الحرائق، المفرقعات، قضايا التزييف والتزوير، التحاليل البيولوجية، تحديد أسباب الوفاة',
    'services.explosives.title': 'مكافحة الحرائق والمفرقعات',
    'services.explosives.desc': 'تحقيقات الحرائق، تحليل المفرقعات، التقارير الفنية، الرد العلمي والفني على تقارير الخبراء',

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
    'dashboard.subtitle': 'إدارة كاملة لموقع الاستشارات الفنية والقانونية',
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
    'footer.copyright': '© 2024 aabdelzaher. جميع الحقوق محفوظة.',
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