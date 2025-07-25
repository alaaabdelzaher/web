import React, { useState, useEffect } from 'react';
import { 
  Home, FileText, MessageSquare, Settings, Users, Shield, 
  Edit3, Save, X, Plus, Trash2, Eye, EyeOff, Moon, Sun,
  Phone, Mail, MapPin, Star, Award, CheckCircle, Globe,
  Calendar, User, Tag, Search, ArrowRight, Target, Flame,
  AlertTriangle, LogOut, Upload, Image as ImageIcon
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { DatabaseService } from '../lib/supabase';

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const { language, setLanguage } = useLanguage();
  const [activeSection, setActiveSection] = useState('services');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  // Content states
  const [services, setServices] = useState<any[]>([]);
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [certifications, setCertifications] = useState<any[]>([]);
  const [aboutContent, setAboutContent] = useState<any>({});
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [contactMessages, setContactMessages] = useState<any[]>([]);

  // Form states
  const [editingService, setEditingService] = useState<any>(null);
  const [editingPost, setEditingPost] = useState<any>(null);
  const [editingCert, setEditingCert] = useState<any>(null);
  const [editingTeamMember, setEditingTeamMember] = useState<any>(null);

  // Load data
  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      setLoading(true);
      const [posts, sections, messages, services, teamMembers, testimonials, stats, certificationsData] = await Promise.all([
        servicesData,
        postsData,
        certificationsData,
        teamData,
        aboutData
      ] = await Promise.all([
        DatabaseService.getContentSection('home_content'),
        DatabaseService.getCertifications(),
        DatabaseService.getServices(),
        DatabaseService.getTestimonials(),
        DatabaseService.getStats(),
        DatabaseService.getTeamMembers(),
        DatabaseService.getStats().catch(() => []),
        DatabaseService.getCertifications().catch(() => [])
      ]);
      
      const [servicesData2, postsData2, certsData, teamData2, messagesData, aboutData2] = await Promise.all([
        DatabaseService.getServices(),
        DatabaseService.getBlogPosts(),
        DatabaseService.getCertifications(),
        DatabaseService.getTeamMembers(),
        DatabaseService.getContactMessages(),
        DatabaseService.getContentSection('about_content')
      ]);

      setServices(servicesData2);
      setBlogPosts(postsData2);
      setCertifications(certsData);
      setTeamMembers(teamData2);
      setContactMessages(messagesData);
      
      if (aboutData2?.content) {
        try {
          setAboutContent(JSON.parse(aboutData2.content));
        } catch {
          setAboutContent({});
        }
      }
      setCertifications(certificationsData);
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

  // Auto refresh every 30 seconds to check for new messages
  useEffect(() => {
    const interval = setInterval(() => {
      if (activeSection === 'messages') {
        setRefreshTrigger(prev => prev + 1);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [activeSection]);

  // Image upload handler
  const handleImageUpload = async (file: File) => {
    try {
      const mediaFile = await DatabaseService.uploadMediaFile(file);
      return mediaFile.url;
    } catch (error) {
      showMessage('خطأ في رفع الصورة', 'error');
      return null;
    }
  };

  const updateHomepageContent = async (sectionKey: string, content: any) => {
    try {
      setSavingHomepage(true);
      await DatabaseService.updateHomepageSection(sectionKey, content);
      setHomepageContent(prev => ({
        ...prev,
        [sectionKey]: content
      }));
    } catch (error) {
      console.error('Error updating homepage content:', error);
      alert(language === 'ar' ? 'حدث خطأ في حفظ التغييرات' : 'Error saving changes');
    } finally {
      setSavingHomepage(false);
    }
  };

  const renderHomepageTab = () => {
    const heroContent = homepageContent['homepage_hero'] || {};
    const certificationsContent = homepageContent['homepage_certifications'] || {};
    const servicesContent = homepageContent['homepage_services'] || {};
    const testimonialsContent = homepageContent['homepage_testimonials'] || {};
    const ctaContent = homepageContent['homepage_cta_final'] || {};

    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            {language === 'ar' ? 'إدارة الصفحة الرئيسية' : 'Homepage Management'}
          </h2>
          {savingHomepage && (
            <div className="flex items-center text-blue-600">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
              {language === 'ar' ? 'جاري الحفظ...' : 'Saving...'}
            </div>
          )}
        </div>

        {/* Hero Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4 text-blue-800">
            {language === 'ar' ? 'القسم الرئيسي (Hero Section)' : 'Hero Section'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'ar' ? 'العنوان الرئيسي (عربي)' : 'Main Title (Arabic)'}
              </label>
              <input
                type="text"
                value={heroContent.title_ar || ''}
                onChange={(e) => {
                  const newContent = { ...heroContent, title_ar: e.target.value };
                  updateHomepageContent('homepage_hero', newContent);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'ar' ? 'العنوان الرئيسي (إنجليزي)' : 'Main Title (English)'}
              </label>
              <input
                type="text"
                value={heroContent.title_en || ''}
                onChange={(e) => {
                  const newContent = { ...heroContent, title_en: e.target.value };
                  updateHomepageContent('homepage_hero', newContent);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'ar' ? 'الوصف (عربي)' : 'Description (Arabic)'}
              </label>
              <textarea
                value={heroContent.subtitle_ar || ''}
                onChange={(e) => {
                  const newContent = { ...heroContent, subtitle_ar: e.target.value };
                  updateHomepageContent('homepage_hero', newContent);
                }}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'ar' ? 'الوصف (إنجليزي)' : 'Description (English)'}
              </label>
              <textarea
                value={heroContent.subtitle_en || ''}
                onChange={(e) => {
                  const newContent = { ...heroContent, subtitle_en: e.target.value };
                  updateHomepageContent('homepage_hero', newContent);
                }}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="mt-6">
            <h4 className="text-lg font-medium mb-4">
              {language === 'ar' ? 'أزرار الدعوة للعمل' : 'Call-to-Action Buttons'}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'ar' ? 'الزر الأول (عربي)' : 'Button 1 (Arabic)'}
                </label>
                <input
                  type="text"
                  value={heroContent.cta1_text_ar || ''}
                  onChange={(e) => {
                    const newContent = { ...heroContent, cta1_text_ar: e.target.value };
                    updateHomepageContent('homepage_hero', newContent);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'ar' ? 'الزر الأول (إنجليزي)' : 'Button 1 (English)'}
                </label>
                <input
                  type="text"
                  value={heroContent.cta1_text_en || ''}
                  onChange={(e) => {
                    const newContent = { ...heroContent, cta1_text_en: e.target.value };
                    updateHomepageContent('homepage_hero', newContent);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'ar' ? 'الزر الثاني (عربي)' : 'Button 2 (Arabic)'}
                </label>
                <input
                  type="text"
                  value={heroContent.cta2_text_ar || ''}
                  onChange={(e) => {
                    const newContent = { ...heroContent, cta2_text_ar: e.target.value };
                    updateHomepageContent('homepage_hero', newContent);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'ar' ? 'الزر الثاني (إنجليزي)' : 'Button 2 (English)'}
                </label>
                <input
                  type="text"
                  value={heroContent.cta2_text_en || ''}
                  onChange={(e) => {
                    const newContent = { ...heroContent, cta2_text_en: e.target.value };
                    updateHomepageContent('homepage_hero', newContent);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'ar' ? 'الزر الثالث (عربي)' : 'Button 3 (Arabic)'}
                </label>
                <input
                  type="text"
                  value={heroContent.cta3_text_ar || ''}
                  onChange={(e) => {
                    const newContent = { ...heroContent, cta3_text_ar: e.target.value };
                    updateHomepageContent('homepage_hero', newContent);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'ar' ? 'الزر الثالث (إنجليزي)' : 'Button 3 (English)'}
                </label>
                <input
                  type="text"
                  value={heroContent.cta3_text_en || ''}
                  onChange={(e) => {
                    const newContent = { ...heroContent, cta3_text_en: e.target.value };
                    updateHomepageContent('homepage_hero', newContent);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Certifications Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4 text-blue-800">
            {language === 'ar' ? 'قسم الشهادات المهنية' : 'Professional Certifications Section'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'ar' ? 'العنوان (عربي)' : 'Title (Arabic)'}
              </label>
              <input
                type="text"
                value={certificationsContent.title_ar || ''}
                onChange={(e) => {
                  const newContent = { ...certificationsContent, title_ar: e.target.value };
                  updateHomepageContent('homepage_certifications', newContent);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'ar' ? 'العنوان (إنجليزي)' : 'Title (English)'}
              </label>
              <input
                type="text"
                value={certificationsContent.title_en || ''}
                onChange={(e) => {
                  const newContent = { ...certificationsContent, title_en: e.target.value };
                  updateHomepageContent('homepage_certifications', newContent);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'ar' ? 'الوصف (عربي)' : 'Description (Arabic)'}
              </label>
              <textarea
                value={certificationsContent.subtitle_ar || ''}
                onChange={(e) => {
                  const newContent = { ...certificationsContent, subtitle_ar: e.target.value };
                  updateHomepageContent('homepage_certifications', newContent);
                }}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'ar' ? 'الوصف (إنجليزي)' : 'Description (English)'}
              </label>
              <textarea
                value={certificationsContent.subtitle_en || ''}
                onChange={(e) => {
                  const newContent = { ...certificationsContent, subtitle_en: e.target.value };
                  updateHomepageContent('homepage_certifications', newContent);
                }}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4 text-blue-800">
            {language === 'ar' ? 'قسم الخدمات الأساسية' : 'Core Services Section'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'ar' ? 'العنوان (عربي)' : 'Title (Arabic)'}
              </label>
              <input
                type="text"
                value={servicesContent.title_ar || ''}
                onChange={(e) => {
                  const newContent = { ...servicesContent, title_ar: e.target.value };
                  updateHomepageContent('homepage_services', newContent);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'ar' ? 'العنوان (إنجليزي)' : 'Title (English)'}
              </label>
              <input
                type="text"
                value={servicesContent.title_en || ''}
                onChange={(e) => {
                  const newContent = { ...servicesContent, title_en: e.target.value };
                  updateHomepageContent('homepage_services', newContent);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'ar' ? 'الوصف (عربي)' : 'Description (Arabic)'}
              </label>
              <textarea
                value={servicesContent.subtitle_ar || ''}
                onChange={(e) => {
                  const newContent = { ...servicesContent, subtitle_ar: e.target.value };
                  updateHomepageContent('homepage_services', newContent);
                }}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'ar' ? 'الوصف (إنجليزي)' : 'Description (English)'}
              </label>
              <textarea
                value={servicesContent.subtitle_en || ''}
                onChange={(e) => {
                  const newContent = { ...servicesContent, subtitle_en: e.target.value };
                  updateHomepageContent('homepage_services', newContent);
                }}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4 text-blue-800">
            {language === 'ar' ? 'قسم شهادات العملاء' : 'Client Testimonials Section'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'ar' ? 'العنوان (عربي)' : 'Title (Arabic)'}
              </label>
              <input
                type="text"
                value={testimonialsContent.title_ar || ''}
                onChange={(e) => {
                  const newContent = { ...testimonialsContent, title_ar: e.target.value };
                  updateHomepageContent('homepage_testimonials', newContent);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'ar' ? 'العنوان (إنجليزي)' : 'Title (English)'}
              </label>
              <input
                type="text"
                value={testimonialsContent.title_en || ''}
                onChange={(e) => {
                  const newContent = { ...testimonialsContent, title_en: e.target.value };
                  updateHomepageContent('homepage_testimonials', newContent);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'ar' ? 'الوصف (عربي)' : 'Description (Arabic)'}
              </label>
              <textarea
                value={testimonialsContent.subtitle_ar || ''}
                onChange={(e) => {
                  const newContent = { ...testimonialsContent, subtitle_ar: e.target.value };
                  updateHomepageContent('homepage_testimonials', newContent);
                }}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'ar' ? 'الوصف (إنجليزي)' : 'Description (English)'}
              </label>
              <textarea
                value={testimonialsContent.subtitle_en || ''}
                onChange={(e) => {
                  const newContent = { ...testimonialsContent, subtitle_en: e.target.value };
                  updateHomepageContent('homepage_testimonials', newContent);
                }}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* CTA Final Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4 text-blue-800">
            {language === 'ar' ? 'قسم الدعوة النهائية للعمل' : 'Final Call-to-Action Section'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'ar' ? 'العنوان (عربي)' : 'Title (Arabic)'}
              </label>
              <input
                type="text"
                value={ctaContent.title_ar || ''}
                onChange={(e) => {
                  const newContent = { ...ctaContent, title_ar: e.target.value };
                  updateHomepageContent('homepage_cta_final', newContent);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'ar' ? 'العنوان (إنجليزي)' : 'Title (English)'}
              </label>
              <input
                type="text"
                value={ctaContent.title_en || ''}
                onChange={(e) => {
                  const newContent = { ...ctaContent, title_en: e.target.value };
                  updateHomepageContent('homepage_cta_final', newContent);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'ar' ? 'الوصف (عربي)' : 'Description (Arabic)'}
              </label>
              <textarea
                value={ctaContent.subtitle_ar || ''}
                onChange={(e) => {
                  const newContent = { ...ctaContent, subtitle_ar: e.target.value };
                  updateHomepageContent('homepage_cta_final', newContent);
                }}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'ar' ? 'الوصف (إنجليزي)' : 'Description (English)'}
              </label>
              <textarea
                value={ctaContent.subtitle_en || ''}
                onChange={(e) => {
                  const newContent = { ...ctaContent, subtitle_en: e.target.value };
                  updateHomepageContent('homepage_cta_final', newContent);
                }}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="mt-4">
            <h4 className="text-lg font-medium mb-4">
              {language === 'ar' ? 'أزرار الدعوة للعمل' : 'Call-to-Action Buttons'}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'ar' ? 'الزر الأول (عربي)' : 'Button 1 (Arabic)'}
                </label>
                <input
                  type="text"
                  value={ctaContent.cta1_text_ar || ''}
                  onChange={(e) => {
                    const newContent = { ...ctaContent, cta1_text_ar: e.target.value };
                    updateHomepageContent('homepage_cta_final', newContent);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'ar' ? 'الزر الأول (إنجليزي)' : 'Button 1 (English)'}
                </label>
                <input
                  type="text"
                  value={ctaContent.cta1_text_en || ''}
                  onChange={(e) => {
                    const newContent = { ...ctaContent, cta1_text_en: e.target.value };
                    updateHomepageContent('homepage_cta_final', newContent);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'ar' ? 'الزر الثاني (عربي)' : 'Button 2 (Arabic)'}
                </label>
                <input
                  type="text"
                  value={ctaContent.cta2_text_ar || ''}
                  onChange={(e) => {
                    const newContent = { ...ctaContent, cta2_text_ar: e.target.value };
                    updateHomepageContent('homepage_cta_final', newContent);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'ar' ? 'الزر الثاني (إنجليزي)' : 'Button 2 (English)'}
                </label>
                <input
                  type="text"
                  value={ctaContent.cta2_text_en || ''}
                  onChange={(e) => {
                    const newContent = { ...ctaContent, cta2_text_en: e.target.value };
                    updateHomepageContent('homepage_cta_final', newContent);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Services Management
  const renderServicesManagement = () => (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">إدارة الخدمات</h2>
        <button 
          onClick={() => setEditingService({ 
            title_ar: '', title_en: '', description_ar: '', description_en: '',
            icon: '', category: '', features: [], image_url: '', is_active: true
          })}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          إضافة خدمة جديدة
        </button>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {services.map((service) => (
          <div key={service.id} className="bg-white rounded-lg shadow-md p-6">
            {service.image_url && (
              <img 
                src={service.image_url} 
                alt={service.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
            )}
            <div className="flex justify-between items-start mb-4">
              <Shield className="h-8 w-8 text-blue-600" />
              <div className="flex gap-2">
                <button 
                  onClick={() => setEditingService(service)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <Edit3 className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => deleteService(service.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <h3 className="font-semibold text-lg mb-2">
              {language === 'ar' ? service.title_ar : service.title_en}
            </h3>
            <p className="text-gray-600 mb-4">
              {language === 'ar' ? service.description_ar : service.description_en}
            </p>
            {service.features && (
              <ul className="space-y-1">
                {service.features.slice(0, 3).map((feature: string, idx: number) => (
                  <li key={idx} className="flex items-center text-sm">
                    <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      {/* Service Edit Modal */}
      {editingService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">
                {editingService.id ? 'تعديل الخدمة' : 'إضافة خدمة جديدة'}
              </h3>
              <button onClick={() => setEditingService(null)}>
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium mb-2">صورة الخدمة</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  {editingService.image_url ? (
                    <div className="relative">
                      <img 
                        src={editingService.image_url} 
                        alt="Service"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <button
                        onClick={() => setEditingService({...editingService, image_url: ''})}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <label className="cursor-pointer flex flex-col items-center">
                      <Upload className="h-12 w-12 text-gray-400 mb-2" />
                      <span className="text-gray-500">اضغط لرفع صورة</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const url = await handleImageUpload(file);
                            if (url) {
                              setEditingService({...editingService, image_url: url});
                            }
                          }
                        }}
                      />
                    </label>
                  )}
                </div>
              </div>

              {/* Title Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">العنوان (عربي)</label>
                  <input
                    type="text"
                    value={editingService.title_ar || ''}
                    onChange={(e) => setEditingService({...editingService, title_ar: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Title (English)</label>
                  <input
                    type="text"
                    value={editingService.title_en || ''}
                    onChange={(e) => setEditingService({...editingService, title_en: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>

              {/* Description Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">الوصف (عربي)</label>
                  <textarea
                    value={editingService.description_ar || ''}
                    onChange={(e) => setEditingService({...editingService, description_ar: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    rows={4}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Description (English)</label>
                  <textarea
                    value={editingService.description_en || ''}
                    onChange={(e) => setEditingService({...editingService, description_en: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    rows={4}
                  />
                </div>
              </div>

              {/* Category and Icon */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">التصنيف</label>
                  <select
                    value={editingService.category || ''}
                    onChange={(e) => setEditingService({...editingService, category: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  >
                    <option value="">اختر التصنيف</option>
                    <option value="civil-protection">الحماية المدنية</option>
                    <option value="forensics">الطب الشرعي</option>
                    <option value="explosives">تحليل المتفجرات</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">الأيقونة</label>
                  <input
                    type="text"
                    value={editingService.icon || ''}
                    onChange={(e) => setEditingService({...editingService, icon: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    placeholder="اسم الأيقونة"
                  />
                </div>
              </div>

              {/* Features */}
              <div>
                <label className="block text-sm font-medium mb-2">المميزات</label>
                <div className="space-y-2">
                  {(editingService.features || []).map((feature: string, index: number) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => {
                          const newFeatures = [...(editingService.features || [])];
                          newFeatures[index] = e.target.value;
                          setEditingService({...editingService, features: newFeatures});
                        }}
                        className="flex-1 p-2 border border-gray-300 rounded-lg"
                      />
                      <button
                        onClick={() => {
                          const newFeatures = (editingService.features || []).filter((_: any, i: number) => i !== index);
                          setEditingService({...editingService, features: newFeatures});
                        }}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      const newFeatures = [...(editingService.features || []), ''];
                      setEditingService({...editingService, features: newFeatures});
                    }}
                    className="text-blue-500 hover:text-blue-700 flex items-center gap-1"
                  >
                    <Plus className="h-4 w-4" />
                    إضافة ميزة
                  </button>
                </div>
              </div>

              {/* Save Button */}
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setEditingService(null)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  إلغاء
                </button>
                <button
                  onClick={saveService}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  حفظ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // Blog Management
  const renderBlogManagement = () => (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">إدارة المدونة</h2>
        <button 
          onClick={() => setEditingPost({ 
            title: '', slug: '', excerpt: '', content: '', author_name: '',
            category: '', tags: [], status: 'draft', featured_image: ''
          })}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          مقال جديد
        </button>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {blogPosts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {post.featured_image && (
              <img 
                src={post.featured_image} 
                alt={post.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className={`px-2 py-1 rounded text-xs ${
                  post.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {post.status === 'published' ? 'منشور' : 'مسودة'}
                </span>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setEditingPost(post)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <Edit3 className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => deletePost(post.id)}
                    className="text-red-500 hover:text-red-700"
                  >
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
          </div>
        ))}
      </div>

      {/* Post Edit Modal */}
      {editingPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">
                {editingPost.id ? 'تعديل المقال' : 'مقال جديد'}
              </h3>
              <button onClick={() => setEditingPost(null)}>
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Featured Image */}
              <div>
                <label className="block text-sm font-medium mb-2">الصورة المميزة</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  {editingPost.featured_image ? (
                    <div className="relative">
                      <img 
                        src={editingPost.featured_image} 
                        alt="Featured"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <button
                        onClick={() => setEditingPost({...editingPost, featured_image: ''})}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <label className="cursor-pointer flex flex-col items-center">
                      <ImageIcon className="h-12 w-12 text-gray-400 mb-2" />
                      <span className="text-gray-500">اضغط لرفع صورة</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const url = await handleImageUpload(file);
                            if (url) {
                              setEditingPost({...editingPost, featured_image: url});
                            }
                          }
                        }}
                      />
                    </label>
                  )}
                </div>
              </div>

              {/* Title and Slug */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">عنوان المقال</label>
                  <input
                    type="text"
                    value={editingPost.title || ''}
                    onChange={(e) => setEditingPost({...editingPost, title: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">الرابط (Slug)</label>
                  <input
                    type="text"
                    value={editingPost.slug || ''}
                    onChange={(e) => setEditingPost({...editingPost, slug: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-sm font-medium mb-2">المقدمة</label>
                <textarea
                  value={editingPost.excerpt || ''}
                  onChange={(e) => setEditingPost({...editingPost, excerpt: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  rows={3}
                />
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-medium mb-2">محتوى المقال</label>
                <textarea
                  value={editingPost.content || ''}
                  onChange={(e) => setEditingPost({...editingPost, content: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  rows={10}
                />
              </div>

              {/* Meta Information */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">الكاتب</label>
                  <input
                    type="text"
                    value={editingPost.author_name || ''}
                    onChange={(e) => setEditingPost({...editingPost, author_name: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">التصنيف</label>
                  <select
                    value={editingPost.category || ''}
                    onChange={(e) => setEditingPost({...editingPost, category: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    required
                  >
                    <option value="">اختر التصنيف</option>
                    <option value="forensics">الطب الشرعي</option>
                    <option value="civil-protection">الحماية المدنية</option>
                    <option value="explosives">تحليل المتفجرات</option>
                    <option value="news">أخبار</option>
                    <option value="insights">رؤى</option>
                    <option value="case-studies">دراسات حالة</option>
                    <option value="technology">تقنيات</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">الحالة</label>
                  <select
                    value={editingPost.status || 'draft'}
                    onChange={(e) => setEditingPost({...editingPost, status: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  >
                    <option value="draft">مسودة</option>
                    <option value="published">منشور</option>
                    <option value="archived">مؤرشف</option>
                  </select>
                </div>
              </div>

              {/* Additional Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">وقت القراءة (بالدقائق)</label>
                  <input
                    type="number"
                    value={editingPost.read_time || 5}
                    onChange={(e) => setEditingPost({...editingPost, read_time: parseInt(e.target.value) || 5})}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    min="1"
                    max="60"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">وصف SEO</label>
                  <input
                    type="text"
                    value={editingPost.meta_description || ''}
                    onChange={(e) => setEditingPost({...editingPost, meta_description: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    placeholder="وصف مختصر للمقال لمحركات البحث"
                    maxLength="160"
                  />
                </div>
              </div>

              {/* Save Button */}
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setEditingPost(null)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  disabled={loading}
                >
                  إلغاء
                </button>
                <button
                  onClick={savePost}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  disabled={loading}
                >
                  {loading && (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  )}
                  حفظ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderServicePagesManagement = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">إدارة صفحات الخدمات</h2>
        <button
          onClick={() => setEditingServiceContent({})}
          className="bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors"
        >
          إضافة قسم جديد
        </button>
      </div>

      {/* Service Types Tabs */}
      <div className="flex space-x-4 border-b border-gray-200">
        {[
          { key: 'civil-protection', label: 'الحماية المدنية' },
          { key: 'forensics', label: 'الطب الشرعي' },
          { key: 'explosives-analysis', label: 'تحليل المتفجرات' }
        ].map(serviceType => (
          <button
            key={serviceType.key}
            className="px-4 py-2 font-medium text-gray-700 hover:text-blue-800 border-b-2 border-transparent hover:border-blue-800"
          >
            {serviceType.label}
          </button>
        ))}
      </div>

      {/* Content Sections */}
      <div className="grid grid-cols-1 gap-6">
        {['civil-protection', 'forensics', 'explosives-analysis'].map(serviceType => (
          <div key={serviceType} className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">
              {serviceType === 'civil-protection' ? 'الحماية المدنية' :
               serviceType === 'forensics' ? 'الطب الشرعي' : 'تحليل المتفجرات'}
            </h3>
            
            <div className="space-y-4">
              {data.servicePagesContent
                ?.filter((content: any) => content.service_type === serviceType)
                ?.sort((a: any, b: any) => a.section_order - b.section_order)
                ?.map((content: any) => (
                <div key={content.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium text-gray-900">{content.section_title_ar}</h4>
                      <p className="text-sm text-gray-500">{content.section_title_en}</p>
                      <p className="text-xs text-gray-400">المفتاح: {content.section_key}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setEditingServiceContent(content)}
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        تحرير
                      </button>
                      <button
                        onClick={() => deleteServicePageContent(content.id)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        حذف
                      </button>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p className="mb-1"><strong>العربية:</strong> {content.content_ar.substring(0, 100)}...</p>
                    <p><strong>English:</strong> {content.content_en.substring(0, 100)}...</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Edit/Add Modal */}
      {editingServiceContent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-semibold mb-4">
              {editingServiceContent.id ? 'تحرير القسم' : 'إضافة قسم جديد'}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">نوع الخدمة</label>
                <select
                  value={editingServiceContent.service_type || newServiceContent.service_type}
                  onChange={(e) => {
                    if (editingServiceContent.id) {
                      setEditingServiceContent({...editingServiceContent, service_type: e.target.value});
                    } else {
                      setNewServiceContent({...newServiceContent, service_type: e.target.value});
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="civil-protection">الحماية المدنية</option>
                  <option value="forensics">الطب الشرعي</option>
                  <option value="explosives-analysis">تحليل المتفجرات</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">مفتاح القسم</label>
                <input
                  type="text"
                  value={editingServiceContent.section_key || newServiceContent.section_key}
                  onChange={(e) => {
                    if (editingServiceContent.id) {
                      setEditingServiceContent({...editingServiceContent, section_key: e.target.value});
                    } else {
                      setNewServiceContent({...newServiceContent, section_key: e.target.value});
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="مثال: hero, services, process"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">العنوان (عربي)</label>
                  <input
                    type="text"
                    value={editingServiceContent.section_title_ar || newServiceContent.section_title_ar}
                    onChange={(e) => {
                      if (editingServiceContent.id) {
                        setEditingServiceContent({...editingServiceContent, section_title_ar: e.target.value});
                      } else {
                        setNewServiceContent({...newServiceContent, section_title_ar: e.target.value});
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">العنوان (إنجليزي)</label>
                  <input
                    type="text"
                    value={editingServiceContent.section_title_en || newServiceContent.section_title_en}
                    onChange={(e) => {
                      if (editingServiceContent.id) {
                        setEditingServiceContent({...editingServiceContent, section_title_en: e.target.value});
                      } else {
                        setNewServiceContent({...newServiceContent, section_title_en: e.target.value});
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">المحتوى (عربي)</label>
                <textarea
                  value={editingServiceContent.content_ar || newServiceContent.content_ar}
                  onChange={(e) => {
                    if (editingServiceContent.id) {
                      setEditingServiceContent({...editingServiceContent, content_ar: e.target.value});
                    } else {
                      setNewServiceContent({...newServiceContent, content_ar: e.target.value});
                    }
                  }}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">المحتوى (إنجليزي)</label>
                <textarea
                  value={editingServiceContent.content_en || newServiceContent.content_en}
                  onChange={(e) => {
                    if (editingServiceContent.id) {
                      setEditingServiceContent({...editingServiceContent, content_en: e.target.value});
                    } else {
                      setNewServiceContent({...newServiceContent, content_en: e.target.value});
                    }
                  }}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ترتيب القسم</label>
                <input
                  type="number"
                  value={editingServiceContent.section_order || newServiceContent.section_order}
                  onChange={(e) => {
                    if (editingServiceContent.id) {
                      setEditingServiceContent({...editingServiceContent, section_order: parseInt(e.target.value)});
                    } else {
                      setNewServiceContent({...newServiceContent, section_order: parseInt(e.target.value)});
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={() => setEditingServiceContent(null)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                إلغاء
              </button>
              <button
                onClick={saveServicePageContent}
                className="bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors"
              >
                حفظ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderHomepageManagement = () => (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">إدارة الصفحة الرئيسية</h2>
      {/* Homepage management content */}
    </div>
  );

  // Certifications Management
  const renderCertificationsManagement = () => (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">إدارة الشهادات المهنية</h2>
        <button 
          onClick={() => setEditingCert({ 
            name: '', description: '', organization: '', year_obtained: '',
            image_url: '', is_featured: false
          })}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          إضافة شهادة جديدة
        </button>
      </div>

      {/* Certifications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {certifications.map((cert) => (
          <div key={cert.id} className="bg-white rounded-lg shadow-md p-6">
            {cert.image_url && (
              <img 
                src={cert.image_url} 
                alt={cert.name}
                className="w-full h-32 object-contain rounded-lg mb-4 bg-gray-50"
              />
            )}
            <div className="flex justify-between items-start mb-4">
              <Award className="h-8 w-8 text-blue-600" />
              <div className="flex gap-2">
                <button 
                  onClick={() => setEditingCert(cert)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <Edit3 className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => deleteCertification(cert.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <h3 className="font-semibold text-lg mb-2">{cert.name}</h3>
            <p className="text-gray-600 mb-2">{cert.organization}</p>
            {cert.year_obtained && (
              <p className="text-sm text-gray-500">{cert.year_obtained}</p>
            )}
            {cert.is_featured && (
              <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded mt-2">
                مميزة
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Certification Edit Modal */}
      {editingCert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">
                {editingCert.id ? 'تعديل الشهادة' : 'إضافة شهادة جديدة'}
              </h3>
              <button onClick={() => setEditingCert(null)}>
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium mb-2">صورة الشهادة</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  {editingCert.image_url ? (
                    <div className="relative">
                      <img 
                        src={editingCert.image_url} 
                        alt="Certificate"
                        className="w-full h-48 object-contain rounded-lg bg-gray-50"
                      />
                      <button
                        onClick={() => setEditingCert({...editingCert, image_url: ''})}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <label className="cursor-pointer flex flex-col items-center">
                      <Award className="h-12 w-12 text-gray-400 mb-2" />
                      <span className="text-gray-500">اضغط لرفع صورة الشهادة</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const url = await handleImageUpload(file);
                            if (url) {
                              setEditingCert({...editingCert, image_url: url});
                            }
                          }
                        }}
                      />
                    </label>
                  )}
                </div>
              </div>

              {/* Certificate Details */}
              <div>
                <label className="block text-sm font-medium mb-2">اسم الشهادة</label>
                <input
                  type="text"
                  value={editingCert.name || ''}
                  onChange={(e) => setEditingCert({...editingCert, name: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">الجهة المانحة</label>
                <input
                  type="text"
                  value={editingCert.organization || ''}
                  onChange={(e) => setEditingCert({...editingCert, organization: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">سنة الحصول</label>
                  <input
                    type="number"
                    value={editingCert.year_obtained || ''}
                    onChange={(e) => setEditingCert({...editingCert, year_obtained: parseInt(e.target.value)})}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>
                <div className="flex items-center">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={editingCert.is_featured || false}
                      onChange={(e) => setEditingCert({...editingCert, is_featured: e.target.checked})}
                      className="mr-2"
                    />
                    شهادة مميزة
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">الوصف</label>
                <textarea
                  value={editingCert.description || ''}
                  onChange={(e) => setEditingCert({...editingCert, description: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  rows={3}
                />
              </div>

              {/* Save Button */}
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setEditingCert(null)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  إلغاء
                </button>
                <button
                  onClick={saveCertification}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  حفظ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // About Page Management
  const renderAboutManagement = () => (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">إدارة صفحة من نحن</h2>
        <button 
          onClick={() => setEditingTeamMember({ 
            name: '', position: '', bio: '', image_url: '',
            qualifications: [], experience_years: '', specializations: []
          })}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          إضافة عضو فريق
        </button>
      </div>

      {/* About Content */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4">محتوى الصفحة</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">عنوان الصفحة (عربي)</label>
              <input
                type="text"
                value={aboutContent.title_ar || ''}
                onChange={(e) => setAboutContent({...aboutContent, title_ar: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Page Title (English)</label>
              <input
                type="text"
                value={aboutContent.title_en || ''}
                onChange={(e) => setAboutContent({...aboutContent, title_en: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">الوصف (عربي)</label>
              <textarea
                value={aboutContent.description_ar || ''}
                onChange={(e) => setAboutContent({...aboutContent, description_ar: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg"
                rows={4}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Description (English)</label>
              <textarea
                value={aboutContent.description_en || ''}
                onChange={(e) => setAboutContent({...aboutContent, description_en: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg"
                rows={4}
              />
            </div>
          </div>

          <button
            onClick={saveAboutContent}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            حفظ محتوى الصفحة
          </button>
        </div>
      </div>

      {/* Team Members */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {teamMembers.map((member) => (
          <div key={member.id} className="bg-white rounded-lg shadow-md p-6">
            {member.image_url && (
              <img 
                src={member.image_url} 
                alt={member.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
            )}
            <div className="text-center">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{member.name}</h3>
                  <p className="text-blue-600 font-medium">{member.position}</p>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setEditingTeamMember(member)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <Edit3 className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => deleteTeamMember(member.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <p className="text-gray-600 text-sm">{member.bio}</p>
              {member.experience_years && (
                <p className="text-sm text-gray-500 mt-2">
                  {member.experience_years} سنة خبرة
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Team Member Edit Modal */}
      {editingTeamMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">
                {editingTeamMember.id ? 'تعديل عضو الفريق' : 'إضافة عضو فريق جديد'}
              </h3>
              <button onClick={() => setEditingTeamMember(null)}>
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium mb-2">صورة العضو</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  {editingTeamMember.image_url ? (
                    <div className="relative">
                      <img 
                        src={editingTeamMember.image_url} 
                        alt="Team Member"
                        className="w-32 h-32 rounded-full mx-auto object-cover"
                      />
                      <button
                        onClick={() => setEditingTeamMember({...editingTeamMember, image_url: ''})}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <label className="cursor-pointer flex flex-col items-center">
                      <User className="h-12 w-12 text-gray-400 mb-2" />
                      <span className="text-gray-500">اضغط لرفع صورة</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const url = await handleImageUpload(file);
                            if (url) {
                              setEditingTeamMember({...editingTeamMember, image_url: url});
                            }
                          }
                        }}
                      />
                    </label>
                  )}
                </div>
              </div>

              {/* Member Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">الاسم</label>
                  <input
                    type="text"
                    value={editingTeamMember.name || ''}
                    onChange={(e) => setEditingTeamMember({...editingTeamMember, name: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">المنصب</label>
                  <input
                    type="text"
                    value={editingTeamMember.position || ''}
                    onChange={(e) => setEditingTeamMember({...editingTeamMember, position: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">النبذة الشخصية</label>
                <textarea
                  value={editingTeamMember.bio || ''}
                  onChange={(e) => setEditingTeamMember({...editingTeamMember, bio: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  rows={4}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">سنوات الخبرة</label>
                <input
                  type="number"
                  value={editingTeamMember.experience_years || ''}
                  onChange={(e) => setEditingTeamMember({...editingTeamMember, experience_years: parseInt(e.target.value)})}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>

              {/* Save Button */}
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setEditingTeamMember(null)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  إلغاء
                </button>
                <button
                  onClick={saveTeamMember}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  حفظ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // Messages Management
  const renderMessagesManagement = () => (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">إدارة الرسائل</h2>
        <button 
          onClick={() => setRefreshTrigger(prev => prev + 1)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2"
        >
          <MessageSquare className="h-4 w-4" />
          تحديث الرسائل
        </button>
      </div>

      <div className="grid gap-4">
        {contactMessages.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-gray-600">لا توجد رسائل حالياً</p>
          </div>
        ) : (
          contactMessages.map((msg) => (
            <div key={msg.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold">{msg.name}</h3>
                  <p className="text-gray-600">{msg.email}</p>
                  {msg.phone && <p className="text-gray-600">{msg.phone}</p>}
                </div>
                <div className="text-left">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    msg.status === 'new' ? 'bg-green-100 text-green-800' :
                    msg.status === 'read' ? 'bg-blue-100 text-blue-800' :
                    msg.status === 'replied' ? 'bg-purple-100 text-purple-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {msg.status === 'new' ? 'جديد' :
                     msg.status === 'read' ? 'مقروء' :
                     msg.status === 'replied' ? 'تم الرد' : 'مؤرشف'}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(msg.created_at).toLocaleDateString('ar-SA')}
                  </p>
                </div>
              </div>
              
              <div className="mb-4">
                <h4 className="font-medium mb-2">الموضوع: {msg.subject}</h4>
                <p className="text-gray-700 bg-gray-50 p-3 rounded">{msg.message}</p>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={async () => {
                    try {
                      await DatabaseService.updateContactMessageStatus(msg.id, 'read');
                      setRefreshTrigger(prev => prev + 1);
                    } catch (error) {
                      console.error('Error updating message status:', error);
                    }
                  }}
                  className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                >
                  تحديد كمقروء
                </button>
                <button
                  onClick={async () => {
                    try {
                      await DatabaseService.updateContactMessageStatus(msg.id, 'replied');
                      setRefreshTrigger(prev => prev + 1);
                    } catch (error) {
                      console.error('Error updating message status:', error);
                    }
                  }}
                  className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors"
                >
                  تم الرد
                </button>
                <a
                  href={`mailto:${msg.email}?subject=Re: ${msg.subject}`}
                  className="bg-purple-600 text-white px-3 py-1 rounded text-sm hover:bg-purple-700 transition-colors"
                >
                  رد بالإيميل
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );

  // Save functions
  const saveService = async () => {
    try {
      if (editingService.id) {
        await DatabaseService.updateService(editingService.id, editingService);
        showMessage('تم تحديث الخدمة بنجاح');
      } else {
        await DatabaseService.createService(editingService);
        showMessage('تم إضافة الخدمة بنجاح');
      }
      setEditingService(null);
      loadAllData();
    } catch (error) {
      showMessage('خطأ في حفظ الخدمة', 'error');
    }
  };

  const savePost = async () => {
    try {
      setLoading(true);
      
      // التحقق من البيانات المطلوبة
      if (!editingPost.title || !editingPost.content || !editingPost.author_name || !editingPost.category) {
        showMessage('يرجى ملء جميع الحقول المطلوبة', 'error');
        setLoading(false);
        return;
      }

      // إنشاء slug تلقائياً إذا لم يكن موجوداً
      if (!editingPost.slug) {
        editingPost.slug = editingPost.title
          .toLowerCase()
          .replace(/[^a-z0-9\u0600-\u06FF\s]/g, '')
          .replace(/\s+/g, '-')
          .substring(0, 50);
      }

      // تحديد وقت النشر إذا كانت الحالة منشور
      if (editingPost.status === 'published' && !editingPost.published_at) {
        editingPost.published_at = new Date().toISOString();
      }

      let savedPost;
      if (editingPost.id) {
        savedPost = await DatabaseService.updateBlogPost(editingPost.id, {
          title: editingPost.title,
          slug: editingPost.slug,
          excerpt: editingPost.excerpt || '',
          content: editingPost.content,
          featured_image: editingPost.featured_image || '',
          author_name: editingPost.author_name,
          category: editingPost.category,
          tags: editingPost.tags || [],
          status: editingPost.status || 'draft',
          read_time: editingPost.read_time || 5,
          meta_description: editingPost.meta_description || '',
          seo_keywords: editingPost.seo_keywords || [],
          published_at: editingPost.published_at
        });
        showMessage('تم تحديث المقال بنجاح');
      } else {
        savedPost = await DatabaseService.createBlogPost({
          title: editingPost.title,
          slug: editingPost.slug,
          excerpt: editingPost.excerpt || '',
          content: editingPost.content,
          featured_image: editingPost.featured_image || '',
          author_name: editingPost.author_name,
          category: editingPost.category,
          tags: editingPost.tags || [],
          status: editingPost.status || 'draft',
          read_time: editingPost.read_time || 5,
          views: 0,
          meta_description: editingPost.meta_description || '',
          seo_keywords: editingPost.seo_keywords || [],
          published_at: editingPost.published_at
        });
        showMessage('تم إضافة المقال بنجاح');
      }
      
      setEditingPost(null);
      await loadAllData(); // إعادة تحميل البيانات
    } catch (error) {
      console.error('Error saving post:', error);
      showMessage('خطأ في حفظ المقال', 'error');
    } finally {
      setLoading(false);
    }
  };

  const saveCertification = async () => {
    try {
      if (editingCert.id) {
        await DatabaseService.updateCertification(editingCert.id, editingCert);
        showMessage('تم تحديث الشهادة بنجاح');
      } else {
        await DatabaseService.createCertification(editingCert);
        showMessage('تم إضافة الشهادة بنجاح');
      }
      setEditingCert(null);
      loadAllData();
    } catch (error) {
      showMessage('خطأ في حفظ الشهادة', 'error');
    }
  };

  const saveTeamMember = async () => {
    try {
      if (editingTeamMember.id) {
        await DatabaseService.updateTeamMember(editingTeamMember.id, editingTeamMember);
        showMessage('تم تحديث عضو الفريق بنجاح');
      } else {
        await DatabaseService.createTeamMember(editingTeamMember);
        showMessage('تم إضافة عضو الفريق بنجاح');
      }
      setEditingTeamMember(null);
      loadAllData();
    } catch (error) {
      showMessage('خطأ في حفظ عضو الفريق', 'error');
    }
  };

  const saveAboutContent = async () => {
    try {
      await DatabaseService.updateContentSection('about_content', JSON.stringify(aboutContent));
      showMessage('تم حفظ محتوى صفحة من نحن بنجاح');
    } catch (error) {
      showMessage('خطأ في حفظ المحتوى', 'error');
    }
  };

  // Delete functions
  const deleteService = async (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذه الخدمة؟')) {
      try {
        await DatabaseService.deleteService(id);
        showMessage('تم حذف الخدمة بنجاح');
        loadAllData();
      } catch (error) {
        showMessage('خطأ في حذف الخدمة', 'error');
      }
    }
  };

  const deletePost = async (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا المقال؟')) {
      try {
        await DatabaseService.deleteBlogPost(id);
        showMessage('تم حذف المقال بنجاح');
        loadAllData();
      } catch (error) {
        showMessage('خطأ في حذف المقال', 'error');
      }
    }
  };

  const deleteCertification = async (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذه الشهادة؟')) {
      try {
        await DatabaseService.deleteCertification(id);
        showMessage('تم حذف الشهادة بنجاح');
        loadAllData();
      } catch (error) {
        showMessage('خطأ في حذف الشهادة', 'error');
      }
    }
  };

  const deleteTeamMember = async (id: string) => {
    if (confirm('هل أنت متأكد من حذف عضو الفريق؟')) {
      try {
        await DatabaseService.deleteTeamMember(id);
        showMessage('تم حذف عضو الفريق بنجاح');
        loadAllData();
      } catch (error) {
        showMessage('خطأ في حذف عضو الفريق', 'error');
      }
    }
  };

  const dashboardSections = [
    { id: 'services', label: 'إدارة الخدمات', icon: Shield },
    { id: 'blog', label: 'إدارة المدونة', icon: FileText },
    { id: 'certifications', label: 'الشهادات المهنية', icon: Award },
    { id: 'about', label: 'صفحة من نحن', icon: Users },
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
              <h1 className="text-xl font-bold">لوحة تحكم ForensicPro</h1>
              <button
                onClick={() => setRefreshTrigger(prev => prev + 1)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                تحديث الرسائل
              </button>
            </div>
            
            <div className="flex items-center space-x-4 space-x-reverse">
              {/* Language Toggle */}
              <button
                onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
              >
                <Globe className="h-4 w-4" />
                {language === 'ar' ? 'English' : 'العربية'}
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
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
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
              {dashboardSections.map((section) => (
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
              {activeSection === 'services' && renderServicesManagement()}
              {activeSection === 'blog' && renderBlogManagement()}
              {activeSection === 'certifications' && renderCertificationsManagement()}
              {activeSection === 'about' && renderAboutManagement()}
              {activeSection === 'messages' && renderMessagesManagement()}
              {activeSection === 'homepage' && renderHomepageManagement()}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

// Homepage Management Component
const HomepageManagement = ({ homepageContent, onUpdate }: { homepageContent: any, onUpdate: () => void }) => {
  const { language } = useLanguage();
  const [saving, setSaving] = useState(false);
  const [sections, setSections] = useState<any>({});

  useEffect(() => {
    // تحويل البيانات من قاعدة البيانات إلى كائن منظم
    const organizedSections: any = {};
    homepageContent.forEach((section: any) => {
      try {
        organizedSections[section.section_key] = JSON.parse(section.content);
      } catch {
        organizedSections[section.section_key] = { ar: '', en: '' };
      }
    });
    setSections(organizedSections);
  }, [homepageContent]);

  const updateSection = async (sectionKey: string, content: any) => {
    try {
      setSaving(true);
      await DatabaseService.updateHomepageSection(sectionKey, content);
      setSections(prev => ({ ...prev, [sectionKey]: content }));
      onUpdate();
    } catch (error) {
      console.error('Error updating homepage section:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (sectionKey: string, field: string, value: string) => {
    const updatedContent = {
      ...sections[sectionKey],
      [field]: value
    };
    setSections(prev => ({ ...prev, [sectionKey]: updatedContent }));
    updateSection(sectionKey, updatedContent);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          {language === 'ar' ? 'إدارة الصفحة الرئيسية' : 'Homepage Management'}
        </h2>
        {saving && (
          <div className="flex items-center text-blue-600">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
            {language === 'ar' ? 'جاري الحفظ...' : 'Saving...'}
          </div>
        )}
      </div>

      {/* Hero Section */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4 text-blue-800">
          {language === 'ar' ? 'القسم الرئيسي (Hero Section)' : 'Hero Section'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'ar' ? 'العنوان الرئيسي (عربي)' : 'Main Title (Arabic)'}
            </label>
            <input
              type="text"
              value={sections.homepage_hero?.title_ar || ''}
              onChange={(e) => handleInputChange('homepage_hero', 'title_ar', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'ar' ? 'العنوان الرئيسي (إنجليزي)' : 'Main Title (English)'}
            </label>
            <input
              type="text"
              value={sections.homepage_hero?.title_en || ''}
              onChange={(e) => handleInputChange('homepage_hero', 'title_en', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'ar' ? 'الوصف (عربي)' : 'Description (Arabic)'}
            </label>
            <textarea
              value={sections.homepage_hero?.subtitle_ar || ''}
              onChange={(e) => handleInputChange('homepage_hero', 'subtitle_ar', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'ar' ? 'الوصف (إنجليزي)' : 'Description (English)'}
            </label>
            <textarea
              value={sections.homepage_hero?.subtitle_en || ''}
              onChange={(e) => handleInputChange('homepage_hero', 'subtitle_en', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Certifications Section */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4 text-blue-800">
          {language === 'ar' ? 'قسم الشهادات المهنية' : 'Certifications Section'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'ar' ? 'العنوان (عربي)' : 'Title (Arabic)'}
            </label>
            <input
              type="text"
              value={sections.homepage_certifications?.title_ar || ''}
              onChange={(e) => handleInputChange('homepage_certifications', 'title_ar', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'ar' ? 'العنوان (إنجليزي)' : 'Title (English)'}
            </label>
            <input
              type="text"
              value={sections.homepage_certifications?.title_en || ''}
              onChange={(e) => handleInputChange('homepage_certifications', 'title_en', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'ar' ? 'الوصف (عربي)' : 'Description (Arabic)'}
            </label>
            <textarea
              value={sections.homepage_certifications?.subtitle_ar || ''}
              onChange={(e) => handleInputChange('homepage_certifications', 'subtitle_ar', e.target.value)}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'ar' ? 'الوصف (إنجليزي)' : 'Description (English)'}
            </label>
            <textarea
              value={sections.homepage_certifications?.subtitle_en || ''}
              onChange={(e) => handleInputChange('homepage_certifications', 'subtitle_en', e.target.value)}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4 text-blue-800">
          {language === 'ar' ? 'قسم الخدمات الأساسية' : 'Services Section'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'ar' ? 'العنوان (عربي)' : 'Title (Arabic)'}
            </label>
            <input
              type="text"
              value={sections.homepage_services?.title_ar || ''}
              onChange={(e) => handleInputChange('homepage_services', 'title_ar', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'ar' ? 'العنوان (إنجليزي)' : 'Title (English)'}
            </label>
            <input
              type="text"
              value={sections.homepage_services?.title_en || ''}
              onChange={(e) => handleInputChange('homepage_services', 'title_en', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'ar' ? 'الوصف (عربي)' : 'Description (Arabic)'}
            </label>
            <textarea
              value={sections.homepage_services?.subtitle_ar || ''}
              onChange={(e) => handleInputChange('homepage_services', 'subtitle_ar', e.target.value)}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'ar' ? 'الوصف (إنجليزي)' : 'Description (English)'}
            </label>
            <textarea
              value={sections.homepage_services?.subtitle_en || ''}
              onChange={(e) => handleInputChange('homepage_services', 'subtitle_en', e.target.value)}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4 text-blue-800">
          {language === 'ar' ? 'قسم شهادات العملاء' : 'Testimonials Section'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'ar' ? 'العنوان (عربي)' : 'Title (Arabic)'}
            </label>
            <input
              type="text"
              value={sections.homepage_testimonials?.title_ar || ''}
              onChange={(e) => handleInputChange('homepage_testimonials', 'title_ar', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'ar' ? 'العنوان (إنجليزي)' : 'Title (English)'}
            </label>
            <input
              type="text"
              value={sections.homepage_testimonials?.title_en || ''}
              onChange={(e) => handleInputChange('homepage_testimonials', 'title_en', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'ar' ? 'الوصف (عربي)' : 'Description (Arabic)'}
            </label>
            <textarea
              value={sections.homepage_testimonials?.subtitle_ar || ''}
              onChange={(e) => handleInputChange('homepage_testimonials', 'subtitle_ar', e.target.value)}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'ar' ? 'الوصف (إنجليزي)' : 'Description (English)'}
            </label>
            <textarea
              value={sections.homepage_testimonials?.subtitle_en || ''}
              onChange={(e) => handleInputChange('homepage_testimonials', 'subtitle_en', e.target.value)}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4 text-blue-800">
          {language === 'ar' ? 'قسم الدعوة النهائية للعمل' : 'Final CTA Section'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'ar' ? 'العنوان (عربي)' : 'Title (Arabic)'}
            </label>
            <input
              type="text"
              value={sections.homepage_cta?.title_ar || ''}
              onChange={(e) => handleInputChange('homepage_cta', 'title_ar', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'ar' ? 'العنوان (إنجليزي)' : 'Title (English)'}
            </label>
            <input
              type="text"
              value={sections.homepage_cta?.title_en || ''}
              onChange={(e) => handleInputChange('homepage_cta', 'title_en', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'ar' ? 'الوصف (عربي)' : 'Description (Arabic)'}
            </label>
            <textarea
              value={sections.homepage_cta?.subtitle_ar || ''}
              onChange={(e) => handleInputChange('homepage_cta', 'subtitle_ar', e.target.value)}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'ar' ? 'الوصف (إنجليزي)' : 'Description (English)'}
            </label>
            <textarea
              value={sections.homepage_cta?.subtitle_en || ''}
              onChange={(e) => handleInputChange('homepage_cta', 'subtitle_en', e.target.value)}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;