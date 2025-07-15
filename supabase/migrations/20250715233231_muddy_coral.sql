/*
  # إنشاء قاعدة بيانات إدارة الموقع الشاملة

  1. الجداول الجديدة
    - `pages` - إدارة صفحات الموقع
    - `blog_posts` - مقالات المدونة
    - `media_files` - ملفات الوسائط
    - `content_sections` - أقسام المحتوى
    - `seo_settings` - إعدادات تحسين محركات البحث
    - `site_settings` - إعدادات الموقع العامة
    - `chatbot_responses` - ردود الشات بوت
    - `contact_messages` - رسائل الاتصال
    - `analytics_data` - بيانات التحليلات
    - `user_sessions` - جلسات المستخدمين

  2. الأمان
    - تفعيل RLS على جميع الجداول
    - إضافة سياسات للمستخدمين المصرح لهم
    - حماية البيانات الحساسة

  3. الفهارس والعلاقات
    - فهارس للبحث السريع
    - علاقات بين الجداول
    - قيود التكامل المرجعي
*/

-- إنشاء جدول صفحات الموقع
CREATE TABLE IF NOT EXISTS pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  meta_description text,
  content jsonb DEFAULT '{}',
  status text DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  template text DEFAULT 'default',
  featured_image text,
  seo_keywords text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id),
  updated_by uuid REFERENCES auth.users(id)
);

-- إنشاء جدول مقالات المدونة
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text,
  content text NOT NULL,
  featured_image text,
  author_name text NOT NULL,
  category text NOT NULL,
  tags text[] DEFAULT '{}',
  status text DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  read_time integer DEFAULT 5,
  views integer DEFAULT 0,
  meta_description text,
  seo_keywords text[],
  published_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id),
  updated_by uuid REFERENCES auth.users(id)
);

-- إنشاء جدول ملفات الوسائط
CREATE TABLE IF NOT EXISTS media_files (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  filename text NOT NULL,
  original_name text NOT NULL,
  file_type text NOT NULL,
  file_size integer NOT NULL,
  mime_type text NOT NULL,
  url text NOT NULL,
  alt_text text,
  caption text,
  folder text DEFAULT 'uploads',
  is_optimized boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  uploaded_by uuid REFERENCES auth.users(id)
);

-- إنشاء جدول أقسام المحتوى
CREATE TABLE IF NOT EXISTS content_sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section_key text UNIQUE NOT NULL,
  section_name text NOT NULL,
  content_type text DEFAULT 'text' CHECK (content_type IN ('text', 'html', 'json')),
  content text NOT NULL,
  page_id uuid REFERENCES pages(id),
  is_active boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  updated_by uuid REFERENCES auth.users(id)
);

-- إنشاء جدول إعدادات تحسين محركات البحث
CREATE TABLE IF NOT EXISTS seo_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_type text NOT NULL,
  page_id uuid,
  meta_title text,
  meta_description text,
  keywords text[],
  og_title text,
  og_description text,
  og_image text,
  twitter_title text,
  twitter_description text,
  twitter_image text,
  canonical_url text,
  robots_meta text DEFAULT 'index,follow',
  schema_markup jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  updated_by uuid REFERENCES auth.users(id)
);

-- إنشاء جدول إعدادات الموقع العامة
CREATE TABLE IF NOT EXISTS site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  setting_key text UNIQUE NOT NULL,
  setting_value text NOT NULL,
  setting_type text DEFAULT 'text' CHECK (setting_type IN ('text', 'number', 'boolean', 'json')),
  category text DEFAULT 'general',
  description text,
  is_public boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  updated_by uuid REFERENCES auth.users(id)
);

-- إنشاء جدول ردود الشات بوت
CREATE TABLE IF NOT EXISTS chatbot_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trigger_keywords text[] NOT NULL,
  response_text text NOT NULL,
  response_type text DEFAULT 'text' CHECK (response_type IN ('text', 'quick_reply', 'card')),
  is_active boolean DEFAULT true,
  priority integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  updated_by uuid REFERENCES auth.users(id)
);

-- إنشاء جدول رسائل الاتصال
CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  subject text NOT NULL,
  message text NOT NULL,
  status text DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived')),
  ip_address inet,
  user_agent text,
  created_at timestamptz DEFAULT now(),
  replied_at timestamptz,
  replied_by uuid REFERENCES auth.users(id)
);

-- إنشاء جدول بيانات التحليلات
CREATE TABLE IF NOT EXISTS analytics_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  metric_name text NOT NULL,
  metric_value numeric NOT NULL,
  metric_date date NOT NULL,
  page_path text,
  source text,
  additional_data jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- إنشاء جدول جلسات المستخدمين
CREATE TABLE IF NOT EXISTS user_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text UNIQUE NOT NULL,
  user_id uuid REFERENCES auth.users(id),
  ip_address inet,
  user_agent text,
  page_views integer DEFAULT 1,
  started_at timestamptz DEFAULT now(),
  last_activity timestamptz DEFAULT now(),
  ended_at timestamptz
);

-- إنشاء فهارس للأداء
CREATE INDEX IF NOT EXISTS idx_pages_slug ON pages(slug);
CREATE INDEX IF NOT EXISTS idx_pages_status ON pages(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at);
CREATE INDEX IF NOT EXISTS idx_media_files_type ON media_files(file_type);
CREATE INDEX IF NOT EXISTS idx_content_sections_key ON content_sections(section_key);
CREATE INDEX IF NOT EXISTS idx_site_settings_key ON site_settings(setting_key);
CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_analytics_date ON analytics_data(metric_date);
CREATE INDEX IF NOT EXISTS idx_user_sessions_user_id ON user_sessions(user_id);

