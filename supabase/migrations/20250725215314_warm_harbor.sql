/*
  # إضافة جدول محتوى صفحات الخدمات

  1. جدول جديد
    - `service_pages_content`
      - `id` (uuid, primary key)
      - `service_type` (text) - نوع الخدمة (civil-protection, forensics, explosives-analysis)
      - `section_key` (text) - مفتاح القسم
      - `section_title_ar` (text) - عنوان القسم بالعربية
      - `section_title_en` (text) - عنوان القسم بالإنجليزية
      - `content_ar` (text) - المحتوى بالعربية
      - `content_en` (text) - المحتوى بالإنجليزية
      - `section_order` (integer) - ترتيب القسم
      - `is_active` (boolean) - حالة التفعيل
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. الأمان
    - تفعيل RLS
    - إضافة سياسات للقراءة والكتابة
*/

CREATE TABLE IF NOT EXISTS service_pages_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service_type text NOT NULL,
  section_key text NOT NULL,
  section_title_ar text NOT NULL,
  section_title_en text NOT NULL,
  content_ar text NOT NULL DEFAULT '',
  content_en text NOT NULL DEFAULT '',
  section_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(service_type, section_key)
);

ALTER TABLE service_pages_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations on service pages content"
  ON service_pages_content
  FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);

-- إدراج بيانات افتراضية لصفحات الخدمات
INSERT INTO service_pages_content (service_type, section_key, section_title_ar, section_title_en, content_ar, content_en, section_order) VALUES
-- الحماية المدنية
('civil-protection', 'hero', 'القسم الرئيسي', 'Hero Section', 'خدمات شاملة للحماية المدنية تشمل فحص المباني وتحليل الحرائق والتخطيط للطوارئ لضمان السلامة والامتثال.', 'Comprehensive civil protection services including building inspections, fire analysis, and emergency planning to ensure safety and compliance.', 1),
('civil-protection', 'services', 'الخدمات', 'Services', 'نقدم مجموعة واسعة من خدمات الحماية المدنية المتخصصة.', 'We provide a wide range of specialized civil protection services.', 2),
('civil-protection', 'process', 'العملية', 'Process', 'عمليتنا المنهجية لضمان أفضل النتائج.', 'Our systematic process to ensure the best results.', 3),

-- الطب الشرعي
('forensics', 'hero', 'القسم الرئيسي', 'Hero Section', 'خدمات تحليل جنائي مهنية تشمل تحقيق مسرح الجريمة وفحص الأدلة والشهادة الخبيرة للإجراءات القانونية.', 'Professional forensic analysis services including crime scene investigation, evidence examination, and expert testimony for legal proceedings.', 1),
('forensics', 'services', 'الخدمات', 'Services', 'تحليل شامل للأدلة الجنائية باستخدام أحدث التقنيات.', 'Comprehensive forensic evidence analysis using the latest techniques.', 2),
('forensics', 'expertise', 'الخبرة', 'Expertise', 'خبرتنا الواسعة في مجال الطب الشرعي.', 'Our extensive expertise in forensic science.', 3),

-- تحليل المتفجرات
('explosives-analysis', 'hero', 'القسم الرئيسي', 'Hero Section', 'خدمات متخصصة في تحليل المتفجرات تشمل تحديد المكونات والتقارير الفنية والاستشارة الخبيرة للأغراض القانونية والتحقيقية.', 'Specialized explosives analysis services including component identification, technical reporting, and expert consultation for legal and investigative purposes.', 1),
('explosives-analysis', 'services', 'الخدمات', 'Services', 'تحليل متقدم للمتفجرات والمواد الخطرة.', 'Advanced analysis of explosives and hazardous materials.', 2),
('explosives-analysis', 'certifications', 'الشهادات', 'Certifications', 'شهاداتنا المهنية في مجال تحليل المتفجرات.', 'Our professional certifications in explosives analysis.', 3);