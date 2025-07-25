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

export interface ServicePageContent {
  id: string;
  service_type: 'civil-protection' | 'forensics' | 'explosives-analysis';
  section_key: string;
  section_title_ar: string;
  section_title_en: string;
  content_ar: string;
  content_en: string;
  section_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Certification {
  id: string;
  name: string;
  description?: string;
  organization: string;
  year_obtained?: number;
  is_featured: boolean;
  created_at: string;
}

// Database Service Functions
export class DatabaseService {
  // Users
  static async getUsers() {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as User[];
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  }

  static async createUser(user: Partial<User>) {
    try {
      const { data, error } = await supabase
        .from('users')
        .insert(user)
        .select()
        .single();
      
      if (error) throw error;
      return data as User;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  static async updateUser(id: string, updates: Partial<User>) {
    try {
      const { data, error } = await supabase
        .from('users')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data as User;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }

  static async deleteUser(id: string) {
    try {
      const { error } = await supabase
        .from('users')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }

  // Pages
  static async getPages() {
    try {
      const { data, error } = await supabase
        .from('pages')
        .select('*')
        .order('updated_at', { ascending: false });
      
      if (error) throw error;
      return data as Page[];
    } catch (error) {
      console.error('Error fetching pages:', error);
      return [];
    }
  }

  static async getPage(slug: string) {
    try {
      const { data, error } = await supabase
        .from('pages')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();
      
      if (error) throw error;
      return data as Page | null;
    } catch (error) {
      console.error('Error fetching page:', error);
      return null;
    }
  }

  static async createPage(page: Partial<Page>) {
    try {
      const { data, error } = await supabase
        .from('pages')
        .insert(page)
        .select()
        .single();
      
      if (error) throw error;
      return data as Page;
    } catch (error) {
      console.error('Error creating page:', error);
      throw error;
    }
  }

  static async updatePage(id: string, updates: Partial<Page>) {
    try {
      const { data, error } = await supabase
        .from('pages')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data as Page;
    } catch (error) {
      console.error('Error updating page:', error);
      throw error;
    }
  }

  static async deletePage(id: string) {
    try {
      const { error } = await supabase
        .from('pages')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    } catch (error) {
      console.error('Error deleting page:', error);
      throw error;
    }
  }

  // Blog Posts
  static async getBlogPosts() {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as BlogPost[];
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      return [];
    }
  }

  static async getPublishedBlogPosts() {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('status', 'published')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as BlogPost[];
    } catch (error) {
      console.error('Error fetching published blog posts:', error);
      return [];
    }
  }

  static async getBlogPost(slug: string) {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();
      
      if (error) throw error;
      return data as BlogPost | null;
    } catch (error) {
      console.error('Error fetching blog post:', error);
      return null;
    }
  }

  static async createBlogPost(post: Partial<BlogPost>) {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .insert(post)
        .select()
        .single();
      
      if (error) throw error;
      return data as BlogPost;
    } catch (error) {
      console.error('Error creating blog post:', error);
      throw error;
    }
  }

  static async updateBlogPost(id: string, updates: Partial<BlogPost>) {
    try {
      // التأكد من وجود البيانات المطلوبة
      if (!updates.title || !updates.content || !updates.author_name || !updates.category) {
        throw new Error('Missing required fields');
      }

      const { data, error } = await supabase
        .from('blog_posts')
        .update({ 
          title: updates.title,
          slug: updates.slug,
          excerpt: updates.excerpt || '',
          content: updates.content,
          featured_image: updates.featured_image || '',
          author_name: updates.author_name,
          category: updates.category,
          tags: updates.tags || [],
          status: updates.status || 'draft',
          read_time: updates.read_time || 5,
          meta_description: updates.meta_description || '',
          seo_keywords: updates.seo_keywords || [],
          published_at: updates.status === 'published' ? (updates.published_at || new Date().toISOString()) : null,
          updated_at: new Date().toISOString() 
        })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data as BlogPost;
    } catch (error) {
      console.error('Error updating blog post:', error);
      throw error;
    }
  }

