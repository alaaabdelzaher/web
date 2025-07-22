import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  FileText, 
  Settings, 
  MessageSquare, 
  LogOut,
  Plus,
  Edit3,
  Trash2,
  Save,
  CheckCircle,
  AlertCircle,
  Loader,
  Shield
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { DatabaseService } from '../lib/supabase';

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');

  // Data states
  const [posts, setPosts] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>({});
  const [sections, setSections] = useState<any[]>([]);

  // Form states
  const [editingPost, setEditingPost] = useState<any>(null);
  const [editingSection, setEditingSection] = useState<any>(null);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: '',
    status: 'draft' as const,
    author_name: 'Admin'
  });

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
      const [postsData, messagesData, sectionsData] = await Promise.all([
        DatabaseService.getBlogPosts(),
        DatabaseService.getContactMessages(),
        DatabaseService.getContentSections()
      ]);
      
      setPosts(postsData);
      setMessages(messagesData);
      setSections(sectionsData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Blog functions
  const handleCreatePost = async () => {
    if (!newPost.title || !newPost.content) {
      showMessage('يرجى ملء العنوان والمحتوى', 'error');
      return;
    }

    try {
      setLoading(true);
      const slug = newPost.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
      const post = await DatabaseService.createBlogPost({
        ...newPost,
        slug,
        read_time: Math.ceil(newPost.content.length / 1000) * 2,
        tags: newPost.category ? [newPost.category] : []
      });
      
      setPosts(prev => [post, ...prev]);
      setNewPost({
        title: '',
        content: '',
        excerpt: '',
        category: '',
        status: 'draft',
        author_name: 'Admin'
      });
      showMessage('تم إنشاء المقال بنجاح');
    } catch (error) {
      showMessage('حدث خطأ في إنشاء المقال', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePost = async (id: string, updates: any) => {
    try {
      setLoading(true);
      const updatedPost = await DatabaseService.updateBlogPost(id, updates);
      setPosts(prev => prev.map(post => post.id === id ? updatedPost : post));
      setEditingPost(null);
      showMessage('تم تحديث المقال بنجاح');
    } catch (error) {
      showMessage('حدث خطأ في تحديث المقال', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا المقال؟')) {
      try {
        await DatabaseService.deleteBlogPost(id);
        setPosts(prev => prev.filter(post => post.id !== id));
        showMessage('تم حذف المقال بنجاح');
      } catch (error) {
        showMessage('حدث خطأ في حذف المقال', 'error');
      }
    }
  };

  // Content functions
  const handleUpdateSection = async (key: string, content: string) => {
    try {
      setLoading(true);
      const updatedSection = await DatabaseService.updateContentSection(key, content);
      setSections(prev => {
        const existing = prev.find(s => s.section_key === key);
        if (existing) {
          return prev.map(s => s.section_key === key ? updatedSection : s);
        } else {
          return [...prev, updatedSection];
        }
      });
      setEditingSection(null);
      showMessage('تم تحديث المحتوى بنجاح');
    } catch (error) {
      showMessage('حدث خطأ في تحديث المحتوى', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Settings functions
  const handleSaveSetting = async (key: string, value: string) => {
    try {
      setLoading(true);
      await DatabaseService.updateSiteSetting(key, value);
      setSettings(prev => ({ ...prev, [key]: value }));
      showMessage('تم حفظ الإعداد بنجاح');
    } catch (error) {
      showMessage('حدث خطأ في حفظ الإعداد', 'error');
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'overview', label: 'نظرة عامة', icon: BarChart3 },
    { id: 'blog', label: 'إدارة المدونة', icon: FileText },
    { id: 'content', label: 'إدارة المحتوى', icon: Edit3 },
    { id: 'messages', label: 'الرسائل', icon: MessageSquare },
    { id: 'settings', label: 'الإعدادات', icon: Settings }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">إجمالي المقالات</p>
              <p className="text-2xl font-bold text-gray-900">{posts.length}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-full">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">أقسام المحتوى</p>
              <p className="text-2xl font-bold text-gray-900">{sections.length}</p>
            </div>
            <div className="p-3 bg-green-50 rounded-full">
              <Edit3 className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">الرسائل الجديدة</p>
              <p className="text-2xl font-bold text-gray-900">
                {messages.filter(m => m.status === 'new').length}
              </p>
            </div>
            <div className="p-3 bg-orange-50 rounded-full">
              <MessageSquare className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">النشاط الأخير</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {posts.slice(0, 5).map((post) => (
              <div key={post.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <FileText className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{post.title}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(post.created_at).toLocaleDateString('ar')}
                    </p>
                  </div>
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

  const renderBlogManagement = () => (
    <div className="space-y-6">
      {/* Create New Post */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">إنشاء مقال جديد</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">العنوان</label>
              <input
                type="text"
                value={newPost.title}
                onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="أدخل عنوان المقال"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">الفئة</label>
              <input
                type="text"
                value={newPost.category}
                onChange={(e) => setNewPost({...newPost, category: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="أدخل فئة المقال"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">الملخص</label>
              <textarea
                value={newPost.excerpt}
                onChange={(e) => setNewPost({...newPost, excerpt: e.target.value})}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="أدخل ملخص المقال"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">المحتوى</label>
              <textarea
                value={newPost.content}
                onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                rows={8}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="أدخل محتوى المقال"
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-4 space-x-reverse">
            <button
              onClick={() => {
                setNewPost({...newPost, status: 'draft'});
                handleCreatePost();
              }}
              disabled={loading}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
            >
              حفظ كمسودة
            </button>
            <button
              onClick={() => {
                setNewPost({...newPost, status: 'published'});
                handleCreatePost();
              }}
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center space-x-2 space-x-reverse"
            >
              {loading && <Loader className="h-4 w-4 animate-spin" />}
              <span>نشر المقال</span>
            </button>
          </div>
        </div>
      </div>

      {/* Posts List */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">المقالات الموجودة</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">{post.title}</h3>
                  <p className="text-sm text-gray-500">{post.category}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(post.created_at).toLocaleDateString('ar')}
                  </p>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    post.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {post.status === 'published' ? 'منشور' : 'مسودة'}
                  </span>
                  <button
                    onClick={() => setEditingPost(post)}
                    className="text-blue-600 hover:text-blue-800 p-1"
                  >
                    <Edit3 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeletePost(post.id)}
                    className="text-red-600 hover:text-red-800 p-1"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Edit Post Modal */}
      {editingPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">تعديل المقال</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">العنوان</label>
                <input
                  type="text"
                  value={editingPost.title}
                  onChange={(e) => setEditingPost({...editingPost, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">المحتوى</label>
                <textarea
                  value={editingPost.content}
                  onChange={(e) => setEditingPost({...editingPost, content: e.target.value})}
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الحالة</label>
                <select
                  value={editingPost.status}
                  onChange={(e) => setEditingPost({...editingPost, status: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="draft">مسودة</option>
                  <option value="published">منشور</option>
                </select>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-4 space-x-reverse">
              <button
                onClick={() => setEditingPost(null)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                إلغاء
              </button>
              <button
                onClick={() => handleUpdatePost(editingPost.id, editingPost)}
                disabled={loading}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center space-x-2 space-x-reverse"
              >
                {loading && <Loader className="h-4 w-4 animate-spin" />}
                <span>حفظ</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderContentManagement = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">إدارة أقسام المحتوى</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {[
              { key: 'hero_title', name: 'عنوان الصفحة الرئيسية', default: 'فورنسيك برو - خبرة موثوقة في الحماية المدنية والطب الشرعي' },
              { key: 'hero_subtitle', name: 'وصف الصفحة الرئيسية', default: 'مع أكثر من 20 عاماً من الخبرة، نقدم تحليلاً شرعياً شاملاً وخدمات الحماية المدنية' },
              { key: 'about_title', name: 'عنوان صفحة من نحن', default: 'حول فورنسيك برو' },
              { key: 'services_title', name: 'عنوان صفحة الخدمات', default: 'خدماتنا المتخصصة' },
              { key: 'contact_title', name: 'عنوان صفحة الاتصال', default: 'اتصل بنا' }
            ].map((item) => {
              const section = sections.find(s => s.section_key === item.key);
              return (
                <div key={item.key} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                    <button
                      onClick={() => setEditingSection({ 
                        section_key: item.key, 
                        section_name: item.name,
                        content: section?.content || item.default 
                      })}
                      className="text-blue-600 hover:text-blue-800 p-1"
                    >
                      <Edit3 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="text-sm text-gray-800 bg-gray-50 p-3 rounded">
                    {section?.content || item.default}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Edit Section Modal */}
      {editingSection && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">تعديل القسم</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">اسم القسم</label>
                <input
                  type="text"
                  value={editingSection.section_name}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">المحتوى</label>
                <textarea
                  value={editingSection.content}
                  onChange={(e) => setEditingSection({...editingSection, content: e.target.value})}
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-4 space-x-reverse">
              <button
                onClick={() => setEditingSection(null)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                إلغاء
              </button>
              <button
                onClick={() => handleUpdateSection(editingSection.section_key, editingSection.content)}
                disabled={loading}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center space-x-2 space-x-reverse"
              >
                {loading && <Loader className="h-4 w-4 animate-spin" />}
                <span>حفظ</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderMessages = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">رسائل الاتصال</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <h3 className="font-medium text-gray-900">{message.name}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      message.status === 'new' ? 'bg-blue-100 text-blue-800' :
                      message.status === 'read' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {message.status === 'new' ? 'جديد' : 
                       message.status === 'read' ? 'مقروء' : 'تم الرد'}
                    </span>
                  </div>
                  <span className="text-sm text-gray-600">{message.email}</span>
                </div>
                <p className="text-sm font-medium text-gray-800 mb-2">{message.subject}</p>
                <p className="text-sm text-gray-600 mb-3">{message.message}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{new Date(message.created_at).toLocaleDateString('ar')}</span>
                  <div className="flex space-x-2 space-x-reverse">
                    <button
                      onClick={async () => {
                        try {
                          await DatabaseService.updateContactMessageStatus(message.id, 'read');
                          setMessages(prev => prev.map(m => 
                            m.id === message.id ? {...m, status: 'read'} : m
                          ));
                          showMessage('تم تحديد الرسالة كمقروءة');
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">إعدادات الموقع</h2>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            {[
              { key: 'site_name', label: 'اسم الموقع', default: 'فورنسيك برو' },
              { key: 'site_description', label: 'وصف الموقع', default: 'شركة استشارات الطب الشرعي والحماية المدنية' },
              { key: 'contact_email', label: 'البريد الإلكتروني', default: 'info@forensicpro.com' },
              { key: 'contact_phone', label: 'رقم الهاتف', default: '+1 (555) 123-4567' },
              { key: 'contact_address', label: 'العنوان', default: '123 Professional Drive, Suite 400' }
            ].map((setting) => (
              <div key={setting.key}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {setting.label}
                </label>
                <div className="flex space-x-2 space-x-reverse">
                  <input
                    type="text"
                    defaultValue={settings[setting.key] || setting.default}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onBlur={(e) => handleSaveSetting(setting.key, e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4 space-x-reverse">
              <Shield className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">لوحة التحكم الإدارية</h1>
                <p className="text-sm text-gray-600">إدارة موقع فورنسيك برو</p>
              </div>
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
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <nav className="bg-white rounded-lg shadow">
              <div className="p-4">
                <div className="space-y-1">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center space-x-3 space-x-reverse px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          activeTab === tab.id
                            ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
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

            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'blog' && renderBlogManagement()}
            {activeTab === 'content' && renderContentManagement()}
            {activeTab === 'messages' && renderMessages()}
            {activeTab === 'settings' && renderSettings()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;