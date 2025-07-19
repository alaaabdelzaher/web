/*
  # إصلاح شامل لقاعدة البيانات ولوحة التحكم

  1. إنشاء جداول المستخدمين
  2. إصلاح سياسات RLS
  3. إدراج البيانات الافتراضية
  4. إنشاء bucket التخزين
*/

-- إنشاء جدول المستخدمين إذا لم يكن موجوداً
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  password_hash text,
  full_name text,
  role text DEFAULT 'viewer' CHECK (role IN ('admin', 'editor', 'viewer')),
  status text DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  last_login timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- تمكين RLS على جميع الجداول
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE chatbot_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- حذف جميع السياسات الموجودة
DROP POLICY IF EXISTS "Full access for authenticated users" ON users;
DROP POLICY IF EXISTS "Full access for authenticated users" ON blog_posts;
DROP POLICY IF EXISTS "Public read published posts" ON blog_posts;
DROP POLICY IF EXISTS "Full access for authenticated users" ON pages;
DROP POLICY IF EXISTS "Public read published pages" ON pages;
DROP POLICY IF EXISTS "Full access for authenticated users" ON site_settings;
DROP POLICY IF EXISTS "Public read public settings" ON site_settings;
DROP POLICY IF EXISTS "Full access for authenticated users" ON media_files;
DROP POLICY IF EXISTS "Public read media files" ON media_files;
DROP POLICY IF EXISTS "Full access for authenticated users" ON content_sections;
DROP POLICY IF EXISTS "Public read active sections" ON content_sections;
DROP POLICY IF EXISTS "Full access for authenticated users" ON chatbot_responses;
DROP POLICY IF EXISTS "Public read active responses" ON chatbot_responses;
DROP POLICY IF EXISTS "Full access for authenticated users" ON contact_messages;
DROP POLICY IF EXISTS "Anyone can insert messages" ON contact_messages;

-- إنشاء سياسات جديدة مبسطة
-- سياسات المستخدمين
CREATE POLICY "Allow all operations" ON users FOR ALL USING (true) WITH CHECK (true);

-- سياسات المقالات
CREATE POLICY "Allow all operations" ON blog_posts FOR ALL USING (true) WITH CHECK (true);

-- سياسات الصفحات
CREATE POLICY "Allow all operations" ON pages FOR ALL USING (true) WITH CHECK (true);

-- سياسات الإعدادات
CREATE POLICY "Allow all operations" ON site_settings FOR ALL USING (true) WITH CHECK (true);

-- سياسات الملفات
CREATE POLICY "Allow all operations" ON media_files FOR ALL USING (true) WITH CHECK (true);

-- سياسات أقسام المحتوى
CREATE POLICY "Allow all operations" ON content_sections FOR ALL USING (true) WITH CHECK (true);

-- سياسات الشات بوت
CREATE POLICY "Allow all operations" ON chatbot_responses FOR ALL USING (true) WITH CHECK (true);

-- سياسات رسائل الاتصال
CREATE POLICY "Allow all operations" ON contact_messages FOR ALL USING (true) WITH CHECK (true);

-- إدراج مستخدم افتراضي
INSERT INTO users (email, full_name, role, status) 
VALUES ('alaaabdelzaher@gmail.com', 'علاء عبد الظاهر', 'admin', 'active')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  status = EXCLUDED.status;

-- إدراج إعدادات الموقع الافتراضية
INSERT INTO site_settings (setting_key, setting_value, setting_type, category, is_public) VALUES
('site_name', 'فورنسيك برو - ForensicPro', 'text', 'general', true),
('site_description', 'شركة استشارات متخصصة في الطب الشرعي والحماية المدنية مع أكثر من 20 عاماً من الخبرة', 'text', 'general', true),
('contact_email', 'info@forensicpro.com', 'text', 'contact', true),
('contact_phone', '+1 (555) 123-4567', 'text', 'contact', true),
('contact_address', '123 Professional Drive, Suite 400, Forensic City, FC 12345', 'text', 'contact', true),
('emergency_phone', '+1 (555) 999-HELP', 'text', 'contact', true),
('company_founded', '2004', 'text', 'about', true),
('years_experience', '20+', 'text', 'about', true),
('cases_analyzed', '1000+', 'text', 'about', true),
('court_acceptance_rate', '100%', 'text', 'about', true)
ON CONFLICT (setting_key) DO UPDATE SET
  setting_value = EXCLUDED.setting_value,
  updated_at = now();