  static async deleteBlogPost(id: string) {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    } catch (error) {
      console.error('Error deleting blog post:', error);
      throw error;
    }
  }

  // Media Files
  static async getMediaFiles() {
    try {
      const { data, error } = await supabase
        .from('media_files')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as MediaFile[];
    } catch (error) {
      console.error('Error fetching media files:', error);
      return [];
    }
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

      if (error) throw error;
      return data as MediaFile;
    } catch (error) {
      console.error('Error uploading media file:', error);
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
      
      if (error) throw error;
    } catch (error) {
      console.error('Error deleting media file:', error);
      throw error;
    }
  }

  // Content Sections
  static async getContentSections() {
    try {
      const { data, error } = await supabase
        .from('content_sections')
        .select('*')
        .eq('is_active', true)
        .order('sort_order');
      
      if (error) throw error;
      return data as ContentSection[];
    } catch (error) {
      console.error('Error fetching content sections:', error);
      return [];
    }
  }

  static async getContentSection(key: string) {
    try {
      const { data, error } = await supabase
        .from('content_sections')
        .select('*')
        .eq('section_key', key)
        .maybeSingle();
      
      if (error) throw error;
      return data as ContentSection | null;
    } catch (error) {
      console.error('Error fetching content section:', error);
      return null;
    }
  }

  static async updateContentSection(key: string, content: string) {
    try {
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
      
      if (error) throw error;
      return data as ContentSection;
    } catch (error) {
      console.error('Error updating content section:', error);
      throw error;
    }
  }

  // Create or update content section with multilingual support
  static async updateContentSectionMultilingual(key: string, content: any, language: 'ar' | 'en' = 'ar') {
    try {
      const existingSection = await this.getContentSection(key);
      let updatedContent = content;
      
      if (existingSection && existingSection.content_type === 'json') {
        try {
          const existingData = JSON.parse(existingSection.content);
          updatedContent = {
            ...existingData,
            ...content
          };
        } catch (e) {
          updatedContent = content;
        }
      } else if (typeof content === 'object') {
        updatedContent = JSON.stringify(content);
      }

      const { data, error } = await supabase
        .from('content_sections')
        .upsert({ 
          section_key: key,
          section_name: key.replace('_', ' ').toUpperCase(),
          content_type: typeof content === 'object' ? 'json' : 'text',
          content: typeof updatedContent === 'string' ? updatedContent : JSON.stringify(updatedContent), 
          is_active: true,
          sort_order: 0,
          updated_at: new Date().toISOString() 
        }, {
          onConflict: 'section_key'
        })
        .select()
        .single();
      
      if (error) throw error;
      return data as ContentSection;
    } catch (error) {
      console.error('Error updating multilingual content section:', error);
      throw error;
    }
  }

  // Site Settings
  static async getSiteSettings() {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .order('category', { ascending: true });
      
      if (error) throw error;
      return data as SiteSetting[];
    } catch (error) {
      console.error('Error fetching site settings:', error);
      return [];
    }
  }

  static async getSiteSetting(key: string) {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .eq('setting_key', key)
        .maybeSingle();
      
      if (error) throw error;
      return data as SiteSetting | null;
    } catch (error) {
      console.error('Error fetching site setting:', error);
      return null;
    }
  }

  static async updateSiteSetting(key: string, value: string) {
    try {
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
      
      if (error) throw error;
      return data as SiteSetting;
    } catch (error) {
      console.error('Error updating site setting:', error);
      throw error;
    }
  }

  // Chatbot Responses
  static async getChatbotResponses() {
    try {
      const { data, error } = await supabase
        .from('chatbot_responses')
        .select('*')
        .eq('is_active', true)
        .order('priority');
      
      if (error) throw error;
      return data as ChatbotResponse[];
    } catch (error) {
      console.error('Error fetching chatbot responses:', error);
      return [];
    }
  }

  static async createChatbotResponse(response: Partial<ChatbotResponse>) {
    try {
      const { data, error } = await supabase
        .from('chatbot_responses')
        .insert(response)
        .select()
        .single();
      
      if (error) throw error;
      return data as ChatbotResponse;
    } catch (error) {
      console.error('Error creating chatbot response:', error);
      throw error;
    }
  }

  static async updateChatbotResponse(id: string, updates: Partial<ChatbotResponse>) {
    try {
      const { data, error } = await supabase
        .from('chatbot_responses')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data as ChatbotResponse;
    } catch (error) {
      console.error('Error updating chatbot response:', error);
      throw error;
    }
  }

  static async deleteChatbotResponse(id: string) {
    try {
      const { error } = await supabase
        .from('chatbot_responses')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    } catch (error) {
      console.error('Error deleting chatbot response:', error);
      throw error;
    }
  }

  // Contact Messages
  static async getContactMessages() {
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as ContactMessage[];
    } catch (error) {
      console.error('Error fetching contact messages:', error);
      return [];
    }
  }

  static async createContactMessage(message: Partial<ContactMessage>) {
    try {
      console.log('Creating contact message:', message);
      const { data, error } = await supabase
        .from('contact_messages')
        .insert(message)
        .select()
        .single();
      
      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      
      console.log('Message created successfully:', data);
      return data as ContactMessage;
    } catch (error) {
      console.error('Error creating contact message:', error);
      throw error;
    }
  }

  static async updateContactMessageStatus(id: string, status: ContactMessage['status']) {
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .update({ status })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data as ContactMessage;
    } catch (error) {
      console.error('Error updating contact message status:', error);
      throw error;
    }
  }

  // Stats
  static async getStats() {
    try {
      const { data, error } = await supabase
        .from('stats')
        .select('*')
        .order('stat_name');
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching stats:', error);
      return [];
    }
  }

  // Services
  static async getServices() {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('is_active', true)
        .order('created_at');
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching services:', error);
      // Return empty array if fetch fails to prevent app crash
      return [];
    }
  }

  static async getServiceById(id: string) {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('id', id)
        .maybeSingle();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching service by ID:', error);
      return null;
    }
  }

  // Services
  static async createService(service: Partial<any>) {
    try {
      const { data, error } = await supabase
        .from('services')
        .insert(service)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating service:', error);
      throw error;
    }
  }

  static async updateService(id: string, updates: Partial<any>) {
    try {
      // Only include fields that exist in the database schema
      const allowedFields = [
        'title', 'title_ar', 'title_en',
        'description', 'description_ar', 'description_en',
        'icon', 'category', 'features', 'is_active'
      ];
      
      const filteredUpdates = Object.keys(updates)
        .filter(key => allowedFields.includes(key))
        .reduce((obj, key) => {
          obj[key] = updates[key];
          return obj;
        }, {} as any);

      const { data, error } = await supabase
        .from('services')
        .update({ ...filteredUpdates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .maybeSingle();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating service:', error);
      throw error;
    }
  }

  static async deleteService(id: string) {
    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    } catch (error) {
      console.error('Error deleting service:', error);
      throw error;
    }
  }

  // Certifications
  static async createCertification(cert: Partial<Certification>) {
    try {
      // Only include fields that exist in the database schema
      const allowedFields = ['name', 'description', 'organization', 'year_obtained', 'is_featured'];
      
      const filteredCert = Object.keys(cert)
        .filter(key => allowedFields.includes(key))
        .reduce((obj, key) => {
          obj[key] = cert[key];
          return obj;
        }, {} as any);

      const { data, error } = await supabase
        .from('certifications')
        .insert(filteredCert)
        .select()
        .single();
      
      if (error) throw error;
      return data as Certification;
    } catch (error) {
      console.error('Error creating certification:', error);
      throw error;
    }
  }

  static async updateCertification(id: string, updates: Partial<Certification>) {
    try {
      // Only include fields that exist in the database schema
      const allowedFields = ['name', 'description', 'organization', 'year_obtained', 'is_featured'];
      
      const filteredUpdates = Object.keys(updates)
        .filter(key => allowedFields.includes(key))
        .reduce((obj, key) => {
          obj[key] = updates[key];
          return obj;
        }, {} as any);

      const { data, error } = await supabase
        .from('certifications')
        .update(filteredUpdates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data as Certification;
    } catch (error) {
      console.error('Error updating certification:', error);
      throw error;
    }
  }

  static async deleteCertification(id: string) {
    try {
      const { error } = await supabase
        .from('certifications')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    } catch (error) {
      console.error('Error deleting certification:', error);
      throw error;
    }
  }

  // Team Members
  static async createTeamMember(member: Partial<any>) {
    try {
      const { data, error } = await supabase
        .from('team_members')
        .insert(member)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating team member:', error);
      throw error;
    }
  }

  static async updateTeamMember(id: string, updates: Partial<any>) {
    try {
      const { data, error } = await supabase
        .from('team_members')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .maybeSingle();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating team member:', error);
      throw error;
    }
  }

  static async deleteTeamMember(id: string) {
    try {
      const { error } = await supabase
        .from('team_members')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    } catch (error) {
      console.error('Error deleting team member:', error);
      throw error;
    }
  }

  // Team Members
  static async getTeamMembers() {
    try {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .eq('is_active', true)
        .order('created_at');
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching team members:', error);
      return [];
    }
  }

  static async getTeamMemberById(id: string) {
    try {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching team member:', error);
      return null;
    }
  }

  // Testimonials
  static async getTestimonials() {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at');
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      return [];
    }
  }

  // Certifications
  static async getCertifications() {
    try {
      const { data, error } = await supabase
        .from('certifications')
        .select('*')
        .order('created_at');
      
      if (error) throw error;
      return (data || []) as Certification[];
    } catch (error) {
      console.error('Error fetching certifications:', error);
      return [];
    }
  }

  // Analytics
  static async recordAnalytics(metricName: string, value: number, additionalData?: any) {
    try {
      const { error } = await supabase
        .from('analytics_data')
        .insert({
          metric_name: metricName,
          metric_value: value,
          metric_date: new Date().toISOString().split('T')[0],
          additional_data: additionalData || {}
        });
      
      if (error) throw error;
    } catch (error) {
      console.error('Error recording analytics:', error);
    }
  }

  static async getAnalytics(metricName: string, days: number = 30) {
    try {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);

      const { data, error } = await supabase
        .from('analytics_data')
        .select('*')
        .eq('metric_name', metricName)
        .gte('metric_date', startDate.toISOString().split('T')[0])
        .order('metric_date', { ascending: true });
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching analytics:', error);
      return [];
    }
  }

  // Service Pages Content
  static async getServicePageContent(serviceType: string) {
    try {
      const { data, error } = await supabase
        .from('service_pages_content')
        .select('*')
        .eq('service_type', serviceType)
        .eq('is_active', true)
        .order('section_order');
      
      if (error) throw error;
      return data as ServicePageContent[];
    } catch (error) {
      console.error('Error fetching service page content:', error);
      return [];
    }
  }

  static async getAllServicePagesContent() {
    try {
      const { data, error } = await supabase
        .from('service_pages_content')
        .select('*')
        .order('service_type', { ascending: true })
        .order('section_order', { ascending: true });
      
      if (error) throw error;
      return data as ServicePageContent[];
    } catch (error) {
      console.error('Error fetching all service pages content:', error);
      return [];
    }
  }

  static async createServicePageContent(content: Partial<ServicePageContent>) {
    try {
      const { data, error } = await supabase
        .from('service_pages_content')
        .insert(content)
        .select()
        .single();
      
      if (error) throw error;
      return data as ServicePageContent;
    } catch (error) {
      console.error('Error creating service page content:', error);
      throw error;
    }
  }

  static async updateServicePageContent(id: string, updates: Partial<ServicePageContent>) {
    try {
      const { data, error } = await supabase
        .from('service_pages_content')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data as ServicePageContent;
    } catch (error) {
      console.error('Error updating service page content:', error);
      throw error;
    }
  }

  static async deleteServicePageContent(id: string) {
    try {
      const { error } = await supabase
        .from('service_pages_content')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    } catch (error) {
      console.error('Error deleting service page content:', error);
      throw error;
    }
  }
}