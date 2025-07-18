import React, { useState } from 'react';
import { 
  BarChart, Users, FileText, TrendingUp, Settings, Upload, Edit3, Trash2, 
  Plus, Search, Filter, Eye, Save, Globe, Shield, MessageSquare, Image,
  Calendar, Tag, Star, Award, Phone, Mail, MapPin, Clock, Target,
  ChevronDown, ChevronRight, Home, Briefcase, Info, BookOpen, Contact,
  AlertCircle, CheckCircle, Loader, LogOut, Camera, Palette
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageToggle from '../components/LanguageToggle';
import UserManagement from '../components/UserManagement';
import NavigationManagement from '../components/NavigationManagement';
import BackupRestore from '../components/BackupRestore';
import { 
  useBlogPosts, 
  usePages, 
  useMediaFiles, 
  useContentSections, 
  useSiteSettings, 
  useChatbotResponses, 
  useContactMessages 
} from '../hooks/useDatabase';

interface DashboardProps {
  onLogout?: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedSection, setExpandedSection] = useState('');
  const [editingContent, setEditingContent] = useState<{[key: string]: string}>({});
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [siteColors, setSiteColors] = useState({
    primary: '#1e40af',
    secondary: '#f97316',
    accent: '#059669'
  });

  // Database hooks
  const { posts, loading: postsLoading, createPost, updatePost, deletePost } = useBlogPosts();
  const { pages, loading: pagesLoading, createPage, updatePage, deletePage } = usePages();
  const { files, loading: filesLoading, uploadFile, deleteFile } = useMediaFiles();
  const { sections, loading: sectionsLoading, updateSection } = useContentSections();
  const { settings, loading: settingsLoading, updateSetting, getSetting } = useSiteSettings();
  const { responses, loading: responsesLoading, createResponse, updateResponse, deleteResponse } = useChatbotResponses();
  const { messages, loading: messagesLoading, updateMessageStatus } = useContactMessages();

  const stats = [
    { label: language === 'ar' ? 'إجمالي الحالات' : 'Total Cases', value: posts.length.toString(), change: '+12%', icon: FileText },
    { label: language === 'ar' ? 'المشاريع النشطة' : 'Active Projects', value: pages.filter(p => p.status === 'published').length.toString(), change: '+5%', icon: TrendingUp },
    { label: language === 'ar' ? 'التقارير الخبيرة' : 'Expert Reports', value: files.length.toString(), change: '+8%', icon: BarChart },
    { label: language === 'ar' ? 'رضا العملاء' : 'Client Satisfaction', value: '98.5%', change: '+2%', icon: Users },
  ];

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? '' : section);
  };

  const handleContentEdit = (key: string, value: string) => {
    setEditingContent(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveContent = async (key: string) => {
    try {
      await updateSection(key, editingContent[key]);
      setEditingContent(prev => {
        const newState = { ...prev };
        delete newState[key];
        return newState;
      });
      alert(language === 'ar' ? 'تم حفظ المحتوى بنجاح!' : 'Content saved successfully!');
    } catch (error) {
      alert(language === 'ar' ? 'حدث خطأ في حفظ المحتوى' : 'Error saving content');
    }
  };

  const handleSaveSetting = async (key: string, value: string) => {
    try {
      await updateSetting(key, value);
      alert(language === 'ar' ? 'تم حفظ الإعداد بنجاح!' : 'Setting saved successfully!');
    } catch (error) {
      alert(language === 'ar' ? 'حدث خطأ في حفظ الإعداد' : 'Error saving setting');
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        await uploadFile(file);
        alert(language === 'ar' ? 'تم رفع الملف بنجاح!' : 'File uploaded successfully!');
      } catch (error) {
        alert(language === 'ar' ? 'حدث خطأ في رفع الملف' : 'Error uploading file');
      }
    }
  };

  const handleLogoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setLogoFile(file);
      try {
        const uploadedFile = await uploadFile(file, 'logos');
        await updateSetting('site_logo', uploadedFile.url);
        alert(language === 'ar' ? 'تم تحديث الشعار بنجاح!' : 'Logo updated successfully!');
      } catch (error) {
        alert(language === 'ar' ? 'حدث خطأ في تحديث الشعار' : 'Error updating logo');
      }
    }
  };

  const handleCreateBlogPost = async () => {
    const title = prompt(language === 'ar' ? 'عنوان المقال:' : 'Article title:');
    if (title) {
      try {
        await createPost({
          title,
          slug: title.toLowerCase().replace(/\s+/g, '-'),
          content: language === 'ar' ? 'محتوى المقال...' : 'Article content...',
          author_name: language === 'ar' ? 'المحرر' : 'Editor',
          category: language === 'ar' ? 'عام' : 'General',
          status: 'draft'
        });
        alert(language === 'ar' ? 'تم إنشاء المقال بنجاح!' : 'Article created successfully!');
      } catch (error) {
        alert(language === 'ar' ? 'حدث خطأ في إنشاء المقال' : 'Error creating article');
      }
    }
  };

  const handleColorChange = async (colorType: string, color: string) => {
    setSiteColors(prev => ({ ...prev, [colorType]: color }));
    await updateSetting(`site_color_${colorType}`, color);
  };

  if (postsLoading || pagesLoading || filesLoading || sectionsLoading || settingsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center" dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <div className="text-center">
          <Loader className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">{language === 'ar' ? 'جاري تحميل البيانات...' : 'Loading data...'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{t('dashboard.title')}</h1>
            <p className="text-gray-600 mt-2">{t('dashboard.subtitle')}</p>
          </div>
          <div className="flex items-center space-x-4 space-x-reverse">
            <LanguageToggle />
            {onLogout && (
              <button
                onClick={onLogout}
                className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>{language === 'ar' ? 'تسجيل الخروج' : 'Logout'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 space-x-reverse overflow-x-auto">
              {[
                { id: 'overview', label: t('dashboard.overview'), icon: BarChart },
                { id: 'users', label: t('dashboard.users'), icon: Users },
                { id: 'permissions', label: t('dashboard.permissions'), icon: Shield },
                { id: 'navigation', label: t('dashboard.navigation'), icon: Settings },
                { id: 'branding', label: language === 'ar' ? 'الهوية البصرية' : 'Branding', icon: Palette },
                { id: 'appearance', label: t('dashboard.appearance'), icon: Palette },
                { id: 'pages', label: t('dashboard.pages'), icon: FileText },
                { id: 'content', label: t('dashboard.content'), icon: Edit3 },
                { id: 'blog', label: t('dashboard.blog'), icon: BookOpen },
                { id: 'media', label: t('dashboard.media'), icon: Image },
                { id: 'messages', label: t('dashboard.messages'), icon: MessageSquare },
                { id: 'chatbot', label: t('dashboard.chatbot'), icon: MessageSquare },
                { id: 'seo', label: t('dashboard.seo'), icon: TrendingUp },
                { id: 'analytics', label: t('dashboard.analytics'), icon: BarChart },
                { id: 'settings', label: t('dashboard.settings'), icon: Settings },
                { id: 'backup', label: t('dashboard.backup'), icon: Upload },
                { id: 'security', label: t('dashboard.security'), icon: Shield },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 space-x-reverse whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-full">
                      <stat.icon className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="mt-2">
                    <span className="text-sm text-green-600 font-medium">{stat.change}</span>
                    <span className="text-sm text-gray-500"> {language === 'ar' ? 'من الشهر الماضي' : 'from last month'}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                {language === 'ar' ? 'إجراءات سريعة' : 'Quick Actions'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button 
                  onClick={handleCreateBlogPost}
                  className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
                >
                  <Plus className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-600">
                    {language === 'ar' ? 'إضافة مقال جديد' : 'Add New Article'}
                  </p>
                </button>
                <label className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors cursor-pointer">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-600">
                    {language === 'ar' ? 'رفع ملفات وسائط' : 'Upload Media Files'}
                  </p>
                  <input type="file" className="hidden" onChange={handleFileUpload} />
                </label>
                <button 
                  onClick={() => setActiveTab('settings')}
                  className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
                >
                  <Settings className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-600">
                    {language === 'ar' ? 'تحديث الإعدادات' : 'Update Settings'}
                  </p>
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                {language === 'ar' ? 'النشاط الأخير' : 'Recent Activity'}
              </h2>
              <div className="space-y-3">
                {posts.slice(0, 5).map((post) => (
                  <div key={post.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <BookOpen className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium text-gray-900">{post.title}</p>
                        <p className="text-sm text-gray-500">
                          {language === 'ar' ? 'تم التحديث:' : 'Updated:'} {new Date(post.updated_at).toLocaleDateString(language === 'ar' ? 'ar' : 'en')}
                        </p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      post.status === 'published' ? 'bg-green-100 text-green-800' :
                      post.status === 'draft' ? 'bg-gray-100 text-gray-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {post.status === 'published' ? (language === 'ar' ? 'منشور' : 'Published') : 
                       post.status === 'draft' ? (language === 'ar' ? 'مسودة' : 'Draft') : 
                       (language === 'ar' ? 'مؤرشف' : 'Archived')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* User Management Tab */}
        {activeTab === 'users' && <UserManagement />}

        {/* Permissions Tab */}
        {activeTab === 'permissions' && (
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  {language === 'ar' ? 'إدارة الصلاحيات' : 'Permissions Management'}
                </h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-red-800 mb-2">
                      {language === 'ar' ? 'مدير' : 'Administrator'}
                    </h3>
                    <ul className="text-sm text-red-700 space-y-1">
                      <li>• {language === 'ar' ? 'الوصول الكامل' : 'Full access'}</li>
                      <li>• {language === 'ar' ? 'إدارة المستخدمين' : 'User management'}</li>
                      <li>• {language === 'ar' ? 'إدارة الإعدادات' : 'Settings management'}</li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-blue-800 mb-2">
                      {language === 'ar' ? 'محرر' : 'Editor'}
                    </h3>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• {language === 'ar' ? 'إدارة المحتوى' : 'Content management'}</li>
                      <li>• {language === 'ar' ? 'إدارة المدونة' : 'Blog management'}</li>
                      <li>• {language === 'ar' ? 'إدارة الوسائط' : 'Media management'}</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-2">
                      {language === 'ar' ? 'مشاهد' : 'Viewer'}
                    </h3>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• {language === 'ar' ? 'عرض المحتوى فقط' : 'View content only'}</li>
                      <li>• {language === 'ar' ? 'عرض التقارير' : 'View reports'}</li>
                      <li>• {language === 'ar' ? 'لا يمكن التعديل' : 'No editing permissions'}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Management Tab */}
        {activeTab === 'navigation' && <NavigationManagement />}

        {/* Appearance Tab */}
        {activeTab === 'appearance' && (
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  {language === 'ar' ? 'إعدادات المظهر' : 'Appearance Settings'}
                </h2>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    {language === 'ar' ? 'القوالب المتاحة' : 'Available Themes'}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border-2 border-blue-500 rounded-lg p-4 bg-blue-50">
                      <div className="w-full h-24 bg-gradient-to-r from-blue-800 to-blue-900 rounded mb-3"></div>
                      <h4 className="font-semibold text-blue-800">
                        {language === 'ar' ? 'القالب الافتراضي' : 'Default Theme'}
                      </h4>
                      <p className="text-sm text-blue-600 mt-1">
                        {language === 'ar' ? 'نشط حالياً' : 'Currently Active'}
                      </p>
                    </div>
                    <div className="border border-gray-300 rounded-lg p-4 hover:border-gray-400 cursor-pointer">
                      <div className="w-full h-24 bg-gradient-to-r from-green-600 to-green-700 rounded mb-3"></div>
                      <h4 className="font-semibold text-gray-800">
                        {language === 'ar' ? 'القالب الأخضر' : 'Green Theme'}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {language === 'ar' ? 'متاح' : 'Available'}
                      </p>
                    </div>
                    <div className="border border-gray-300 rounded-lg p-4 hover:border-gray-400 cursor-pointer">
                      <div className="w-full h-24 bg-gradient-to-r from-purple-600 to-purple-700 rounded mb-3"></div>
                      <h4 className="font-semibold text-gray-800">
                        {language === 'ar' ? 'القالب البنفسجي' : 'Purple Theme'}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {language === 'ar' ? 'متاح' : 'Available'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Backup & Restore Tab */}
        {activeTab === 'backup' && <BackupRestore />}

        {/* Branding Tab */}
        {activeTab === 'branding' && (
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  {language === 'ar' ? 'إدارة الهوية البصرية' : 'Brand Identity Management'}
                </h2>
              </div>
              <div className="p-6 space-y-8">
                {/* Logo Management */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    {language === 'ar' ? 'شعار الموقع' : 'Website Logo'}
                  </h3>
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                      {getSetting('site_logo') ? (
                        <img src={getSetting('site_logo')} alt="Logo" className="w-full h-full object-contain rounded-lg" />
                      ) : (
                        <Camera className="h-8 w-8 text-gray-400" />
                      )}
                    </div>
                    <div>
                      <label className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer inline-flex items-center">
                        <Upload className="h-4 w-4 mr-2" />
                        {language === 'ar' ? 'رفع شعار جديد' : 'Upload New Logo'}
                        <input type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} />
                      </label>
                      <p className="text-sm text-gray-500 mt-2">
                        {language === 'ar' ? 'PNG, JPG, SVG - الحد الأقصى 2MB' : 'PNG, JPG, SVG - Max 2MB'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Color Scheme */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    {language === 'ar' ? 'نظام الألوان' : 'Color Scheme'}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {language === 'ar' ? 'اللون الأساسي' : 'Primary Color'}
                      </label>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <input
                          type="color"
                          value={siteColors.primary}
                          onChange={(e) => handleColorChange('primary', e.target.value)}
                          className="w-12 h-10 rounded border border-gray-300"
                        />
                        <input
                          type="text"
                          value={siteColors.primary}
                          onChange={(e) => handleColorChange('primary', e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {language === 'ar' ? 'اللون الثانوي' : 'Secondary Color'}
                      </label>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <input
                          type="color"
                          value={siteColors.secondary}
                          onChange={(e) => handleColorChange('secondary', e.target.value)}
                          className="w-12 h-10 rounded border border-gray-300"
                        />
                        <input
                          type="text"
                          value={siteColors.secondary}
                          onChange={(e) => handleColorChange('secondary', e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {language === 'ar' ? 'لون التمييز' : 'Accent Color'}
                      </label>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <input
                          type="color"
                          value={siteColors.accent}
                          onChange={(e) => handleColorChange('accent', e.target.value)}
                          className="w-12 h-10 rounded border border-gray-300"
                        />
                        <input
                          type="text"
                          value={siteColors.accent}
                          onChange={(e) => handleColorChange('accent', e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Typography */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    {language === 'ar' ? 'الخطوط' : 'Typography'}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {language === 'ar' ? 'خط العناوين' : 'Heading Font'}
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>Inter</option>
                        <option>Roboto</option>
                        <option>Open Sans</option>
                        <option>Poppins</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {language === 'ar' ? 'خط النص' : 'Body Font'}
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>Inter</option>
                        <option>Roboto</option>
                        <option>Open Sans</option>
                        <option>Source Sans Pro</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Pages Management Tab */}
        {activeTab === 'pages' && (
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">إدارة صفحات الموقع</h2>
                <button 
                  onClick={() => {
                    const name = prompt('اسم الصفحة:');
                    if (name) {
                      createPage({
                        name,
                        slug: name.toLowerCase().replace(/\s+/g, '-'),
                        title: name,
                        content: {},
                        status: 'draft',
                        template: 'default'
                      });
                    }
                  }}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
                >
                  <Plus className="h-4 w-4 ml-2" />
                  صفحة جديدة
                </button>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {pages.map((page) => (
                    <div key={page.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <FileText className="h-5 w-5 text-gray-500" />
                        <div>
                          <h3 className="font-medium text-gray-900">{page.name}</h3>
                          <p className="text-sm text-gray-500">آخر تعديل: {new Date(page.updated_at).toLocaleDateString('ar')}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          page.status === 'published' ? 'bg-green-100 text-green-800' :
                          page.status === 'draft' ? 'bg-gray-100 text-gray-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {page.status === 'published' ? 'منشور' : 
                           page.status === 'draft' ? 'مسودة' : 'مؤرشف'}
                        </span>
                        <button className="text-blue-600 hover:text-blue-800">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => {
                            const newTitle = prompt('العنوان الجديد:', page.title);
                            if (newTitle) {
                              updatePage(page.id, { title: newTitle });
                            }
                          }}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => {
                            if (confirm('هل أنت متأكد من حذف هذه الصفحة؟')) {
                              deletePage(page.id);
                            }
                          }}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Content Management Tab */}
        {activeTab === 'content' && (
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">أقسام المحتوى</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {sections.map((section) => (
                    <div key={section.id} className="border border-gray-200 rounded-lg">
                      <button
                        onClick={() => toggleSection(section.section_key)}
                        className="w-full p-4 text-right flex items-center justify-between hover:bg-gray-50"
                      >
                        <span className="font-medium">{section.section_name}</span>
                        {expandedSection === section.section_key ? 
                          <ChevronDown className="h-4 w-4" /> : 
                          <ChevronRight className="h-4 w-4" />
                        }
                      </button>
                      {expandedSection === section.section_key && (
                        <div className="p-4 border-t border-gray-200">
                          <textarea
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows={3}
                            value={editingContent[section.section_key] ?? section.content}
                            onChange={(e) => handleContentEdit(section.section_key, e.target.value)}
                          />
                          <div className="mt-2 flex justify-end">
                            <button 
                              onClick={() => handleSaveContent(section.section_key)}
                              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
                            >
                              <Save className="h-4 w-4 ml-2" />
                              حفظ
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Blog Management Tab */}
        {activeTab === 'blog' && (
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">إدارة مقالات المدونة</h2>
                <button 
                  onClick={handleCreateBlogPost}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
                >
                  <Plus className="h-4 w-4 ml-2" />
                  مقال جديد
                </button>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {posts.map((post) => (
                    <div key={post.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h3 className="font-medium text-gray-900">{post.title}</h3>
                        <div className="flex items-center space-x-4 space-x-reverse text-sm text-gray-500 mt-1">
                          <span>بواسطة: {post.author_name}</span>
                          <span>{new Date(post.created_at).toLocaleDateString('ar')}</span>
                          <span>المشاهدات: {post.views}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          post.status === 'published' ? 'bg-green-100 text-green-800' :
                          post.status === 'draft' ? 'bg-gray-100 text-gray-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {post.status === 'published' ? 'منشور' : 
                           post.status === 'draft' ? 'مسودة' : 'مؤرشف'}
                        </span>
                        <button className="text-blue-600 hover:text-blue-800">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => {
                            const newTitle = prompt('العنوان الجديد:', post.title);
                            if (newTitle) {
                              updatePost(post.id, { title: newTitle });
                            }
                          }}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => {
                            if (confirm('هل أنت متأكد من حذف هذا المقال؟')) {
                              deletePost(post.id);
                            }
                          }}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Media Management Tab */}
        {activeTab === 'media' && (
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">مكتبة الوسائط</h2>
                <label className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center cursor-pointer">
                  <Upload className="h-4 w-4 ml-2" />
                  رفع ملفات
                  <input type="file" className="hidden" onChange={handleFileUpload} />
                </label>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {files.map((file) => (
                    <div key={file.id} className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="w-full h-24 bg-gray-300 rounded mb-2 flex items-center justify-center">
                        {file.file_type === 'image' ? 
                          <img src={file.url} alt={file.alt_text} className="w-full h-full object-cover rounded" /> :
                          <FileText className="h-8 w-8 text-gray-500" />
                        }
                      </div>
                      <p className="text-sm font-medium text-gray-900 truncate">{file.original_name}</p>
                      <p className="text-xs text-gray-500">{(file.file_size / 1024).toFixed(1)} KB</p>
                      <p className="text-xs text-gray-500">{new Date(file.created_at).toLocaleDateString('ar')}</p>
                      <div className="mt-2 flex justify-between">
                        <button className="text-blue-600 hover:text-blue-800">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => {
                            if (confirm('هل أنت متأكد من حذف هذا الملف؟')) {
                              deleteFile(file.id);
                            }
                          }}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <div className="space-y-8">
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
                          <span className="text-sm text-gray-500">({message.email})</span>
                        </div>
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            message.status === 'new' ? 'bg-blue-100 text-blue-800' :
                            message.status === 'read' ? 'bg-yellow-100 text-yellow-800' :
                            message.status === 'replied' ? 'bg-green-100 text-green-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {message.status === 'new' ? 'جديد' :
                             message.status === 'read' ? 'مقروء' :
                             message.status === 'replied' ? 'تم الرد' : 'مؤرشف'}
                          </span>
                          <span className="text-sm text-gray-500">
                            {new Date(message.created_at).toLocaleDateString('ar')}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm font-medium text-gray-700 mb-2">{message.subject}</p>
                      <p className="text-sm text-gray-600 mb-3">{message.message}</p>
                      <div className="flex space-x-2 space-x-reverse">
                        <button 
                          onClick={() => updateMessageStatus(message.id, 'read')}
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          تحديد كمقروء
                        </button>
                        <button 
                          onClick={() => updateMessageStatus(message.id, 'replied')}
                          className="text-green-600 hover:text-green-800 text-sm"
                        >
                          تم الرد
                        </button>
                        <button 
                          onClick={() => updateMessageStatus(message.id, 'archived')}
                          className="text-gray-600 hover:text-gray-800 text-sm"
                        >
                          أرشفة
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Chatbot Tab */}
        {activeTab === 'chatbot' && (
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">إعدادات الشات بوت</h2>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">رسالة الترحيب</label>
                    <textarea
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={3}
                      defaultValue={getSetting('chatbot_welcome_message')}
                      onBlur={(e) => handleSaveSetting('chatbot_welcome_message', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium text-gray-900">الردود التلقائية</h3>
                      <button 
                        onClick={() => {
                          const keywords = prompt('الكلمات المفتاحية (مفصولة بفواصل):');
                          const response = prompt('الرد التلقائي:');
                          if (keywords && response) {
                            createResponse({
                              trigger_keywords: keywords.split(',').map(k => k.trim()),
                              response_text: response,
                              response_type: 'text',
                              is_active: true,
                              priority: responses.length + 1
                            });
                          }
                        }}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"
                      >
                        إضافة رد جديد
                      </button>
                    </div>
                    <div className="space-y-3">
                      {responses.map((response) => (
                        <div key={response.id} className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3 bg-gray-50 rounded-lg">
                          <div>
                            <label className="block text-xs text-gray-500 mb-1">الكلمات المفتاحية</label>
                            <input
                              type="text"
                              value={response.trigger_keywords.join(', ')}
                              onChange={(e) => {
                                const keywords = e.target.value.split(',').map(k => k.trim());
                                updateResponse(response.id, { trigger_keywords: keywords });
                              }}
                              className="w-full p-2 border border-gray-300 rounded text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-500 mb-1">الرد التلقائي</label>
                            <input
                              type="text"
                              value={response.response_text}
                              onChange={(e) => updateResponse(response.id, { response_text: e.target.value })}
                              className="w-full p-2 border border-gray-300 rounded text-sm"
                            />
                          </div>
                          <div className="flex items-end space-x-2 space-x-reverse">
                            <button
                              onClick={() => updateResponse(response.id, { is_active: !response.is_active })}
                              className={`px-3 py-2 rounded text-sm ${
                                response.is_active 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-gray-100 text-gray-800'
                              }`}
                            >
                              {response.is_active ? 'نشط' : 'معطل'}
                            </button>
                            <button
                              onClick={() => {
                                if (confirm('هل أنت متأكد من حذف هذا الرد؟')) {
                                  deleteResponse(response.id);
                                }
                              }}
                              className="text-red-600 hover:text-red-800"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">إعدادات الموقع العامة</h2>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">اسم الموقع</label>
                      <input
                        type="text"
                        defaultValue={getSetting('site_name')}
                        onBlur={(e) => handleSaveSetting('site_name', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">البريد الإلكتروني</label>
                      <input
                        type="email"
                        defaultValue={getSetting('contact_email')}
                        onBlur={(e) => handleSaveSetting('contact_email', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">رقم الهاتف</label>
                      <input
                        type="tel"
                        defaultValue={getSetting('contact_phone')}
                        onBlur={(e) => handleSaveSetting('contact_phone', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">العنوان</label>
                      <input
                        type="text"
                        defaultValue={getSetting('contact_address')}
                        onBlur={(e) => handleSaveSetting('contact_address', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">وصف الموقع</label>
                    <textarea
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={3}
                      defaultValue={getSetting('site_description')}
                      onBlur={(e) => handleSaveSetting('site_description', e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Google Analytics ID</label>
                      <input
                        type="text"
                        defaultValue={getSetting('google_analytics_id')}
                        onBlur={(e) => handleSaveSetting('google_analytics_id', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="GA4-XXXXXXXXX"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Facebook Pixel ID</label>
                      <input
                        type="text"
                        defaultValue={getSetting('facebook_pixel_id')}
                        onBlur={(e) => handleSaveSetting('facebook_pixel_id', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="XXXXXXXXXXXXXXXXX"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Status */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">حالة الأمان</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                      <div>
                        <h3 className="font-medium text-green-800">قاعدة البيانات متصلة</h3>
                        <p className="text-sm text-green-600">جميع البيانات محفوظة بأمان</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <Shield className="h-6 w-6 text-blue-600" />
                      <div>
                        <h3 className="font-medium text-blue-800">RLS مفعل</h3>
                        <p className="text-sm text-blue-600">حماية على مستوى الصفوف نشطة</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;