-- إدراج أقسام المحتوى الافتراضية
INSERT INTO content_sections (section_key, section_name, content_type, content, is_active, sort_order) VALUES
('hero_title', 'عنوان الصفحة الرئيسية', 'text', 'فورنسيك برو - خبرة موثوقة في الحماية المدنية والطب الشرعي', true, 1),
('hero_subtitle', 'وصف الصفحة الرئيسية', 'text', 'مع أكثر من 20 عاماً من الخبرة، نقدم تحليلاً شرعياً شاملاً وخدمات الحماية المدنية والاستشارات الخبيرة للحالات القانونية والطوارئ.', true, 2),
('about_mission', 'مهمة الشركة', 'text', 'تقديم تحليل جنائي دقيق وموثوق وسليم علمياً وخدمات الحماية المدنية التي تخدم العدالة وتحمي المجتمعات.', true, 3),
('services_intro', 'مقدمة الخدمات', 'text', 'خدمات شاملة في الطب الشرعي والحماية المدنية مدعومة بأكثر من 20 عاماً من الخبرة والشهادات المهنية.', true, 4),
('contact_intro', 'مقدمة صفحة الاتصال', 'text', 'تواصل مع فريق الخبراء لدينا للاستشارة حول تحليل الطب الشرعي وخدمات الحماية المدنية.', true, 5)
ON CONFLICT (section_key) DO UPDATE SET
  content = EXCLUDED.content,
  updated_at = now();

-- إدراج ردود الشات بوت الافتراضية
INSERT INTO chatbot_responses (trigger_keywords, response_text, response_type, is_active, priority) VALUES
(ARRAY['مرحبا', 'السلام عليكم', 'hello', 'hi'], 'مرحباً بك في فورنسيك برو! كيف يمكنني مساعدتك اليوم؟', 'text', true, 1),
(ARRAY['خدمات', 'services'], 'نقدم خدمات شاملة في الطب الشرعي والحماية المدنية وتحليل المتفجرات. هل تريد معرفة المزيد عن خدمة معينة؟', 'text', true, 2),
(ARRAY['اتصال', 'contact', 'تواصل'], 'يمكنك التواصل معنا على الهاتف: +1 (555) 123-4567 أو البريد الإلكتروني: info@forensicpro.com', 'text', true, 3),
(ARRAY['طوارئ', 'emergency'], 'للحالات الطارئة، اتصل بخط الطوارئ على مدار 24/7: +1 (555) 999-HELP', 'text', true, 4),
(ARRAY['شكرا', 'thank you'], 'العفو! نحن هنا لمساعدتك في أي وقت. لا تتردد في التواصل معنا.', 'text', true, 5)
ON CONFLICT DO NOTHING;

-- إدراج صفحات افتراضية
INSERT INTO pages (name, slug, title, meta_description, content, status, template) VALUES
('الصفحة الرئيسية', 'home', 'فورنسيك برو - الصفحة الرئيسية', 'شركة استشارات متخصصة في الطب الشرعي والحماية المدنية', '{}', 'published', 'default'),
('من نحن', 'about', 'من نحن - فورنسيك برو', 'تعرف على تاريخ وخبرة فريق فورنسيك برو', '{}', 'published', 'default'),
('الخدمات', 'services', 'خدماتنا - فورنسيك برو', 'خدمات شاملة في الطب الشرعي والحماية المدنية', '{}', 'published', 'default'),
('اتصل بنا', 'contact', 'اتصل بنا - فورنسيك برو', 'تواصل مع فريق الخبراء لدينا', '{}', 'published', 'default')
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  meta_description = EXCLUDED.meta_description,
  updated_at = now();

-- إدراج مقالات نموذجية
INSERT INTO blog_posts (title, slug, excerpt, content, author_name, category, status, read_time) VALUES
('مقدمة في تحقيق الحرائق', 'fire-investigation-intro', 'دليل شامل لفهم الطرق العلمية والتقنيات المستخدمة في تحقيق الحرائق', 'تحقيق الحرائق علم معقد يتطلب خبرة واسعة ومعرفة عميقة بالطرق العلمية...', 'د. جون سميث', 'تحقيق الحرائق', 'published', 8),
('دور الطب الشرعي في العدالة الجنائية', 'forensic-science-role', 'استكشاف كيف تطور علم الطب الشرعي ودوره الحاسم في حل الجرائم', 'الطب الشرعي يلعب دوراً محورياً في النظام القضائي الحديث...', 'سارة جونسون', 'الطب الشرعي', 'published', 6),
('فحوصات سلامة المباني', 'building-safety-inspections', 'نظرة تفصيلية على فحوصات سلامة المباني والأنظمة والإجراءات', 'فحوصات سلامة المباني ضرورية لضمان الامتثال للمعايير...', 'مايكل تشين', 'الحماية المدنية', 'published', 5)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  content = EXCLUDED.content,
  updated_at = now();

-- إنشاء bucket التخزين
INSERT INTO storage.buckets (id, name, public) 
VALUES ('media', 'media', true)
ON CONFLICT (id) DO NOTHING;

-- سياسات التخزين
CREATE POLICY "Allow all operations on media bucket" ON storage.objects FOR ALL USING (bucket_id = 'media') WITH CHECK (bucket_id = 'media');