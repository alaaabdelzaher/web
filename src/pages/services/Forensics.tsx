import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Search, FileText, Shield, CheckCircle, Eye, Microscope, Scale, Camera } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { DatabaseService } from '../../lib/supabase';

const Forensics = () => {
  const { language, t } = useLanguage();
  const [pageContent, setPageContent] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const loadPageContent = async () => {
      try {
        setLoading(true);
        const content = await DatabaseService.getServicePageContent('forensics');
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
          <Users className="h-16 w-16 text-blue-800 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {language === 'ar' ? 'الأدلة الجنائية والطب الشرعي' : 'Forensic Evidence & Medicine'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {language === 'ar' ? 
              'نقدم خدمات متخصصة في تحليل الأدلة الجنائية والطب الشرعي، تشمل تحليل مسارح الجرائم وفحص الأسلحة والمفرقعات وقضايا التزييف والتزوير والتحاليل البيولوجية وتحديد أسباب الوفاة.' :
              'We provide specialized services in forensic evidence analysis and forensic medicine, including crime scene analysis, weapons and explosives examination, forgery and counterfeiting cases, biological analysis, and death cause determination.'
            }
          </p>
        </div>

        {/* Main Services */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <Search className="h-12 w-12 text-blue-800 mb-4" />
            <h3 className="text-2xl font-semibold mb-4">
              {language === 'ar' ? 'تحليل مسارح الجرائم' : 'Crime Scene Analysis'}
            </h3>
            <p className="text-gray-600 mb-6">
              {language === 'ar' ? 
                'نقوم بتحليل شامل ومنهجي لمسارح الجرائم باستخدام أحدث التقنيات العلمية والأدوات المتطورة لجمع وتحليل الأدلة الجنائية.' :
                'We conduct comprehensive and systematic analysis of crime scenes using the latest scientific techniques and advanced tools for collecting and analyzing forensic evidence.'
              }
            </p>
            <ul className="space-y-2">
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-sm">
                  {language === 'ar' ? 'توثيق وتصوير مسرح الجريمة' : 'Crime scene documentation and photography'}
                </span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-sm">
                  {language === 'ar' ? 'جمع وحفظ الأدلة المادية' : 'Physical evidence collection and preservation'}
                </span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-sm">
                  {language === 'ar' ? 'تحليل أنماط الدم والبصمات' : 'Blood pattern and fingerprint analysis'}
                </span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-sm">
                  {language === 'ar' ? 'إعادة بناء الأحداث' : 'Event reconstruction'}
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <Shield className="h-12 w-12 text-blue-800 mb-4" />
            <h3 className="text-2xl font-semibold mb-4">
              {language === 'ar' ? 'فحص الأسلحة والمفرقعات' : 'Weapons and Explosives Examination'}
            </h3>
            <p className="text-gray-600 mb-6">
              {language === 'ar' ? 
                'نقدم خدمات فحص وتحليل الأسلحة النارية والمفرقعات، بما في ذلك تحديد نوع السلاح وتحليل المقذوفات والبقايا المتفجرة.' :
                'We provide examination and analysis services for firearms and explosives, including weapon type identification, projectile analysis, and explosive residue analysis.'
              }
            </p>
            <ul className="space-y-2">
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-sm">
                  {language === 'ar' ? 'فحص الأسلحة النارية' : 'Firearm examination'}
                </span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-sm">
                  {language === 'ar' ? 'تحليل المقذوفات والخراطيش' : 'Bullet and cartridge analysis'}
                </span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-sm">
                  {language === 'ar' ? 'فحص بقايا البارود' : 'Gunshot residue examination'}
                </span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-sm">
                  {language === 'ar' ? 'تحليل المواد المتفجرة' : 'Explosive material analysis'}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Specialized Services */}
        <div className="bg-gray-50 rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {language === 'ar' ? 'خدمات متخصصة إضافية' : 'Additional Specialized Services'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg p-6 text-center">
              <FileText className="h-12 w-12 text-blue-800 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4">
                {language === 'ar' ? 'قضايا التزييف والتزوير' : 'Forgery and Counterfeiting Cases'}
              </h3>
              <p className="text-gray-600 text-sm">
                {language === 'ar' ? 
                  'فحص الوثائق والتوقيعات والعملات المزيفة باستخدام تقنيات متقدمة' :
                  'Examination of documents, signatures, and counterfeit currency using advanced techniques'
                }
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 text-center">
              <Microscope className="h-12 w-12 text-green-800 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4">
                {language === 'ar' ? 'التحاليل البيولوجية' : 'Biological Analysis'}
              </h3>
              <p className="text-gray-600 text-sm">
                {language === 'ar' ? 
                  'تحليل العينات البيولوجية والحمض النووي لتحديد الهوية والقرابة' :
                  'Analysis of biological samples and DNA for identity and kinship determination'
                }
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 text-center">
              <Scale className="h-12 w-12 text-red-800 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4">
                {language === 'ar' ? 'تحديد أسباب الوفاة' : 'Death Cause Determination'}
              </h3>
              <p className="text-gray-600 text-sm">
                {language === 'ar' ? 
                  'فحص طبي شرعي شامل لتحديد أسباب وظروف الوفاة' :
                  'Comprehensive forensic medical examination to determine causes and circumstances of death'
                }
              </p>
            </div>
          </div>
        </div>

        {/* Our Methodology */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {language === 'ar' ? 'منهجيتنا العلمية' : 'Our Scientific Methodology'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <Camera className="h-8 w-8 text-blue-800 mb-4" />
              <h3 className="text-xl font-semibold mb-4">
                {language === 'ar' ? 'التوثيق والتصوير' : 'Documentation and Photography'}
              </h3>
              <p className="text-gray-600 mb-4">
                {language === 'ar' ? 
                  'نستخدم أحدث تقنيات التصوير والتوثيق لضمان حفظ الأدلة بأعلى جودة ودقة، مع الالتزام بالمعايير الدولية.' :
                  'We use the latest photography and documentation techniques to ensure evidence preservation with highest quality and accuracy, adhering to international standards.'
                }
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">
                    {language === 'ar' ? 'التصوير عالي الدقة' : 'High-resolution photography'}
                  </span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">
                    {language === 'ar' ? 'التصوير ثلاثي الأبعاد' : '3D photography'}
                  </span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">
                    {language === 'ar' ? 'التوثيق الرقمي المتقدم' : 'Advanced digital documentation'}
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <Eye className="h-8 w-8 text-blue-800 mb-4" />
              <h3 className="text-xl font-semibold mb-4">
                {language === 'ar' ? 'التحليل المختبري' : 'Laboratory Analysis'}
              </h3>
              <p className="text-gray-600 mb-4">
                {language === 'ar' ? 
                  'نتعامل مع مختبرات معتمدة ومتطورة لإجراء التحاليل المختلفة، مع ضمان دقة النتائج وسرعة الحصول عليها.' :
                  'We work with accredited and advanced laboratories for various analyses, ensuring result accuracy and quick turnaround times.'
                }
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">
                    {language === 'ar' ? 'التحليل الكيميائي' : 'Chemical analysis'}
                  </span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">
                    {language === 'ar' ? 'تحليل الحمض النووي' : 'DNA analysis'}
                  </span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">
                    {language === 'ar' ? 'الفحص المجهري' : 'Microscopic examination'}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Case Examples */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {language === 'ar' ? 'أمثلة من قضايانا' : 'Case Examples'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4">
                {language === 'ar' ? 'قضية جريمة قتل معقدة' : 'Complex Murder Case'}
              </h3>
              <p className="text-gray-600 mb-4">
                {language === 'ar' ? 
                  'تحليل شامل لمسرح جريمة معقد تضمن فحص الأدلة البيولوجية وتحليل أنماط الدم وإعادة بناء الأحداث، مما ساعد في كشف الحقيقة.' :
                  'Comprehensive analysis of a complex crime scene including biological evidence examination, blood pattern analysis, and event reconstruction, helping reveal the truth.'
                }
              </p>
              <div className="text-sm text-gray-500">
                <strong>{language === 'ar' ? 'النتيجة:' : 'Result:'}</strong> 
                {language === 'ar' ? 
                  ' تحديد الجاني بدقة 100% وإدانته قضائياً' :
                  ' 100% accurate perpetrator identification and legal conviction'
                }
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4">
                {language === 'ar' ? 'قضية تزوير وثائق رسمية' : 'Official Document Forgery Case'}
              </h3>
              <p className="text-gray-600 mb-4">
                {language === 'ar' ? 
                  'فحص دقيق لوثائق رسمية مشكوك في صحتها باستخدام تقنيات متقدمة، وتحديد العناصر المزورة والأساليب المستخدمة.' :
                  'Precise examination of suspected official documents using advanced techniques, identifying forged elements and methods used.'
                }
              </p>
              <div className="text-sm text-gray-500">
                <strong>{language === 'ar' ? 'النتيجة:' : 'Result:'}</strong> 
                {language === 'ar' ? 
                  ' كشف شبكة تزوير كبيرة وإحالتها للقضاء' :
                  ' Uncovered large forgery network and referred to judiciary'
                }
              </div>
            </div>
          </div>
        </div>

        {/* Quality Assurance */}
        <div className="bg-blue-50 rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {language === 'ar' ? 'ضمان الجودة والدقة' : 'Quality and Accuracy Assurance'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-800 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">100%</span>
              </div>
              <h3 className="font-semibold mb-2">
                {language === 'ar' ? 'دقة النتائج' : 'Result Accuracy'}
              </h3>
              <p className="text-sm text-gray-600">
                {language === 'ar' ? 'نضمن دقة النتائج بنسبة 100%' : 'We guarantee 100% result accuracy'}
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-800 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">24</span>
              </div>
              <h3 className="font-semibold mb-2">
                {language === 'ar' ? 'ساعة' : 'Hours'}
              </h3>
              <p className="text-sm text-gray-600">
                {language === 'ar' ? 'متوسط وقت التقرير الأولي' : 'Average initial report time'}
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-800 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">20+</span>
              </div>
              <h3 className="font-semibold mb-2">
                {language === 'ar' ? 'سنة خبرة' : 'Years Experience'}
              </h3>
              <p className="text-sm text-gray-600">
                {language === 'ar' ? 'خبرة متراكمة في المجال' : 'Accumulated field experience'}
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-blue-800 text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {language === 'ar' ? 'تحتاج خبير في الأدلة الجنائية؟' : 'Need a Forensic Evidence Expert?'}
          </h2>
          <p className="text-xl text-blue-100 mb-6">
            {language === 'ar' ? 
              'تواصل معنا اليوم للحصول على استشارة متخصصة في الأدلة الجنائية والطب الشرعي من خبراء معتمدين.' :
              'Contact us today for specialized consultation in forensic evidence and forensic medicine from certified experts.'
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

export default Forensics;