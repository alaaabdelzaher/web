/*
  # Fix RLS Policies for Anonymous Access

  1. Storage Policies
    - Allow anonymous users to upload files to media bucket
    - Allow public read access to media files

  2. Database Policies
    - Allow anonymous users to insert blog posts, media files, and site settings
    - Maintain security while allowing dashboard functionality

  3. Default Data
    - Insert default site settings that the application expects
    - Create initial content sections
*/

-- Fix storage policies for media bucket
DROP POLICY IF EXISTS "Allow anon upload" ON storage.objects;
DROP POLICY IF EXISTS "Allow public read" ON storage.objects;

CREATE POLICY "Allow anon upload" ON storage.objects
  FOR INSERT TO anon, authenticated
  WITH CHECK (bucket_id = 'media');

CREATE POLICY "Allow public read" ON storage.objects
  FOR SELECT TO anon, authenticated
  USING (bucket_id = 'media');

-- Fix RLS policies for blog_posts
DROP POLICY IF EXISTS "Allow anon insert blog posts" ON blog_posts;
CREATE POLICY "Allow anon insert blog posts" ON blog_posts
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

-- Fix RLS policies for media_files
DROP POLICY IF EXISTS "Allow anon insert media files" ON media_files;
CREATE POLICY "Allow anon insert media files" ON media_files
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

-- Fix RLS policies for site_settings
DROP POLICY IF EXISTS "Allow anon insert site settings" ON site_settings;
CREATE POLICY "Allow anon insert site settings" ON site_settings
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow anon update site settings" ON site_settings;
CREATE POLICY "Allow anon update site settings" ON site_settings
  FOR UPDATE TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- Insert default site settings
INSERT INTO site_settings (setting_key, setting_value, setting_type, category, description, is_public) VALUES
  ('site_name', 'شركة التحليل الجنائي', 'text', 'general', 'اسم الموقع', true),
  ('site_description', 'شركة متخصصة في التحليل الجنائي والحماية المدنية', 'text', 'general', 'وصف الموقع', true),
  ('contact_email', 'info@forensics.com', 'text', 'contact', 'البريد الإلكتروني للتواصل', true),
  ('contact_phone', '+966 12 345 6789', 'text', 'contact', 'رقم الهاتف للتواصل', true),
  ('company_address', 'الرياض، المملكة العربية السعودية', 'text', 'contact', 'عنوان الشركة', true),
  ('logo_url', '', 'text', 'branding', 'رابط شعار الشركة', true),
  ('primary_color', '#1e40af', 'text', 'branding', 'اللون الأساسي', false),
  ('secondary_color', '#64748b', 'text', 'branding', 'اللون الثانوي', false)
ON CONFLICT (setting_key) DO UPDATE SET
  setting_value = EXCLUDED.setting_value,
  updated_at = now();

-- Insert default content sections
INSERT INTO content_sections (section_key, section_name, content_type, content, is_active, sort_order) VALUES
  ('hero_title', 'عنوان الصفحة الرئيسية', 'text', 'شركة التحليل الجنائي المتقدم', true, 1),
  ('hero_subtitle', 'العنوان الفرعي', 'text', 'نقدم خدمات التحليل الجنائي والحماية المدنية بأحدث التقنيات', true, 2),
  ('about_title', 'عنوان قسم من نحن', 'text', 'من نحن', true, 3),
  ('about_content', 'محتوى قسم من نحن', 'text', 'نحن شركة رائدة في مجال التحليل الجنائي والحماية المدنية', true, 4),
  ('services_title', 'عنوان قسم الخدمات', 'text', 'خدماتنا', true, 5),
  ('contact_title', 'عنوان قسم التواصل', 'text', 'تواصل معنا', true, 6)
ON CONFLICT (section_key) DO UPDATE SET
  content = EXCLUDED.content,
  updated_at = now();