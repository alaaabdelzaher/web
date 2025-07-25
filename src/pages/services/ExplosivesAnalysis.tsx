import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Search, FileText, Shield, CheckCircle, Flame, AlertTriangle, Zap, Target } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { DatabaseService } from '../../lib/supabase';

const ExplosivesAnalysis = () => {
  const { language, t } = useLanguage();
  const [pageContent, setPageContent] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const loadPageContent = async () => {
      try {
        setLoading(true);
        const content = await DatabaseService.getServicePageContent('explosives-analysis');
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
          <Award className="h-16 w-16 text-blue-800 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {language === 'ar' ? 'مكافحة الحرائق والمفرقعات' : 'Fire & Explosives Control'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {language === 'ar' ? 
              'نقدم خدمات متخصصة في تحقيقات الحرائق وتحليل المفرقعات وإعداد التقارير الفنية والرد العلمي والفني على تقارير الخبراء والجهات المختلفة.' :
              'We provide specialized services in fire investigations, explosives analysis, technical report preparation, and scientific and technical responses to expert reports from various agencies.'
            }
          </p>
        </div>

        {/* Main Services */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <Flame className="h-12 w-12 text-red-600 mb-4" />
            <h3 className="text-2xl font-semibold mb-4">
              {language === 'ar' ? 'تحقيقات الحرائق' : 'Fire Investigations'}
            </h3>
            <p className="text-gray-600 mb-6">
              {language === 'ar' ? 
                'نقوم بتحقيقات شاملة ومتخصصة في حوادث الحرائق لتحديد الأسباب والظروف المحيطة، مع إعداد تقارير فنية مفصلة تدعم الإجراءات القانونية.' :
                'We conduct comprehensive and specialized investigations into fire incidents to determine causes and surrounding circumstances, with detailed technical reports supporting legal procedures.'
              }
            </p>
            <ul className="space-y-2">
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-sm">
                  {language === 'ar' ? 'تحديد نقطة بداية الحريق' : 'Fire origin point determination'}
                </span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-sm">
                  {language === 'ar' ? 'تحليل أسباب الاشتعال' : 'Ignition cause analysis'}
                </span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-sm">
                  {language === 'ar' ? 'فحص الأدلة المادية' : 'Physical evidence examination'}
                </span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-sm">
                  {language === 'ar' ? 'تحليل أنماط الاحتراق' : 'Burn pattern analysis'}
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <Zap className="h-12 w-12 text-orange-600 mb-4" />
            <h3 className="text-2xl font-semibold mb-4">
              {language === 'ar' ? 'تحليل المفرقعات' : 'Explosives Analysis'}
            </h3>
            <p className="text-gray-600 mb-6">
              {language === 'ar' ? 
                'نقدم خدمات تحليل المواد المتفجرة والأجهزة المتفجرة، مع تحديد نوع المتفجرات المستخدمة وطريقة التفجير والآثار الناتجة.' :
                'We provide analysis services for explosive materials and explosive devices, identifying the type of explosives used, detonation method, and resulting effects.'
              }
            </p>
            <ul className="space-y-2">
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-sm">
                  {language === 'ar' ? 'تحليل بقايا المتفجرات' : 'Explosive residue analysis'}
                </span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-sm">
                  {language === 'ar' ? 'فحص الأجهزة المتفجرة' : 'Explosive device examination'}
                </span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-sm">
                  {language === 'ar' ? 'تحديد نوع المتفجرات' : 'Explosive type identification'}
                </span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-sm">
                  {language === 'ar' ? 'تحليل آثار الانفجار' : 'Blast effect analysis'}
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
                'نعد تقارير فنية شاملة ومفصلة تدعم القضايا القانونية والتأمينية، مع الرد العلمي والفني على تقارير الخبراء الآخرين.' :
                'We prepare comprehensive and detailed technical reports supporting legal and insurance cases, with scientific and technical responses to other expert reports.'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Flame className="h-8 w-8 text-red-800" />
              </div>
              <h3 className="font-semibold mb-2">
                {language === 'ar' ? 'تقارير الحرائق' : 'Fire Reports'}
              </h3>
              <p className="text-sm text-gray-600">
                {language === 'ar' ? 
                  'تقارير مفصلة عن أسباب الحرائق والأضرار الناتجة' :
                  'Detailed reports on fire causes and resulting damages'
                }
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 text-center">
              <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="h-8 w-8 text-orange-800" />
              </div>
              <h3 className="font-semibold mb-2">
                {language === 'ar' ? 'تقارير الانفجارات' : 'Explosion Reports'}
              </h3>
              <p className="text-sm text-gray-600">
                {language === 'ar' ? 
                  'تحليل شامل للانفجارات وتحديد المسببات' :
                  'Comprehensive explosion analysis and cause determination'
                }
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-blue-800" />
              </div>
              <h3 className="font-semibold mb-2">
                {language === 'ar' ? 'الرد على التقارير' : 'Report Responses'}
              </h3>
              <p className="text-sm text-gray-600">
                {language === 'ar' ? 
                  'رد علمي وفني على تقارير الخبراء الآخرين' :
                  'Scientific and technical responses to other expert reports'
                }
              </p>
            </div>
          </div>
        </div>

        {/* Our Expertise */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {language === 'ar' ? 'خبرتنا المتخصصة' : 'Our Specialized Expertise'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <Search className="h-8 w-8 text-blue-800 mb-4" />
              <h3 className="text-xl font-semibold mb-4">
                {language === 'ar' ? 'تقنيات التحقيق المتقدمة' : 'Advanced Investigation Techniques'}
              </h3>
              <p className="text-gray-600 mb-4">
                {language === 'ar' ? 
                  'نستخدم أحدث التقنيات والأدوات في تحقيقات الحرائق والانفجارات، مما يضمن الحصول على نتائج دقيقة وموثوقة.' :
                  'We use the latest techniques and tools in fire and explosion investigations, ensuring accurate and reliable results.'
                }
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">
                    {language === 'ar' ? 'التصوير الحراري' : 'Thermal imaging'}
                  </span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">
                    {language === 'ar' ? 'التحليل الطيفي' : 'Spectral analysis'}
                  </span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">
                    {language === 'ar' ? 'المحاكاة الحاسوبية' : 'Computer simulation'}
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <Shield className="h-8 w-8 text-blue-800 mb-4" />
              <h3 className="text-xl font-semibold mb-4">
                {language === 'ar' ? 'الخبرة القانونية' : 'Legal Expertise'}
              </h3>
              <p className="text-gray-600 mb-4">
                {language === 'ar' ? 
                  'فريقنا لديه خبرة واسعة في إعداد التقارير الفنية التي تدعم الإجراءات القانونية والقضايا التأمينية.' :
                  'Our team has extensive experience in preparing technical reports that support legal procedures and insurance cases.'
                }
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">
                    {language === 'ar' ? 'تقارير معتمدة قانونياً' : 'Legally certified reports'}
                  </span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">
                    {language === 'ar' ? 'شهادة خبراء في المحاكم' : 'Expert testimony in courts'}
                  </span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">
                    {language === 'ar' ? 'استشارات قانونية فنية' : 'Technical legal consultations'}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Case Studies */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {language === 'ar' ? 'دراسات حالة' : 'Case Studies'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4">
                {language === 'ar' ? 'حريق مجمع تجاري كبير' : 'Large Commercial Complex Fire'}
              </h3>
              <p className="text-gray-600 mb-4">
                {language === 'ar' ? 
                  'تحقيق شامل في حريق مجمع تجاري كبير أدى إلى أضرار بالملايين، حيث تم تحديد السبب الجذري وإعداد تقرير فني مفصل.' :
                  'Comprehensive investigation of a large commercial complex fire that caused millions in damages, where the root cause was identified and a detailed technical report was prepared.'
                }
              </p>
              <div className="text-sm text-gray-500">
                <strong>{language === 'ar' ? 'النتيجة:' : 'Result:'}</strong> 
                {language === 'ar' ? 
                  ' تحديد السبب الحقيقي وتبرئة المالك من التهم' :
                  ' Real cause identified and owner cleared of charges'
                }
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4">
                {language === 'ar' ? 'انفجار في منشأة صناعية' : 'Industrial Facility Explosion'}
              </h3>
              <p className="text-gray-600 mb-4">
                {language === 'ar' ? 
                  'تحليل انفجار في منشأة صناعية مع تحديد نوع المتفجرات المستخدمة وطريقة التفجير، مما ساعد في كشف الحقائق.' :
                  'Analysis of an explosion in an industrial facility with identification of the type of explosives used and detonation method, helping uncover the facts.'
                }
              </p>
              <div className="text-sm text-gray-500">
                <strong>{language === 'ar' ? 'النتيجة:' : 'Result:'}</strong> 
                {language === 'ar' ? 
                  ' كشف العمل الإجرامي وإحالة القضية للنيابة' :
                  ' Criminal act uncovered and case referred to prosecution'
                }
              </div>
            </div>
          </div>
        </div>

        {/* Safety Protocols */}
        <div className="bg-yellow-50 rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {language === 'ar' ? 'بروتوكولات السلامة' : 'Safety Protocols'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-yellow-200 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-yellow-800" />
              </div>
              <h3 className="font-semibold mb-2">
                {language === 'ar' ? 'معدات الحماية' : 'Protective Equipment'}
              </h3>
              <p className="text-sm text-gray-600">
                {language === 'ar' ? 'استخدام أحدث معدات الحماية الشخصية' : 'Use of latest personal protective equipment'}
              </p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-200 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="h-8 w-8 text-yellow-800" />
              </div>
              <h3 className="font-semibold mb-2">
                {language === 'ar' ? 'إجراءات الطوارئ' : 'Emergency Procedures'}
              </h3>
              <p className="text-sm text-gray-600">
                {language === 'ar' ? 'خطط طوارئ شاملة لجميع المواقف' : 'Comprehensive emergency plans for all situations'}
              </p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-200 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-yellow-800" />
              </div>
              <h3 className="font-semibold mb-2">
                {language === 'ar' ? 'التدريب المستمر' : 'Continuous Training'}
              </h3>
              <p className="text-sm text-gray-600">
                {language === 'ar' ? 'تدريب مستمر على أحدث تقنيات السلامة' : 'Continuous training on latest safety techniques'}
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-blue-800 text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {language === 'ar' ? 'تحتاج خبير في الحرائق والمفرقعات؟' : 'Need a Fire & Explosives Expert?'}
          </h2>
          <p className="text-xl text-blue-100 mb-6">
            {language === 'ar' ? 
              'تواصل معنا اليوم للحصول على استشارة متخصصة في تحقيقات الحرائق وتحليل المفرقعات من خبراء معتمدين.' :
              'Contact us today for specialized consultation in fire investigations and explosives analysis from certified experts.'
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

export default ExplosivesAnalysis;