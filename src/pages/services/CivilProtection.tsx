import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, FileText, Flame, AlertTriangle, CheckCircle } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { DatabaseService } from '../../lib/supabase';

const CivilProtection = () => {
  const { language, t } = useLanguage();
  const [pageContent, setPageContent] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const loadPageContent = async () => {
      try {
        setLoading(true);
        const content = await DatabaseService.getServicePageContent('civil-protection');
        console.log('Loaded civil protection content:', content);
        setPageContent(content);
      } catch (error) {
        console.error('Error loading page content:', error);
      } finally {
        setLoading(false);
      }
    };
    loadPageContent();
  }, []);

  const getContentByKey = (key: string) => {
    const content = pageContent.find(item => item.section_key === key);
    console.log(`Looking for key: ${key}, found:`, content);
    if (!content) return null;
    return {
      title: language === 'ar' ? content.section_title_ar : content.section_title_en,
      content: language === 'ar' ? content.content_ar : content.content_en
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen py-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Shield className="h-16 w-16 text-blue-800 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {getContentByKey('hero')?.title || (language === 'ar' ? 'خدمات الحماية المدنية' : 'Civil Protection Services')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {getContentByKey('hero')?.content || (language === 'ar' ? 
              'خدمات شاملة للحماية المدنية تشمل فحص المباني وتحليل الحرائق والتخطيط للطوارئ لضمان السلامة والامتثال.' :
              'Comprehensive civil protection services including building inspections, fire analysis, and emergency planning to ensure safety and compliance.'
            )}
          </p>
        </div>

        {/* Dynamic Content Sections */}
        {pageContent
          .filter(section => section.section_key !== 'hero')
          .sort((a, b) => a.section_order - b.section_order)
          .map((section, index) => (
            <div key={section.id} className="mb-16">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                  {language === 'ar' ? section.section_title_ar : section.section_title_en}
                </h2>
                <div className="prose prose-lg max-w-none">
                  <div 
                    className="text-gray-600 leading-relaxed"
                    style={{ whiteSpace: 'pre-wrap' }}
                  >
                    {language === 'ar' ? section.content_ar : section.content_en}
                  </div>
                </div>
              </div>
            </div>
          ))}

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <FileText className="h-12 w-12 text-blue-800 mb-4" />
            <h3 className="text-2xl font-semibold mb-4">
              {language === 'ar' ? 'تقارير فحص المباني' : 'Building Inspection Reports'}
            </h3>
            <p className="text-gray-600 mb-6">
              {language === 'ar' ? 
                'تقييمات هيكلية وأمنية مفصلة للمباني والمرافق لضمان الامتثال لمعايير السلامة واللوائح.' :
                'Detailed structural and safety assessments of buildings and facilities to ensure compliance with safety standards and regulations.'
              }
            </p>
            <ul className="space-y-2">
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-sm">
                  {language === 'ar' ? 'تقييم السلامة الهيكلية' : 'Structural integrity assessment'}
                </span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-sm">
                  {language === 'ar' ? 'تقييم الامتثال للسلامة' : 'Safety compliance evaluation'}
                </span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-sm">
                  {language === 'ar' ? 'تحديد انتهاكات الكود' : 'Code violation identification'}
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <Flame className="h-12 w-12 text-blue-800 mb-4" />
            <h3 className="text-2xl font-semibold mb-4">
              {language === 'ar' ? 'تحليل أسباب الحرائق' : 'Fire Cause Analysis'}
            </h3>
            <p className="text-gray-600 mb-6">
              {language === 'ar' ? 
                'تحقيق خبير في أصول وأسباب الحرائق باستخدام تقنيات الطب الشرعي المتقدمة وطرق التحليل العلمي.' :
                'Expert investigation of fire origins and causes using advanced forensic techniques and scientific analysis methods.'
              }
            </p>
            <ul className="space-y-2">
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-sm">
                  {language === 'ar' ? 'تحديد المنشأ والسبب' : 'Origin and cause determination'}
                </span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-sm">
                  {language === 'ar' ? 'جمع وتحليل الأدلة' : 'Evidence collection and analysis'}
                </span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-sm">
                  {language === 'ar' ? 'خدمات الشهادة الخبيرة' : 'Expert testimony services'}
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <AlertTriangle className="h-12 w-12 text-blue-800 mb-4" />
            <h3 className="text-2xl font-semibold mb-4">
              {language === 'ar' ? 'التخطيط للطوارئ' : 'Emergency Planning'}
            </h3>
            <p className="text-gray-600 mb-6">
              {language === 'ar' ? 
                'بروتوكولات استجابة شاملة للطوارئ وخدمات التخطيط لإعداد المؤسسات لسيناريوهات الطوارئ المختلفة.' :
                'Comprehensive emergency response protocols and planning services to prepare organizations for various emergency scenarios.'
              }
            </p>
            <ul className="space-y-2">
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-sm">
                  {language === 'ar' ? 'تقييم وتخفيف المخاطر' : 'Risk assessment and mitigation'}
                </span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-sm">
                  {language === 'ar' ? 'إجراءات الإخلاء' : 'Evacuation procedures'}
                </span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-sm">
                  {language === 'ar' ? 'تنسيق التدريب والتدريبات' : 'Training and drills coordination'}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Process Section */}
        <div className="bg-gray-50 rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {language === 'ar' ? 'عمليتنا' : 'Our Process'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-blue-800 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="font-bold">1</span>
              </div>
              <h3 className="font-semibold mb-2">
                {language === 'ar' ? 'التقييم الأولي' : 'Initial Assessment'}
              </h3>
              <p className="text-sm text-gray-600">
                {language === 'ar' ? 
                  'تقييم شامل لاحتياجاتك ومتطلباتك المحددة' :
                  'Comprehensive evaluation of your specific needs and requirements'
                }
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-800 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="font-bold">2</span>
              </div>
              <h3 className="font-semibold mb-2">
                {language === 'ar' ? 'التحقيق' : 'Investigation'}
              </h3>
              <p className="text-sm text-gray-600">
                {language === 'ar' ? 
                  'فحص مفصل باستخدام تقنيات ومعدات متقدمة' :
                  'Detailed examination using advanced techniques and equipment'
                }
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-800 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="font-bold">3</span>
              </div>
              <h3 className="font-semibold mb-2">
                {language === 'ar' ? 'التحليل والتقرير' : 'Analysis & Reporting'}
              </h3>
              <p className="text-sm text-gray-600">
                {language === 'ar' ? 
                  'تحليل شامل وتوثيق مفصل للنتائج' :
                  'Comprehensive analysis and detailed documentation of findings'
                }
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-800 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="font-bold">4</span>
              </div>
              <h3 className="font-semibold mb-2">
                {language === 'ar' ? 'الاستشارة الخبيرة' : 'Expert Consultation'}
              </h3>
              <p className="text-sm text-gray-600">
                {language === 'ar' ? 
                  'دعم مستمر وشهادة خبيرة عند الحاجة' :
                  'Ongoing support and expert testimony if required'
                }
              </p>
            </div>
          </div>
        </div>

        {/* Case Studies */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {language === 'ar' ? 'دراسات الحالة' : 'Case Studies'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4">
                {language === 'ar' ? 'تحقيق حريق مبنى تجاري' : 'Commercial Building Fire Investigation'}
              </h3>
              <p className="text-gray-600 mb-4">
                {language === 'ar' ? 
                  'تحقيق شامل في حريق مبنى تجاري أدى إلى أضرار كبيرة في الممتلكات. حدد تحليلنا أعطال النظام الكهربائي كسبب رئيسي.' :
                  'Comprehensive investigation of a commercial building fire that resulted in significant property damage. Our analysis identified electrical system failures as the primary cause.'
                }
              </p>
              <div className="text-sm text-gray-500">
                <strong>{language === 'ar' ? 'النتيجة:' : 'Outcome:'}</strong> 
                {language === 'ar' ? 
                  ' تم حل مطالبة التأمين، وتمت تبرئة مالك المبنى' :
                  ' Insurance claim resolved, building owner exonerated'
                }
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4">
                {language === 'ar' ? 'التخطيط للطوارئ لمرفق الرعاية الصحية' : 'Emergency Planning for Healthcare Facility'}
              </h3>
              <p className="text-gray-600 mb-4">
                {language === 'ar' ? 
                  'تطوير بروتوكولات استجابة شاملة للطوارئ لمستشفى بـ 200 سرير، بما في ذلك إجراءات الإخلاء وتخطيط الاستجابة للكوارث.' :
                  'Developed comprehensive emergency response protocols for a 200-bed hospital, including evacuation procedures and disaster response planning.'
                }
              </p>
              <div className="text-sm text-gray-500">
                <strong>{language === 'ar' ? 'النتيجة:' : 'Outcome:'}</strong> 
                {language === 'ar' ? 
                  ' تحسين الاستعداد للطوارئ، تحقيق الامتثال' :
                  ' Improved emergency preparedness, compliance achieved'
                }
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-blue-800 text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {language === 'ar' ? 'تحتاج خدمات الحماية المدنية؟' : 'Need Civil Protection Services?'}
          </h2>
          <p className="text-xl text-blue-100 mb-6">
            {language === 'ar' ? 
              'اتصل بنا اليوم لمناقشة احتياجات الحماية المدنية الخاصة بك والحصول على استشارة خبيرة.' :
              'Contact us today to discuss your civil protection needs and get expert consultation.'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
            >
              {language === 'ar' ? 'احجز استشارة' : 'Book Consultation'}
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-800 transition-colors"
            >
              {language === 'ar' ? 'اتصل بنا' : 'Contact Us'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CivilProtection;