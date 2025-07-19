/*
  # إدراج البيانات الافتراضية للموقع

  1. إعدادات الموقع الأساسية
  2. أقسام المحتوى الافتراضية
  3. ردود الشات بوت الأساسية
  4. صفحات النظام الأساسية
*/

-- إدراج إعدادات الموقع الافتراضية
INSERT INTO site_settings (setting_key, setting_value, setting_type, category, description, is_public) VALUES
('site_name', 'فورنسيك برو - ForensicPro', 'text', 'general', 'اسم الموقع', true),
('site_description', 'شركة استشارات متخصصة في الطب الشرعي والحماية المدنية مع أكثر من 20 عاماً من الخبرة', 'text', 'general', 'وصف الموقع', true),
('contact_email', 'info@forensicpro.com', 'text', 'contact', 'البريد الإلكتروني للتواصل', true),
('contact_phone', '+1 (555) 123-4567', 'text', 'contact', 'رقم الهاتف', true),
('contact_address', '123 Professional Drive, Suite 400, Forensic City, FC 12345', 'text', 'contact', 'العنوان', true),
('emergency_phone', '+1 (555) 999-HELP', 'text', 'contact', 'رقم الطوارئ', true),
('business_hours', 'الاثنين - الجمعة: 8:00 ص - 6:00 م، السبت: 9:00 ص - 2:00 م، الأحد: مغلق', 'text', 'general', 'ساعات العمل', true),
('company_founded', '2004', 'text', 'about', 'سنة التأسيس', true),
('years_experience', '20+', 'text', 'about', 'سنوات الخبرة', true),
('cases_analyzed', '1000+', 'text', 'about', 'القضايا المحللة', true),
('court_acceptance_rate', '100%', 'text', 'about', 'معدل قبول المحكمة', true)
ON CONFLICT (setting_key) DO UPDATE SET
setting_value = EXCLUDED.setting_value,
updated_at = now();

-- إدراج أقسام المحتوى الافتراضية
INSERT INTO content_sections (section_key, section_name, content_type, content, is_active, sort_order) VALUES
('hero_title', 'عنوان الصفحة الرئيسية', 'text', 'فورنسيك برو - خبرة موثوقة في الحماية المدنية والطب الشرعي', true, 1),
('hero_subtitle', 'العنوان الفرعي للصفحة الرئيسية', 'text', 'مع أكثر من 20 عاماً من الخبرة، نقدم تحليلاً شرعياً شاملاً وخدمات الحماية المدنية والاستشارات الخبيرة للحالات القانونية والطوارئ.', true, 2),
('about_mission', 'مهمة الشركة', 'text', 'تقديم تحليل جنائي دقيق وموثوق وسليم علمياً وخدمات الحماية المدنية التي تخدم العدالة وتحمي المجتمعات.', true, 3),
('about_vision', 'رؤية الشركة', 'text', 'أن نكون الشركة الرائدة في مجال الاستشارات الجنائية والحماية المدنية على مستوى المنطقة.', true, 4),
('services_intro', 'مقدمة الخدمات', 'text', 'نقدم مجموعة شاملة من الخدمات المتخصصة في الطب الشرعي والحماية المدنية بأعلى معايير الجودة والدقة العلمية.', true, 5),
('contact_intro', 'مقدمة صفحة الاتصال', 'text', 'تواصل مع فريق الخبراء لدينا للحصول على استشارة حول تحليل الطب الشرعي وخدمات الحماية المدنية.', true, 6),
('footer_description', 'وصف الفوتر', 'text', 'خبرة موثوقة في الحماية المدنية والطب الشرعي مع أكثر من 20 عاماً من الخبرة.', true, 7)
ON CONFLICT (section_key) DO UPDATE SET
content = EXCLUDED.content,
updated_at = now();

