import React, { useState, useEffect } from 'react';
import { 
  Home, FileText, MessageSquare, Settings, Users, Shield, 
  Edit3, Save, X, Plus, Trash2, Eye, EyeOff, Moon, Sun,
  Phone, Mail, MapPin, Star, Award, CheckCircle, Globe,
  Calendar, User, Tag, Search, ArrowRight, Target, Flame,
  AlertTriangle
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { DatabaseService } from '../lib/supabase';

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const { language, setLanguage, t } = useLanguage();
  const [activeSection, setActiveSection] = useState('live-editor');
  const [editMode, setEditMode] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [previewLanguage, setPreviewLanguage] = useState<'ar' | 'en'>('ar');

  // Data states
  const [heroContent, setHeroContent] = useState<any>({});
  const [certifications, setCertifications] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [contactInfo, setContactInfo] = useState<any>({});
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);

  // Load all data on component mount
  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      setLoading(true);
      const [
        heroData,
        certificationsData,
        servicesData,
        testimonialsData,
        contactData,
        postsData,
        messagesData
      ] = await Promise.all([
        DatabaseService.getContentSection('hero_content'),
        DatabaseService.getCertifications(),
        DatabaseService.getServices(),
        DatabaseService.getTestimonials(),
        DatabaseService.getContentSection('contact_info'),
        DatabaseService.getBlogPosts(),
        DatabaseService.getContactMessages()
      ]);

      // Parse hero content
      if (heroData?.content) {
        try {
          setHeroContent(JSON.parse(heroData.content));
        } catch {
          setHeroContent({});
        }
      }

      // Parse contact info
      if (contactData?.content) {
        try {
          setContactInfo(JSON.parse(contactData.content));
        } catch {
          setContactInfo({});
        }
      }

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

  // Save content to Supabase
  const saveContent = async (section: string, content: any) => {
    try {
      await DatabaseService.updateContentSectionMultilingual(section, content, previewLanguage);
      showMessage('تم حفظ التغييرات بنجاح');
      await loadAllData(); // Reload to sync
    } catch (error) {
      console.error('Error saving content:', error);
      showMessage('خطأ في حفظ التغييرات', 'error');
    }
  };

  // Get content for current language
  const getLocalizedContent = (content: any, key: string, fallback: string = '') => {
    if (typeof content === 'object' && content[previewLanguage]) {
      return content[previewLanguage][key] || fallback;
    }
    return content[key] || fallback;
  };

  // Editable text component with live preview
  const EditableText = ({ 
    content, 
    contentKey,
    section,
    onSave, 
    className = "", 
    placeholder = "اضغط للتعديل",
    multiline = false,
    tag = 'span'
  }: {
    content: any;
    contentKey: string;
    section: string;
    onSave?: (value: string) => void;
    className?: string;
    placeholder?: string;
    multiline?: boolean;
    tag?: string;
  }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState('');

    useEffect(() => {
      setValue(getLocalizedContent(content, contentKey, placeholder));
    }, [content, contentKey, previewLanguage]);

    const handleSave = async () => {
      const updatedContent = {
        ...content,
        [previewLanguage]: {
          ...content[previewLanguage],
          [contentKey]: value
        }
      };
      
      if (onSave) {
        onSave(value);
      } else {
        await saveContent(section, updatedContent);
      }
      setIsEditing(false);
    };

    const displayValue = getLocalizedContent(content, contentKey, placeholder);

    if (!editMode) {
      const Tag = tag as keyof JSX.IntrinsicElements;
      return <Tag className={className}>{displayValue}</Tag>;
    }

    if (isEditing) {
      return (
        <div className="relative inline-block w-full">
          {multiline ? (
            <textarea
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full p-2 border-2 border-blue-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white text-gray-900"
              rows={3}
              autoFocus
            />
          ) : (
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full p-2 border-2 border-blue-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white text-gray-900"
              autoFocus
            />
          )}
          <div className="flex gap-2 mt-2">
            <button
              onClick={handleSave}
              className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition-colors"
            >
              <Save className="h-4 w-4" />
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      );
    }

    const Tag = tag as keyof JSX.IntrinsicElements;
    return (
      <div className="relative group">
        <Tag className={`${className} ${editMode ? 'hover:bg-blue-50 hover:outline hover:outline-2 hover:outline-blue-300 cursor-pointer transition-all' : ''}`}>
          {displayValue}
        </Tag>
        {editMode && (
          <button
            onClick={() => setIsEditing(true)}
            className="absolute -top-2 -right-2 bg-blue-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
          >
            <Edit3 className="h-3 w-3" />
          </button>
        )}
      </div>
    );
  };

  // Live Website Editor
  const renderLiveEditor = () => (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white'}`} dir={previewLanguage === 'ar' ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <EditableText
                content={heroContent}
                contentKey="title"
                section="hero_content"
                className="text-4xl md:text-5xl font-bold mb-6 leading-tight block"
                placeholder="ForensicPro - Trusted Expertise in Civil Protection & Forensics"
                tag="h1"
                multiline
              />
              <EditableText
                content={heroContent}
                contentKey="subtitle"
                section="hero_content"
                className="text-xl text-blue-100 mb-8 leading-relaxed block"
                placeholder="With over 20 years of experience, we provide comprehensive forensic analysis..."
                tag="p"
                multiline
              />
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors text-center">
                  <EditableText
                    content={heroContent}
                    contentKey="cta1_text"
                    section="hero_content"
                    placeholder="Book Consultation"
                  />
                </button>
                <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-800 transition-colors text-center">
                  <EditableText
                    content={heroContent}
                    contentKey="cta2_text"
                    section="hero_content"
                    placeholder="Contact Us"
                  />
                </button>
              </div>
            </div>
            <div className="lg:text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20">
                <div className="flex items-center justify-center mb-4">
                  <Shield className="h-16 w-16 text-blue-300" />
                </div>
                <EditableText
                  content={heroContent}
                  contentKey="badge_title"
                  section="hero_content"
                  className="text-2xl font-semibold mb-4 block"
                  placeholder="20+ Years of Excellence"
                  tag="h3"
                />
                <EditableText
                  content={heroContent}
                  contentKey="badge_description"
                  section="hero_content"
                  className="text-blue-100 block"
                  placeholder="Professional certifications and expert testimony in over 1,000 cases"
                  tag="p"
                  multiline
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Certifications */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <EditableText
              content={heroContent}
              contentKey="certifications_title"
              section="hero_content"
              className="text-3xl font-bold text-gray-900 mb-4 block"
              placeholder="Professional Certifications"
              tag="h2"
            />
            <EditableText
              content={heroContent}
              contentKey="certifications_subtitle"
              section="hero_content"
              className="text-xl text-gray-600 block"
              placeholder="Recognized expertise and industry credentials"
              tag="p"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {certifications.slice(0, 3).map((cert, index) => (
              <div key={cert.id} className="bg-white p-6 rounded-lg shadow-md text-center relative group">
                <Award className="h-12 w-12 text-blue-800 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">{cert.name}</h3>
                <p className="text-gray-600">{cert.organization}</p>
                {cert.year_obtained && (
                  <p className="text-sm text-gray-500 mt-2">{cert.year_obtained}</p>
                )}
                {editMode && (
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="bg-blue-500 text-white p-1 rounded mr-1">
                      <Edit3 className="h-3 w-3" />
                    </button>
                    <button className="bg-red-500 text-white p-1 rounded">
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
          {editMode && (
            <div className="text-center mt-8">
              <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex items-center gap-2 mx-auto">
                <Plus className="h-4 w-4" />
                إضافة شهادة جديدة
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <EditableText
              content={heroContent}
              contentKey="services_title"
              section="hero_content"
              className="text-3xl font-bold text-gray-900 mb-4 block"
              placeholder="Our Core Services"
              tag="h2"
            />
            <EditableText
              content={heroContent}
              contentKey="services_subtitle"
              section="hero_content"
              className="text-xl text-gray-600 block"
              placeholder="Comprehensive expertise across multiple disciplines"
              tag="p"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Civil Protection Service */}
            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow relative group">
              <Shield className="h-12 w-12 text-blue-800 mb-4" />
              <h3 className="text-2xl font-semibold mb-4">Civil Protection</h3>
              <p className="text-gray-600 mb-6">
                Building inspection reports, fire cause analysis, emergency planning
              </p>
              <ul className="space-y-2 text-gray-600 mb-6">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">Building Inspection Reports</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">Fire Cause Analysis</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">Emergency Planning</span>
                </li>
              </ul>
              {editMode && (
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="bg-blue-500 text-white p-1 rounded">
                    <Edit3 className="h-3 w-3" />
                  </button>
                </div>
              )}
            </div>

            {/* Forensics Service */}
            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow relative group">
              <Users className="h-12 w-12 text-blue-800 mb-4" />
              <h3 className="text-2xl font-semibold mb-4">Forensics</h3>
              <p className="text-gray-600 mb-6">
                Crime scene analysis, physical evidence examination, death cause determination
              </p>
              <ul className="space-y-2 text-gray-600 mb-6">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">Crime Scene Analysis</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">Physical Evidence Examination</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">Death Cause Determination</span>
                </li>
              </ul>
              {editMode && (
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="bg-blue-500 text-white p-1 rounded">
                    <Edit3 className="h-3 w-3" />
                  </button>
                </div>
              )}
            </div>

            {/* Explosives Analysis Service */}
            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow relative group">
              <Award className="h-12 w-12 text-blue-800 mb-4" />
              <h3 className="text-2xl font-semibold mb-4">Explosives Analysis</h3>
              <p className="text-gray-600 mb-6">
                Components analysis, technical reports, expert testimony
              </p>
              <ul className="space-y-2 text-gray-600 mb-6">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">Components Analysis</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">Technical Reports</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">Expert Testimony</span>
                </li>
              </ul>
              {editMode && (
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="bg-blue-500 text-white p-1 rounded">
                    <Edit3 className="h-3 w-3" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <EditableText
              content={heroContent}
              contentKey="testimonials_title"
              section="hero_content"
              className="text-3xl font-bold text-gray-900 mb-4 block"
              placeholder="Client Testimonials"
              tag="h2"
            />
            <EditableText
              content={heroContent}
              contentKey="testimonials_subtitle"
              section="hero_content"
              className="text-xl text-gray-600 block"
              placeholder="Trusted by legal professionals and organizations"
              tag="p"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.slice(0, 2).map((testimonial, index) => (
              <div key={testimonial.id} className="bg-white p-8 rounded-lg shadow-md relative group">
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
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="bg-blue-500 text-white p-1 rounded mr-1">
                      <Edit3 className="h-3 w-3" />
                    </button>
                    <button className="bg-red-500 text-white p-1 rounded">
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
          {editMode && (
            <div className="text-center mt-8">
              <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex items-center gap-2 mx-auto">
                <Plus className="h-4 w-4" />
                إضافة شهادة عميل جديدة
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <EditableText
            content={heroContent}
            contentKey="final_cta_title"
            section="hero_content"
            className="text-3xl font-bold mb-6 block"
            placeholder="Ready to Get Started?"
            tag="h2"
          />
          <EditableText
            content={heroContent}
            contentKey="final_cta_subtitle"
            section="hero_content"
            className="text-xl text-blue-100 mb-8 block"
            placeholder="Contact us today for a consultation and discover how our expertise can help your case."
            tag="p"
            multiline
          />
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors">
              <EditableText
                content={heroContent}
                contentKey="final_cta_button1"
                section="hero_content"
                placeholder="Book Consultation"
              />
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-800 transition-colors">
              <EditableText
                content={heroContent}
                contentKey="final_cta_button2"
                section="hero_content"
                placeholder="Contact Us"
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

  const dashboardNavSections = [
    { id: 'live-editor', label: 'المحرر المباشر', icon: Eye },
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
              <h1 className="text-xl font-bold">المحرر المباشر - ForensicPro</h1>
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

              {/* Language Preview Toggle */}
              <button
                onClick={() => setPreviewLanguage(previewLanguage === 'ar' ? 'en' : 'ar')}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
              >
                <Globe className="h-4 w-4" />
                {previewLanguage === 'ar' ? 'English' : 'العربية'}
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
        <aside className={`w-64 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm min-h-screen sticky top-16`}>
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
              {activeSection === 'live-editor' && renderLiveEditor()}
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