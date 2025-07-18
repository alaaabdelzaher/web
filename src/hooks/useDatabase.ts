import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { DatabaseService, BlogPost, Page, MediaFile, ContentSection, SiteSetting, ChatbotResponse, ContactMessage } from '../lib/supabase';

// Hook for managing blog posts
export function useBlogPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const data = await DatabaseService.getBlogPosts();
      setPosts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'حدث خطأ في تحميل المقالات');
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (post: Partial<BlogPost>) => {
    try {
      const newPost = await DatabaseService.createBlogPost(post);
      setPosts(prev => [newPost, ...prev]);
      return newPost;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'حدث خطأ في إنشاء المقال');
      throw err;
    }
  };

  const updatePost = async (id: string, updates: Partial<BlogPost>) => {
    try {
      const updatedPost = await DatabaseService.updateBlogPost(id, updates);
      setPosts(prev => prev.map(post => post.id === id ? updatedPost : post));
      return updatedPost;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'حدث خطأ في تحديث المقال');
      throw err;
    }
  };

  const deletePost = async (id: string) => {
    try {
      await DatabaseService.deleteBlogPost(id);
      setPosts(prev => prev.filter(post => post.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'حدث خطأ في حذف المقال');
      throw err;
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return {
    posts,
    loading,
    error,
    createPost,
    updatePost,
    deletePost,
    refetch: fetchPosts
  };
}

// Hook for managing pages
export function usePages() {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPages = async () => {
    try {
      setLoading(true);
      const data = await DatabaseService.getPages();
      setPages(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'حدث خطأ في تحميل الصفحات');
    } finally {
      setLoading(false);
    }
  };

  const createPage = async (page: Partial<Page>) => {
    try {
      const newPage = await DatabaseService.createPage(page);
      setPages(prev => [newPage, ...prev]);
      return newPage;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'حدث خطأ في إنشاء الصفحة');
      throw err;
    }
  };

  const updatePage = async (id: string, updates: Partial<Page>) => {
    try {
      const updatedPage = await DatabaseService.updatePage(id, updates);
      setPages(prev => prev.map(page => page.id === id ? updatedPage : page));
      return updatedPage;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'حدث خطأ في تحديث الصفحة');
      throw err;
    }
  };

  const deletePage = async (id: string) => {
    try {
      await DatabaseService.deletePage(id);
      setPages(prev => prev.filter(page => page.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'حدث خطأ في حذف الصفحة');
      throw err;
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  return {
    pages,
    loading,
    error,
    createPage,
    updatePage,
    deletePage,
    refetch: fetchPages
  };
}

// Hook for managing media files
export function useMediaFiles() {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFiles = async () => {
    try {
      setLoading(true);
      const data = await DatabaseService.getMediaFiles();
      setFiles(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'حدث خطأ في تحميل الملفات');
    } finally {
      setLoading(false);
    }
  };

  const uploadFile = async (file: File, folder?: string) => {
    try {
      const newFile = await DatabaseService.uploadMediaFile(file, folder);
      setFiles(prev => [newFile, ...prev]);
      return newFile;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'حدث خطأ في رفع الملف');
      throw err;
    }
  };

  const deleteFile = async (id: string) => {
    try {
      await DatabaseService.deleteMediaFile(id);
      setFiles(prev => prev.filter(file => file.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'حدث خطأ في حذف الملف');
      throw err;
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return {
    files,
    loading,
    error,
    uploadFile,
    deleteFile,
    refetch: fetchFiles
  };
}

// Hook for managing content sections
export function useContentSections() {
  const [sections, setSections] = useState<ContentSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSections = async () => {
    try {
      setLoading(true);
      const data = await DatabaseService.getContentSections();
      setSections(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'حدث خطأ في تحميل أقسام المحتوى');
    } finally {
      setLoading(false);
    }
  };

  const updateSection = async (key: string, content: string) => {
    try {
      // Use upsert to handle both insert and update
      const { error } = await supabase
        .from('content_sections')
        .upsert({
          section_key: key,
          section_name: key.replace('_', ' ').toUpperCase(),
          content_type: 'text',
          content,
          is_active: true,
          sort_order: sections.length + 1,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'section_key'
        });
      
      if (error) throw error;
      
      await fetchSections();
    } catch (error) {
      console.error('Error updating section:', error);
      setError(error instanceof Error ? error.message : 'حدث خطأ في تحديث القسم');
      throw error;
    }
  };

  useEffect(() => {
    fetchSections();
  }, []);

  return {
    sections,
    loading,
    error,
    updateSection,
    refetch: fetchSections
  };
}

// Hook for managing site settings
export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSetting[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const data = await DatabaseService.getSiteSettings();
      setSettings(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'حدث خطأ في تحميل الإعدادات');
    } finally {
      setLoading(false);
    }
  };

  const updateSetting = async (key: string, value: string) => {
    try {
      await DatabaseService.updateSiteSetting(key, value);
      
      await fetchSettings();
    } catch (error) {
      console.error('Error updating setting:', error);
      setError(error instanceof Error ? error.message : 'حدث خطأ في تحديث الإعداد');
      throw error;
    }
  };

  const getSetting = (key: string) => {
    return settings.find(setting => setting.setting_key === key)?.setting_value || '';
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return {
    settings,
    loading,
    error,
    updateSetting,
    getSetting,
    refetch: fetchSettings
  };
}

// Hook for managing chatbot responses
export function useChatbotResponses() {
  const [responses, setResponses] = useState<ChatbotResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchResponses = async () => {
    try {
      setLoading(true);
      const data = await DatabaseService.getChatbotResponses();
      setResponses(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'حدث خطأ في تحميل ردود الشات بوت');
    } finally {
      setLoading(false);
    }
  };

  const createResponse = async (response: Partial<ChatbotResponse>) => {
    try {
      const newResponse = await DatabaseService.createChatbotResponse(response);
      setResponses(prev => [...prev, newResponse]);
      return newResponse;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'حدث خطأ في إنشاء الرد');
      throw err;
    }
  };

  const updateResponse = async (id: string, updates: Partial<ChatbotResponse>) => {
    try {
      const updatedResponse = await DatabaseService.updateChatbotResponse(id, updates);
      setResponses(prev => prev.map(response => 
        response.id === id ? updatedResponse : response
      ));
      return updatedResponse;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'حدث خطأ في تحديث الرد');
      throw err;
    }
  };

  const deleteResponse = async (id: string) => {
    try {
      await DatabaseService.deleteChatbotResponse(id);
      setResponses(prev => prev.filter(response => response.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'حدث خطأ في حذف الرد');
      throw err;
    }
  };

  useEffect(() => {
    fetchResponses();
  }, []);

  return {
    responses,
    loading,
    error,
    createResponse,
    updateResponse,
    deleteResponse,
    refetch: fetchResponses
  };
}

// Hook for managing contact messages
export function useContactMessages() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const data = await DatabaseService.getContactMessages();
      setMessages(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'حدث خطأ في تحميل الرسائل');
    } finally {
      setLoading(false);
    }
  };

  const updateMessageStatus = async (id: string, status: ContactMessage['status']) => {
    try {
      const updatedMessage = await DatabaseService.updateContactMessageStatus(id, status);
      setMessages(prev => prev.map(message => 
        message.id === id ? updatedMessage : message
      ));
      return updatedMessage;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'حدث خطأ في تحديث حالة الرسالة');
      throw err;
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return {
    messages,
    loading,
    error,
    updateMessageStatus,
    refetch: fetchMessages
  };
}