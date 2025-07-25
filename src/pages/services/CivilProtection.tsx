import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, FileText, Flame, AlertTriangle, CheckCircle, Users, Building, Truck, Phone, Award, Search, Eye } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const CivilProtection = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen py-16" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Shield className="h-16 w-16 text-blue-800 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {language === 'ar' ? 'استشارات الحماية المدنية' : 'Civil Protection Consulting'}
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {language === 'ar' ? 
              'نقدم استشارات فنية متخصصة في مجال الحماية المدنية تشمل خدمات الإطفاء والإنقاذ البري والنهري، تفتيش المنشآت الهامة، وإعداد التقارير الفنية المتخصصة بعد المعاينة الميدانية. فريقنا من الخبراء الذين شغلوا مناصب قيادية في الحماية المدنية يضمن تقديم أعلى مستويات الخدمة المهنية.' :
              'We provide specialized technical consulting in civil protection including fire services, land and water rescue operations, critical facility inspections, and preparation of specialized technical reports after field inspection. Our team of experts who held leadership positions in civil protection ensures the highest levels of professional service.'
            }
          </p>
        </div>

        {/* Main Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Fire and Rescue Services */}
          <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-red-500">
            <div className="flex items-center mb-6">
              <Flame className="h-12 w-12 text-red-600 mr-4" />
              <h3 className="text-2xl font-semibold text-gray-900">
                {language === 'ar' ? 'خدمات الإطفاء والإنقاذ' : 'Fire and Rescue Services'}
              </h3>
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {language === 'ar' ? 
                'نقدم استشارات متخصصة في تخطيط وتنفيذ عمليات الإطفاء والإنقاذ البري والنهري، بما في ذلك تقييم المخاطر ووضع خطط الطوارئ وتدريب الفرق المتخصصة على أحدث التقنيات والأساليب العملية المعتمدة دولياً.' :
                'We provide specialized consulting in planning and implementing fire and rescue operations including land and water rescue, risk assessment, emergency planning, and training specialized teams on the latest internationally approved techniques and practical methods.'
              }
            </p>
            <div className="space-y-3">
              {[
                language === 'ar' ? 'تقييم مخاطر الحريق والسلامة العامة' : 'Fire and general safety risk assessment',
                language === 'ar' ? 'وضع خطط الإخلاء والطوارئ المتقدمة' : 'Advanced evacuation and emergency planning',
                language === 'ar' ? 'تدريب فرق الإطفاء والإنقاذ المتخصصة' : 'Specialized fire and rescue team training',
                language === 'ar' ? 'عمليات الإنقاذ البري والنهري والجوي' : 'Land, water, and aerial rescue operations',
                language === 'ar' ? 'تصميم أنظمة الإنذار المبكر والكشف' : 'Early warning and detection system design'
              ].map((item, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Facility Inspections */}
          <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-blue-500">
            <div className="flex items-center mb-6">
              <Building className="h-12 w-12 text-blue-800 mr-4" />
              <h3 className="text-2xl font-semibold text-gray-900">
                {language === 'ar' ? 'تفتيش المنشآت الهامة' : 'Critical Facility Inspections'}
              </h3>
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {language === 'ar' ? 
                'نقوم بتفتيش المنشآت الحيوية والهامة لضمان الامتثال لمعايير السلامة والحماية المدنية المحلية والدولية، مع إعداد تقارير فنية شاملة تتضمن التوصيات والإجراءات التصحيحية المطلوبة لرفع مستوى السلامة.' :
                'We conduct inspections of vital and important facilities to ensure compliance with local and international safety and civil protection standards, with comprehensive technical reports including recommendations and required corrective actions to improve safety levels.'
              }
            </p>
            <div className="space-y-3">
              {[
                language === 'ar' ? 'تفتيش المصانع والمنشآت الصناعية الكبرى' : 'Major factory and industrial facility inspections',
                language === 'ar' ? 'تقييم أنظمة السلامة والإنذار المتقدمة' : 'Advanced safety and alarm system evaluation',
                language === 'ar' ? 'فحص معدات الإطفاء والسلامة المهنية' : 'Fire equipment and occupational safety inspection',
                language === 'ar' ? 'تقييم مخارج الطوارئ وطرق الإخلاء الآمنة' : 'Emergency exit and safe evacuation route assessment',
                language === 'ar' ? 'مراجعة خطط الطوارئ والاستجابة السريعة' : 'Emergency and rapid response plan review'
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
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg p-8 mb-16">
          <div className="text-center mb-8">
            <FileText className="h-12 w-12 text-blue-800 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {language === 'ar' ? 'التقارير الفنية المتخصصة' : 'Specialized Technical Reports'}
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              {language === 'ar' ? 
                'نعد تقارير فنية شاملة ومفصلة بعد المعاينة الميدانية الدقيقة، تدعم القضايا القانونية والتأمينية وتساعد في اتخاذ القرارات الصحيحة بناءً على الأدلة العلمية والفنية الموثقة والمعتمدة.' :
                'We prepare comprehensive and detailed technical reports after precise field inspection, supporting legal and insurance cases and helping make correct decisions based on documented and certified scientific and technical evidence.'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: AlertTriangle,
                title: language === 'ar' ? 'تقارير الحوادث والطوارئ' : 'Incident and Emergency Reports',
                desc: language === 'ar' ? 
                  'تحليل شامل للحوادث وأسبابها الجذرية مع التوصيات الفنية المتقدمة للوقاية والتحسين المستمر' :
                  'Comprehensive analysis of incidents and their root causes with advanced technical recommendations for prevention and continuous improvement',
                color: 'red'
              },
              {
                icon: Shield,
                title: language === 'ar' ? 'تقارير السلامة والامتثال' : 'Safety and Compliance Reports',
                desc: language === 'ar' ? 
                  'تقييم شامل لمستوى السلامة والامتثال للمعايير المحلية والدولية في المنشآت والمرافق الحيوية' :
                  'Comprehensive assessment of safety levels and compliance with local and international standards in vital facilities and installations',
                color: 'green'
              },
              {
                icon: Search,
                title: language === 'ar' ? 'تقارير تقييم المخاطر المتقدمة' : 'Advanced Risk Assessment Reports',
                desc: language === 'ar' ? 
                  'تحديد وتقييم المخاطر المحتملة والناشئة مع خطط التخفيف والوقاية الشاملة والمتطورة' :
                  'Identification and assessment of potential and emerging risks with comprehensive and advanced mitigation and prevention plans',
                color: 'orange'
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

        {/* Our Expertise Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {language === 'ar' ? 'خبرتنا المتميزة في الحماية المدنية' : 'Our Distinguished Civil Protection Expertise'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-8 border-t-4 border-blue-800">
              <Users className="h-10 w-10 text-blue-800 mb-4" />
              <h3 className="text-xl font-semibold mb-4">
                {language === 'ar' ? 'فريق من الخبراء المتخصصين ذوي الخبرة العالية' : 'Team of Highly Experienced Specialized Experts'}
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {language === 'ar' ? 
                  'فريقنا يضم خبراء سابقين في الحماية المدنية شغلوا مناصب قيادية عليا في الجهات الحكومية المختصة والمؤسسات الدولية، مما يضمن جودة الخدمة العالية والدقة المتناهية في التقييم والتوصيات الفنية المتقدمة.' :
                  'Our team includes former civil protection experts who held senior leadership positions in relevant government agencies and international institutions, ensuring high service quality and utmost precision in assessment and advanced technical recommendations.'
                }
              </p>
              <div className="space-y-2">
                {[
                  language === 'ar' ? 'خبرة تزيد عن 25 عاماً في المجال المتخصص' : 'Over 25 years of specialized field experience',
                  language === 'ar' ? 'شهادات مهنية معتمدة دولياً ومحلياً' : 'Internationally and locally certified professional credentials',
                  language === 'ar' ? 'تدريب مستمر على أحدث التقنيات والمعايير' : 'Continuous training on latest technologies and standards',
                  language === 'ar' ? 'مشاركة في مشاريع دولية كبرى' : 'Participation in major international projects'
                ].map((item, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 border-t-4 border-green-600">
              <Truck className="h-10 w-10 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold mb-4">
                {language === 'ar' ? 'معدات وتقنيات متقدمة عالمية المستوى' : 'World-Class Advanced Equipment and Technologies'}
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {language === 'ar' ? 
                  'نستخدم أحدث المعدات والتقنيات المتطورة في عمليات التفتيش والتقييم والتحليل، مما يضمن الحصول على نتائج دقيقة وموثوقة تدعم التوصيات الفنية والقرارات الإدارية الاستراتيجية بأعلى مستويات الجودة.' :
                  'We use the latest advanced equipment and technologies in inspection, assessment, and analysis operations, ensuring accurate and reliable results that support technical recommendations and strategic administrative decisions with the highest quality levels.'
                }
              </p>
              <div className="space-y-2">
                {[
                  language === 'ar' ? 'أجهزة قياس وكشف متطورة عالية الدقة' : 'High-precision advanced measuring and detection devices',
                  language === 'ar' ? 'تقنيات التصوير الحراري والرقمي المتقدمة' : 'Advanced thermal and digital imaging technologies',
                  language === 'ar' ? 'برامج المحاكاة والتحليل المتقدمة' : 'Advanced simulation and analysis software',
                  language === 'ar' ? 'أنظمة مراقبة وتتبع ذكية' : 'Smart monitoring and tracking systems'
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

        {/* Success Stories */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {language === 'ar' ? 'قصص نجاح وإنجازات متميزة' : 'Success Stories and Distinguished Achievements'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-blue-600">
              <div className="flex items-center mb-4">
                <Award className="h-8 w-8 text-blue-600 mr-3" />
                <h3 className="text-xl font-semibold">
                  {language === 'ar' ? 'تفتيش مجمع صناعي استراتيجي كبير' : 'Major Strategic Industrial Complex Inspection'}
                </h3>
              </div>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {language === 'ar' ? 
                  'قمنا بتفتيش شامل ومتقدم لمجمع صناعي استراتيجي يضم أكثر من 15 مصنعاً ومرفقاً حيوياً، وأعددنا تقريراً فنياً مفصلاً ومتقدماً حدد 47 نقطة ضعف في أنظمة السلامة وقدم 85 توصية شاملة للتحسين والامتثال للمعايير الدولية المتقدمة.' :
                  'We conducted a comprehensive and advanced inspection of a strategic industrial complex comprising more than 15 factories and vital facilities, and prepared a detailed and advanced technical report identifying 47 weaknesses in safety systems and providing 85 comprehensive recommendations for improvement and compliance with advanced international standards.'
                }
              </p>
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <Eye className="h-5 w-5 text-blue-600 mr-2" />
                  <strong className="text-blue-800">
                    {language === 'ar' ? 'النتائج المحققة:' : 'Achieved Results:'}
                  </strong>
                </div>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• {language === 'ar' ? 'تحسين مستوى السلامة بنسبة 92%' : '92% improvement in safety level'}</li>
                  <li>• {language === 'ar' ? 'تجنب 12 حادثة محتملة خطيرة' : 'Prevention of 12 potential serious incidents'}</li>
                  <li>• {language === 'ar' ? 'توفير 2.3 مليون ريال في التكاليف' : 'Savings of 2.3 million SAR in costs'}</li>
                  <li>• {language === 'ar' ? 'حصول على شهادة الامتثال الدولية' : 'Obtaining international compliance certification'}</li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-green-600">
              <div className="flex items-center mb-4">
                <Flame className="h-8 w-8 text-green-600 mr-3" />
                <h3 className="text-xl font-semibold">
                  {language === 'ar' ? 'تدريب فريق إطفاء متخصص متقدم' : 'Advanced Specialized Fire Team Training'}
                </h3>
              </div>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {language === 'ar' ? 
                  'دربنا فريق إطفاء متخصص مكون من 45 عضواً في إحدى أكبر الشركات الصناعية على أحدث تقنيات مكافحة الحرائق والإنقاذ المتقدمة، مع التركيز على الحالات الطارئة المعقدة والتعامل مع المواد الخطرة والكيميائية.' :
                  'We trained a specialized fire team of 45 members at one of the largest industrial companies on the latest advanced firefighting and rescue techniques, focusing on complex emergency situations and handling hazardous and chemical materials.'
                }
              </p>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <Users className="h-5 w-5 text-green-600 mr-2" />
                  <strong className="text-green-800">
                    {language === 'ar' ? 'الإنجازات المحققة:' : 'Achievements Accomplished:'}
                  </strong>
                </div>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• {language === 'ar' ? 'تحسين زمن الاستجابة للطوارئ بنسبة 75%' : '75% improvement in emergency response time'}</li>
                  <li>• {language === 'ar' ? 'زيادة الكفاءة التشغيلية بنسبة 88%' : '88% increase in operational efficiency'}</li>
                  <li>• {language === 'ar' ? 'تأهيل 45 خبير معتمد دولياً' : 'Qualification of 45 internationally certified experts'}</li>
                  <li>• {language === 'ar' ? 'صفر حوادث خلال 18 شهر متتالي' : 'Zero incidents for 18 consecutive months'}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Contact Section */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg p-8 mb-16 text-center">
          <Phone className="h-12 w-12 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">
            {language === 'ar' ? 'خدمة الطوارئ المتاحة 24/7' : '24/7 Emergency Service Available'}
          </h2>
          <p className="text-xl text-red-100 mb-6 max-w-3xl mx-auto leading-relaxed">
            {language === 'ar' ? 
              'للحالات الطارئة والاستشارات العاجلة في مجال الحماية المدنية والسلامة، نحن متاحون على مدار الساعة طوال أيام الأسبوع لتقديم الدعم الفني والاستشاري المتخصص والمطلوب بأسرع وقت ممكن.' :
              'For emergencies and urgent consultations in civil protection and safety, we are available around the clock throughout the week to provide the required specialized technical and advisory support as quickly as possible.'
            }
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
            <div className="text-2xl font-bold">+966 XX XXX XXXX</div>
            <div className="text-red-100 text-lg">
              {language === 'ar' ? 'متاح 24 ساعة، 7 أيام في الأسبوع' : 'Available 24 hours, 7 days a week'}
            </div>
          </div>
          <p className="text-red-200 text-sm">
            {language === 'ar' ? 'استجابة فورية للحالات الحرجة والطارئة' : 'Immediate response for critical and emergency cases'}
          </p>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-800 to-blue-900 text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {language === 'ar' ? 'هل تحتاج استشارة متخصصة في الحماية المدنية؟' : 'Do You Need Specialized Civil Protection Consultation?'}
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-4xl mx-auto leading-relaxed">
            {language === 'ar' ? 
              'تواصل معنا اليوم للحصول على استشارة فنية متخصصة ومتقدمة في مجال الحماية المدنية وضمان سلامة منشآتك ومرافقك بأعلى المعايير المهنية والدولية المعتمدة. فريقنا من الخبراء جاهز لخدمتك.' :
              'Contact us today for advanced specialized technical consultation in civil protection and ensure the safety of your facilities and premises with the highest certified professional and international standards. Our team of experts is ready to serve you.'
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

export default CivilProtection;