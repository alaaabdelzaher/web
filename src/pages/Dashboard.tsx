import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Users, 
  FileText, 
  Settings, 
  Image, 
  MessageSquare, 
  Bot, 
  Search, 
  Shield, 
  Database,
  Navigation,
  Palette,
  LogOut,
  Plus,
  Edit3,
  Trash2,
  Save,
  Upload,
  Download,
  Eye,
  EyeOff,
  Calendar,
  TrendingUp,
  Activity,
  Globe,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { 
  useBlogPosts, 
  usePages, 
  useMediaFiles, 
  useContentSections, 
  useSiteSettings,
  useChatbotResponses,
  useContactMessages
} from '../hooks/useDatabase';
import UserManagement from '../components/UserManagement';
import NavigationManagement from '../components/NavigationManagement';
import BackupRestore from '../components/BackupRestore';

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Database hooks
  const { posts, createPost, updatePost, deletePost, loading: postsLoading } = useBlogPosts();
  const { pages, createPage, updatePage, deletePage, loading: pagesLoading } = usePages();
  const { files, uploadFile, deleteFile, loading: filesLoading } = useMediaFiles();
  const { sections, updateSection, loading: sectionsLoading } = useContentSections();
  const { settings, updateSetting, getSetting, loading: settingsLoading } = useSiteSettings();
  const { responses, createResponse, updateResponse, deleteResponse } = useChatbotResponses();
  const { messages, updateMessageStatus } = useContactMessages();

  // Form states
  const [editingPost, setEditingPost] = useState<any>(null);
  const [editingPage, setEditingPage] = useState<any>(null);
  const [editingSection, setEditingSection] = useState<any>(null);
  const [editingSetting, setEditingSetting] = useState<any>(null);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: '',
    status: 'draft' as const,
    author_name: 'Admin'
  });
  const [newPage, setNewPage] = useState({
    name: '',
    title: '',
    slug: '',
    content: {},
    status: 'draft' as const
  });

  const showMessage = (msg: string, type: 'success' | 'error' = 'success') => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  };

  // Blog Management Functions
  const handleCreatePost = async () => {
    try {
      setLoading(true);
      const slug = newPost.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
      await createPost({
        ...newPost,
        slug,
        read_time: Math.ceil(newPost.content.length / 1000) * 2
      });
      setNewPost({
        title: '',
        content: '',
        excerpt: '',
        category: '',
        status: 'draft',
        author_name: 'Admin'
      });
      showMessage(language === 'ar' ? 'تم إنشاء المقال بنجاح' : 'Post created successfully');
    } catch (error) {
      showMessage(language === 'ar' ? 'حدث خطأ في إنشاء المقال' : 'Error creating post', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePost = async (id: string, updates: any) => {
    try {
      setLoading(true);
      await updatePost(id, updates);
      setEditingPost(null);
      showMessage(language === 'ar' ? 'تم تحديث المقال بنجاح' : 'Post updated successfully');
    } catch (error) {
      showMessage(language === 'ar' ? 'حدث خطأ في تحديث المقال' : 'Error updating post', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async (id: string) => {
    if (confirm(language === 'ar' ? 'هل أنت متأكد من حذف هذا المقال؟' : 'Are you sure you want to delete this post?')) {
      try {
        await deletePost(id);
        showMessage(language === 'ar' ? 'تم حذف المقال بنجاح' : 'Post deleted successfully');
      } catch (error) {
        showMessage(language === 'ar' ? 'حدث خطأ في حذف المقال' : 'Error deleting post', 'error');
      }
    }
  };

  // Page Management Functions
  const handleCreatePage = async () => {
    try {
      setLoading(true);
      const slug = newPage.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
      await createPage({
        ...newPage,
        slug
      });
      setNewPage({
        name: '',
        title: '',
        slug: '',
        content: {},
        status: 'draft'
      });
      showMessage(language === 'ar' ? 'تم إنشاء الصفحة بنجاح' : 'Page created successfully');
    } catch (error) {
      showMessage(language === 'ar' ? 'حدث خطأ في إنشاء الصفحة' : 'Error creating page', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Content Management Functions
  const handleUpdateSection = async (key: string, content: string) => {
    try {
      setLoading(true);
      await updateSection(key, content);
      setEditingSection(null);
      showMessage(language === 'ar' ? 'تم تحديث المحتوى بنجاح' : 'Content updated successfully');
    } catch (error) {
      showMessage(language === 'ar' ? 'حدث خطأ في تحديث المحتوى' : 'Error updating content', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Settings Management Functions
  const handleSaveSetting = async (key: string, value: string) => {
    try {
      setLoading(true);
      await updateSetting(key, value);
      setEditingSetting(null);
      showMessage(language === 'ar' ? 'تم حفظ الإعداد بنجاح' : 'Setting saved successfully');
    } catch (error) {
      showMessage(language === 'ar' ? 'حدث خطأ في حفظ الإعداد' : 'Error saving setting', 'error');
    } finally {
      setLoading(false);
    }
  };

  // File Upload Function
  const handleFileUpload = async (file: File) => {
    try {
      setLoading(true);
      await uploadFile(file);
      showMessage(language === 'ar' ? 'تم رفع الملف بنجاح' : 'File uploaded successfully');
    } catch (error) {
      showMessage(language === 'ar' ? 'حدث خطأ في رفع الملف' : 'Error uploading file', 'error');
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'overview', label: language === 'ar' ? 'نظرة عامة' : 'Overview', icon: BarChart3 },
    { id: 'users', label: language === 'ar' ? 'إدارة المستخدمين' : 'User Management', icon: Users },
    { id: 'pages', label: language === 'ar' ? 'إدارة الصفحات' : 'Page Management', icon: FileText },
    { id: 'content', label: language === 'ar' ? 'إدارة المحتوى' : 'Content Management', icon: Edit3 },
    { id: 'blog', label: language === 'ar' ? 'إدارة المدونة' : 'Blog Management', icon: FileText },
    { id: 'media', label: language === 'ar' ? 'مكتبة الوسائط' : 'Media Library', icon: Image },
    { id: 'messages', label: language === 'ar' ? 'الرسائل' : 'Messages', icon: MessageSquare },
    { id: 'chatbot', label: language === 'ar' ? 'الشات بوت' : 'Chatbot', icon: Bot },
    { id: 'navigation', label: language === 'ar' ? 'إدارة التنقل' : 'Navigation', icon: Navigation },
    { id: 'appearance', label: language === 'ar' ? 'الهوية البصرية' : 'Appearance', icon: Palette },
    { id: 'seo', label: language === 'ar' ? 'تحسين محركات البحث' : 'SEO', icon: Search },
    { id: 'analytics', label: language === 'ar' ? 'التحليلات' : 'Analytics', icon: TrendingUp },
    { id: 'settings', label: language === 'ar' ? 'الإعدادات' : 'Settings', icon: Settings },
    { id: 'backup', label: language === 'ar' ? 'النسخ الاحتياطي' : 'Backup', icon: Database },
    { id: 'security', label: language === 'ar' ? 'الأمان' : 'Security', icon: Shield }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                {language === 'ar' ? 'إجمالي المقالات' : 'Total Posts'}
              </p>
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
              <p className="text-sm font-medium text-gray-600">
                {language === 'ar' ? 'إجمالي الصفحات' : 'Total Pages'}
              </p>
              <p className="text-2xl font-bold text-gray-900">{pages.length}</p>
            </div>
            <div className="p-3 bg-green-50 rounded-full">
              <Globe className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                {language === 'ar' ? 'الملفات المرفوعة' : 'Media Files'}
              </p>
              <p className="text-2xl font-bold text-gray-900">{files.length}</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-full">
              <Image className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                {language === 'ar' ? 'الرسائل الجديدة' : 'New Messages'}
              </p>
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
          <h2 className="text-lg font-semibold text-gray-900">
            {language === 'ar' ? 'النشاط الأخير' : 'Recent Activity'}
          </h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {posts.slice(0, 5).map((post) => (
              <div key={post.id} className="flex items-center space-x-4 space-x-reverse">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <FileText className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{post.title}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(post.created_at).toLocaleDateString(language === 'ar' ? 'ar' : 'en')}
                  </p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  post.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {post.status === 'published' ? 
                    (language === 'ar' ? 'منشور' : 'Published') : 
                    (language === 'ar' ? 'مسودة' : 'Draft')
                  }
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
          <h2 className="text-lg font-semibold text-gray-900">
            {language === 'ar' ? 'إنشاء مقال جديد' : 'Create New Post'}
          </h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'ar' ? 'العنوان' : 'Title'}
              </label>
              <input
                type="text"
                value={newPost.title}
                onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'ar' ? 'الفئة' : 'Category'}
              </label>
              <input
                type="text"
                value={newPost.category}
                onChange={(e) => setNewPost({...newPost, category: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'ar' ? 'الملخص' : 'Excerpt'}
              </label>
              <textarea
                value={newPost.excerpt}
                onChange={(e) => setNewPost({...newPost, excerpt: e.target.value})}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'ar' ? 'المحتوى' : 'Content'}
              </label>
              <textarea
                value={newPost.content}
                onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                rows={8}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-4 space-x-reverse">
            <button
              onClick={() => setNewPost({...newPost, status: 'draft'})}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              {language === 'ar' ? 'حفظ كمسودة' : 'Save as Draft'}
            </button>
            <button
              onClick={handleCreatePost}
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? (language === 'ar' ? 'جاري الحفظ...' : 'Saving...') : (language === 'ar' ? 'نشر المقال' : 'Publish Post')}
            </button>
          </div>
        </div>
      </div>

      {/* Posts List */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            {language === 'ar' ? 'المقالات الموجودة' : 'Existing Posts'}
          </h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">{post.title}</h3>
                  <p className="text-sm text-gray-500">{post.category} • {post.author_name}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(post.created_at).toLocaleDateString(language === 'ar' ? 'ar' : 'en')}
                  </p>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    post.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {post.status === 'published' ? 
                      (language === 'ar' ? 'منشور' : 'Published') : 
                      (language === 'ar' ? 'مسودة' : 'Draft')
                    }
                  </span>
                  <button
                    onClick={() => setEditingPost(post)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Edit3 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeletePost(post.id)}
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
  );

  const renderContentManagement = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            {language === 'ar' ? 'إدارة أقسام المحتوى' : 'Content Sections Management'}
          </h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {sections.map((section) => (
              <div key={section.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{section.section_name}</h3>
                  <button
                    onClick={() => setEditingSection(section)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Edit3 className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-sm text-gray-600 mb-2">Key: {section.section_key}</p>
                <div className="text-sm text-gray-800 bg-gray-50 p-3 rounded">
                  {section.content.substring(0, 200)}...
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderMediaLibrary = () => (
    <div className="space-y-6">
      {/* Upload Section */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            {language === 'ar' ? 'رفع ملف جديد' : 'Upload New File'}
          </h2>
        </div>
        <div className="p-6">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">
              {language === 'ar' ? 'اسحب الملفات هنا أو اضغط للاختيار' : 'Drag files here or click to select'}
            </p>
            <label className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer">
              {language === 'ar' ? 'اختيار ملفات' : 'Choose Files'}
              <input
                type="file"
                className="hidden"
                multiple
                onChange={(e) => {
                  const files = Array.from(e.target.files || []);
                  files.forEach(handleFileUpload);
                }}
              />
            </label>
          </div>
        </div>
      </div>

      {/* Files Grid */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            {language === 'ar' ? 'الملفات المرفوعة' : 'Uploaded Files'}
          </h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {files.map((file) => (
              <div key={file.id} className="border border-gray-200 rounded-lg p-4">
                {file.file_type === 'image' ? (
                  <img src={file.url} alt={file.alt_text || file.filename} className="w-full h-32 object-cover rounded mb-2" />
                ) : (
                  <div className="w-full h-32 bg-gray-100 rounded mb-2 flex items-center justify-center">
                    <FileText className="h-8 w-8 text-gray-400" />
                  </div>
                )}
                <p className="text-sm font-medium text-gray-900 truncate">{file.original_name}</p>
                <p className="text-xs text-gray-500">{(file.file_size / 1024).toFixed(1)} KB</p>
                <div className="mt-2 flex justify-between">
                  <button
                    onClick={() => navigator.clipboard.writeText(file.url)}
                    className="text-blue-600 hover:text-blue-800 text-xs"
                  >
                    {language === 'ar' ? 'نسخ الرابط' : 'Copy URL'}
                  </button>
                  <button
                    onClick={() => deleteFile(file.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
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
          <h2 className="text-lg font-semibold text-gray-900">
            {language === 'ar' ? 'إعدادات الموقع' : 'Site Settings'}
          </h2>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            {/* Site Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'ar' ? 'اسم الموقع' : 'Site Name'}
              </label>
              <div className="flex space-x-2 space-x-reverse">
                <input
                  type="text"
                  defaultValue={getSetting('site_name')}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onBlur={(e) => handleSaveSetting('site_name', e.target.value)}
                />
              </div>
            </div>

            {/* Site Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'ar' ? 'وصف الموقع' : 'Site Description'}
              </label>
              <textarea
                defaultValue={getSetting('site_description')}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onBlur={(e) => handleSaveSetting('site_description', e.target.value)}
              />
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                </label>
                <input
                  type="email"
                  defaultValue={getSetting('contact_email')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onBlur={(e) => handleSaveSetting('contact_email', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'ar' ? 'رقم الهاتف' : 'Phone'}
                </label>
                <input
                  type="tel"
                  defaultValue={getSetting('contact_phone')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onBlur={(e) => handleSaveSetting('contact_phone', e.target.value)}
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'ar' ? 'العنوان' : 'Address'}
              </label>
              <textarea
                defaultValue={getSetting('contact_address')}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onBlur={(e) => handleSaveSetting('contact_address', e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMessages = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            {language === 'ar' ? 'رسائل الاتصال' : 'Contact Messages'}
          </h2>
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
                      message.status === 'replied' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {message.status === 'new' ? (language === 'ar' ? 'جديد' : 'New') :
                       message.status === 'read' ? (language === 'ar' ? 'مقروء' : 'Read') :
                       message.status === 'replied' ? (language === 'ar' ? 'تم الرد' : 'Replied') :
                       (language === 'ar' ? 'مؤرشف' : 'Archived')}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{message.email}</span>
                  </div>
                </div>
                <p className="text-sm font-medium text-gray-800 mb-2">{message.subject}</p>
                <p className="text-sm text-gray-600 mb-3">{message.message}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{new Date(message.created_at).toLocaleDateString(language === 'ar' ? 'ar' : 'en')}</span>
                  <div className="flex space-x-2 space-x-reverse">
                    <button
                      onClick={() => updateMessageStatus(message.id, 'read')}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {language === 'ar' ? 'تحديد كمقروء' : 'Mark as Read'}
                    </button>
                    <button
                      onClick={() => updateMessageStatus(message.id, 'replied')}
                      className="text-green-600 hover:text-green-800"
                    >
                      {language === 'ar' ? 'تحديد كمجاب' : 'Mark as Replied'}
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

  return (
    <div className="min-h-screen bg-gray-50" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4 space-x-reverse">
              <Shield className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  {language === 'ar' ? 'لوحة التحكم الإدارية' : 'Admin Dashboard'}
                </h1>
                <p className="text-sm text-gray-600">
                  {language === 'ar' ? 'إدارة شاملة لموقع فورنسيك برو' : 'ForensicPro Website Management'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="flex items-center space-x-2 space-x-reverse">
                <Globe className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">
                  {language === 'ar' ? 'العربية' : 'English'}
                </span>
              </div>
              <button
                onClick={onLogout}
                className="flex items-center space-x-2 space-x-reverse text-gray-600 hover:text-gray-900"
              >
                <LogOut className="h-4 w-4" />
                <span className="text-sm">{language === 'ar' ? 'تسجيل الخروج' : 'Logout'}</span>
              </button>
            </div>
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
              <div className={`mb-6 p-4 rounded-lg ${
                message.includes('خطأ') || message.includes('Error') 
                  ? 'bg-red-50 text-red-700 border border-red-200' 
                  : 'bg-green-50 text-green-700 border border-green-200'
              }`}>
                {message}
              </div>
            )}

            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'users' && <UserManagement />}
            {activeTab === 'blog' && renderBlogManagement()}
            {activeTab === 'content' && renderContentManagement()}
            {activeTab === 'media' && renderMediaLibrary()}
            {activeTab === 'messages' && renderMessages()}
            {activeTab === 'navigation' && <NavigationManagement />}
            {activeTab === 'backup' && <BackupRestore />}
            {activeTab === 'settings' && renderSettings()}
            
            {/* Placeholder for other tabs */}
            {!['overview', 'users', 'blog', 'content', 'media', 'messages', 'navigation', 'backup', 'settings'].includes(activeTab) && (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {language === 'ar' ? 'قيد التطوير' : 'Under Development'}
                </h3>
                <p className="text-gray-600">
                  {language === 'ar' ? 'هذا القسم قيد التطوير وسيكون متاحاً قريباً' : 'This section is under development and will be available soon'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;