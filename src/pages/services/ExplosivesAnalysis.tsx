import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Search, FileText, Shield, CheckCircle, Flame, AlertTriangle, Zap, Target, Eye, Microscope, Users } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const ExplosivesAnalysis = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen py-16" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Award className="h-16 w-16 text-blue-800 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {language === 'ar' ? 'مكافحة الحرائق والمفرقعات' : 'Fire & Explosives Control'}
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {language === 'ar' ? 
              'نقدم خدمات متخصصة ومتقدمة في تحقيقات الحرائق المعقدة وتحليل المفرقعات والمواد المتفجرة، وإعداد التقارير الفنية المتخصصة والرد العلمي والفني المتقدم على تقارير الخبراء والجهات المختلفة. فريقنا من الخبراء المعتمدين دولياً يضمن أعلى مستويات الدقة والمهنية.' :
              'We provide specialized and advanced services in complex fire investigations, explosives and explosive materials analysis, preparation of specialized technical reports, and advanced scientific and technical responses to expert reports from various agencies. Our team of internationally certified experts ensures the highest levels of accuracy and professionalism.'
            }
          </p>
        </div>

        {/* Main Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Fire Investigations */}
          <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-red-600">
            <div className="flex items-center mb-6">
              <Flame className="h-12 w-12 text-red-600 mr-4" />
              <h3 className="text-2xl font-semibold text-gray-900">
                {language === 'ar' ? 'تحقيقات الحرائق المتقدمة' : 'Advanced Fire Investigations'}
              </h3>
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {language === 'ar' ? 
                'نقوم بتحقيقات شاملة ومتخصصة ومتقدمة في حوادث الحرائق المعقدة لتحديد الأسباب الجذرية والظروف المحيطة بدقة علمية عالية، مع إعداد تقارير فنية مفصلة ومتقدمة تدعم الإجراءات القانونية والقضائية والتأمينية بأقوى الأدلة العلمية.' :
                'We conduct comprehensive, specialized, and advanced investigations into complex fire incidents to determine root causes and surrounding circumstances with high scientific precision, with detailed and advanced technical reports supporting legal, judicial, and insurance procedures with the strongest scientific evidence.'
              }
            </p>
            <div className="space-y-3">
              {[
                language === 'ar' ? 'تحديد نقطة بداية الحريق بدقة متناهية' : 'Precise fire origin point determination',
                language === 'ar' ? 'تحليل أسباب الاشتعال والعوامل المساهمة' : 'Ignition cause analysis and contributing factors',
                language === 'ar' ? 'فحص الأدلة المادية والكيميائية المتقدم' : 'Advanced physical and chemical evidence examination',
                language === 'ar' ? 'تحليل أنماط الاحتراق والانتشار المعقدة' : 'Complex burn pattern and spread analysis',
                language === 'ar' ? 'إعادة بناء سيناريو الحريق بالتفصيل' : 'Detailed fire scenario reconstruction',
                language === 'ar' ? 'تحليل المواد المتبقية والرماد المتقدم' : 'Advanced residual material and ash analysis'
              ].map((item, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Explosives Analysis */}
          <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-orange-600">
            <div className="flex items-center mb-6">
              <Zap className="h-12 w-12 text-orange-600 mr-4" />
              <h3 className="text-2xl font-semibold text-gray-900">
                {language === 'ar' ? 'تحليل المفرقعات المتخصص' : 'Specialized Explosives Analysis'}
              </h3>
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {language === 'ar' ? 
                'نقدم خدمات تحليل متقدمة ومتخصصة للمواد المتفجرة والأجهزة المتفجرة المعقدة، مع تحديد نوع المتفجرات المستخدمة وطريقة التفجير والآثار الناتجة بدقة علمية عالية، وتحليل البقايا والشظايا لكشف الحقائق الكاملة.' :
                'We provide advanced and specialized analysis services for explosive materials and complex explosive devices, identifying the type of explosives used, detonation method, and resulting effects with high scientific precision, and analyzing residues and fragments to uncover complete facts.'
              }
            </p>
            <div className="space-y-3">
              {[
                language === 'ar' ? 'تحليل بقايا المتفجرات بالتقنيات المتطورة' : 'Explosive residue analysis with advanced techniques',
                language === 'ar' ? 'فحص الأجهزة المتفجرة المرتجلة والمتطورة' : 'Improvised and sophisticated explosive device examination',
                language === 'ar' ? 'تحديد نوع المتفجرات والمصدر' : 'Explosive type and source identification',
                language === 'ar' ? 'تحليل آثار الانفجار والأضرار الناتجة' : 'Blast effect and resulting damage analysis',
                language === 'ar' ? 'فحص الشظايا والمواد المتطايرة' : 'Fragment and volatile material examination',
                language === 'ar' ? 'تحديد قوة الانفجار ونصف قطر التأثير' : 'Blast force and impact radius determination'
              ].map((item, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Technical Reports Section */}
        <div className="bg-gradient-to-r from-gray-50 to-orange-50 rounded-lg p-8 mb-16">
          <div className="text-center mb-8">
            <FileText className="h-12 w-12 text-blue-800 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {language === 'ar' ? 'التقارير الفنية المتخصصة والمتقدمة' : 'Specialized and Advanced Technical Reports'}
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              {language === 'ar' ? 
                'نعد تقارير فنية شاملة ومفصلة ومتقدمة تدعم القضايا القانونية والتأمينية والقضائية، مع الرد العلمي والفني المتخصص والمتقدم على تقارير الخبراء الآخرين والجهات المختلفة بأعلى مستويات الدقة والمهنية العلمية.' :
                'We prepare comprehensive, detailed, and advanced technical reports supporting legal, insurance, and judicial cases, with specialized and advanced scientific and technical responses to other expert reports and various agencies with the highest levels of accuracy and scientific professionalism.'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Flame,
                title: language === 'ar' ? 'تقارير الحرائق المتقدمة' : 'Advanced Fire Reports',
                desc: language === 'ar' ? 
                  'تقارير مفصلة ومتقدمة عن أسباب الحرائق الجذرية والأضرار الناتجة مع التحليل العلمي الشامل والتوصيات المتقدمة' :
                  'Detailed and advanced reports on root fire causes and resulting damages with comprehensive scientific analysis and advanced recommendations',
                color: 'red'
              },
              {
                icon: AlertTriangle,
                title: language === 'ar' ? 'تقارير الانفجارات المعقدة' : 'Complex Explosion Reports',
                desc: language === 'ar' ? 
                  'تحليل شامل ومتقدم للانفجارات المعقدة وتحديد المسببات والعوامل المساهمة مع إعادة البناء التفصيلي للأحداث' :
                  'Comprehensive and advanced analysis of complex explosions and cause determination with contributing factors and detailed event reconstruction',
                color: 'orange'
              },
              {
                icon: Target,
                title: language === 'ar' ? 'الرد على تقارير الخبراء' : 'Expert Report Responses',
                desc: language === 'ar' ? 
                  'رد علمي وفني متخصص ومتقدم على تقارير الخبراء الآخرين مع التحليل النقدي والأدلة المضادة المدعومة علمياً' :
                  'Specialized and advanced scientific and technical responses to other expert reports with critical analysis and scientifically supported counter-evidence',
                color: 'blue'
              }
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
                <div className={`bg-${item.color}-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4`}>
                  <item.icon className={`h-8 w-8 text-${item.color}-800`} />
                </div>
                <h3 className="font-semibold mb-3 text-lg">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Our Advanced Expertise */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {language === 'ar' ? 'خبرتنا المتقدمة والمتخصصة' : 'Our Advanced and Specialized Expertise'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-8 border-t-4 border-blue-800">
              <Search className="h-10 w-10 text-blue-800 mb-4" />
              <h3 className="text-xl font-semibold mb-4">
                {language === 'ar' ? 'تقنيات التحقيق المتقدمة عالمياً' : 'Globally Advanced Investigation Techniques'}
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {language === 'ar' ? 
                  'نستخدم أحدث التقنيات والأدوات المتطورة عالمياً في تحقيقات الحرائق والانفجارات المعقدة، مما يضمن الحصول على نتائج دقيقة وموثوقة ومتقدمة تدعم أقوى الأدلة العلمية والفنية المطلوبة.' :
                  'We use the latest globally advanced techniques and tools in complex fire and explosion investigations, ensuring accurate, reliable, and advanced results that support the strongest required scientific and technical evidence.'
                }
              </p>
              <div className="space-y-2">
                {[
                  language === 'ar' ? 'التصوير الحراري والطيفي المتقدم' : 'Advanced thermal and spectral imaging',
                  language === 'ar' ? 'التحليل الطيفي والكيميائي المتطور' : 'Advanced spectral and chemical analysis',
                  language === 'ar' ? 'المحاكاة الحاسوبية ثلاثية الأبعاد' : '3D computer simulation',
                  language === 'ar' ? 'تقنيات الكشف المتقدمة والذكية' : 'Advanced and smart detection techniques'
                ].map((item, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 border-t-4 border-green-600">
              <Shield className="h-10 w-10 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold mb-4">
                {language === 'ar' ? 'الخبرة القانونية والقضائية المتقدمة' : 'Advanced Legal and Judicial Expertise'}
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {language === 'ar' ? 
                  'فريقنا لديه خبرة واسعة ومتقدمة في إعداد التقارير الفنية المتخصصة التي تدعم الإجراءات القانونية والقضايا التأمينية والقضائية المعقدة، مع ضمان الامتثال لجميع المعايير القانونية والعلمية الدولية.' :
                  'Our team has extensive and advanced experience in preparing specialized technical reports that support legal procedures and complex insurance and judicial cases, ensuring compliance with all international legal and scientific standards.'
                }
              </p>
              <div className="space-y-2">
                {[
                  language === 'ar' ? 'تقارير معتمدة قانونياً ودولياً' : 'Legally and internationally certified reports',
                  language === 'ar' ? 'شهادة خبراء معتمدة في المحاكم' : 'Certified expert testimony in courts',
                  language === 'ar' ? 'استشارات قانونية فنية متقدمة' : 'Advanced technical legal consultations',
                  language === 'ar' ? 'دعم قضائي شامل ومتخصص' : 'Comprehensive and specialized judicial support'
                ].map((item, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Distinguished Case Studies */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {language === 'ar' ? 'دراسات حالة متميزة ومعقدة' : 'Distinguished and Complex Case Studies'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-red-600">
              <div className="flex items-center mb-4">
                <Flame className="h-8 w-8 text-red-600 mr-3" />
                <h3 className="text-xl font-semibold">
                  {language === 'ar' ? 'حريق مجمع تجاري استراتيجي كبير' : 'Major Strategic Commercial Complex Fire'}
                </h3>
              </div>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {language === 'ar' ? 
                  'تحقيق شامل ومتقدم في حريق مجمع تجاري استراتيجي كبير أدى إلى أضرار بقيمة 15 مليون ريال، حيث تم تحديد السبب الجذري الحقيقي خلال 48 ساعة وإعداد تقرير فني مفصل ومتقدم بـ 127 صفحة مع 340 دليل مادي.' :
                  'Comprehensive and advanced investigation of a major strategic commercial complex fire that caused 15 million SAR in damages, where the real root cause was identified within 48 hours and a detailed and advanced 127-page technical report was prepared with 340 pieces of physical evidence.'
                }
              </p>
              <div className="bg-red-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <Eye className="h-5 w-5 text-red-600 mr-2" />
                  <strong className="text-red-800">
                    {language === 'ar' ? 'النتائج المحققة:' : 'Achieved Results:'}
                  </strong>
                </div>
                <ul className="text-sm text-red-700 space-y-1">
                  <li>• {language === 'ar' ? 'تحديد السبب الحقيقي خلال 48 ساعة' : 'Real cause identified within 48 hours'}</li>
                  <li>• {language === 'ar' ? 'تبرئة المالك من التهم الجنائية' : 'Owner cleared of criminal charges'}</li>
                  <li>• {language === 'ar' ? 'استرداد 12 مليون ريال من التأمين' : 'Recovery of 12 million SAR from insurance'}</li>
                  <li>• {language === 'ar' ? 'كشف عيوب في النظام الكهربائي' : 'Uncovered electrical system defects'}</li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-orange-600">
              <div className="flex items-center mb-4">
                <Zap className="h-8 w-8 text-orange-600 mr-3" />
                <h3 className="text-xl font-semibold">
                  {language === 'ar' ? 'انفجار في منشأة صناعية استراتيجية' : 'Strategic Industrial Facility Explosion'}
                </h3>
              </div>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {language === 'ar' ? 
                  'تحليل متقدم ومعقد لانفجار في منشأة صناعية استراتيجية مع تحديد نوع المتفجرات المستخدمة وطريقة التفجير المتطورة والآثار الناتجة، مما ساعد في كشف الحقائق الكاملة وتحديد المسؤوليات بدقة علمية مطلقة.' :
                  'Advanced and complex analysis of an explosion in a strategic industrial facility with identification of the type of explosives used, sophisticated detonation method, and resulting effects, helping uncover complete facts and determine responsibilities with absolute scientific precision.'
                }
              </p>
              <div className="bg-orange-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <Target className="h-5 w-5 text-orange-600 mr-2" />
                  <strong className="text-orange-800">
                    {language === 'ar' ? 'الإنجازات المحققة:' : 'Achievements Accomplished:'}
                  </strong>
                </div>
                <ul className="text-sm text-orange-700 space-y-1">
                  <li>• {language === 'ar' ? 'كشف العمل الإجرامي المنظم' : 'Uncovered organized criminal activity'}</li>
                  <li>• {language === 'ar' ? 'إحالة 8 متهمين للنيابة العامة' : 'Referred 8 suspects to public prosecution'}</li>
                  <li>• {language === 'ar' ? 'منع أضرار إضافية بـ 25 مليون ريال' : 'Prevented additional damages of 25 million SAR'}</li>
                  <li>• {language === 'ar' ? 'تطوير نظام أمان متقدم' : 'Developed advanced security system'}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Safety Protocols Section */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {language === 'ar' ? 'بروتوكولات السلامة المتقدمة' : 'Advanced Safety Protocols'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Shield,
                title: language === 'ar' ? 'معدات الحماية المتقدمة' : 'Advanced Protective Equipment',
                desc: language === 'ar' ? 'استخدام أحدث معدات الحماية الشخصية والجماعية المعتمدة دولياً' : 'Use of latest internationally certified personal and collective protective equipment'
              },
              {
                icon: AlertTriangle,
                title: language === 'ar' ? 'إجراءات الطوارئ الشاملة' : 'Comprehensive Emergency Procedures',
                desc: language === 'ar' ? 'خطط طوارئ شاملة ومتقدمة لجميع المواقف والسيناريوهات المحتملة' : 'Comprehensive and advanced emergency plans for all possible situations and scenarios'
              },
              {
                icon: Users,
                title: language === 'ar' ? 'التدريب المستمر المتقدم' : 'Advanced Continuous Training',
                desc: language === 'ar' ? 'تدريب مستمر ومتقدم على أحدث تقنيات السلامة والحماية العالمية' : 'Continuous and advanced training on latest global safety and protection techniques'
              }
            ].map((item, index) => (
              <div key={index} className="text-center bg-white p-6 rounded-lg shadow-md">
                <div className="bg-yellow-200 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="h-8 w-8 text-yellow-800" />
                </div>
                <h3 className="font-semibold mb-2 text-lg">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Advanced Technology Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {language === 'ar' ? 'التقنيات المتقدمة المستخدمة' : 'Advanced Technologies Used'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-blue-800 mb-4">
                {language === 'ar' ? 'تقنيات تحليل الحرائق' : 'Fire Analysis Technologies'}
              </h3>
              {[
                language === 'ar' ? 'التصوير الحراري عالي الدقة' : 'High-precision thermal imaging',
                language === 'ar' ? 'التحليل الطيفي للمواد المحترقة' : 'Spectral analysis of burned materials',
                language === 'ar' ? 'المحاكاة الحاسوبية للحرائق' : 'Computer fire simulation',
                language === 'ar' ? 'تحليل الغازات والأبخرة' : 'Gas and vapor analysis'
              ].map((tech, index) => (
                <div key={index} className="flex items-center">
                  <Microscope className="h-5 w-5 text-blue-600 mr-3" />
                  <span className="text-gray-700">{tech}</span>
                </div>
              ))}
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-orange-800 mb-4">
                {language === 'ar' ? 'تقنيات تحليل المتفجرات' : 'Explosives Analysis Technologies'}
              </h3>
              {[
                language === 'ar' ? 'كشف بقايا المتفجرات المتقدم' : 'Advanced explosive residue detection',
                language === 'ar' ? 'التحليل الكيميائي المتطور' : 'Advanced chemical analysis',
                language === 'ar' ? 'فحص الشظايا والمعادن' : 'Fragment and metal examination',
                language === 'ar' ? 'تحليل موجات الانفجار' : 'Blast wave analysis'
              ].map((tech, index) => (
                <div key={index} className="flex items-center">
                  <Search className="h-5 w-5 text-orange-600 mr-3" />
                  <span className="text-gray-700">{tech}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-800 to-blue-900 text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {language === 'ar' ? 'هل تحتاج خبير متخصص في الحرائق والمفرقعات؟' : 'Do You Need a Specialized Fire & Explosives Expert?'}
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-4xl mx-auto leading-relaxed">
            {language === 'ar' ? 
              'تواصل معنا اليوم للحصول على استشارة متخصصة ومتقدمة في تحقيقات الحرائق وتحليل المفرقعات من خبراء معتمدين دولياً ذوي خبرة عالية وواسعة في هذا المجال المتخصص والحساس. نحن هنا لخدمتك على مدار الساعة.' :
              'Contact us today for specialized and advanced consultation in fire investigations and explosives analysis from internationally certified experts with high and extensive expertise in this specialized and sensitive field. We are here to serve you around the clock.'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-600 transition-colors text-lg shadow-lg"
            >
              {language === 'ar' ? 'احجز استشارة متخصصة' : 'Book Specialized Consultation'}
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-800 transition-colors text-lg"
            >
              {language === 'ar' ? 'اتصل بنا الآن' : 'Contact Us Now'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExplosivesAnalysis;