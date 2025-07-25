import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, FileText, Flame, AlertTriangle, CheckCircle, Users, Building, Truck, Phone } from 'lucide-react';
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
            {language === 'ar' ? 'خدمات الحماية المدنية' : 'Civil Protection Services'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {language === 'ar' ? 
              'نقدم استشارات فنية متخصصة في مجال الحماية المدنية تشمل خدمات الإطفاء والإنقاذ وتفتيش المنشآت الهامة وإعداد التقارير الفنية المتخصصة.' :
              'We provide specialized technical consulting in civil protection including fire services, rescue operations, critical facility inspections, and preparation of specialized technical reports.'
            }
          </p>
        </div>

        {/* Services Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <Flame className="h-12 w-12 text-red-600 mb-4" />
            <h3 className="text-2xl font-semibold mb-4">
              {language === 'ar' ? 'خدمات الإطفاء والإنقاذ' : 'Fire and Rescue Services'}
            </h3>
            <p className="text-gray-600 mb-6">
              {language === 'ar' ? 
                'نقدم استشارات متخصصة في تخطيط وتنفيذ عمليات الإطفاء والإنقاذ، بما في ذلك تقييم المخاطر ووضع خطط الطوارئ وتدريب الفرق المتخصصة.' :
                'We provide specialized consulting in planning and implementing fire and rescue operations, including risk assessment, emergency planning, and training specialized teams.'
              }
            </p>
            <ul className="space-y-2">
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-sm">
                  {language === 'ar' ? 'تقييم مخاطر الحريق' : 'Fire risk assessment'}
                </span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-sm">
                  {language === 'ar' ? 'وضع خطط الإخلاء' : 'Evacuation planning'}
                </span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-sm">
                  {language === 'ar' ? 'تدريب فرق الإطفاء' : 'Fire team training'}
                </span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-sm">
                  {language === 'ar' ? 'عمليات الإنقاذ البري والنهري' : 'Land and water rescue operations'}
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <Building className="h-12 w-12 text-blue-800 mb-4" />
            <h3 className="text-2xl font-semibold mb-4">
              {language === 'ar' ? 'تفتيش المنشآت الهامة' : 'Critical Facility Inspections'}
            </h3>
            <p className="text-gray-600 mb-6">
              {language === 'ar' ? 
                'نقوم بتفتيش المنشآت الحيوية والهامة لضمان الامتثال لمعايير السلامة والحماية المدنية، مع إعداد تقارير فنية شاملة.' :
                'We conduct inspections of vital and important facilities to ensure compliance with safety and civil protection standards, with comprehensive technical reports.'
              }
            </p>
            <ul className="space-y-2">
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-sm">
                  {language === 'ar' ? 'تفتيش المصانع والمنشآت الصناعية' : 'Factory and industrial facility inspections'}
                </span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-sm">
                  {language === 'ar' ? 'تقييم أنظمة السلامة' : 'Safety system evaluation'}
                </span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-sm">
                  {language === 'ar' ? 'فحص معدات الإطفاء' : 'Fire equipment inspection'}
                </span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-sm">
                  {language === 'ar' ? 'تقييم مخارج الطوارئ' : 'Emergency exit assessment'}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Technical Reports Section */}
        <div className="bg-gray-50 rounded-lg p-8 mb-16">
          <div className="text-center mb-8">
            <FileText className="h-12 w-12 text-blue-800 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {language === 'ar' ? 'التقارير الفنية المتخصصة' : 'Specialized Technical Reports'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {language === 'ar' ? 
                'نعد تقارير فنية شاملة ومفصلة بعد المعاينة الميدانية، تدعم القضايا القانونية وتساعد في اتخاذ القرارات الصحيحة.' :
                'We prepare comprehensive and detailed technical reports after field inspection, supporting legal cases and helping make correct decisions.'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-blue-800" />
              </div>
              <h3 className="font-semibold mb-2">
                {language === 'ar' ? 'تقارير الحوادث' : 'Incident Reports'}
              </h3>
              <p className="text-sm text-gray-600">
                {language === 'ar' ? 
                  'تحليل شامل للحوادث وأسبابها مع التوصيات الفنية' :
                  'Comprehensive analysis of incidents and their causes with technical recommendations'
                }
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-green-800" />
              </div>
              <h3 className="font-semibold mb-2">
                {language === 'ar' ? 'تقارير السلامة' : 'Safety Reports'}
              </h3>
              <p className="text-sm text-gray-600">
                {language === 'ar' ? 
                  'تقييم شامل لمستوى السلامة في المنشآت والمرافق' :
                  'Comprehensive assessment of safety levels in facilities and installations'
                }
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 text-center">
              <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="h-8 w-8 text-orange-800" />
              </div>
              <h3 className="font-semibold mb-2">
                {language === 'ar' ? 'تقارير المخاطر' : 'Risk Reports'}
              </h3>
              <p className="text-sm text-gray-600">
                {language === 'ar' ? 
                  'تحديد وتقييم المخاطر المحتملة مع خطط التخفيف' :
                  'Identification and assessment of potential risks with mitigation plans'
                }
              </p>
            </div>
          </div>
        </div>

        {/* Our Expertise */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {language === 'ar' ? 'خبرتنا في الحماية المدنية' : 'Our Civil Protection Expertise'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <Users className="h-8 w-8 text-blue-800 mb-4" />
              <h3 className="text-xl font-semibold mb-4">
                {language === 'ar' ? 'فريق من الخبراء' : 'Expert Team'}
              </h3>
              <p className="text-gray-600 mb-4">
                {language === 'ar' ? 
                  'فريقنا يضم خبراء سابقين في الحماية المدنية شغلوا مناصب قيادية في الجهات الحكومية المختصة، مما يضمن جودة الخدمة والدقة في التقييم.' :
                  'Our team includes former civil protection experts who held leadership positions in relevant government agencies, ensuring service quality and assessment accuracy.'
                }
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">
                    {language === 'ar' ? 'خبرة تزيد عن 20 عاماً' : 'Over 20 years of experience'}
                  </span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">
                    {language === 'ar' ? 'شهادات مهنية معتمدة' : 'Certified professional credentials'}
                  </span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">
                    {language === 'ar' ? 'تدريب مستمر على أحدث التقنيات' : 'Continuous training on latest technologies'}
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <Truck className="h-8 w-8 text-blue-800 mb-4" />
              <h3 className="text-xl font-semibold mb-4">
                {language === 'ar' ? 'معدات وتقنيات متقدمة' : 'Advanced Equipment and Technologies'}
              </h3>
              <p className="text-gray-600 mb-4">
                {language === 'ar' ? 
                  'نستخدم أحدث المعدات والتقنيات في عمليات التفتيش والتقييم، مما يضمن الحصول على نتائج دقيقة وموثوقة.' :
                  'We use the latest equipment and technologies in inspection and assessment operations, ensuring accurate and reliable results.'
                }
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">
                    {language === 'ar' ? 'أجهزة قياس متطورة' : 'Advanced measuring devices'}
                  </span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">
                    {language === 'ar' ? 'تقنيات التصوير الحراري' : 'Thermal imaging technologies'}
                  </span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">
                    {language === 'ar' ? 'برامج المحاكاة والتحليل' : 'Simulation and analysis software'}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Case Studies */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {language === 'ar' ? 'أمثلة من أعمالنا' : 'Examples of Our Work'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4">
                {language === 'ar' ? 'تفتيش مجمع صناعي كبير' : 'Large Industrial Complex Inspection'}
              </h3>
              <p className="text-gray-600 mb-4">
                {language === 'ar' ? 
                  'قمنا بتفتيش شامل لمجمع صناعي يضم عدة مصانع، وأعددنا تقريراً فنياً مفصلاً حدد نقاط الضعف في أنظمة السلامة وقدم توصيات للتحسين.' :
                  'We conducted a comprehensive inspection of an industrial complex with several factories, and prepared a detailed technical report identifying weaknesses in safety systems and providing improvement recommendations.'
                }
              </p>
              <div className="text-sm text-gray-500">
                <strong>{language === 'ar' ? 'النتيجة:' : 'Result:'}</strong> 
                {language === 'ar' ? 
                  ' تحسين مستوى السلامة بنسبة 85% وتجنب حوادث محتملة' :
                  ' 85% improvement in safety level and prevention of potential accidents'
                }
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4">
                {language === 'ar' ? 'تدريب فريق إطفاء متخصص' : 'Specialized Fire Team Training'}
              </h3>
              <p className="text-gray-600 mb-4">
                {language === 'ar' ? 
                  'دربنا فريق إطفاء في إحدى الشركات الكبرى على أحدث تقنيات مكافحة الحرائق والإنقاذ، مع التركيز على الحالات الطارئة المعقدة.' :
                  'We trained a fire team at a major company on the latest firefighting and rescue techniques, focusing on complex emergency situations.'
                }
              </p>
              <div className="text-sm text-gray-500">
                <strong>{language === 'ar' ? 'النتيجة:' : 'Result:'}</strong> 
                {language === 'ar' ? 
                  ' تحسين زمن الاستجابة للطوارئ بنسبة 60%' :
                  ' 60% improvement in emergency response time'
                }
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="bg-red-600 text-white rounded-lg p-8 mb-16 text-center">
          <Phone className="h-12 w-12 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">
            {language === 'ar' ? 'خدمة الطوارئ 24/7' : '24/7 Emergency Service'}
          </h2>
          <p className="text-xl text-red-100 mb-6">
            {language === 'ar' ? 
              'للحالات الطارئة والاستشارات العاجلة في مجال الحماية المدنية، نحن متاحون على مدار الساعة.' :
              'For emergencies and urgent consultations in civil protection, we are available around the clock.'
            }
          </p>
          <div className="text-2xl font-bold mb-2">+966 XX XXX XXXX</div>
          <div className="text-red-100">
            {language === 'ar' ? 'متاح 24 ساعة، 7 أيام في الأسبوع' : 'Available 24 hours, 7 days a week'}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-blue-800 text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {language === 'ar' ? 'تحتاج استشارة في الحماية المدنية؟' : 'Need Civil Protection Consultation?'}
          </h2>
          <p className="text-xl text-blue-100 mb-6">
            {language === 'ar' ? 
              'تواصل معنا اليوم للحصول على استشارة فنية متخصصة في مجال الحماية المدنية وضمان سلامة منشآتك.' :
              'Contact us today for specialized technical consultation in civil protection and ensure the safety of your facilities.'
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