-- تفعيل RLS على جميع الجداول
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE chatbot_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;

-- سياسات الأمان للمستخدمين المصرح لهم
CREATE POLICY "Authenticated users can manage pages"
  ON pages
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage blog posts"
  ON blog_posts
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage media files"
  ON media_files
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage content sections"
  ON content_sections
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage SEO settings"
  ON seo_settings
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage site settings"
  ON site_settings
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage chatbot responses"
  ON chatbot_responses
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage contact messages"
  ON contact_messages
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view analytics data"
  ON analytics_data
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Anyone can insert analytics data"
  ON analytics_data
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage user sessions"
  ON user_sessions
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- سياسات للقراءة العامة للمحتوى المنشور
CREATE POLICY "Public can read published pages"
  ON pages
  FOR SELECT
  TO anon
  USING (status = 'published');

CREATE POLICY "Public can read published blog posts"
  ON blog_posts
  FOR SELECT
  TO anon
  USING (status = 'published');

CREATE POLICY "Public can read active content sections"
  ON content_sections
  FOR SELECT
  TO anon
  USING (is_active = true);

CREATE POLICY "Public can read public site settings"
  ON site_settings
  FOR SELECT
  TO anon
  USING (is_public = true);

CREATE POLICY "Public can read active chatbot responses"
  ON chatbot_responses
  FOR SELECT
  TO anon
  USING (is_active = true);

CREATE POLICY "Anyone can insert contact messages"
  ON contact_messages
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- إدراج البيانات الأولية
INSERT INTO site_settings (setting_key, setting_value, setting_type, category, description, is_public) VALUES
('site_name', 'ForensicPro', 'text', 'general', 'اسم الموقع', true),
('site_description', 'شركة استشارات متخصصة في الطب الشرعي والحماية المدنية', 'text', 'general', 'وصف الموقع', true),
('contact_email', 'info@forensicpro.com', 'text', 'contact', 'البريد الإلكتروني للتواصل', true),
('contact_phone', '+1 (555) 123-4567', 'text', 'contact', 'رقم الهاتف', true),
('contact_address', '123 Professional Drive, Suite 400', 'text', 'contact', 'العنوان', true),
('business_hours', 'الاثنين - الجمعة: 8:00 ص - 6:00 م', 'text', 'contact', 'ساعات العمل', true),
('emergency_phone', '+1 (555) 999-HELP', 'text', 'contact', 'رقم الطوارئ', true),
('google_analytics_id', '', 'text', 'analytics', 'معرف Google Analytics', false),
('facebook_pixel_id', '', 'text', 'analytics', 'معرف Facebook Pixel', false),
('chatbot_welcome_message', 'مرحباً! أنا هنا لمساعدتك في الحصول على معلومات حول خدماتنا في الطب الشرعي والحماية المدنية. كيف يمكنني مساعدتك اليوم؟', 'text', 'chatbot', 'رسالة ترحيب الشات بوت', false);

-- إدراج ردود الشات بوت الأولية
INSERT INTO chatbot_responses (trigger_keywords, response_text, response_type, priority) VALUES
(ARRAY['الخدمات', 'خدمات', 'ماذا تقدمون'], 'نقدم خدمات الحماية المدنية، الطب الشرعي، وتحليل المتفجرات. يمكنك زيارة صفحة الخدمات لمعرفة المزيد.', 'text', 1),
(ARRAY['الأسعار', 'التكلفة', 'كم السعر'], 'يرجى الاتصال بنا للحصول على عرض أسعار مخصص حسب احتياجاتك المحددة.', 'text', 2),
(ARRAY['المواعيد', 'حجز موعد', 'استشارة'], 'يمكنك حجز موعد من خلال صفحة الاتصال أو الاتصال بنا مباشرة على +1 (555) 123-4567', 'text', 3),
(ARRAY['الخبرة', 'التجربة', 'كم سنة'], 'لدينا أكثر من 20 عامًا من الخبرة في مجال الطب الشرعي والحماية المدنية مع شهادات مهنية معتمدة.', 'text', 4),
(ARRAY['الطوارئ', 'عاجل', 'emergency'], 'للحالات الطارئة، يرجى الاتصال بخط الطوارئ على +1 (555) 999-HELP متاح 24/7', 'text', 5);

-- إدراج أقسام المحتوى الأولية
INSERT INTO content_sections (section_key, section_name, content) VALUES
('hero_title', 'العنوان الرئيسي', 'ForensicPro - خبرة موثوقة في الحماية المدنية والطب الشرعي'),
('hero_subtitle', 'العنوان الفرعي', 'مع أكثر من 20 عامًا من الخبرة، نقدم تحليلاً شاملاً للطب الشرعي وخدمات الحماية المدنية والاستشارات الخبيرة للحالات القانونية وحالات الطوارئ.'),
('company_description', 'وصف الشركة', 'شركة استشارات رائدة في مجال الطب الشرعي والحماية المدنية مع فريق من الخبراء المعتمدين'),
('mission_statement', 'بيان المهمة', 'تقديم تحليل دقيق وموثوق وعلمي للطب الشرعي وخدمات الحماية المدنية التي تخدم العدالة وتحمي المجتمعات'),
('certifications_text', 'نص الشهادات', 'خبرة معترف بها ومؤهلات صناعية معتمدة من أفضل المؤسسات العالمية');