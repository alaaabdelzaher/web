import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database Types
export interface User {
  id: string;
  email: string;
  full_name?: string;
  role: 'admin' | 'editor' | 'viewer';
  status: 'active' | 'inactive';
  last_login?: string;
  created_at: string;
  updated_at: string;
}

export interface Page {
  id: string;
  name: string;
  slug: string;
  title: string;
  meta_description?: string;
  content: any;
  status: 'draft' | 'published' | 'archived';
  template: string;
  featured_image?: string;
  seo_keywords?: string[];
  created_at: string;
  updated_at: string;
  created_by?: string;
  updated_by?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  featured_image?: string;
  author_name: string;
  category: string;
  tags: string[];
  status: 'draft' | 'published' | 'archived';
  read_time: number;
  views: number;
  meta_description?: string;
  seo_keywords?: string[];
  published_at?: string;
  created_at: string;
  updated_at: string;
  created_by?: string;
  updated_by?: string;
}

export interface MediaFile {
  id: string;
  filename: string;
  original_name: string;
  file_type: string;
  file_size: number;
  mime_type: string;
  url: string;
  alt_text?: string;
  caption?: string;
  folder: string;
  is_optimized: boolean;
  created_at: string;
  uploaded_by?: string;
}

export interface ContentSection {
  id: string;
  section_key: string;
  section_name: string;
  content_type: 'text' | 'html' | 'json';
  content: string;
  page_id?: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
  updated_by?: string;
}

export interface SiteSetting {
  id: string;
  setting_key: string;
  setting_value: string;
  setting_type: 'text' | 'number' | 'boolean' | 'json';
  category: string;
  description?: string;
  is_public: boolean;
  created_at: string;
  updated_at: string;
  updated_by?: string;
}

export interface ChatbotResponse {
  id: string;
  trigger_keywords: string[];
  response_text: string;
  response_type: 'text' | 'quick_reply' | 'card';
  is_active: boolean;
  priority: number;
  created_at: string;
  updated_at: string;
  updated_by?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  ip_address?: string;
  user_agent?: string;
  created_at: string;
  replied_at?: string;
  replied_by?: string;
}

