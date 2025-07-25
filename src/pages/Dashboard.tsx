import React, { useState, useEffect } from 'react';
import { 
  Home, FileText, MessageSquare, Settings, Users, Shield, 
  Edit3, Save, X, Plus, Trash2, Eye, EyeOff, Moon, Sun,
  Phone, Mail, MapPin, Star, Award, CheckCircle, Globe,
  Calendar, User, Tag, Search, ArrowRight, Target
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { DatabaseService } from '../lib/supabase';

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const { language, setLanguage, t } = useLanguage();
  const [activeSection, setActiveSection] = useState('home');
  const [editMode, setEditMode] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Data states
  const [sections, setSections] = useState<any[]>([]);
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>({});
  const [certifications, setCertifications] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [stats, setStats] = useState<any[]>([]);

  // Load data
  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      setLoading(true);
      const [
        sectionsData,
        postsData,
        messagesData,
        certificationsData,
        servicesData,
        testimonialsData,
        statsData
      ] = await Promise.all([
        DatabaseService.getContentSections(),
        DatabaseService.getBlogPosts(),
        DatabaseService.getContactMessages(),
        DatabaseService.getCertifications(),
        DatabaseService.getServices(),
        DatabaseService.getTestimonials(),
        DatabaseService.getStats()
      ]);

      setSections(sectionsData);
      setBlogPosts(postsData);
      setMessages(messagesData);
      setCertifications(certificationsData);
      setServices(servicesData);
      setTestimonials(testimonialsData);
      setStats(statsData);
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

  const updateContent = async (key: string, content: string) => {
    try {
      await DatabaseService.updateContentSection(key, content);
      await loadAllData();
      showMessage('تم حفظ التغييرات بنجاح');
    } catch (error) {
      showMessage('خطأ في حفظ التغييرات', 'error');
    }
  };

  const getContent = (key: string, fallback: string = '') => {
    const section = sections.find(s => s.section_key === key);
    return section?.content || fallback;
  };

  // Editable text component
  const EditableText = ({ 
    content, 
    onSave, 
    className = "", 
    placeholder = "اضغط للتعديل",
    multiline = false 
  }: {
    content: string;
    onSave: (value: string) => void;
    className?: string;
    placeholder?: string;
    multiline?: boolean;
  }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(content);

    const handleSave = () => {
      onSave(value);
      setIsEditing(false);
    };

    if (!editMode) {
      return <span className={className}>{content || placeholder}</span>;
    }

    if (isEditing) {
      return (
        <div className="relative inline-block w-full">
          {multiline ? (
            <textarea
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full p-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              autoFocus
            />
          ) : (
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full p-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
          )}
          <div className="flex gap-2 mt-2">
            <button
              onClick={handleSave}
              className="bg-green-500 text-white p-1 rounded hover:bg-green-600"
            >
              <Save className="h-4 w-4" />
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-500 text-white p-1 rounded hover:bg-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="relative group">
        <span className={className}>{content || placeholder}</span>
        <button
          onClick={() => setIsEditing(true)}
          className="absolute -top-2 -right-2 bg-blue-500 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Edit3 className="h-3 w-3" />
        </button>
      </div>
    );
  };

  // Home page management
  const renderHomePage = () => (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white'}`}>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                <EditableText
                  content={getContent('hero_title', 'ForensicPro - Trusted Expertise in Civil Protection & Forensics')}
                  onSave={(value) => updateContent('hero_title', value)}
                  className="block"
                  multiline
                />
              </h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                <EditableText
                  content={getContent('hero_subtitle', 'With over 20 years of experience, we provide comprehensive forensic analysis, civil protection services, and expert consultation for legal and emergency situations.')}
                  onSave={(value) => updateContent('hero_subtitle', value)}
                  className="block"
                  multiline
                />
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors text-center">
                  <EditableText
                    content={getContent('cta_consultation', 'Book Consultation')}
                    onSave={(value) => updateContent('cta_consultation', value)}
                  />
                </button>
                <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-800 transition-colors text-center">
                  <EditableText
                    content={getContent('cta_contact', 'Contact Us')}
                    onSave={(value) => updateContent('cta_contact', value)}
                  />
                </button>
              </div>
            </div>
            <div className="lg:text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20">
                <div className="flex items-center justify-center mb-4">
                  <Shield className="h-16 w-16 text-blue-300" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">
                  <EditableText
                    content={getContent('experience_badge', '20+ Years of Excellence')}
                    onSave={(value) => updateContent('experience_badge', value)}
                  />
                </h3>
                <p className="text-blue-100">
                  <EditableText
                    content={getContent('experience_desc', 'Professional certifications and expert testimony in over 1,000 cases')}
                    onSave={(value) => updateContent('experience_desc', value)}
                    multiline
                  />
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              <EditableText
                content={getContent('certifications_title', 'Professional Certifications')}
                onSave={(value) => updateContent('certifications_title', value)}
              />
            </h2>
            <p className="text-xl text-gray-600">
              <EditableText
                content={getContent('certifications_subtitle', 'Recognized expertise and industry credentials')}
                onSave={(value) => updateContent('certifications_subtitle', value)}
              />
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {certifications.slice(0, 3).map((cert, index) => (
              <div key={cert.id} className="bg-white p-6 rounded-lg shadow-md text-center">
                <Award className="h-12 w-12 text-blue-800 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">{cert.name}</h3>
                <p className="text-gray-600">{cert.organization}</p>
                {editMode && (
                  <div className="mt-4 flex justify-center gap-2">
                    <button className="bg-blue-500 text-white p-2 rounded">
                      <Edit3 className="h-4 w-4" />
                    </button>
                    <button className="bg-red-500 text-white p-2 rounded">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              <EditableText
                content={getContent('services_title', 'Our Core Services')}
                onSave={(value) => updateContent('services_title', value)}
              />
            </h2>
            <p className="text-xl text-gray-600">
              <EditableText
                content={getContent('services_subtitle', 'Comprehensive expertise across multiple disciplines')}
                onSave={(value) => updateContent('services_subtitle', value)}
              />
            </p>
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
                {editMode && (
                  <div className="mt-4 flex justify-center gap-2">
                    <button className="bg-blue-500 text-white p-2 rounded">
                      <Edit3 className="h-4 w-4" />
                    </button>
                    <button className="bg-red-500 text-white p-2 rounded">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              <EditableText
                content={getContent('testimonials_title', 'Client Testimonials')}
                onSave={(value) => updateContent('testimonials_title', value)}
              />
            </h2>
            <p className="text-xl text-gray-600">
              <EditableText
                content={getContent('testimonials_subtitle', 'Trusted by legal professionals and organizations')}
                onSave={(value) => updateContent('testimonials_subtitle', value)}
              />
            </p>
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
                {editMode && (
                  <div className="mt-4 flex justify-center gap-2">
                    <button className="bg-blue-500 text-white p-2 rounded">
                      <Edit3 className="h-4 w-4" />
                    </button>
                    <button className="bg-red-500 text-white p-2 rounded">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            <EditableText
              content={getContent('final_cta_title', 'Ready to Get Started?')}
              onSave={(value) => updateContent('final_cta_title', value)}
            />
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            <EditableText
              content={getContent('final_cta_subtitle', 'Contact us today for a consultation and discover how our expertise can help your case.')}
              onSave={(value) => updateContent('final_cta_subtitle', value)}
              multiline
            />
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors">
              <EditableText
                content={getContent('final_cta_button1', 'Book Consultation')}
                onSave={(value) => updateContent('final_cta_button1', value)}
              />
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-800 transition-colors">
              <EditableText
                content={getContent('final_cta_button2', 'Contact Us')}
                onSave={(value) => updateContent('final_cta_button2', value)}
              />
            </button>
          </div>
        </div>
      </section>
    </div>
  );

  // Blog management
  const renderBlogManagement = () => (
    <div className={`p-6 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white'}`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">إدارة المدونة</h2>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2">
          <Plus className="h-4 w-4" />
          مقال جديد
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map(post => (
          <div key={post.id} className="bg-gray-50 rounded-lg p-6 shadow-md">
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

  // Messages management
  const renderMessagesManagement = () => (
    <div className={`p-6 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white'}`}>
      <h2 className="text-2xl font-bold mb-6">رسائل العملاء</h2>
      
      <div className="space-y-4">
        {messages.map(message => (
          <div key={message.id} className="bg-gray-50 rounded-lg p-6 shadow-md">
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

  // Settings management
  const renderSettingsManagement = () => (
    <div className={`p-6 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white'}`}>
      <h2 className="text-2xl font-bold mb-6">إعدادات الموقع</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Phone className="h-5 w-5" />
            معلومات التواصل
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">رقم الهاتف</label>
              <EditableText
                content={getContent('contact_phone', '+1 (555) 123-4567')}
                onSave={(value) => updateContent('contact_phone', value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">البريد الإلكتروني</label>
              <EditableText
                content={getContent('contact_email', 'info@forensicpro.com')}
                onSave={(value) => updateContent('contact_email', value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">العنوان</label>
              <EditableText
                content={getContent('contact_address', '123 Professional Drive, Suite 400')}
                onSave={(value) => updateContent('contact_address', value)}
                className="w-full p-2 border rounded"
                multiline
              />
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="font-semibold mb-4">إعدادات عامة</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">اسم الموقع</label>
              <EditableText
                content={getContent('site_name', 'ForensicPro')}
                onSave={(value) => updateContent('site_name', value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">وصف الموقع</label>
              <EditableText
                content={getContent('site_description', 'Trusted expertise in civil protection and forensics')}
                onSave={(value) => updateContent('site_description', value)}
                className="w-full p-2 border rounded"
                multiline
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const dashboardNavSections = [
    { id: 'home', label: 'الصفحة الرئيسية', icon: Home },
    { id: 'blog', label: 'المدونة', icon: FileText },
    { id: 'messages', label: 'الرسائل', icon: MessageSquare },
    { id: 'settings', label: 'الإعدادات', icon: Settings },
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50'}`} dir="rtl">
      {/* Header */}
      <header className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm border-b`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4 space-x-reverse">
              <Shield className="h-8 w-8 text-blue-600" />
              <h1 className="text-xl font-bold">لوحة التحكم - ForensicPro</h1>
            </div>
            
            <div className="flex items-center space-x-4 space-x-reverse">
              {/* Edit Mode Toggle */}
              <button
                onClick={() => setEditMode(!editMode)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  editMode 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {editMode ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                {editMode ? 'إيقاف التعديل' : 'تفعيل التعديل'}
              </button>

              {/* Language Toggle */}
              <button
                onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors"
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
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
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
        <aside className={`w-64 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm min-h-screen`}>
          <nav className="p-4">
            <ul className="space-y-2">
              {dashboardNavSections.map((section) => (
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
              {activeSection === 'home' && renderHomePage()}
              {activeSection === 'blog' && renderBlogManagement()}
              {activeSection === 'messages' && renderMessagesManagement()}
              {activeSection === 'settings' && renderSettingsManagement()}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;