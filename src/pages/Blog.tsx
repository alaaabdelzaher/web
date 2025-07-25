import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, Tag, Search, ArrowRight, FileText } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { DatabaseService } from '../lib/supabase';

const Blog = () => {
  const { language, t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        const data = await DatabaseService.getPublishedBlogPosts();
        setPosts(data);
      } catch (error) {
        console.error('Error loading posts:', error);
      } finally {
        setLoading(false);
      }
    };
    loadPosts();
  }, []);


  const categories = ['all', ...Array.from(new Set(posts.map(post => post.category)))];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (post.excerpt && post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="min-h-screen py-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('blog.title')}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('blog.subtitle')}
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder={t('blog.search.placeholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? t('blog.categories.all') : category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map(post => (
            <Link 
              key={post.id} 
              to={`/blog/${post.id}`}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow block"
            >
              {post.featured_image ? (
                <div className="h-48 overflow-hidden">
                  <img 
                    src={post.featured_image} 
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="h-48 bg-gradient-to-r from-blue-800 to-blue-900 flex items-center justify-center">
                  <FileText className="h-16 w-16 text-white" />
                </div>
              )}
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-3">
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(post.published_at || post.created_at).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <User className="h-4 w-4" />
                    <span>{post.author_name}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 mb-3">
                  <Tag className="h-4 w-4 text-blue-800" />
                  <span className="text-sm text-blue-800 font-medium">{post.category}</span>
                  <span className="text-sm text-gray-500">• {post.read_time} {language === 'ar' ? 'دقيقة قراءة' : 'min read'}</span>
                </div>
                
                <h2 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                  {post.title}
                </h2>
                
                {post.excerpt && (
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                )}
                
                <Link
                  to={`/blog/${post.id}`}
                  className="inline-flex items-center text-blue-800 hover:text-blue-900 font-semibold transition-colors"
                >
                  {language === 'ar' ? 'اقرأ المزيد' : 'Read More'}
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </Link>
          ))}
        </div>

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">{t('blog.noResults')}</p>
          </div>
        )}

        {/* Newsletter Signup */}
        <div className="mt-16 bg-blue-800 text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">{t('blog.newsletter.title')}</h2>
          <p className="text-xl text-blue-100 mb-6">
            {t('blog.newsletter.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder={t('blog.newsletter.placeholder')}
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors">
              {t('blog.newsletter.subscribe')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;