import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Search, FileText, Shield, CheckCircle, Eye, Microscope, Scale, Camera, Award, AlertTriangle, Target } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const Forensics = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen py-16" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Users className="h-16 w-16 text-blue-800 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {language === 'ar' ? 'الأدلة الجنائية والطب الشرعي' : 'Forensic Evidence & Medicine'}
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {language === 'ar' ? 
              'نقدم خدمات متخصصة ومتقدمة في تحليل الأدلة الجنائية والطب الشرعي، تشمل تحليل مسارح الجرائم المعقدة وفحص الأسلحة والمفرقعات وقضايا التزييف والتزوير والتحاليل البيولوجية المتقدمة وتحديد أسباب الوفاة بأعلى المعايير العلمية والدولية المعتمدة.' :
              'We provide specialized and advanced services in forensic evidence analysis and forensic medicine, including complex crime scene analysis, weapons and explosives examination, forgery and counterfeiting cases, advanced biological analysis, and death cause determination with the highest certified scientific and international standards.'
            }
          </p>
        </div>

        {/* Main Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Crime Scene Analysis */}
          <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-blue-600">
            <div className="flex items-center mb-6">
              <Search className="h-12 w-12 text-blue-800 mr-4" />
              <h3 className="text-2xl font-semibold text-gray-900">
                {language === 'ar' ? 'تحليل مسارح الجرائم المتقدم' : 'Advanced Crime Scene Analysis'}
              </h3>
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {language === 'ar' ? 
                'نقوم بتحليل شامل ومنهجي متقدم لمسارح الجرائم المعقدة باستخدام أحدث التقنيات العلمية والأدوات المتطورة عالمياً لجمع وتحليل الأدلة الجنائية، مع ضمان سلامة سلسلة الأدلة والحفاظ على سريتها وفقاً للمعايير الدولية.' :
                'We conduct comprehensive and advanced systematic analysis of complex crime scenes using the latest global scientific techniques and advanced tools for collecting and analyzing forensic evidence, ensuring evidence chain integrity and confidentiality according to international standards.'
              }
            </p>
            <div className="space-y-3">
              {[
                language === 'ar' ? 'توثيق وتصوير مسرح الجريمة بدقة عالية ثلاثية الأبعاد' : 'High-precision 3D crime scene documentation and photography',
                language === 'ar' ? 'جمع وحفظ الأدلة المادية والبيولوجية المتقدمة' : 'Advanced physical and biological evidence collection and preservation',
                language === 'ar' ? 'تحليل أنماط الدم والبصمات بالتقنيات المتطورة' : 'Blood pattern and fingerprint analysis with advanced techniques',
                language === 'ar' ? 'إعادة بناء الأحداث والتسلسل الزمني المفصل' : 'Detailed event reconstruction and timeline analysis',
                language === 'ar' ? 'تحليل الحمض النووي والبصمة الوراثية المتقدمة' : 'Advanced DNA analysis and genetic fingerprinting',
                language === 'ar' ? 'فحص الآثار الرقمية والإلكترونية المعقدة' : 'Complex digital and electronic trace examination'
              ].map((item, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Weapons and Explosives */}
          <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-red-600">
            <div className="flex items-center mb-6">
              <Shield className="h-12 w-12 text-red-600 mr-4" />
              <h3 className="text-2xl font-semibold text-gray-900">
                {language === 'ar' ? 'فحص الأسلحة والمفرقعات المتخصص' : 'Specialized Weapons and Explosives Examination'}
              </h3>
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {language === 'ar' ? 
                'نقدم خدمات فحص وتحليل متقدمة للأسلحة النارية والمفرقعات والمواد الخطرة، بما في ذلك تحديد نوع السلاح وتحليل المقذوفات والبقايا المتفجرة المعقدة، مع إعداد تقارير فنية مفصلة ومتقدمة تدعم الإجراءات القانونية والقضائية.' :
                'We provide advanced examination and analysis services for firearms, explosives, and hazardous materials, including weapon type identification, projectile analysis, and complex explosive residue analysis, with detailed and advanced technical reports supporting legal and judicial procedures.'
              }
            </p>
            <div className="space-y-3">
              {[
                language === 'ar' ? 'فحص الأسلحة النارية وتحديد خصائصها الفريدة' : 'Firearm examination and unique characteristic identification',
                language === 'ar' ? 'تحليل المقذوفات والخراطيش الفارغة المتقدم' : 'Advanced bullet and cartridge case analysis',
                language === 'ar' ? 'فحص بقايا البارود والمتفجرات بالتقنيات الحديثة' : 'Gunshot and explosive residue examination with modern techniques',
                language === 'ar' ? 'تحليل المواد المتفجرة وآثارها المعقدة' : 'Explosive material and complex trace analysis',
                language === 'ar' ? 'تحديد مسافة إطلاق النار والزوايا' : 'Shooting distance and angle determination',
                language === 'ar' ? 'فحص الأجهزة المتفجرة المرتجلة والمتطورة' : 'Improvised and sophisticated explosive device examination'
              ].map((item, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Specialized Services Grid */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {language === 'ar' ? 'خدمات متخصصة إضافية متقدمة' : 'Advanced Additional Specialized Services'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {[
              {
                icon: FileText,
                title: language === 'ar' ? 'قضايا التزييف والتزوير المعقدة' : 'Complex Forgery and Counterfeiting Cases',
                desc: language === 'ar' ? 
                  'فحص متقدم للوثائق والتوقيعات والعملات والشهادات المزيفة باستخدام تقنيات متطورة للكشف عن التلاعب والتزوير والتحليل الطيفي المتقدم' :
                  'Advanced examination of documents, signatures, currencies, and counterfeit certificates using sophisticated techniques for detecting manipulation, forgery, and advanced spectral analysis',
                color: 'blue',
                features: [
                  language === 'ar' ? 'فحص الوثائق الرسمية والهوية' : 'Official documents and identity examination',
                  language === 'ar' ? 'تحليل التوقيعات والخطوط' : 'Signature and handwriting analysis',
                  language === 'ar' ? 'كشف العملات المزيفة المتطورة' : 'Advanced counterfeit currency detection',
                  language === 'ar' ? 'فحص الأختام والطوابع' : 'Seal and stamp examination'
                ]
              },
              {
                icon: Microscope,
                title: language === 'ar' ? 'التحاليل البيولوجية المتقدمة' : 'Advanced Biological Analysis',
                desc: language === 'ar' ? 
                  'تحليل متقدم للعينات البيولوجية والحمض النووي لتحديد الهوية والقرابة وربط الأدلة بالمشتبه بهم باستخدام أحدث تقنيات التحليل الجيني' :
                  'Advanced analysis of biological samples and DNA for identity and kinship determination and linking evidence to suspects using the latest genetic analysis techniques',
                color: 'green',
                features: [
                  language === 'ar' ? 'تحليل الحمض النووي المتقدم' : 'Advanced DNA analysis',
                  language === 'ar' ? 'تحديد الهوية والقرابة' : 'Identity and kinship determination',
                  language === 'ar' ? 'فحص العينات المتدهورة' : 'Degraded sample examination',
                  language === 'ar' ? 'التحليل الجيني المقارن' : 'Comparative genetic analysis'
                ]
              },
              {
                icon: Scale,
                title: language === 'ar' ? 'تحديد أسباب الوفاة المتقدم' : 'Advanced Death Cause Determination',
                desc: language === 'ar' ? 
                  'فحص طبي شرعي شامل ومتقدم لتحديد أسباب وظروف الوفاة مع تحليل الإصابات والعوامل المساهمة والتحليل السمي المتقدم' :
                  'Comprehensive and advanced forensic medical examination to determine causes and circumstances of death with injury analysis, contributing factors, and advanced toxicological analysis',
                color: 'red',
                features: [
                  language === 'ar' ? 'الفحص الطبي الشرعي الشامل' : 'Comprehensive forensic medical examination',
                  language === 'ar' ? 'تحليل الإصابات والجروح' : 'Injury and wound analysis',
                  language === 'ar' ? 'التحليل السمي المتقدم' : 'Advanced toxicological analysis',
                  language === 'ar' ? 'تحديد زمن الوفاة' : 'Time of death determination'
                ]
              }
            ].map((service, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className={`bg-${service.color}-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4`}>
                  <service.icon className={`h-8 w-8 text-${service.color}-800`} />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-center">{service.title}</h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{service.desc}</p>
                <div className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-xs text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Our Advanced Methodology */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {language === 'ar' ? 'منهجيتنا العلمية المتقدمة والمعتمدة دولياً' : 'Our Advanced and Internationally Certified Scientific Methodology'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-8 border-t-4 border-blue-600">
              <Camera className="h-10 w-10 text-blue-800 mb-4" />
              <h3 className="text-xl font-semibold mb-4">
                {language === 'ar' ? 'التوثيق والتصوير المتقدم عالي الدقة' : 'High-Precision Advanced Documentation and Photography'}
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {language === 'ar' ? 
                  'نستخدم أحدث تقنيات التصوير والتوثيق المتطورة لضمان حفظ الأدلة بأعلى جودة ودقة ممكنة، مع الالتزام الصارم بالمعايير الدولية لسلسلة الأدلة والحفاظ على سريتها وأمانها التام.' :
                  'We use the latest advanced photography and documentation techniques to ensure evidence preservation with the highest possible quality and accuracy, with strict adherence to international evidence chain standards and maintaining complete confidentiality and security.'
                }
              </p>
              <div className="space-y-2">
                {[
                  language === 'ar' ? 'التصوير عالي الدقة والتصوير المجهري المتقدم' : 'High-resolution and advanced microscopic photography',
                  language === 'ar' ? 'التصوير ثلاثي الأبعاد والمسح الضوئي المتطور' : 'Advanced 3D photography and optical scanning',
                  language === 'ar' ? 'التوثيق الرقمي المتقدم والأرشفة الآمنة المشفرة' : 'Advanced digital documentation and encrypted secure archiving',
                  language === 'ar' ? 'تقنيات التصوير الطيفي والحراري' : 'Spectral and thermal imaging techniques'
                ].map((item, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 border-t-4 border-green-600">
              <Eye className="h-10 w-10 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold mb-4">
                {language === 'ar' ? 'التحليل المختبري المتخصص والمعتمد' : 'Specialized and Certified Laboratory Analysis'}
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {language === 'ar' ? 
                  'نتعامل مع شبكة من المختبرات المعتمدة والمتطورة عالمياً لإجراء التحاليل المختلفة والمعقدة، مع ضمان دقة النتائج وسرعة الحصول عليها وفقاً لأعلى المعايير العلمية والقانونية الدولية.' :
                  'We work with a network of globally accredited and advanced laboratories for various complex analyses, ensuring result accuracy and quick turnaround times according to the highest international scientific and legal standards.'
                }
              </p>
              <div className="space-y-2">
                {[
                  language === 'ar' ? 'التحليل الكيميائي والطيفي المتقدم عالي الدقة' : 'High-precision advanced chemical and spectral analysis',
                  language === 'ar' ? 'تحليل الحمض النووي والبصمة الوراثية المتطورة' : 'Advanced DNA analysis and genetic fingerprinting',
                  language === 'ar' ? 'الفحص المجهري والتحليل الدقيق المتخصص' : 'Specialized microscopic examination and precise analysis',
                  language === 'ar' ? 'التحليل السمي والكيميائي الشامل' : 'Comprehensive toxicological and chemical analysis'
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

        {/* Distinguished Case Examples */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {language === 'ar' ? 'أمثلة من قضايانا المتميزة والمعقدة' : 'Examples of Our Distinguished and Complex Cases'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-red-600">
              <div className="flex items-center mb-4">
                <Target className="h-8 w-8 text-red-600 mr-3" />
                <h3 className="text-xl font-semibold">
                  {language === 'ar' ? 'قضية جريمة قتل معقدة ومتشابكة' : 'Complex and Intricate Murder Case'}
                </h3>
              </div>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {language === 'ar' ? 
                  'تحليل شامل ومتقدم لمسرح جريمة معقد ومتشابك تضمن فحص 127 قطعة دليل بيولوجي وتحليل أنماط الدم المعقدة وإعادة بناء الأحداث بالتفصيل، مما ساعد في كشف الحقيقة وتحديد الجاني بدقة علمية مطلقة خلال 72 ساعة.' :
                  'Comprehensive and advanced analysis of a complex and intricate crime scene including examination of 127 pieces of biological evidence, complex blood pattern analysis, and detailed event reconstruction, helping reveal the truth and identify the perpetrator with absolute scientific precision within 72 hours.'
                }
              </p>
              <div className="bg-red-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <Award className="h-5 w-5 text-red-600 mr-2" />
                  <strong className="text-red-800">
                    {language === 'ar' ? 'النتائج المحققة:' : 'Achieved Results:'}
                  </strong>
                </div>
                <ul className="text-sm text-red-700 space-y-1">
                  <li>• {language === 'ar' ? 'تحديد الجاني بدقة 100% خلال 72 ساعة' : '100% accurate perpetrator identification within 72 hours'}</li>
                  <li>• {language === 'ar' ? 'إدانة قضائية نهائية بناءً على الأدلة العلمية' : 'Final judicial conviction based on scientific evidence'}</li>
                  <li>• {language === 'ar' ? 'كشف شبكة إجرامية مكونة من 7 أشخاص' : 'Uncovered criminal network of 7 individuals'}</li>
                  <li>• {language === 'ar' ? 'استرداد ممتلكات بقيمة 1.8 مليون ريال' : 'Recovery of assets worth 1.8 million SAR'}</li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-blue-600">
              <div className="flex items-center mb-4">
                <FileText className="h-8 w-8 text-blue-600 mr-3" />
                <h3 className="text-xl font-semibold">
                  {language === 'ar' ? 'قضية تزوير وثائق رسمية معقدة' : 'Complex Official Document Forgery Case'}
                </h3>
              </div>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {language === 'ar' ? 
                  'فحص دقيق ومتقدم لأكثر من 340 وثيقة رسمية مشكوك في صحتها باستخدام تقنيات متقدمة ومتطورة، وتحديد العناصر المزورة والأساليب المستخدمة في التزوير مع تقديم أدلة قاطعة ومفصلة أدت لكشف شبكة دولية.' :
                  'Precise and advanced examination of more than 340 suspected official documents using advanced and sophisticated techniques, identifying forged elements and methods used in forgery with conclusive and detailed evidence that led to uncovering an international network.'
                }
              </p>
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <Shield className="h-5 w-5 text-blue-600 mr-2" />
                  <strong className="text-blue-800">
                    {language === 'ar' ? 'الإنجازات المحققة:' : 'Achievements Accomplished:'}
                  </strong>
                </div>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• {language === 'ar' ? 'كشف شبكة تزوير دولية في 4 دول' : 'Uncovered international forgery network in 4 countries'}</li>
                  <li>• {language === 'ar' ? 'إحالة 23 متهم للقضاء مع أدلة دامغة' : 'Referred 23 suspects to judiciary with conclusive evidence'}</li>
                  <li>• {language === 'ar' ? 'منع أضرار مالية بقيمة 12 مليون ريال' : 'Prevented financial damages worth 12 million SAR'}</li>
                  <li>• {language === 'ar' ? 'تطوير نظام كشف متقدم للتزوير' : 'Developed advanced forgery detection system'}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Quality Assurance Section */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {language === 'ar' ? 'ضمان الجودة والدقة العلمية المطلقة' : 'Absolute Quality and Scientific Accuracy Assurance'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                number: '100%',
                title: language === 'ar' ? 'دقة النتائج العلمية' : 'Scientific Result Accuracy',
                desc: language === 'ar' ? 'نضمن دقة النتائج بنسبة 100% وفقاً للمعايير العلمية الدولية' : 'We guarantee 100% result accuracy according to international scientific standards'
              },
              {
                number: '24',
                title: language === 'ar' ? 'ساعة للتقرير الأولي' : 'Hours for Initial Report',
                desc: language === 'ar' ? 'متوسط وقت التقرير الأولي للحالات العاجلة والحرجة' : 'Average initial report time for urgent and critical cases'
              },
              {
                number: '25+',
                title: language === 'ar' ? 'سنة خبرة متراكمة' : 'Years Accumulated Experience',
                desc: language === 'ar' ? 'خبرة متراكمة في مجال الأدلة الجنائية والطب الشرعي' : 'Accumulated experience in forensic evidence and forensic medicine'
              },
              {
                number: '1500+',
                title: language === 'ar' ? 'قضية ناجحة' : 'Successful Cases',
                desc: language === 'ar' ? 'قضية تم حلها بنجاح بأعلى معايير الدقة والمهنية' : 'Cases successfully solved with highest standards of accuracy and professionalism'
              }
            ].map((stat, index) => (
              <div key={index} className="text-center bg-white p-6 rounded-lg shadow-md">
                <div className="bg-blue-800 text-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">{stat.number}</span>
                </div>
                <h3 className="font-semibold mb-2 text-lg">{stat.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* International Certifications */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {language === 'ar' ? 'الشهادات والاعتمادات الدولية' : 'International Certifications and Accreditations'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: language === 'ar' ? 'شهادات الطب الشرعي الدولية' : 'International Forensic Medicine Certifications',
                org: language === 'ar' ? 'الجمعية الدولية للطب الشرعي' : 'International Association of Forensic Medicine',
                year: '2018-2024'
              },
              {
                title: language === 'ar' ? 'اعتماد تحليل الأدلة الجنائية' : 'Forensic Evidence Analysis Accreditation',
                org: language === 'ar' ? 'المعهد الأمريكي للعلوم الجنائية' : 'American Institute of Forensic Sciences',
                year: '2019-2024'
              },
              {
                title: language === 'ar' ? 'شهادة خبير الحمض النووي' : 'DNA Expert Certification',
                org: language === 'ar' ? 'المختبر الأوروبي للجينات' : 'European Genetics Laboratory',
                year: '2020-2024'
              }
            ].map((cert, index) => (
              <div key={index} className="text-center p-6 border border-gray-200 rounded-lg">
                <Award className="h-12 w-12 text-blue-800 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">{cert.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{cert.org}</p>
                <p className="text-blue-800 font-medium text-sm">{cert.year}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-800 to-blue-900 text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {language === 'ar' ? 'هل تحتاج خبير متخصص في الأدلة الجنائية؟' : 'Do You Need a Specialized Forensic Evidence Expert?'}
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-4xl mx-auto leading-relaxed">
            {language === 'ar' ? 
              'تواصل معنا اليوم للحصول على استشارة متخصصة ومتقدمة في الأدلة الجنائية والطب الشرعي من خبراء معتمدين دولياً ذوي خبرة عالية وواسعة في هذا المجال المتخصص والحساس. فريقنا جاهز لخدمتك على مدار الساعة.' :
              'Contact us today for specialized and advanced consultation in forensic evidence and forensic medicine from internationally certified experts with high and extensive expertise in this specialized and sensitive field. Our team is ready to serve you around the clock.'
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

export default Forensics;