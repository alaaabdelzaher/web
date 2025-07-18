import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, Tag, Search, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Blog = () => {
  const { language, t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const blogPosts = [
    {
      id: 1,
      title: "Understanding Fire Investigation: A Comprehensive Guide",
      excerpt: "Learn about the scientific methods and techniques used in fire investigation, from scene examination to cause determination.",
      author: "Dr. John Smith",
      date: "2024-01-15",
      category: "Fire Investigation",
      readTime: "8 min read",
      image: "https://images.pexels.com/photos/2471163/pexels-photo-2471163.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop"
    },
    {
      id: 2,
      title: "The Role of Forensic Science in Modern Criminal Justice",
      excerpt: "Explore how forensic science has evolved and its crucial role in solving crimes and ensuring justice in today's legal system.",
      author: "Sarah Johnson",
      date: "2024-01-10",
      category: "Forensics",
      readTime: "6 min read",
      image: "https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop"
    },
    {
      id: 3,
      title: "Building Safety Inspections: What You Need to Know",
      excerpt: "A detailed look at building safety inspections, including regulations, procedures, and the importance of professional assessment.",
      author: "Michael Chen",
      date: "2024-01-05",
      category: "Civil Protection",
      readTime: "5 min read",
      image: "https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop"
    },
    {
      id: 4,
      title: "Explosives Analysis: Techniques and Applications",
      excerpt: "An overview of explosives analysis methodologies, from chemical identification to device reconstruction in forensic investigations.",
      author: "Dr. John Smith",
      date: "2023-12-28",
      category: "Explosives",
      readTime: "10 min read",
      image: "https://images.pexels.com/photos/3862614/pexels-photo-3862614.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop"
    },
    {
      id: 5,
      title: "Expert Testimony: Best Practices for Forensic Experts",
      excerpt: "Guidelines and best practices for forensic experts providing testimony in legal proceedings, including preparation and presentation.",
      author: "Sarah Johnson",
      date: "2023-12-20",
      category: "Legal",
      readTime: "7 min read",
      image: "https://images.pexels.com/photos/5668772/pexels-photo-5668772.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop"
    },
    {
      id: 6,
      title: "Emergency Planning for Organizations",
      excerpt: "Essential components of effective emergency planning, including risk assessment, response protocols, and training requirements.",
      author: "Michael Chen",
      date: "2023-12-15",
      category: "Emergency Planning",
      readTime: "9 min read",
      image: "https://images.pexels.com/photos/3862365/pexels-photo-3862365.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop"
    }
  ];

  const categories = language === 'ar' ? 
    ['all', 'تحقيق الحرائق', 'الطب الشرعي', 'الحماية المدنية', 'المتفجرات', 'قانوني', 'التخطيط للطوارئ'] :
    ['all', 'Fire Investigation', 'Forensics', 'Civil Protection', 'Explosives', 'Legal', 'Emergency Planning'];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
            <article key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gray-200 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-3">
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 mb-3">
                  <Tag className="h-4 w-4 text-blue-800" />
                  <span className="text-sm text-blue-800 font-medium">{post.category}</span>
                  <span className="text-sm text-gray-500">• {post.readTime}</span>
                </div>
                
                <h2 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                  {post.title}
                </h2>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <Link
                  to={`/blog/${post.id}`}
                  className="inline-flex items-center text-blue-800 hover:text-blue-900 font-semibold transition-colors"
                >
                  Read More
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No articles found matching your search criteria.</p>
          </div>
        )}

        {/* Newsletter Signup */}
        <div className="mt-16 bg-blue-800 text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl text-blue-100 mb-6">
            Subscribe to our newsletter for the latest insights and updates from our expert team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;