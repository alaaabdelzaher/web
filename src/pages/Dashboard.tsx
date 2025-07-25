import React, { useState, useEffect } from 'react';
import { Home, FileText, Settings, MessageSquare, LogOut, Edit3, Save, CheckCircle, AlertCircle, Loader, Shield, Users, Award, Phone, Mail, MapPin, Star, Plus, Trash2, Eye, EyeOff, Globe, Moon, Sun, Link as LinkIcon, AlignCenterVertical as Certificate, Briefcase, MessageCircle, Navigation, Palette, Database, Lock, BarChart3, Image, Search, Filter, ChevronDown, ChevronUp, ExternalLink, Copy, RefreshCw } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { DatabaseService, supabase } from '../lib/supabase';

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const { language, setLanguage, t } = useLanguage();
  const [activeSection, setActiveSection] = useState('overview');
  const [editMode, setEditMode] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');
  const [darkMode, setDarkMode] = useState(false);
  const [previewLanguage, setPreviewLanguage] = useState<'ar' | 'en'>('ar');

  // Data states
  const [homeContent, setHomeContent] = useState<any>({});
  const [certificates, setCertificates] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [contactInfo, setContactInfo] = useState<any>({});
  const [footerLinks, setFooterLinks] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [stats, setStats] = useState<any[]>([]);
  const [teamMembers, setTeamMembers] = useState<any[]>([]);

  // Edit states
  const [editData, setEditData] = useState<any>({});
  const [newItem, setNewItem] = useState<any>({});

  const showMessage = (msg: string, type: 'success' | 'error' = 'success') => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => setMessage(''), 3000);
  };

  // Real-time subscriptions
  useEffect(() => {
    const setupSubscriptions = () => {
      // Subscribe to content sections changes
      const sectionsSubscription = supabase
        .channel('content_sections')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'content_sections' }, () => {
          loadHomeContent();
        })
        .subscribe();

      // Subscribe to services changes
      const servicesSubscription = supabase
        .channel('services')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'services' }, () => {
          loadServices();
        })
        .subscribe();

      // Subscribe to testimonials changes
      const testimonialsSubscription = supabase
        .channel('testimonials')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'testimonials' }, () => {
          loadTestimonials();
        })
        .subscribe();

      // Subscribe to certifications changes
      const certificationsSubscription = supabase
        .channel('certifications')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'certifications' }, () => {
          loadCertifications();
        })
        .subscribe();

      return () => {
        sectionsSubscription.unsubscribe();
        servicesSubscription.unsubscribe();
        testimonialsSubscription.unsubscribe();
        certificationsSubscription.unsubscribe();
      };
    };

    setupSubscriptions();
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      setLoading(true);
      await Promise.all([
        loadHomeContent(),
        loadCertifications(),
        loadServices(),
        loadTestimonials(),
        loadContactInfo(),
        loadFooterLinks(),
        loadBlogPosts(),
        loadMessages(),
        loadStats(),
        loadTeamMembers()
      ]);
    } catch (error) {
      console.error('Error loading data:', error);
      showMessage('خطأ في تحميل البيانات', 'error');
    } finally {
      setLoading(false);
    }
  };

  const loadHomeContent = async () => {
    try {
      const sections = await DatabaseService.getContentSections();
      const content: any = {};
      sections.forEach(section => {
        content[section.section_key] = section.content;
      });
      setHomeContent(content);
    } catch (error) {
      console.error('Error loading home content:', error);
    }
  };

  const loadCertifications = async () => {
    try {
      const data = await DatabaseService.getCertifications();
      setCertificates(data);
    } catch (error) {
      console.error('Error loading certifications:', error);
    }
  };

  const loadServices = async () => {
    try {
      const data = await DatabaseService.getServices();
      setServices(data);
    } catch (error) {
      console.error('Error loading services:', error);
    }
  };

  const loadTestimonials = async () => {
    try {
      const data = await DatabaseService.getTestimonials();
      setTestimonials(data);
    } catch (error) {
      console.error('Error loading testimonials:', error);
    }
  };

  const loadContactInfo = async () => {
    try {
      const settings = await DatabaseService.getSiteSettings();
      const contact: any = {};
      settings.forEach(setting => {
        if (setting.category === 'contact') {
          contact[setting.setting_key] = setting.setting_value;
        }
      });
      setContactInfo(contact);
    } catch (error) {
      console.error('Error loading contact info:', error);
    }
  };

  const loadFooterLinks = async () => {
    try {
      const settings = await DatabaseService.getSiteSettings();
      const links = settings.filter(s => s.category === 'footer_links').map(s => ({
        id: s.id,
        label: s.setting_key,
        url: s.setting_value,
        visible: s.is_public
      }));
      setFooterLinks(links);
    } catch (error) {
      console.error('Error loading footer links:', error);
    }
  };

  const loadBlogPosts = async () => {
    try {
      const data = await DatabaseService.getBlogPosts();
      setPosts(data);
    } catch (error) {
      console.error('Error loading blog posts:', error);
    }
  };

  const loadMessages = async () => {
    try {
      const data = await DatabaseService.getContactMessages();
      setMessages(data);
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const loadStats = async () => {
    try {
      const data = await DatabaseService.getStats();
      setStats(data);
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const loadTeamMembers = async () => {
    try {
      const data = await DatabaseService.getTeamMembers();
      setTeamMembers(data);
    } catch (error) {
      console.error('Error loading team members:', error);
    }
  };

  const updateHomeContent = async (key: string, content: string) => {
    try {
      setLoading(true);
      await DatabaseService.updateContentSection(key, content);
      await loadHomeContent();
      setEditMode(null);
      showMessage('تم تحديث المحتوى بنجاح');
    } catch (error) {
      showMessage('حدث خطأ في تحديث المحتوى', 'error');
    } finally {
      setLoading(false);
    }
  };

  const updateContactInfo = async (key: string, value: string) => {
    try {
      setLoading(true);
      await DatabaseService.updateSiteSetting(`contact_${key}`, value);
      await loadContactInfo();
      showMessage('تم تحديث معلومات التواصل بنجاح');
    } catch (error) {
      showMessage('حدث خطأ في تحديث معلومات التواصل', 'error');
    } finally {
      setLoading(false);
    }
  };

  const createCertification = async (cert: any) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('certifications')
        .insert({
          name: cert.name,
          organization: cert.organization,
          description: cert.description,
          year_obtained: cert.year_obtained,
          is_featured: cert.is_featured || false
        })
        .select()
        .single();

      if (error) throw error;
      await loadCertifications();
      setNewItem({});
      showMessage('تم إضافة الشهادة بنجاح');
    } catch (error) {
      showMessage('حدث خطأ في إضافة الشهادة', 'error');
    } finally {
      setLoading(false);
    }
  };

  const updateCertification = async (id: string, updates: any) => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('certifications')
        .update(updates)
        .eq('id', id);

      if (error) throw error;
      await loadCertifications();
      setEditMode(null);
      showMessage('تم تحديث الشهادة بنجاح');
    } catch (error) {
      showMessage('حدث خطأ في تحديث الشهادة', 'error');
    } finally {
      setLoading(false);
    }
  };

  const deleteCertification = async (id: string) => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('certifications')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await loadCertifications();
      showMessage('تم حذف الشهادة بنجاح');
    } catch (error) {
      showMessage('حدث خطأ في حذف الشهادة', 'error');
    } finally {
      setLoading(false);
    }
  };

  const createService = async (service: any) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('services')
        .insert({
          title: service.title,
          description: service.description,
          icon: service.icon,
          category: service.category,
          features: service.features || [],
          is_active: service.is_active !== false
        })
        .select()
        .single();

      if (error) throw error;
      await loadServices();
      setNewItem({});
      showMessage('تم إضافة الخدمة بنجاح');
    } catch (error) {
      showMessage('حدث خطأ في إضافة الخدمة', 'error');
    } finally {
      setLoading(false);
    }
  };

  const updateService = async (id: string, updates: any) => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('services')
        .update(updates)
        .eq('id', id);

      if (error) throw error;
      await loadServices();
      setEditMode(null);
      showMessage('تم تحديث الخدمة بنجاح');
    } catch (error) {
      showMessage('حدث خطأ في تحديث الخدمة', 'error');
    } finally {
      setLoading(false);
    }
  };

  const deleteService = async (id: string) => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await loadServices();
      showMessage('تم حذف الخدمة بنجاح');
    } catch (error) {
      showMessage('حدث خطأ في حذف الخدمة', 'error');
    } finally {
      setLoading(false);
    }
  };

  const createTestimonial = async (testimonial: any) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('testimonials')
        .insert({
          client_name: testimonial.client_name,
          client_title: testimonial.client_title,
          company: testimonial.company,
          testimonial: testimonial.testimonial,
          rating: testimonial.rating || 5,
          featured: testimonial.featured || false
        })
        .select()
        .single();

      if (error) throw error;
      await loadTestimonials();
      setNewItem({});
      showMessage('تم إضافة الشهادة بنجاح');
    } catch (error) {
      showMessage('حدث خطأ في إضافة الشهادة', 'error');
    } finally {
      setLoading(false);
    }
  };

  const updateTestimonial = async (id: string, updates: any) => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('testimonials')
        .update(updates)
        .eq('id', id);

      if (error) throw error;
      await loadTestimonials();
      setEditMode(null);
      showMessage('تم تحديث الشهادة بنجاح');
    } catch (error) {
      showMessage('حدث خطأ في تحديث الشهادة', 'error');
    } finally {
      setLoading(false);
    }
  };

  const deleteTestimonial = async (id: string) => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await loadTestimonials();
      showMessage('تم حذف الشهادة بنجاح');
    } catch (error) {
      showMessage('حدث خطأ في حذف الشهادة', 'error');
    } finally {
      setLoading(false);
    }
  };

  const EditableField = ({ 
    value, 
    onSave, 
    placeholder = '', 
    multiline = false,
    type = 'text',
    className = ''
  }: {
    value: string;
    onSave: (value: string) => void;
    placeholder?: string;
    multiline?: boolean;
    type?: string;
    className?: string;
  }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(value);

    const handleSave = () => {
      onSave(editValue);
      setIsEditing(false);
    };

    if (isEditing) {
      return (
        <div className="relative">
          {multiline ? (
            <textarea
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className={`${className} border-2 border-blue-500 bg-blue-50 p-2 rounded w-full`}
              placeholder={placeholder}
              rows={4}
            />
          ) : (
            <input
              type={type}
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className={`${className} border-2 border-blue-500 bg-blue-50 p-2 rounded w-full`}
              placeholder={placeholder}
            />
          )}
          <div className="absolute -top-2 -right-2 flex space-x-1">
            <button
              onClick={handleSave}
              className="bg-green-500 text-white p-1 rounded-full hover:bg-green-600"
              disabled={loading}
            >
              {loading ? <Loader className="h-3 w-3 animate-spin" /> : <Save className="h-3 w-3" />}
            </button>
            <button
              onClick={() => setIsEditing(false)}
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
        className={`${className} relative group cursor-pointer hover:bg-blue-50 p-2 rounded transition-colors border border-transparent hover:border-blue-200`}
        onClick={() => {
          setIsEditing(true);
          setEditValue(value);
        }}
      >
        {value || placeholder}
        <Edit3 className="h-4 w-4 text-blue-600 absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    );
  };

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-600">المقالات</p>
              <p className="text-2xl font-bold text-gray-900">{posts.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <MessageSquare className="h-6 w-6 text-green-600" />
            </div>
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-600">الرسائل</p>
              <p className="text-2xl font-bold text-gray-900">{messages.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Briefcase className="h-6 w-6 text-purple-600" />
            </div>
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-600">الخدمات</p>
              <p className="text-2xl font-bold text-gray-900">{services.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Star className="h-6 w-6 text-orange-600" />
            </div>
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-600">الشهادات</p>
              <p className="text-2xl font-bold text-gray-900">{testimonials.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">الرسائل الحديثة</h3>
          <div className="space-y-3">
            {messages.slice(0, 5).map((message) => (
              <div key={message.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div>
                  <p className="font-medium">{message.name}</p>
                  <p className="text-sm text-gray-600">{message.subject}</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  message.status === 'new' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {message.status === 'new' ? 'جديد' : 'مقروء'}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">المقالات الحديثة</h3>
          <div className="space-y-3">
            {posts.slice(0, 5).map((post) => (
              <div key={post.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div>
                  <p className="font-medium">{post.title}</p>
                  <p className="text-sm text-gray-600">{post.category}</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  post.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {post.status === 'published' ? 'منشور' : 'مسودة'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderHomeManagement = () => (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">إدارة الصفحة الرئيسية</h3>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">عنوان الموقع</label>
            <EditableField
              value={homeContent.hero_title || ''}
              onSave={(value) => updateHomeContent('hero_title', value)}
              placeholder="عنوان الصفحة الرئيسية"
              className="text-2xl font-bold"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">وصف الموقع</label>
            <EditableField
              value={homeContent.hero_subtitle || ''}
              onSave={(value) => updateHomeContent('hero_subtitle', value)}
              placeholder="وصف الصفحة الرئيسية"
              multiline={true}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">شارة الخبرة</label>
            <EditableField
              value={homeContent.hero_badge_title || ''}
              onSave={(value) => updateHomeContent('hero_badge_title', value)}
              placeholder="20+ سنة من التميز"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">وصف شارة الخبرة</label>
            <EditableField
              value={homeContent.hero_badge_desc || ''}
              onSave={(value) => updateHomeContent('hero_badge_desc', value)}
              placeholder="وصف شارة الخبرة"
              multiline={true}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">عنوان الدعوة للعمل</label>
            <EditableField
              value={homeContent.cta_title || ''}
              onSave={(value) => updateHomeContent('cta_title', value)}
              placeholder="مستعد للبدء؟"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">وصف الدعوة للعمل</label>
            <EditableField
              value={homeContent.cta_subtitle || ''}
              onSave={(value) => updateHomeContent('cta_subtitle', value)}
              placeholder="اتصل بنا اليوم للحصول على استشارة"
              multiline={true}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderCertificatesManagement = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">إدارة الشهادات المهنية</h2>
        <button
          onClick={() => setEditMode('new_certificate')}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>شهادة جديدة</span>
        </button>
      </div>

      {editMode === 'new_certificate' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">إضافة شهادة جديدة</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="اسم الشهادة"
              className="px-3 py-2 border border-gray-300 rounded-lg"
              value={newItem.name || ''}
              onChange={(e) => setNewItem({...newItem, name: e.target.value})}
            />
            <input
              type="text"
              placeholder="الجهة المانحة"
              className="px-3 py-2 border border-gray-300 rounded-lg"
              value={newItem.organization || ''}
              onChange={(e) => setNewItem({...newItem, organization: e.target.value})}
            />
            <input
              type="number"
              placeholder="سنة الحصول"
              className="px-3 py-2 border border-gray-300 rounded-lg"
              value={newItem.year_obtained || ''}
              onChange={(e) => setNewItem({...newItem, year_obtained: parseInt(e.target.value)})}
            />
            <div className="flex items-center">
              <input
                type="checkbox"
                id="featured"
                checked={newItem.is_featured || false}
                onChange={(e) => setNewItem({...newItem, is_featured: e.target.checked})}
                className="mr-2"
              />
              <label htmlFor="featured">شهادة مميزة</label>
            </div>
            <textarea
              placeholder="وصف الشهادة"
              rows={3}
              className="md:col-span-2 px-3 py-2 border border-gray-300 rounded-lg"
              value={newItem.description || ''}
              onChange={(e) => setNewItem({...newItem, description: e.target.value})}
            />
          </div>
          <div className="mt-4 flex justify-end space-x-4 space-x-reverse">
            <button
              onClick={() => setEditMode(null)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              إلغاء
            </button>
            <button
              onClick={() => createCertification(newItem)}
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? <Loader className="h-4 w-4 animate-spin" /> : 'إضافة'}
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((cert) => (
          <div key={cert.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <Certificate className="h-8 w-8 text-blue-600" />
              <div className="flex space-x-2 space-x-reverse">
                <button
                  onClick={() => setEditMode(`cert_${cert.id}`)}
                  className="text-blue-600 hover:text-blue-800 p-1"
                >
                  <Edit3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => {
                    if (confirm('هل أنت متأكد من حذف هذه الشهادة؟')) {
                      deleteCertification(cert.id);
                    }
                  }}
                  className="text-red-600 hover:text-red-800 p-1"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            {editMode === `cert_${cert.id}` ? (
              <div className="space-y-3">
                <input
                  type="text"
                  value={editData.name || cert.name}
                  onChange={(e) => setEditData({...editData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  placeholder="اسم الشهادة"
                />
                <input
                  type="text"
                  value={editData.organization || cert.organization}
                  onChange={(e) => setEditData({...editData, organization: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  placeholder="الجهة المانحة"
                />
                <div className="flex justify-end space-x-2 space-x-reverse">
                  <button
                    onClick={() => setEditMode(null)}
                    className="px-3 py-1 border border-gray-300 rounded text-sm"
                  >
                    إلغاء
                  </button>
                  <button
                    onClick={() => updateCertification(cert.id, editData)}
                    className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
                  >
                    حفظ
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h3 className="font-semibold text-gray-900 mb-2">{cert.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{cert.organization}</p>
                {cert.year_obtained && (
                  <p className="text-sm text-gray-500">سنة الحصول: {cert.year_obtained}</p>
                )}
                {cert.is_featured && (
                  <span className="inline-block px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full mt-2">
                    مميزة
                  </span>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderServicesManagement = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">إدارة الخدمات</h2>
        <button
          onClick={() => setEditMode('new_service')}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>خدمة جديدة</span>
        </button>
      </div>

      {editMode === 'new_service' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">إضافة خدمة جديدة</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="عنوان الخدمة"
              className="px-3 py-2 border border-gray-300 rounded-lg"
              value={newItem.title || ''}
              onChange={(e) => setNewItem({...newItem, title: e.target.value})}
            />
            <input
              type="text"
              placeholder="الفئة"
              className="px-3 py-2 border border-gray-300 rounded-lg"
              value={newItem.category || ''}
              onChange={(e) => setNewItem({...newItem, category: e.target.value})}
            />
            <input
              type="text"
              placeholder="الأيقونة (اسم الأيقونة)"
              className="px-3 py-2 border border-gray-300 rounded-lg"
              value={newItem.icon || ''}
              onChange={(e) => setNewItem({...newItem, icon: e.target.value})}
            />
            <div className="flex items-center">
              <input
                type="checkbox"
                id="service_active"
                checked={newItem.is_active !== false}
                onChange={(e) => setNewItem({...newItem, is_active: e.target.checked})}
                className="mr-2"
              />
              <label htmlFor="service_active">خدمة نشطة</label>
            </div>
            <textarea
              placeholder="وصف الخدمة"
              rows={3}
              className="md:col-span-2 px-3 py-2 border border-gray-300 rounded-lg"
              value={newItem.description || ''}
              onChange={(e) => setNewItem({...newItem, description: e.target.value})}
            />
            <textarea
              placeholder="مميزات الخدمة (كل ميزة في سطر منفصل)"
              rows={4}
              className="md:col-span-2 px-3 py-2 border border-gray-300 rounded-lg"
              value={newItem.features?.join('\n') || ''}
              onChange={(e) => setNewItem({...newItem, features: e.target.value.split('\n').filter(f => f.trim())})}
            />
          </div>
          <div className="mt-4 flex justify-end space-x-4 space-x-reverse">
            <button
              onClick={() => setEditMode(null)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              إلغاء
            </button>
            <button
              onClick={() => createService(newItem)}
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? <Loader className="h-4 w-4 animate-spin" /> : 'إضافة'}
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <Briefcase className="h-8 w-8 text-blue-600" />
              <div className="flex space-x-2 space-x-reverse">
                <button
                  onClick={() => setEditMode(`service_${service.id}`)}
                  className="text-blue-600 hover:text-blue-800 p-1"
                >
                  <Edit3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => {
                    if (confirm('هل أنت متأكد من حذف هذه الخدمة؟')) {
                      deleteService(service.id);
                    }
                  }}
                  className="text-red-600 hover:text-red-800 p-1"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            {editMode === `service_${service.id}` ? (
              <div className="space-y-3">
                <input
                  type="text"
                  value={editData.title || service.title}
                  onChange={(e) => setEditData({...editData, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  placeholder="عنوان الخدمة"
                />
                <textarea
                  value={editData.description || service.description}
                  onChange={(e) => setEditData({...editData, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  placeholder="وصف الخدمة"
                  rows={3}
                />
                <div className="flex justify-end space-x-2 space-x-reverse">
                  <button
                    onClick={() => setEditMode(null)}
                    className="px-3 py-1 border border-gray-300 rounded text-sm"
                  >
                    إلغاء
                  </button>
                  <button
                    onClick={() => updateService(service.id, editData)}
                    className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
                  >
                    حفظ
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h3 className="font-semibold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{service.description}</p>
                <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  {service.category}
                </span>
                {service.features && service.features.length > 0 && (
                  <div className="mt-3">
                    <p className="text-xs font-medium text-gray-700 mb-1">المميزات:</p>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {service.features.slice(0, 3).map((feature: string, index: number) => (
                        <li key={index}>• {feature}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderTestimonialsManagement = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">إدارة آراء العملاء</h2>
        <button
          onClick={() => setEditMode('new_testimonial')}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>رأي جديد</span>
        </button>
      </div>

      {editMode === 'new_testimonial' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">إضافة رأي جديد</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="اسم العميل"
              className="px-3 py-2 border border-gray-300 rounded-lg"
              value={newItem.client_name || ''}
              onChange={(e) => setNewItem({...newItem, client_name: e.target.value})}
            />
            <input
              type="text"
              placeholder="المنصب"
              className="px-3 py-2 border border-gray-300 rounded-lg"
              value={newItem.client_title || ''}
              onChange={(e) => setNewItem({...newItem, client_title: e.target.value})}
            />
            <input
              type="text"
              placeholder="الشركة"
              className="px-3 py-2 border border-gray-300 rounded-lg"
              value={newItem.company || ''}
              onChange={(e) => setNewItem({...newItem, company: e.target.value})}
            />
            <select
              className="px-3 py-2 border border-gray-300 rounded-lg"
              value={newItem.rating || 5}
              onChange={(e) => setNewItem({...newItem, rating: parseInt(e.target.value)})}
            >
              <option value={5}>5 نجوم</option>
              <option value={4}>4 نجوم</option>
              <option value={3}>3 نجوم</option>
              <option value={2}>2 نجوم</option>
              <option value={1}>1 نجمة</option>
            </select>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="testimonial_featured"
                checked={newItem.featured || false}
                onChange={(e) => setNewItem({...newItem, featured: e.target.checked})}
                className="mr-2"
              />
              <label htmlFor="testimonial_featured">رأي مميز</label>
            </div>
            <textarea
              placeholder="نص الرأي"
              rows={4}
              className="md:col-span-2 px-3 py-2 border border-gray-300 rounded-lg"
              value={newItem.testimonial || ''}
              onChange={(e) => setNewItem({...newItem, testimonial: e.target.value})}
            />
          </div>
          <div className="mt-4 flex justify-end space-x-4 space-x-reverse">
            <button
              onClick={() => setEditMode(null)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              إلغاء
            </button>
            <button
              onClick={() => createTestimonial(newItem)}
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? <Loader className="h-4 w-4 animate-spin" /> : 'إضافة'}
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-4 w-4 ${i < testimonial.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              <div className="flex space-x-2 space-x-reverse">
                <button
                  onClick={() => setEditMode(`testimonial_${testimonial.id}`)}
                  className="text-blue-600 hover:text-blue-800 p-1"
                >
                  <Edit3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => {
                    if (confirm('هل أنت متأكد من حذف هذا الرأي؟')) {
                      deleteTestimonial(testimonial.id);
                    }
                  }}
                  className="text-red-600 hover:text-red-800 p-1"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            {editMode === `testimonial_${testimonial.id}` ? (
              <div className="space-y-3">
                <input
                  type="text"
                  value={editData.client_name || testimonial.client_name}
                  onChange={(e) => setEditData({...editData, client_name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  placeholder="اسم العميل"
                />
                <textarea
                  value={editData.testimonial || testimonial.testimonial}
                  onChange={(e) => setEditData({...editData, testimonial: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  placeholder="نص الرأي"
                  rows={3}
                />
                <div className="flex justify-end space-x-2 space-x-reverse">
                  <button
                    onClick={() => setEditMode(null)}
                    className="px-3 py-1 border border-gray-300 rounded text-sm"
                  >
                    إلغاء
                  </button>
                  <button
                    onClick={() => updateTestimonial(testimonial.id, editData)}
                    className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
                  >
                    حفظ
                  </button>
                </div>
              </div>
            ) : (
              <>
                <p className="text-gray-600 mb-4 italic">"{testimonial.testimonial}"</p>
                <div className="border-t pt-4">
                  <p className="font-semibold text-gray-900">{testimonial.client_name}</p>
                  {testimonial.client_title && (
                    <p className="text-sm text-gray-600">{testimonial.client_title}</p>
                  )}
                  {testimonial.company && (
                    <p className="text-sm text-gray-600">{testimonial.company}</p>
                  )}
                  {testimonial.featured && (
                    <span className="inline-block px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full mt-2">
                      مميز
                    </span>
                  )}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderContactManagement = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">إدارة معلومات التواصل</h2>
      
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">رقم الهاتف</label>
            <EditableField
              value={contactInfo.contact_phone || ''}
              onSave={(value) => updateContactInfo('phone', value)}
              placeholder="+1 (555) 123-4567"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">البريد الإلكتروني</label>
            <EditableField
              value={contactInfo.contact_email || ''}
              onSave={(value) => updateContactInfo('email', value)}
              placeholder="info@forensicpro.com"
              type="email"
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">العنوان</label>
            <EditableField
              value={contactInfo.contact_address || ''}
              onSave={(value) => updateContactInfo('address', value)}
              placeholder="123 Professional Drive, Suite 400"
              multiline={true}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">ساعات العمل</label>
            <EditableField
              value={contactInfo.contact_hours || ''}
              onSave={(value) => updateContactInfo('hours', value)}
              placeholder="الاثنين - الجمعة: 8:00 ص - 6:00 م"
              multiline={true}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">رقم الطوارئ</label>
            <EditableField
              value={contactInfo.contact_emergency || ''}
              onSave={(value) => updateContactInfo('emergency', value)}
              placeholder="+1 (555) 999-HELP"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderBlogManagement = () => (
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
              value={newItem.title || ''}
              onChange={(e) => setNewItem({...newItem, title: e.target.value})}
            />
            <input
              type="text"
              placeholder="الفئة"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              value={newItem.category || ''}
              onChange={(e) => setNewItem({...newItem, category: e.target.value})}
            />
            <textarea
              placeholder="ملخص المقال"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              value={newItem.excerpt || ''}
              onChange={(e) => setNewItem({...newItem, excerpt: e.target.value})}
            />
            <textarea
              placeholder="محتوى المقال"
              rows={8}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              value={newItem.content || ''}
              onChange={(e) => setNewItem({...newItem, content: e.target.value})}
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
                  const slug = newItem.title?.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '') || '';
                  await DatabaseService.createBlogPost({
                    title: newItem.title || '',
                    content: newItem.content || '',
                    excerpt: newItem.excerpt || '',
                    category: newItem.category || '',
                    slug,
                    status: 'published',
                    author_name: 'Admin',
                    read_time: Math.ceil((newItem.content || '').length / 1000) * 2,
                    tags: newItem.category ? [newItem.category] : []
                  });
                  await loadBlogPosts();
                  setEditMode(null);
                  setNewItem({});
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
                        await loadBlogPosts();
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

  const renderMessagesManagement = () => (
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
                    await loadMessages();
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

  const dashboardNavSections = [
    { id: 'overview', label: 'نظرة عامة', icon: Home },
    { id: 'home', label: 'الصفحة الرئيسية', icon: Home },
    { id: 'certificates', label: 'الشهادات المهنية', icon: Certificate },
    { id: 'services', label: 'الخدمات', icon: Briefcase },
    { id: 'testimonials', label: 'آراء العملاء', icon: MessageCircle },
    { id: 'contact', label: 'معلومات التواصل', icon: Phone },
    { id: 'blog', label: 'المدونة', icon: FileText },
    { id: 'messages', label: 'الرسائل', icon: MessageSquare },
    { id: 'settings', label: 'الإعدادات', icon: Settings }
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`} dir="rtl">
      {/* Header */}
      <header className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} shadow-sm border-b sticky top-0 z-50`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4 space-x-reverse">
              <Shield className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  لوحة التحكم الشاملة
                </h1>
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  إدارة جميع أقسام الموقع مع التحديث المباشر
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="flex items-center space-x-2 space-x-reverse">
                <button
                  onClick={() => setPreviewLanguage(previewLanguage === 'ar' ? 'en' : 'ar')}
                  className={`flex items-center space-x-2 space-x-reverse px-3 py-2 rounded-lg transition-colors ${
                    darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Globe className="h-4 w-4" />
                  <span className="text-sm">{previewLanguage === 'ar' ? 'العربية' : 'English'}</span>
                </button>
              </div>
              
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg transition-colors ${
                  darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
              
              <button
                onClick={() => loadAllData()}
                className={`flex items-center space-x-2 space-x-reverse px-3 py-2 rounded-lg transition-colors ${
                  darkMode ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                }`}
                disabled={loading}
              >
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                <span className="text-sm">تحديث</span>
              </button>
              
              <button
                onClick={onLogout}
                className={`flex items-center space-x-2 space-x-reverse ${
                  darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
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
            <nav className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow sticky top-24`}>
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
                            : darkMode 
                              ? 'text-gray-300 hover:text-white hover:bg-gray-700'
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
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-6`}>
              {activeSection === 'overview' && renderOverview()}
              {activeSection === 'home' && renderHomeManagement()}
              {activeSection === 'certificates' && renderCertificatesManagement()}
              {activeSection === 'services' && renderServicesManagement()}
              {activeSection === 'testimonials' && renderTestimonialsManagement()}
              {activeSection === 'contact' && renderContactManagement()}
              {activeSection === 'blog' && renderBlogManagement()}
              {activeSection === 'messages' && renderMessagesManagement()}
              {activeSection === 'settings' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">إعدادات النظام</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg`}>
                      <h3 className="font-semibold mb-2">إعدادات اللغة</h3>
                      <p className="text-sm text-gray-600 mb-3">اللغة الافتراضية للموقع</p>
                      <select 
                        value={language} 
                        onChange={(e) => setLanguage(e.target.value as 'ar' | 'en')}
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                      >
                        <option value="ar">العربية</option>
                        <option value="en">English</option>
                      </select>
                    </div>
                    
                    <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg`}>
                      <h3 className="font-semibold mb-2">إعدادات المظهر</h3>
                      <p className="text-sm text-gray-600 mb-3">وضع الألوان</p>
                      <button
                        onClick={() => setDarkMode(!darkMode)}
                        className={`w-full px-3 py-2 rounded ${
                          darkMode ? 'bg-gray-600 text-white' : 'bg-white border border-gray-300'
                        }`}
                      >
                        {darkMode ? 'الوضع المظلم' : 'الوضع الفاتح'}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;