import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, Tag, ArrowLeft, Clock, Eye } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase, BlogPost, DatabaseService } from '../lib/supabase';

const BlogPostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { language } = useLanguage();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const loadPost = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        
        // تحميل المقال
        const { data: postData, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('id', id)
          .eq('status', 'published')
          .single();

        if (error) {
          console.error('Error loading post:', error);
          return;
        }

        setPost(postData);

        // تحديث عدد المشاهدات
        await supabase
          .from('blog_posts')
          .update({ views: (postData.views || 0) + 1 })
          .eq('id', id);

        // تحميل المقالات ذات الصلة
        const { data: relatedData } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('status', 'published')
          .eq('category', postData.category)
          .neq('id', id)
          .limit(3);

        if (relatedData) {
          setRelatedPosts(relatedData);
        }

      } catch (error) {
        console.error('Error loading post:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen py-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen py-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {language === 'ar' ? 'المقال غير موجود' : 'Post not found'}
          </h1>
          <Link
            to="/blog"
            className="text-blue-800 hover:text-blue-900 font-semibold"
          >
            {language === 'ar' ? 'العودة إلى المدونة' : 'Back to Blog'}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-8">
          <Link
            to="/blog"
            className="inline-flex items-center text-blue-800 hover:text-blue-900 font-semibold transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {language === 'ar' ? 'العودة إلى المدونة' : 'Back to Blog'}
          </Link>
        </div>

        {/* Article Header */}
        <article className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Featured Image */}
          {post.featured_image && (
            <div className="h-64 md:h-96 overflow-hidden">
              <img 
                src={post.featured_image} 
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-8">
            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{new Date(post.published_at || post.created_at).toLocaleDateString(
                  language === 'ar' ? 'ar-SA' : 'en-US',
                  { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  }
                )}</span>
              </div>
              
              <div className="flex items-center space-x-1">
                <User className="h-4 w-4" />
                <span>{post.author_name}</span>
              </div>
              
              <div className="flex items-center space-x-1">
                <Tag className="h-4 w-4" />
                <span className="text-blue-800 font-medium">{post.category}</span>
              </div>
              
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{post.read_time} {language === 'ar' ? 'دقيقة قراءة' : 'min read'}</span>
              </div>
              
              <div className="flex items-center space-x-1">
                <Eye className="h-4 w-4" />
                <span>{post.views || 0} {language === 'ar' ? 'مشاهدة' : 'views'}</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Excerpt */}
            {post.excerpt && (
              <div className="text-xl text-gray-600 mb-8 leading-relaxed border-l-4 border-blue-800 pl-6">
                {post.excerpt}
              </div>
            )}

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <div 
                className="text-gray-800 leading-relaxed"
                style={{ whiteSpace: 'pre-wrap' }}
              >
                {post.content}
              </div>
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">
                    {language === 'ar' ? 'العلامات:' : 'Tags:'}
                  </span>
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {language === 'ar' ? 'مقالات ذات صلة' : 'Related Articles'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map(relatedPost => (
                <Link
                  key={relatedPost.id}
                  to={`/blog/${relatedPost.id}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {relatedPost.featured_image ? (
                    <div className="h-32 overflow-hidden">
                      <img 
                        src={relatedPost.featured_image} 
                        alt={relatedPost.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-32 bg-gradient-to-r from-blue-800 to-blue-900"></div>
                  )}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <div className="text-xs text-gray-500">
                      {new Date(relatedPost.published_at || relatedPost.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-12 bg-blue-800 text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">
            {language === 'ar' ? 'هل تحتاج استشارة خبير؟' : 'Need Expert Consultation?'}
          </h2>
          <p className="text-blue-100 mb-6">
            {language === 'ar' ? 
              'تواصل معنا اليوم لمناقشة احتياجاتك المحددة وتعلم كيف يمكننا المساعدة.' :
              'Contact us today to discuss your specific needs and learn how we can help.'
            }
          </p>
          <Link
            to="/contact"
            className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
          >
            {language === 'ar' ? 'اتصل بنا' : 'Contact Us'}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogPostDetail;