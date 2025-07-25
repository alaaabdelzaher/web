import React, { useState, useEffect } from 'react';
import { 
  Home, 
  FileText, 
  Settings, 
  MessageSquare, 
  LogOut,
  Edit3,
  Save,
  CheckCircle,
  AlertCircle,
  Loader,
  Shield,
  Users,
  Award,
  Phone,
  Mail,
  MapPin,
  Star,
  Plus,
  Trash2,
  Eye,
  EyeOff
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { DatabaseService } from '../lib/supabase';

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const { language, t } = useLanguage();
  const [activeSection, setActiveSection] = useState('home');
  const [editMode, setEditMode] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');

  // Data states
  const [posts, setPosts] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [sections, setSections] = useState<any[]>([]);
  const [stats, setStats] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [certifications, setCertifications] = useState<any[]>([]);

  // Edit states
  const [editData, setEditData] = useState<any>({});

  const showMessage = (msg: string, type: 'success' | 'error' = 'success') => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => setMessage(''), 3000);
  };

  // Load data
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [
        postsData, 
        messagesData, 
        sectionsData,
        statsData,
        servicesData,
        teamData,
        testimonialsData,
        certificationsData
      ] = await Promise.all([
        DatabaseService.getBlogPosts(),
        DatabaseService.getContactMessages(),
        DatabaseService.getContentSections(),
        DatabaseService.getStats(),
        DatabaseService.getServices(),
        DatabaseService.getTeamMembers(),
        DatabaseService.getTestimonials(),
        DatabaseService.getCertifications()
      ]);
      
      setPosts(postsData);
      setMessages(messagesData);
      setSections(sectionsData);
      setStats(statsData);
      setServices(servicesData);
      setTeamMembers(teamData);
      setTestimonials(testimonialsData);
      setCertifications(certificationsData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getContent = (key: string, fallback: string = '') => {
    const section = sections.find(s => s.section_key === key);
    return section?.content || fallback;
  };

  const updateContent = async (key: string, content: string) => {
    try {
      setLoading(true);
      await DatabaseService.updateContentSection(key, content);
      await loadData();
      setEditMode(null);
      showMessage('تم تحديث المحتوى بنجاح');
    } catch (error) {
      showMessage('حدث خطأ في تحديث المحتوى', 'error');
    } finally {
      setLoading(false);
    }
  };

  const EditableText = ({ 
    sectionKey, 
    fallback, 
    className = '', 
    multiline = false,
    placeholder = ''
  }: {
    sectionKey: string;
    fallback: string;
    className?: string;
    multiline?: boolean;
    placeholder?: string;
  }) => {
    const content = getContent(sectionKey, fallback);
    const isEditing = editMode === sectionKey;

    if (isEditing) {
      return (
        <div className="relative">
          {multiline ? (
            <textarea
              value={editData[sectionKey] || content}
              onChange={(e) => setEditData({...editData, [sectionKey]: e.target.value})}
              className={`${className} border-2 border-blue-500 bg-blue-50 p-2 rounded`}
              placeholder={placeholder}
              rows={4}
            />
          ) : (
            <input
              type="text"
              value={editData[sectionKey] || content}
              onChange={(e) => setEditData({...editData, [sectionKey]: e.target.value})}
              className={`${className} border-2 border-blue-500 bg-blue-50 p-2 rounded`}
              placeholder={placeholder}
            />
          )}
          <div className="absolute -top-2 -right-2 flex space-x-1">
            <button
              onClick={() => updateContent(sectionKey, editData[sectionKey] || content)}
              className="bg-green-500 text-white p-1 rounded-full hover:bg-green-600"
              disabled={loading}
            >
              {loading ? <Loader className="h-3 w-3 animate-spin" /> : <Save className="h-3 w-3" />}
            </button>
            <button
              onClick={() => setEditMode(null)}
              className="bg-gray-500 text-white p-1 rounded-full hover:bg-gray-600"
            >
              <Eye className="h-3 w-3" />
            </button>
          </div>
        </div>
      );
    }

    return (
      <div 
        className={`${className} relative group cursor-pointer hover:bg-blue-50 p-1 rounded transition-colors`}
        onClick={() => {
          setEditMode(sectionKey);
          setEditData({...editData, [sectionKey]: content});
        }}
      >
        {content || placeholder}
        <Edit3 className="h-4 w-4 text-blue-600 absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    );
  };

  const renderHomeSection = () => (
    <div className="min-h-screen" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <EditableText
                sectionKey="hero_title"
                fallback="فورنسيك برو - خبرة موثوقة في الحماية المدنية والطب الشرعي"
                className="text-4xl md:text-5xl font-bold mb-6 leading-tight w-full"
                placeholder="عنوان الصفحة الرئيسية"
              />
              <EditableText
                sectionKey="hero_subtitle"
                fallback="مع أكثر من 20 عاماً من الخبرة، نقدم تحليلاً شرعياً شاملاً وخدمات الحماية المدنية"
                className="text-xl text-blue-100 mb-8 leading-relaxed w-full"
                multiline={true}
                placeholder="وصف الصفحة الرئيسية"
              />
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors text-center">
                  احجز استشارة
                </button>
                <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-800 transition-colors text-center">
                  اتصل بنا
                </button>
              </div>
            </div>
            <div className="lg:text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20">
                <div className="flex items-center justify-center mb-4">
                  <Shield className="h-16 w-16 text-blue-300" />
                </div>
                <EditableText
                  sectionKey="hero_badge_title"
                  fallback="20+ سنة من التميز"
                  className="text-2xl font-semibold mb-4 w-full"
                  placeholder="عنوان الشارة"
                />
                <EditableText
                  sectionKey="hero_badge_desc"
                  fallback="شهادات مهنية وشهادة خبيرة في أكثر من 1000 قضية"
                  className="text-blue-100 w-full"
                  placeholder="وصف الشارة"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <EditableText
              sectionKey="stats_title"
              fallback="إحصائياتنا"
              className="text-3xl font-bold text-gray-900 mb-4 w-full"
              placeholder="عنوان الإحصائيات"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: Award, label: 'سنوات الخبرة', value: '20+' },
              { icon: Users, label: 'القضايا المحلولة', value: '1000+' },
              { icon: Shield, label: 'العملاء الراضون', value: '500+' },
              { icon: FileText, label: 'التقارير المكتملة', value: '2000+' }
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
                  <Icon className="h-12 w-12 text-blue-800 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <EditableText
              sectionKey="services_title"
              fallback="خدماتنا"
              className="text-3xl font-bold text-gray-900 mb-4 w-full"
              placeholder="عنوان الخدمات"
            />
            <EditableText
              sectionKey="services_subtitle"
              fallback="نقدم خدمات متخصصة في الطب الشرعي والحماية المدنية"
              className="text-xl text-gray-600 w-full"
              placeholder="وصف الخدمات"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: 'الحماية المدنية', desc: 'تقارير فحص المباني وتحليل الحرائق' },
              { icon: Users, title: 'الطب الشرعي', desc: 'تحليل مسرح الجريمة وفحص الأدلة' },
              { icon: Award, title: 'تحليل المتفجرات', desc: 'تحليل المكونات والتقارير الفنية' }
            ].map((service, index) => {
              const Icon = service.icon;
              return (
                <div key={index} className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
                  <Icon className="h-12 w-12 text-blue-800 mb-4" />
                  <EditableText
                    sectionKey={`service_${index}_title`}
                    fallback={service.title}
                    className="text-2xl font-semibold mb-4 w-full"
                    placeholder="عنوان الخدمة"
                  />
                  <EditableText
                    sectionKey={`service_${index}_desc`}
                    fallback={service.desc}
                    className="text-gray-600 w-full"
                    multiline={true}
                    placeholder="وصف الخدمة"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <EditableText
              sectionKey="testimonials_title"
              fallback="آراء العملاء"
              className="text-3xl font-bold text-gray-900 mb-4 w-full"
              placeholder="عنوان آراء العملاء"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                text: 'قدمت فورنسيك برو تحليلاً جنائياً استثنائياً كان بالغ الأهمية لقضيتنا',
                author: 'سارة جونسون، المدعي العام'
              },
              {
                text: 'ساعدتنا استشارة الحماية المدنية في تنفيذ بروتوكولات طوارئ شاملة',
                author: 'مايكل تشين، مدير المرافق'
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                  ))}
                </div>
                <EditableText
                  sectionKey={`testimonial_${index}_text`}
                  fallback={testimonial.text}
                  className="text-gray-600 mb-4 w-full"
                  multiline={true}
                  placeholder="نص الشهادة"
                />
                <EditableText
                  sectionKey={`testimonial_${index}_author`}
                  fallback={testimonial.author}
                  className="font-semibold w-full"
                  placeholder="اسم صاحب الشهادة"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <EditableText
            sectionKey="cta_title"
            fallback="مستعد للبدء؟"
            className="text-3xl font-bold mb-6 w-full"
            placeholder="عنوان الدعوة للعمل"
          />
          <EditableText
            sectionKey="cta_subtitle"
            fallback="اتصل بنا اليوم للحصول على استشارة واكتشف كيف يمكن لخبرتنا أن تساعد قضيتك"
            className="text-xl text-blue-100 mb-8 w-full"
            multiline={true}
            placeholder="وصف الدعوة للعمل"
          />
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors">
              احجز استشارة
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-800 transition-colors">
              اتصل بنا
            </button>
          </div>
        </div>
      </section>
    </div>
  );

  const renderBlogSection = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">إدارة المدونة</h2>
        <button
          onClick={() => setEditMode('new_post')}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>مقال جديد</span>
        </button>
      </div>

      {editMode === 'new_post' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">إنشاء مقال جديد</h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="عنوان المقال"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              value={editData.newPostTitle || ''}
              onChange={(e) => setEditData({...editData, newPostTitle: e.target.value})}
            />
            <input
              type="text"
              placeholder="الفئة"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              value={editData.newPostCategory || ''}
              onChange={(e) => setEditData({...editData, newPostCategory: e.target.value})}
            />
            <textarea
              placeholder="ملخص المقال"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              value={editData.newPostExcerpt || ''}
              onChange={(e) => setEditData({...editData, newPostExcerpt: e.target.value})}
            />
            <textarea
              placeholder="محتوى المقال"
              rows={8}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              value={editData.newPostContent || ''}
              onChange={(e) => setEditData({...editData, newPostContent: e.target.value})}
            />
          </div>
          <div className="mt-6 flex justify-end space-x-4 space-x-reverse">
            <button
              onClick={() => setEditMode(null)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              إلغاء
            </button>
            <button
              onClick={async () => {
                try {
                  setLoading(true);
                  const slug = editData.newPostTitle?.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '') || '';
                  await DatabaseService.createBlogPost({
                    title: editData.newPostTitle || '',
                    content: editData.newPostContent || '',
                    excerpt: editData.newPostExcerpt || '',
                    category: editData.newPostCategory || '',
                    slug,
                    status: 'published',
                    author_name: 'Admin',
                    read_time: Math.ceil((editData.newPostContent || '').length / 1000) * 2,
                    tags: editData.newPostCategory ? [editData.newPostCategory] : []
                  });
                  await loadData();
                  setEditMode(null);
                  setEditData({});
                  showMessage('تم إنشاء المقال بنجاح');
                } catch (error) {
                  showMessage('حدث خطأ في إنشاء المقال', 'error');
                } finally {
                  setLoading(false);
                }
              }}
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center space-x-2 space-x-reverse"
            >
              {loading && <Loader className="h-4 w-4 animate-spin" />}
              <span>نشر المقال</span>
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">{post.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{post.category}</p>
                <p className="text-gray-600 mt-2 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center mt-3 space-x-4 space-x-reverse">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    post.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {post.status === 'published' ? 'منشور' : 'مسودة'}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(post.created_at).toLocaleDateString('ar')}
                  </span>
                </div>
              </div>
              <div className="flex space-x-2 space-x-reverse">
                <button
                  onClick={() => setEditMode(`post_${post.id}`)}
                  className="text-blue-600 hover:text-blue-800 p-1"
                >
                  <Edit3 className="h-4 w-4" />
                </button>
                <button
                  onClick={async () => {
                    if (confirm('هل أنت متأكد من حذف هذا المقال؟')) {
                      try {
                        await DatabaseService.deleteBlogPost(post.id);
                        await loadData();
                        showMessage('تم حذف المقال بنجاح');
                      } catch (error) {
                        showMessage('حدث خطأ في حذف المقال', 'error');
                      }
                    }
                  }}
                  className="text-red-600 hover:text-red-800 p-1"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMessagesSection = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">رسائل العملاء</h2>
      <div className="grid grid-cols-1 gap-4">
        {messages.map((message) => (
          <div key={message.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-gray-900">{message.name}</h3>
                <p className="text-sm text-gray-600">{message.email}</p>
                {message.phone && (
                  <p className="text-sm text-gray-600">{message.phone}</p>
                )}
              </div>
              <span className={`px-2 py-1 text-xs rounded-full ${
                message.status === 'new' ? 'bg-blue-100 text-blue-800' :
                message.status === 'read' ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'
              }`}>
                {message.status === 'new' ? 'جديد' : 
                 message.status === 'read' ? 'مقروء' : 'تم الرد'}
              </span>
            </div>
            <h4 className="font-medium text-gray-800 mb-2">{message.subject}</h4>
            <p className="text-gray-600 mb-4">{message.message}</p>
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>{new Date(message.created_at).toLocaleDateString('ar')}</span>
              <button
                onClick={async () => {
                  try {
                    await DatabaseService.updateContactMessageStatus(message.id, 'read');
                    await loadData();
                    showMessage('تم تحديث حالة الرسالة');
                  } catch (error) {
                    showMessage('حدث خطأ', 'error');
                  }
                }}
                className="text-blue-600 hover:text-blue-800"
              >
                تحديد كمقروء
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSettingsSection = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">إعدادات الموقع</h2>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">اسم الموقع</label>
            <EditableText
              sectionKey="site_name"
              fallback="فورنسيك برو"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="اسم الموقع"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">البريد الإلكتروني</label>
            <EditableText
              sectionKey="contact_email"
              fallback="info@forensicpro.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="البريد الإلكتروني"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">رقم الهاتف</label>
            <EditableText
              sectionKey="contact_phone"
              fallback="+1 (555) 123-4567"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="رقم الهاتف"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">العنوان</label>
            <EditableText
              sectionKey="contact_address"
              fallback="123 Professional Drive, Suite 400"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="العنوان"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">وصف الموقع</label>
            <EditableText
              sectionKey="site_description"
              fallback="شركة استشارات الطب الشرعي والحماية المدنية"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              multiline={true}
              placeholder="وصف الموقع"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const dashboardNavSections = [
    { id: 'home', label: 'الصفحة الرئيسية', icon: Home },
    { id: 'blog', label: 'المدونة', icon: FileText },
    { id: 'messages', label: 'الرسائل', icon: MessageSquare },
    { id: 'settings', label: 'الإعدادات', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4 space-x-reverse">
              <Shield className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">لوحة التحكم الشاملة</h1>
                <p className="text-sm text-gray-600">إدارة جميع أقسام الموقع</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="flex items-center space-x-2 space-x-reverse">
                <button
                  onClick={() => setEditMode(editMode ? null : 'global')}
                  className={`flex items-center space-x-2 space-x-reverse px-3 py-2 rounded-lg transition-colors ${
                    editMode ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                  }`}
                >
                  {editMode ? <EyeOff className="h-4 w-4" /> : <Edit3 className="h-4 w-4" />}
                  <span className="text-sm">{editMode ? 'إيقاف التعديل' : 'تفعيل التعديل'}</span>
                </button>
              </div>
              <button
                onClick={onLogout}
                className="flex items-center space-x-2 space-x-reverse text-gray-600 hover:text-gray-900"
              >
                <LogOut className="h-4 w-4" />
                <span className="text-sm">تسجيل الخروج</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Message */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg flex items-center space-x-2 space-x-reverse ${
            messageType === 'error' 
              ? 'bg-red-50 text-red-700 border border-red-200' 
              : 'bg-green-50 text-green-700 border border-green-200'
          }`}>
            {messageType === 'error' ? (
              <AlertCircle className="h-5 w-5" />
            ) : (
              <CheckCircle className="h-5 w-5" />
            )}
            <span>{message}</span>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <nav className="bg-white rounded-lg shadow sticky top-24">
              <div className="p-4">
                <div className="space-y-1">
                  {dashboardNavSections.map((section) => {
                    const Icon = section.icon;
                    return (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`w-full flex items-center space-x-3 space-x-reverse px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          activeSection === section.id
                            ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{section.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeSection === 'home' && renderHomeSection()}
            {activeSection === 'blog' && renderBlogSection()}
            {activeSection === 'messages' && renderMessagesSection()}
            {activeSection === 'settings' && renderSettingsSection()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;