-- إدراج ردود الشات بوت الافتراضية
INSERT INTO chatbot_responses (trigger_keywords, response_text, response_type, is_active, priority) VALUES
(ARRAY['مرحبا', 'السلام عليكم', 'hello', 'hi'], 'مرحباً بك في فورنسيك برو! كيف يمكنني مساعدتك اليوم؟', 'text', true, 1),
(ARRAY['خدمات', 'services', 'ماذا تقدمون'], 'نحن نقدم خدمات الطب الشرعي والحماية المدنية وتحليل المتفجرات. يمكنك زيارة صفحة الخدمات لمزيد من التفاصيل.', 'text', true, 2),
(ARRAY['اتصال', 'تواصل', 'contact', 'رقم'], 'يمكنك التواصل معنا على الرقم: +1 (555) 123-4567 أو البريد الإلكتروني: info@forensicpro.com', 'text', true, 3),
(ARRAY['طوارئ', 'emergency', 'عاجل'], 'للحالات الطارئة، يرجى الاتصال على الرقم: +1 (555) 999-HELP متاح 24/7', 'text', true, 4),
(ARRAY['أسعار', 'تكلفة', 'price', 'cost'], 'تختلف أسعار خدماتنا حسب نوع التحليل المطلوب. يرجى التواصل معنا للحصول على عرض سعر مخصص.', 'text', true, 5),
(ARRAY['خبرة', 'تجربة', 'experience'], 'لدينا أكثر من 20 عاماً من الخبرة في مجال الطب الشرعي والحماية المدنية مع تحليل أكثر من 1000 قضية.', 'text', true, 6),
(ARRAY['شكرا', 'thank you', 'thanks'], 'العفو! نحن هنا لخدمتك في أي وقت. لا تتردد في التواصل معنا إذا كان لديك أي استفسارات أخرى.', 'text', true, 7)
ON CONFLICT DO NOTHING;

-- إدراج الصفحات الأساسية
INSERT INTO pages (name, slug, title, meta_description, content, status, template) VALUES
('الصفحة الرئيسية', 'home', 'فورنسيك برو - الصفحة الرئيسية', 'شركة استشارات متخصصة في الطب الشرعي والحماية المدنية', '{}', 'published', 'home'),
('من نحن', 'about', 'من نحن - فورنسيك برو', 'تعرف على تاريخ وخبرة فريق فورنسيك برو في مجال الطب الشرعي', '{}', 'published', 'about'),
('الخدمات', 'services', 'خدماتنا - فورنسيك برو', 'خدمات شاملة في الطب الشرعي والحماية المدنية وتحليل المتفجرات', '{}', 'published', 'services'),
('المدونة', 'blog', 'المدونة - فورنسيك برو', 'مقالات ورؤى من خبراء الطب الشرعي والحماية المدنية', '{}', 'published', 'blog'),
('اتصل بنا', 'contact', 'اتصل بنا - فورنسيك برو', 'تواصل مع فريق الخبراء للحصول على استشارة متخصصة', '{}', 'published', 'contact')
ON CONFLICT (slug) DO UPDATE SET
title = EXCLUDED.title,
meta_description = EXCLUDED.meta_description,
updated_at = now();

-- إدراج مقالات المدونة النموذجية
INSERT INTO blog_posts (title, slug, excerpt, content, author_name, category, tags, status, read_time, meta_description) VALUES
('مقدمة في تحقيق الحرائق: دليل شامل', 'fire-investigation-guide', 'تعلم عن الطرق العلمية والتقنيات المستخدمة في تحقيق الحرائق، من فحص المسرح إلى تحديد السبب.', 'تحقيق الحرائق هو علم معقد يتطلب خبرة واسعة ومعرفة عميقة بالطرق العلمية...', 'د. أحمد محمد', 'تحقيق الحرائق', ARRAY['حرائق', 'تحقيق', 'طب شرعي'], 'published', 8, 'دليل شامل لتحقيق الحرائق والطرق العلمية المستخدمة'),
('دور الطب الشرعي في العدالة الجنائية الحديثة', 'forensic-science-criminal-justice', 'استكشف كيف تطور الطب الشرعي ودوره الحاسم في حل الجرائم وضمان العدالة في النظام القانوني اليوم.', 'الطب الشرعي لعب دوراً محورياً في تطوير نظام العدالة الجنائية...', 'د. فاطمة علي', 'الطب الشرعي', ARRAY['طب شرعي', 'عدالة', 'جرائم'], 'published', 6, 'دور الطب الشرعي في العدالة الجنائية الحديثة'),
('فحوصات سلامة المباني: ما تحتاج لمعرفته', 'building-safety-inspections', 'نظرة تفصيلية على فحوصات سلامة المباني، بما في ذلك اللوائح والإجراءات وأهمية التقييم المهني.', 'فحوصات سلامة المباني هي عملية حيوية لضمان سلامة الأشخاص والممتلكات...', 'م. محمد حسن', 'الحماية المدنية', ARRAY['مباني', 'سلامة', 'فحص'], 'published', 5, 'دليل شامل لفحوصات سلامة المباني واللوائح المطلوبة')
ON CONFLICT (slug) DO UPDATE SET
title = EXCLUDED.title,
content = EXCLUDED.content,
updated_at = now();