// Database Service Functions
export class DatabaseService {
  // Users
  static async getUsers() {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching users:', error);
      return [];
    }
    return data as User[];
  }

  static async createUser(user: Partial<User>) {
    const { data, error } = await supabase
      .from('users')
      .insert(user)
      .select()
      .single();
    
    if (error) {
      console.error('Error creating user:', error);
      throw error;
    }
    return data as User;
  }

  static async updateUser(id: string, updates: Partial<User>) {
    const { data, error } = await supabase
      .from('users')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating user:', error);
      throw error;
    }
    return data as User;
  }

  static async deleteUser(id: string) {
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }

  // Pages
  static async getPages() {
    const { data, error } = await supabase
      .from('pages')
      .select('*')
      .order('updated_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching pages:', error);
      return [];
    }
    return data as Page[];
  }

  static async getPage(slug: string) {
    const { data, error } = await supabase
      .from('pages')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();
    
    if (error) {
      console.warn(`Page '${slug}' not found:`, error);
      return null;
    }
    return data as Page;
  }

  static async createPage(page: Partial<Page>) {
    const { data, error } = await supabase
      .from('pages')
      .insert(page)
      .select()
      .single();
    
    if (error) {
      console.error('Error creating page:', error);
      throw error;
    }
    return data as Page;
  }

  static async updatePage(id: string, updates: Partial<Page>) {
    const { data, error } = await supabase
      .from('pages')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating page:', error);
      throw error;
    }
    return data as Page;
  }

  static async deletePage(id: string) {
    const { error } = await supabase
      .from('pages')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting page:', error);
      throw error;
    }
  }

  // Blog Posts
  static async getBlogPosts() {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching blog posts:', error);
      return [];
    }
    return data as BlogPost[];
  }

  static async getPublishedBlogPosts() {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('status', 'published')
      .order('published_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching published blog posts:', error);
      return [];
    }
    return data as BlogPost[];
  }

  static async getBlogPost(slug: string) {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();
    
    if (error) {
      console.warn(`Blog post '${slug}' not found:`, error);
      return null;
    }
    return data as BlogPost;
  }

  static async createBlogPost(post: Partial<BlogPost>) {
    const { data, error } = await supabase
      .from('blog_posts')
      .insert(post)
      .select()
      .single();
    
    if (error) {
      console.error('Error creating blog post:', error);
      throw error;
    }
    return data as BlogPost;
  }

  static async updateBlogPost(id: string, updates: Partial<BlogPost>) {
    const { data, error } = await supabase
      .from('blog_posts')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating blog post:', error);
      throw error;
    }
    return data as BlogPost;
  }

  static async deleteBlogPost(id: string) {
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting blog post:', error);
      throw error;
    }
  }

  // Media Files
  static async getMediaFiles() {
    const { data, error } = await supabase
      .from('media_files')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching media files:', error);
      return [];
    }
    return data as MediaFile[];
  }

  static async uploadMediaFile(file: File, folder: string = 'uploads') {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${folder}/${fileName}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('media')
        .upload(filePath, file);

      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw new Error(`Failed to upload file: ${uploadError.message}`);
      }

      const { data: { publicUrl } } = supabase.storage
        .from('media')
        .getPublicUrl(filePath);

      const mediaFile = {
        filename: fileName,
        original_name: file.name,
        file_type: file.type.split('/')[0],
        file_size: file.size,
        mime_type: file.type,
        url: publicUrl,
        folder
      };

      const { data, error } = await supabase
        .from('media_files')
        .insert(mediaFile)
        .select()
        .single();

      if (error) {
        console.error('Error saving media file record:', error);
        throw error;
      }
      return data as MediaFile;
    } catch (error) {
      console.error('Error in uploadMediaFile:', error);
      throw error;
    }
  }

  static async deleteMediaFile(id: string) {
    try {
      const { data: mediaFile } = await supabase
        .from('media_files')
        .select('*')
        .eq('id', id)
        .single();

      if (mediaFile) {
        const filePath = mediaFile.url.split('/').slice(-2).join('/');
        await supabase.storage.from('media').remove([filePath]);
      }

      const { error } = await supabase
        .from('media_files')
        .delete()
        .eq('id', id);
      
      if (error) {
        console.error('Error deleting media file:', error);
        throw error;
      }
    } catch (error) {
      console.error('Error in deleteMediaFile:', error);
      throw error;
    }
  }

  // Content Sections
  static async getContentSections() {
    const { data, error } = await supabase
      .from('content_sections')
      .select('*')
      .eq('is_active', true)
      .order('sort_order');
    
    if (error) {
      console.error('Error fetching content sections:', error);
      return [];
    }
    return data as ContentSection[];
  }

  static async getContentSection(key: string) {
    const { data, error } = await supabase
      .from('content_sections')
      .select('*')
      .eq('section_key', key)
      .maybeSingle();
    
    if (error) {
      console.warn(`Content section '${key}' not found:`, error);
      return null;
    }
    
    return data as ContentSection | null;
  }

  static async updateContentSection(key: string, content: string) {
    const { data, error } = await supabase
      .from('content_sections')
      .upsert({ 
        section_key: key,
        section_name: key.replace('_', ' ').toUpperCase(),
        content_type: 'text',
        content, 
        is_active: true,
        sort_order: 0,
        updated_at: new Date().toISOString() 
      }, {
        onConflict: 'section_key'
      })
      .select()
      .single();
    
    if (error) {
      console.error('Error updating content section:', error);
      throw error;
    }
    return data as ContentSection;
  }

  // Site Settings
  static async getSiteSettings() {
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .order('category', { ascending: true });
    
    if (error) {
      console.error('Error fetching site settings:', error);
      return [];
    }
    return data as SiteSetting[];
  }

  static async getSiteSetting(key: string) {
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .eq('setting_key', key)
      .maybeSingle();
    
    if (error) {
      console.warn(`Site setting '${key}' not found:`, error);
      return null;
    }
    
    return data as SiteSetting | null;
  }

  static async updateSiteSetting(key: string, value: string) {
    const { data, error } = await supabase
      .from('site_settings')
      .upsert({ 
        setting_key: key,
        setting_value: value,
        setting_type: 'text',
        category: 'general',
        is_public: true,
        updated_at: new Date().toISOString() 
      }, {
        onConflict: 'setting_key'
      })
      .select()
      .single();
    
    if (error) {
      console.error('Error updating site setting:', error);
      throw error;
    }
    return data as SiteSetting;
  }

  // Chatbot Responses
  static async getChatbotResponses() {
    const { data, error } = await supabase
      .from('chatbot_responses')
      .select('*')
      .eq('is_active', true)
      .order('priority');
    
    if (error) {
      console.error('Error fetching chatbot responses:', error);
      return [];
    }
    return data as ChatbotResponse[];
  }

  static async createChatbotResponse(response: Partial<ChatbotResponse>) {
    const { data, error } = await supabase
      .from('chatbot_responses')
      .insert(response)
      .select()
      .single();
    
    if (error) {
      console.error('Error creating chatbot response:', error);
      throw error;
    }
    return data as ChatbotResponse;
  }

  static async updateChatbotResponse(id: string, updates: Partial<ChatbotResponse>) {
    const { data, error } = await supabase
      .from('chatbot_responses')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating chatbot response:', error);
      throw error;
    }
    return data as ChatbotResponse;
  }

  static async deleteChatbotResponse(id: string) {
    const { error } = await supabase
      .from('chatbot_responses')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting chatbot response:', error);
      throw error;
    }
  }

  // Contact Messages
  static async getContactMessages() {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching contact messages:', error);
      return [];
    }
    return data as ContactMessage[];
  }

  static async createContactMessage(message: Partial<ContactMessage>) {
    const { data, error } = await supabase
      .from('contact_messages')
      .insert(message)
      .select()
      .single();
    
    if (error) {
      console.error('Error creating contact message:', error);
      throw error;
    }
    return data as ContactMessage;
  }

  static async updateContactMessageStatus(id: string, status: ContactMessage['status']) {
    const { data, error } = await supabase
      .from('contact_messages')
      .update({ status })
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating contact message status:', error);
      throw error;
    }
    return data as ContactMessage;
  }

  // Analytics
  static async recordAnalytics(metricName: string, value: number, additionalData?: any) {
    const { error } = await supabase
      .from('analytics_data')
      .insert({
        metric_name: metricName,
        metric_value: value,
        metric_date: new Date().toISOString().split('T')[0],
        additional_data: additionalData || {}
      });
    
    if (error) {
      console.error('Error recording analytics:', error);
    }
  }

  static async getAnalytics(metricName: string, days: number = 30) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const { data, error } = await supabase
      .from('analytics_data')
      .select('*')
      .eq('metric_name', metricName)
      .gte('metric_date', startDate.toISOString().split('T')[0])
      .order('metric_date', { ascending: true });
    
    if (error) {
      console.error('Error fetching analytics:', error);
      return [];
    }
    return data;
  }
}