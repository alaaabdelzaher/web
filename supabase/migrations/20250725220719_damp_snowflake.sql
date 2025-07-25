/*
  # إضافة محتوى الصفحة الرئيسية

  1. إدراج محتوى الصفحة الرئيسية
    - قسم البطل (Hero Section)
    - قسم الشهادات (Certifications)
    - قسم الخدمات (Services)
    - قسم الشهادات العملاء (Testimonials)
    - قسم الدعوة للعمل (CTA)

  2. محتوى متعدد اللغات
    - دعم العربية والإنجليزية
    - محتوى JSON منظم
*/

-- إدراج محتوى الصفحة الرئيسية
INSERT INTO content_sections (section_key, section_name, content_type, content, is_active, sort_order) VALUES
(
  'homepage_hero',
  'Hero Section - الصفحة الرئيسية',
  'json',
  '{
    "title_ar": "فورنسيك برو - خبرة موثوقة في الحماية المدنية والطب الشرعي",
    "title_en": "ForensicPro - Trusted Expertise in Civil Protection & Forensics",
    "subtitle_ar": "مع أكثر من 20 عاماً من الخبرة، نقدم تحليلاً شرعياً شاملاً وخدمات الحماية المدنية والاستشارات الخبيرة للحالات القانونية والطوارئ.",
    "subtitle_en": "With over 20 years of experience, we provide comprehensive forensic analysis, civil protection services, and expert consultation for legal and emergency situations.",
    "cta1_text_ar": "احجز استشارة",
    "cta1_text_en": "Book Consultation",
    "cta2_text_ar": "اتصل بنا",
    "cta2_text_en": "Contact Us",
    "cta3_text_ar": "عرض الخدمات",
    "cta3_text_en": "View Services",
    "experience_years": "20+",
    "experience_text_ar": "سنة من التميز",
    "experience_text_en": "Years of Excellence",
    "experience_desc_ar": "شهادات مهنية وشهادة خبيرة في أكثر من 1000 قضية",
    "experience_desc_en": "Professional certifications and expert testimony in over 1,000 cases"
  }',
  true,
  1
),
(
  'homepage_certifications',
  'Certifications Section - قسم الشهادات',
  'json',
  '{
    "title_ar": "الشهادات المهنية",
    "title_en": "Professional Certifications",
    "subtitle_ar": "خبرة معترف بها وأوراق اعتماد صناعية",
    "subtitle_en": "Recognized expertise and industry credentials"
  }',
  true,
  2
),
(
  'homepage_services',
  'Services Section - قسم الخدمات',
  'json',
  '{
    "title_ar": "خدماتنا الأساسية",
    "title_en": "Our Core Services",
    "subtitle_ar": "خبرة شاملة عبر تخصصات متعددة",
    "subtitle_en": "Comprehensive expertise across multiple disciplines"
  }',
  true,
  3
),
(
  'homepage_testimonials',
  'Testimonials Section - قسم شهادات العملاء',
  'json',
  '{
    "title_ar": "شهادات العملاء",
    "title_en": "Client Testimonials",
    "subtitle_ar": "موثوق من قبل المهنيين القانونيين والمؤسسات",
    "subtitle_en": "Trusted by legal professionals and organizations"
  }',
  true,
  4
),
(
  'homepage_cta_final',
  'Final CTA Section - قسم الدعوة النهائية للعمل',
  'json',
  '{
    "title_ar": "مستعد للبدء؟",
    "title_en": "Ready to Get Started?",
    "subtitle_ar": "اتصل بنا اليوم للحصول على استشارة واكتشف كيف يمكن لخبرتنا أن تساعد قضيتك.",
    "subtitle_en": "Contact us today for a consultation and discover how our expertise can help your case.",
    "cta1_text_ar": "احجز استشارة",
    "cta1_text_en": "Book Consultation",
    "cta2_text_ar": "اتصل بنا",
    "cta2_text_en": "Contact Us"
  }',
  true,
  5
);