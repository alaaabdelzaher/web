/*
  # Insert Default Content Sections

  1. Default Content
    - Insert default content sections that the application expects
    - Set up initial site settings
    - Create default pages structure

  2. Content Sections
    - Hero section content
    - About section content
    - Services content
    - Contact information
*/

-- Insert default content sections
INSERT INTO content_sections (section_key, section_name, content_type, content, is_active, sort_order) VALUES
('hero_title', 'عنوان الصفحة الرئيسية', 'text', 'خبراء موثوقون في الحماية المدنية والطب الشرعي', true, 1),
('hero_subtitle', 'العنوان الفرعي للصفحة الرئيسية', 'text', 'أكثر من 20 عاماً من الخبرة في تقديم الاستشارات المتخصصة', true, 2),
('about_title', 'عنوان قسم من نحن', 'text', 'من نحن', true, 3),
('about_content', 'محتوى قسم من نحن', 'html', 'نحن شركة استشارية متخصصة في مجال الطب الشرعي والحماية المدنية، نقدم خدماتنا للمؤسسات الحكومية والخاصة بأعلى معايير الجودة والمهنية.', true, 4),
('services_title', 'عنوان قسم الخدمات', 'text', 'خدماتنا المتخصصة', true, 5),
('contact_title', 'عنوان قسم الاتصال', 'text', 'تواصل معنا', true, 6),
('footer_about', 'نبذة في الفوتر', 'text', 'شركة رائدة في مجال الاستشارات الطبية الشرعية والحماية المدنية', true, 7)
ON CONFLICT (section_key) DO NOTHING;

-- Insert default site settings
INSERT INTO site_settings (setting_key, setting_value, setting_type, category, description, is_public) VALUES
('site_name', 'شركة الخبراء للاستشارات', 'text', 'general', 'اسم الموقع', true),
('site_description', 'شركة متخصصة في الطب الشرعي والحماية المدنية', 'text', 'general', 'وصف الموقع', true),
('contact_email', 'info@experts-consulting.com', 'text', 'contact', 'البريد الإلكتروني', true),
('contact_phone', '+966 11 123 4567', 'text', 'contact', 'رقم الهاتف', true),
('contact_address', 'الرياض، المملكة العربية السعودية', 'text', 'contact', 'العنوان', true),
('site_logo', '', 'text', 'branding', 'شعار الموقع', true),
('site_color_primary', '#1e40af', 'text', 'branding', 'اللون الأساسي', false),
('site_color_secondary', '#f97316', 'text', 'branding', 'اللون الثانوي', false),
('site_color_accent', '#059669', 'text', 'branding', 'لون التمييز', false),
('google_analytics_id', '', 'text', 'analytics', 'معرف Google Analytics', false),
('facebook_pixel_id', '', 'text', 'analytics', 'معرف Facebook Pixel', false),
('chatbot_welcome_message', 'مرحباً! كيف يمكنني مساعدتك اليوم؟', 'text', 'chatbot', 'رسالة الترحيب للشات بوت', false)
ON CONFLICT (setting_key) DO NOTHING;

-- Insert default pages
INSERT INTO pages (name, slug, title, meta_description, content, status, template) VALUES
('الصفحة الرئيسية', 'home', 'الصفحة الرئيسية - شركة الخبراء للاستشارات', 'شركة متخصصة في الطب الشرعي والحماية المدنية مع أكثر من 20 عاماً من الخبرة', '{}', 'published', 'home'),
('من نحن', 'about', 'من نحن - شركة الخبراء للاستشارات', 'تعرف على فريقنا وخبرتنا في مجال الطب الشرعي والحماية المدنية', '{}', 'published', 'about'),
('خدماتنا', 'services', 'خدماتنا - شركة الخبراء للاستشارات', 'خدمات متخصصة في الطب الشرعي والحماية المدنية وتحليل المتفجرات', '{}', 'published', 'services'),
('تواصل معنا', 'contact', 'تواصل معنا - شركة الخبراء للاستشارات', 'تواصل مع فريق الخبراء للحصول على استشارة متخصصة', '{}', 'published', 'contact')
ON CONFLICT (slug) DO NOTHING;

-- Insert default chatbot responses
INSERT INTO chatbot_responses (trigger_keywords, response_text, response_type, is_active, priority) VALUES
(ARRAY['مرحبا', 'السلام عليكم', 'أهلا'], 'مرحباً بك! أنا هنا لمساعدتك. كيف يمكنني خدمتك؟', 'text', true, 1),
(ARRAY['خدمات', 'ماذا تقدمون', 'الخدمات'], 'نحن نقدم خدمات متخصصة في: الطب الشرعي، الحماية المدنية، وتحليل المتفجرات. هل تريد معرفة المزيد عن خدمة معينة؟', 'text', true, 2),
(ARRAY['اتصال', 'تواصل', 'رقم الهاتف'], 'يمكنك التواصل معنا على الرقم: +966 11 123 4567 أو عبر البريد الإلكتروني: info@experts-consulting.com', 'text', true, 3),
(ARRAY['شكرا', 'شكراً', 'ممتاز'], 'العفو! سعداء بخدمتك. إذا كان لديك أي استفسار آخر، لا تتردد في السؤال.', 'text', true, 4)
ON CONFLICT DO NOTHING;