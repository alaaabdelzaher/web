import React, { useState, useEffect } from 'react';
import { 
  Home, FileText, MessageSquare, Settings, Users, Shield, 
  Edit3, Save, X, Plus, Trash2, Eye, EyeOff, Moon, Sun,
  Phone, Mail, MapPin, Star, Award, CheckCircle, Globe,
  Calendar, User, Tag, Search, ArrowRight, Target, Flame,
  AlertTriangle, LogOut
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { DatabaseService } from '../lib/supabase';

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const { language, setLanguage } = useLanguage();
  const [activeSection, setActiveSection] = useState('home');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  // Content states
  const [homeContent, setHomeContent] = useState({
    hero_title_ar: 'فورنسيك برو - خبرة موثوقة في الحماية المدنية والطب الشرعي',
    hero_title_en: 'ForensicPro - Trusted Expertise in Civil Protection & Forensics',
    hero_subtitle_ar: 'مع أكثر من 20 عاماً من الخبرة، نقدم تحليلاً شرعياً شاملاً وخدمات الحماية المدنية والاستشارات الخبيرة للحالات القانونية والطوارئ.',
    hero_subtitle_en: 'With over 20 years of experience, we provide comprehensive forensic analysis, civil protection services, and expert consultation for legal and emergency situations.',
    cta1_text_ar: 'احجز استشارة',
    cta1_text_en: 'Book Consultation',
    cta2_text_ar: 'اتصل بنا',
    cta2_text_en: 'Contact Us'
  });

  const [certifications, setCertifications] = useState([]);
  const [services, setServices] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [messages, setMessages] = useState([]);

  // Load data
  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      setLoading(true);
      const [
        certificationsData,
        servicesData,
        testimonialsData,
        postsData,
        messagesData
      ] = await Promise.all([
        DatabaseService.getCertifications(),
        DatabaseService.getServices(),
        DatabaseService.getTestimonials(),
        DatabaseService.getBlogPosts(),
        DatabaseService.getContactMessages()
      ]);

      setCertifications(certificationsData);
      setServices(servicesData);
      setTestimonials(testimonialsData);
      setBlogPosts(postsData);
      setMessages(messagesData);
    } catch (error) {
      console.error('Error loading data:', error);
      showMessage('خطأ في تحميل البيانات', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (text: string, type: 'success' | 'error' = 'success') => {
    setMessage(text);
    setTimeout(() => setMessage(''), 3000);
  };

  const saveHomeContent = async () => {
    try {
      await DatabaseService.updateContentSection('home_content', JSON.stringify(homeContent));
      showMessage('تم حفظ محتوى الصفحة الرئيسية بنجاح');
    } catch (error) {
      showMessage('خطأ في حفظ المحتوى', 'error');
    }
  };

  // Home Content Management
  const renderHomeManagement = () => (
    <div className="p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">إدارة الصفحة الرئيسية</h2>
        <button
          onClick={saveHomeContent}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex items-center gap-2"
        >
          <Save className="h-4 w-4" />
          حفظ التغييرات
        </button>
      </div>

      {/* Hero Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Target className="h-5 w-5" />
          قسم الهيرو الرئيسي
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">العنوان الرئيسي (عربي)</label>
            <textarea
              value={homeContent.hero_title_ar}
              onChange={(e) => setHomeContent({...homeContent, hero_title_ar: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              rows={2}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Main Title (English)</label>
            <textarea
              value={homeContent.hero_title_en}
              onChange={(e) => setHomeContent({...homeContent, hero_title_en: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              rows={2}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">الوصف (عربي)</label>
            <textarea
              value={homeContent.hero_subtitle_ar}
              onChange={(e) => setHomeContent({...homeContent, hero_subtitle_ar: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Description (English)</label>
            <textarea
              value={homeContent.hero_subtitle_en}
              onChange={(e) => setHomeContent({...homeContent, hero_subtitle_en: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">نص الزر الأول (عربي)</label>
            <input
              type="text"
              value={homeContent.cta1_text_ar}
              onChange={(e) => setHomeContent({...homeContent, cta1_text_ar: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">First Button Text (English)</label>
            <input
              type="text"
              value={homeContent.cta1_text_en}
              onChange={(e) => setHomeContent({...homeContent, cta1_text_en: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">معاينة المحتوى</h3>
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white p-8 rounded-lg">
          <h1 className="text-3xl font-bold mb-4">
            {language === 'ar' ? homeContent.hero_title_ar : homeContent.hero_title_en}
          </h1>
          <p className="text-xl text-blue-100 mb-6">
            {language === 'ar' ? homeContent.hero_subtitle_ar : homeContent.hero_subtitle_en}
          </p>
          <div className="flex gap-4">
            <button className="bg-orange-500 text-white px-6 py-3 rounded-lg">
              {language === 'ar' ? homeContent.cta1_text_ar : homeContent.cta1_text_en}
            </button>
            <button className="border-2 border-white text-white px-6 py-3 rounded-lg">
              {language === 'ar' ? homeContent.cta2_text_ar : homeContent.cta2_text_en}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Certifications Management
  const renderCertificationsManagement = () => (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">إدارة الشهادات المهنية</h2>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2">
          <Plus className="h-4 w-4" />
          إضافة شهادة جديدة
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certifications.map((cert: any) => (
          <div key={cert.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <Award className="h-8 w-8 text-blue-600" />
              <div className="flex gap-2">
                <button className="text-blue-500 hover:text-blue-700">
                  <Edit3 className="h-4 w-4" />
                </button>
                <button className="text-red-500 hover:text-red-700">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <h3 className="font-semibold text-lg mb-2">{cert.name}</h3>
            <p className="text-gray-600 mb-2">{cert.organization}</p>
            {cert.year_obtained && (
              <p className="text-sm text-gray-500">{cert.year_obtained}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  // Services Management
  const renderServicesManagement = () => (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">إدارة الخدمات</h2>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2">
          <Plus className="h-4 w-4" />
          إضافة خدمة جديدة
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service: any) => (
          <div key={service.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <Shield className="h-8 w-8 text-blue-600" />
              <div className="flex gap-2">
                <button className="text-blue-500 hover:text-blue-700">
                  <Edit3 className="h-4 w-4" />
                </button>
                <button className="text-red-500 hover:text-red-700">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
            <p className="text-gray-600 mb-4">{service.description}</p>
            {service.features && (
              <ul className="space-y-1">
                {service.features.slice(0, 3).map((feature: string, idx: number) => (
                  <li key={idx} className="flex items-center text-sm">
                    <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  // Testimonials Management
  const renderTestimonialsManagement = () => (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">إدارة آراء العملاء</h2>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2">
          <Plus className="h-4 w-4" />
          إضافة رأي جديد
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((testimonial: any) => (
          <div key={testimonial.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center">
                {[...Array(testimonial.rating || 5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                ))}
              </div>
              <div className="flex gap-2">
                <button className="text-blue-500 hover:text-blue-700">
                  <Edit3 className="h-4 w-4" />
                </button>
                <button className="text-red-500 hover:text-red-700">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <p className="text-gray-700 mb-4">"{testimonial.testimonial}"</p>
            <div className="font-semibold">
              — {testimonial.client_name}
              {testimonial.client_title && `, ${testimonial.client_title}`}
              {testimonial.company && ` at ${testimonial.company}`}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Blog Management
  const renderBlogManagement = () => (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">إدارة المدونة</h2>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2">
          <Plus className="h-4 w-4" />
          مقال جديد
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map((post: any) => (
          <div key={post.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <span className={`px-2 py-1 rounded text-xs ${
                post.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {post.status === 'published' ? 'منشور' : 'مسودة'}
              </span>
              <div className="flex gap-2">
                <button className="text-blue-500 hover:text-blue-700">
                  <Edit3 className="h-4 w-4" />
                </button>
                <button className="text-red-500 hover:text-red-700">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <h3 className="font-semibold mb-2">{post.title}</h3>
            <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>
            <div className="flex items-center text-xs text-gray-500">
              <Calendar className="h-3 w-3 mr-1" />
              {new Date(post.created_at).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Messages Management
  const renderMessagesManagement = () => (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">رسائل العملاء</h2>
      
      <div className="space-y-4">
        {messages.map((message: any) => (
          <div key={message.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold">{message.name}</h3>
                <p className="text-gray-600">{message.email}</p>
              </div>
              <span className={`px-2 py-1 rounded text-xs ${
                message.status === 'new' ? 'bg-blue-100 text-blue-800' : 
                message.status === 'read' ? 'bg-yellow-100 text-yellow-800' : 
                'bg-green-100 text-green-800'
              }`}>
                {message.status === 'new' ? 'جديد' : 
                 message.status === 'read' ? 'مقروء' : 'تم الرد'}
              </span>
            </div>
            <h4 className="font-medium mb-2">{message.subject}</h4>
            <p className="text-gray-700 mb-4">{message.message}</p>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>{new Date(message.created_at).toLocaleString()}</span>
              <div className="flex gap-2">
                <button className="text-blue-500 hover:text-blue-700">
                  تحديث الحالة
                </button>
                <button className="text-green-500 hover:text-green-700">
                  رد
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const dashboardSections = [
    { id: 'home', label: 'الصفحة الرئيسية', icon: Home },
    { id: 'certifications', label: 'الشهادات المهنية', icon: Award },
    { id: 'services', label: 'الخدمات', icon: Shield },
    { id: 'testimonials', label: 'آراء العملاء', icon: Star },
    { id: 'blog', label: 'المدونة', icon: FileText },
    { id: 'messages', label: 'الرسائل', icon: MessageSquare },
    { id: 'settings', label: 'الإعدادات', icon: Settings },
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50'}`} dir="rtl">
      {/* Header */}
      <header className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm border-b sticky top-0 z-50`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4 space-x-reverse">
              <Shield className="h-8 w-8 text-blue-600" />
              <h1 className="text-xl font-bold">لوحة تحكم ForensicPro</h1>
            </div>
            
            <div className="flex items-center space-x-4 space-x-reverse">
              {/* Language Toggle */}
              <button
                onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
              >
                <Globe className="h-4 w-4" />
                {language === 'ar' ? 'English' : 'العربية'}
              </button>

              {/* Dark Mode Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors"
              >
                {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>

              {/* Logout */}
              <button
                onClick={onLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                تسجيل الخروج
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Success/Error Messages */}
      {message && (
        <div className={`fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg ${
          message.includes('خطأ') ? 'bg-red-500' : 'bg-green-500'
        } text-white`}>
          {message}
        </div>
      )}

      <div className="flex">
        {/* Sidebar */}
        <aside className={`w-64 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm min-h-screen sticky top-16`}>
          <nav className="p-4">
            <ul className="space-y-2">
              {dashboardSections.map((section) => (
                <li key={section.id}>
                  <button
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center space-x-3 space-x-reverse px-4 py-3 rounded-lg transition-colors ${
                      activeSection === section.id
                        ? 'bg-blue-500 text-white'
                        : darkMode 
                          ? 'text-gray-300 hover:bg-gray-700' 
                          : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <section.icon className="h-5 w-5" />
                    <span>{section.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {loading && (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          )}

          {!loading && (
            <>
              {activeSection === 'home' && renderHomeManagement()}
              {activeSection === 'certifications' && renderCertificationsManagement()}
              {activeSection === 'services' && renderServicesManagement()}
              {activeSection === 'testimonials' && renderTestimonialsManagement()}
              {activeSection === 'blog' && renderBlogManagement()}
              {activeSection === 'messages' && renderMessagesManagement()}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;