import React, { useState, useEffect } from 'react';
import { 
  LogOut, 
  BarChart3, 
  FileText, 
  MessageSquare, 
  Users,
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Eye,
  Calendar,
  User,
  Tag
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { DatabaseService, BlogPost, ContactMessage } from '../lib/supabase';

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  
  // Blog Posts State
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [showPostForm, setShowPostForm] = useState(false);
  const [postForm, setPostForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    featured_image: '',
    author_name: '',
    category: '',
    tags: [] as string[],
    status: 'draft' as 'draft' | 'published',
    read_time: 5,
    meta_description: '',
    seo_keywords: [] as string[]
  });

  // Contact Messages State
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  // About Page State
  const [aboutContent, setAboutContent] = useState({
    mission_ar: '',
    mission_en: '',
    team_ar: '',
    team_en: '',
    values_ar: '',
    values_en: '',
    history_ar: '',
    history_en: ''
  });
  const [savingAbout, setSavingAbout] = useState(false);

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      setLoading(true);
      const [postsData, messagesData] = await Promise.all([
        DatabaseService.getBlogPosts(),
        DatabaseService.getContactMessages()
      ]);
      
      setBlogPosts(postsData);
      setContactMessages(messagesData);
      
      // Load about content
      const aboutData = await DatabaseService.getContentSection('about_content');
      if (aboutData?.content) {
        try {
          const parsedContent = JSON.parse(aboutData.content);
          setAboutContent(parsedContent);
        } catch (e) {
          console.log('About content not in JSON format');
        }
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Blog Post Functions
  const handleCreatePost = async () => {
    try {
      if (!postForm.title || !postForm.content || !postForm.author_name || !postForm.category) {
        alert('يرجى ملء جميع الحقول المطلوبة');
        return;
      }

      const slug = postForm.slug || postForm.title.toLowerCase()
        .replace(/[^a-z0-9\u0600-\u06FF\s]/g, '')
        .replace(/\s+/g, '-');

      const newPost = await DatabaseService.createBlogPost({
        ...postForm,
        slug,
        published_at: postForm.status === 'published' ? new Date().toISOString() : null
      });

      setBlogPosts([newPost, ...blogPosts]);
      setShowPostForm(false);
      resetPostForm();
    } catch (error) {
      console.error('Error creating post:', error);
      alert('حدث خطأ في إنشاء المقال');
    }
  };

  const handleUpdatePost = async () => {
    if (!editingPost) return;

    try {
      const updatedPost = await DatabaseService.updateBlogPost(editingPost.id, postForm);
      setBlogPosts(blogPosts.map(post => 
        post.id === editingPost.id ? updatedPost : post
      ));
      setEditingPost(null);
      resetPostForm();
    } catch (error) {
      console.error('Error updating post:', error);
      alert('حدث خطأ في تحديث المقال');
    }
  };

  const handleDeletePost = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا المقال؟')) return;

    try {
      await DatabaseService.deleteBlogPost(id);
      setBlogPosts(blogPosts.filter(post => post.id !== id));
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('حدث خطأ في حذف المقال');
    }
  };

  const resetPostForm = () => {
    setPostForm({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      featured_image: '',
      author_name: '',
      category: '',
      tags: [],
      status: 'draft',
      read_time: 5,
      meta_description: '',
      seo_keywords: []
    });
    setShowPostForm(false);
  };

  const startEditingPost = (post: BlogPost) => {
    setEditingPost(post);
    setPostForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || '',
      content: post.content,
      featured_image: post.featured_image || '',
      author_name: post.author_name,
      category: post.category,
      tags: post.tags || [],
      status: post.status,
      read_time: post.read_time,
      meta_description: post.meta_description || '',
      seo_keywords: post.seo_keywords || []
    });
  };

  // Contact Messages Functions
  const handleMessageStatusUpdate = async (id: string, status: ContactMessage['status']) => {
    try {
      await DatabaseService.updateContactMessageStatus(id, status);
      setContactMessages(contactMessages.map(msg => 
        msg.id === id ? { ...msg, status } : msg
      ));
    } catch (error) {
      console.error('Error updating message status:', error);
    }
  };

  // About Page Functions
  const handleSaveAbout = async () => {
    try {
      setSavingAbout(true);
      await DatabaseService.updateContentSectionMultilingual('about_content', aboutContent);
      alert('تم حفظ محتوى صفحة من نحن بنجاح');
    } catch (error) {
      console.error('Error saving about content:', error);
      alert('حدث خطأ في حفظ المحتوى');
    } finally {
      setSavingAbout(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900">
              {language === 'ar' ? 'لوحة التحكم' : 'Dashboard'}
            </h1>
          </div>
          
          <nav className="mt-6">
            <div className="px-6 space-y-2">
              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === 'overview'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <BarChart3 className="mr-3 h-5 w-5" />
                {language === 'ar' ? 'نظرة عامة' : 'Overview'}
              </button>
              
              <button
                onClick={() => setActiveTab('blog')}
                className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === 'blog'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <FileText className="mr-3 h-5 w-5" />
                {language === 'ar' ? 'إدارة المدونة' : 'Blog Management'}
              </button>
              
              <button
                onClick={() => setActiveTab('messages')}
                className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === 'messages'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <MessageSquare className="mr-3 h-5 w-5" />
                {language === 'ar' ? 'الرسائل' : 'Messages'}
                {contactMessages.filter(msg => msg.status === 'new').length > 0 && (
                  <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-1">
                    {contactMessages.filter(msg => msg.status === 'new').length}
                  </span>
                )}
              </button>
              
              <button
                onClick={() => setActiveTab('about')}
                className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === 'about'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Users className="mr-3 h-5 w-5" />
                {language === 'ar' ? 'صفحة من نحن' : 'About Page'}
              </button>
            </div>
          </nav>
          
          <div className="absolute bottom-0 w-64 p-6">
            <button
              onClick={onLogout}
              className="w-full flex items-center px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="mr-3 h-5 w-5" />
              {language === 'ar' ? 'تسجيل الخروج' : 'Logout'}
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                {language === 'ar' ? 'نظرة عامة' : 'Overview'}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <FileText className="h-8 w-8 text-blue-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">
                        {language === 'ar' ? 'إجمالي المقالات' : 'Total Posts'}
                      </p>
                      <p className="text-2xl font-semibold text-gray-900">{blogPosts.length}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <MessageSquare className="h-8 w-8 text-green-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">
                        {language === 'ar' ? 'الرسائل الجديدة' : 'New Messages'}
                      </p>
                      <p className="text-2xl font-semibold text-gray-900">
                        {contactMessages.filter(msg => msg.status === 'new').length}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <Eye className="h-8 w-8 text-purple-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">
                        {language === 'ar' ? 'المقالات المنشورة' : 'Published Posts'}
                      </p>
                      <p className="text-2xl font-semibold text-gray-900">
                        {blogPosts.filter(post => post.status === 'published').length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Blog Management Tab */}
          {activeTab === 'blog' && (
            <div>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900">
                  {language === 'ar' ? 'إدارة المدونة' : 'Blog Management'}
                </h2>
                <button
                  onClick={() => setShowPostForm(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  {language === 'ar' ? 'مقال جديد' : 'New Post'}
                </button>
              </div>

              {/* Post Form Modal */}
              {(showPostForm || editingPost) && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-bold">
                        {editingPost ? 
                          (language === 'ar' ? 'تعديل المقال' : 'Edit Post') :
                          (language === 'ar' ? 'مقال جديد' : 'New Post')
                        }
                      </h3>
                      <button
                        onClick={() => {
                          setEditingPost(null);
                          resetPostForm();
                        }}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <X className="h-6 w-6" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {language === 'ar' ? 'العنوان' : 'Title'} *
                        </label>
                        <input
                          type="text"
                          value={postForm.title}
                          onChange={(e) => setPostForm({...postForm, title: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {language === 'ar' ? 'الرابط' : 'Slug'}
                        </label>
                        <input
                          type="text"
                          value={postForm.slug}
                          onChange={(e) => setPostForm({...postForm, slug: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {language === 'ar' ? 'الكاتب' : 'Author'} *
                        </label>
                        <input
                          type="text"
                          value={postForm.author_name}
                          onChange={(e) => setPostForm({...postForm, author_name: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {language === 'ar' ? 'الفئة' : 'Category'} *
                        </label>
                        <input
                          type="text"
                          value={postForm.category}
                          onChange={(e) => setPostForm({...postForm, category: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {language === 'ar' ? 'الحالة' : 'Status'}
                        </label>
                        <select
                          value={postForm.status}
                          onChange={(e) => setPostForm({...postForm, status: e.target.value as 'draft' | 'published'})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="draft">{language === 'ar' ? 'مسودة' : 'Draft'}</option>
                          <option value="published">{language === 'ar' ? 'منشور' : 'Published'}</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {language === 'ar' ? 'وقت القراءة (دقائق)' : 'Read Time (minutes)'}
                        </label>
                        <input
                          type="number"
                          value={postForm.read_time}
                          onChange={(e) => setPostForm({...postForm, read_time: parseInt(e.target.value) || 5})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div className="mt-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {language === 'ar' ? 'الملخص' : 'Excerpt'}
                      </label>
                      <textarea
                        value={postForm.excerpt}
                        onChange={(e) => setPostForm({...postForm, excerpt: e.target.value})}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="mt-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {language === 'ar' ? 'المحتوى' : 'Content'} *
                      </label>
                      <textarea
                        value={postForm.content}
                        onChange={(e) => setPostForm({...postForm, content: e.target.value})}
                        rows={10}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="mt-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {language === 'ar' ? 'رابط الصورة المميزة' : 'Featured Image URL'}
                      </label>
                      <input
                        type="url"
                        value={postForm.featured_image}
                        onChange={(e) => setPostForm({...postForm, featured_image: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="flex justify-end space-x-4 mt-8">
                      <button
                        onClick={() => {
                          setEditingPost(null);
                          resetPostForm();
                        }}
                        className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                      >
                        {language === 'ar' ? 'إلغاء' : 'Cancel'}
                      </button>
                      <button
                        onClick={editingPost ? handleUpdatePost : handleCreatePost}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        {editingPost ? 
                          (language === 'ar' ? 'تحديث' : 'Update') :
                          (language === 'ar' ? 'إنشاء' : 'Create')
                        }
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Posts List */}
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {language === 'ar' ? 'العنوان' : 'Title'}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {language === 'ar' ? 'الكاتب' : 'Author'}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {language === 'ar' ? 'الفئة' : 'Category'}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {language === 'ar' ? 'الحالة' : 'Status'}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {language === 'ar' ? 'التاريخ' : 'Date'}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {language === 'ar' ? 'الإجراءات' : 'Actions'}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {blogPosts.map((post) => (
                        <tr key={post.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{post.title}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{post.author_name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                              {post.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              post.status === 'published' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {post.status === 'published' ? 
                                (language === 'ar' ? 'منشور' : 'Published') :
                                (language === 'ar' ? 'مسودة' : 'Draft')
                              }
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(post.created_at).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => startEditingPost(post)}
                                className="text-blue-600 hover:text-blue-900"
                              >
                                <Edit className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleDeletePost(post.id)}
                                className="text-red-600 hover:text-red-900"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Messages Tab */}
          {activeTab === 'messages' && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                {language === 'ar' ? 'الرسائل' : 'Messages'}
              </h2>

              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {language === 'ar' ? 'الاسم' : 'Name'}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {language === 'ar' ? 'الموضوع' : 'Subject'}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {language === 'ar' ? 'الحالة' : 'Status'}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {language === 'ar' ? 'التاريخ' : 'Date'}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {language === 'ar' ? 'الإجراءات' : 'Actions'}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {contactMessages.map((message) => (
                        <tr key={message.id} className={message.status === 'new' ? 'bg-blue-50' : ''}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{message.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{message.email}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{message.subject}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <select
                              value={message.status}
                              onChange={(e) => handleMessageStatusUpdate(message.id, e.target.value as ContactMessage['status'])}
                              className={`text-xs font-semibold rounded-full px-2 py-1 border-0 ${
                                message.status === 'new' ? 'bg-red-100 text-red-800' :
                                message.status === 'read' ? 'bg-yellow-100 text-yellow-800' :
                                message.status === 'replied' ? 'bg-green-100 text-green-800' :
                                'bg-gray-100 text-gray-800'
                              }`}
                            >
                              <option value="new">{language === 'ar' ? 'جديد' : 'New'}</option>
                              <option value="read">{language === 'ar' ? 'مقروء' : 'Read'}</option>
                              <option value="replied">{language === 'ar' ? 'تم الرد' : 'Replied'}</option>
                              <option value="archived">{language === 'ar' ? 'مؤرشف' : 'Archived'}</option>
                            </select>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(message.created_at).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() => setSelectedMessage(message)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Message Detail Modal */}
              {selectedMessage && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-bold">
                        {language === 'ar' ? 'تفاصيل الرسالة' : 'Message Details'}
                      </h3>
                      <button
                        onClick={() => setSelectedMessage(null)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <X className="h-6 w-6" />
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          {language === 'ar' ? 'الاسم' : 'Name'}
                        </label>
                        <p className="mt-1 text-sm text-gray-900">{selectedMessage.name}</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                        </label>
                        <p className="mt-1 text-sm text-gray-900">{selectedMessage.email}</p>
                      </div>

                      {selectedMessage.phone && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            {language === 'ar' ? 'الهاتف' : 'Phone'}
                          </label>
                          <p className="mt-1 text-sm text-gray-900">{selectedMessage.phone}</p>
                        </div>
                      )}

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          {language === 'ar' ? 'الموضوع' : 'Subject'}
                        </label>
                        <p className="mt-1 text-sm text-gray-900">{selectedMessage.subject}</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          {language === 'ar' ? 'الرسالة' : 'Message'}
                        </label>
                        <p className="mt-1 text-sm text-gray-900 whitespace-pre-wrap">{selectedMessage.message}</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          {language === 'ar' ? 'تاريخ الإرسال' : 'Sent Date'}
                        </label>
                        <p className="mt-1 text-sm text-gray-900">
                          {new Date(selectedMessage.created_at).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-end mt-6">
                      <button
                        onClick={() => setSelectedMessage(null)}
                        className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        {language === 'ar' ? 'إغلاق' : 'Close'}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* About Page Tab */}
          {activeTab === 'about' && (
            <div>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900">
                  {language === 'ar' ? 'صفحة من نحن' : 'About Page'}
                </h2>
                <button
                  onClick={handleSaveAbout}
                  disabled={savingAbout}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center disabled:opacity-50"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {savingAbout ? 
                    (language === 'ar' ? 'جاري الحفظ...' : 'Saving...') :
                    (language === 'ar' ? 'حفظ التغييرات' : 'Save Changes')
                  }
                </button>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="space-y-8">
                  {/* Mission Section */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      {language === 'ar' ? 'المهمة' : 'Mission'}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {language === 'ar' ? 'النص العربي' : 'Arabic Text'}
                        </label>
                        <textarea
                          value={aboutContent.mission_ar}
                          onChange={(e) => setAboutContent({...aboutContent, mission_ar: e.target.value})}
                          rows={4}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="أدخل نص المهمة بالعربية..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {language === 'ar' ? 'النص الإنجليزي' : 'English Text'}
                        </label>
                        <textarea
                          value={aboutContent.mission_en}
                          onChange={(e) => setAboutContent({...aboutContent, mission_en: e.target.value})}
                          rows={4}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter mission text in English..."
                        />
                      </div>
                    </div>
                  </div>

                  {/* Team Section */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      {language === 'ar' ? 'الفريق' : 'Team'}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {language === 'ar' ? 'النص العربي' : 'Arabic Text'}
                        </label>
                        <textarea
                          value={aboutContent.team_ar}
                          onChange={(e) => setAboutContent({...aboutContent, team_ar: e.target.value})}
                          rows={4}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="أدخل نص الفريق بالعربية..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {language === 'ar' ? 'النص الإنجليزي' : 'English Text'}
                        </label>
                        <textarea
                          value={aboutContent.team_en}
                          onChange={(e) => setAboutContent({...aboutContent, team_en: e.target.value})}
                          rows={4}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter team text in English..."
                        />
                      </div>
                    </div>
                  </div>

                  {/* Values Section */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      {language === 'ar' ? 'القيم' : 'Values'}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {language === 'ar' ? 'النص العربي' : 'Arabic Text'}
                        </label>
                        <textarea
                          value={aboutContent.values_ar}
                          onChange={(e) => setAboutContent({...aboutContent, values_ar: e.target.value})}
                          rows={4}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="أدخل نص القيم بالعربية..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {language === 'ar' ? 'النص الإنجليزي' : 'English Text'}
                        </label>
                        <textarea
                          value={aboutContent.values_en}
                          onChange={(e) => setAboutContent({...aboutContent, values_en: e.target.value})}
                          rows={4}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter values text in English..."
                        />
                      </div>
                    </div>
                  </div>

                  {/* History Section */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      {language === 'ar' ? 'التاريخ' : 'History'}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {language === 'ar' ? 'النص العربي' : 'Arabic Text'}
                        </label>
                        <textarea
                          value={aboutContent.history_ar}
                          onChange={(e) => setAboutContent({...aboutContent, history_ar: e.target.value})}
                          rows={6}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="أدخل نص التاريخ بالعربية..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {language === 'ar' ? 'النص الإنجليزي' : 'English Text'}
                        </label>
                        <textarea
                          value={aboutContent.history_en}
                          onChange={(e) => setAboutContent({...aboutContent, history_en: e.target.value})}
                          rows={6}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter history text in English..."
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;