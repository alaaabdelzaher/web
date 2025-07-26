import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Users, Award, ArrowRight, CheckCircle, Flame, Search, FileText, Eye, Microscope, AlertTriangle, Target, Phone, Mail } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { DatabaseService } from '../lib/supabase';

const Services = () => {
  const { language, t } = useLanguage();
  const [services, setServices] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [expandedService, setExpandedService] = useState<string | null>(null);

  React.useEffect(() => {
    const loadServices = async () => {
      try {
        setLoading(true);
        const data = await DatabaseService.getServices();
        setServices(data);
      } catch (error) {
        console.error('Error loading services:', error);
      } finally {
        setLoading(false);
      }
    };
    loadServices();
  }, []);

  // محتوى مفصل لكل تخصص
  const detailedContent = {
    'civil-protection': {
      title: {
        ar: 'استشارات الحماية المدنية المتخصصة',
        en: 'Specialized Civil Protection Consulting'
      },
      description: {
        ar: 'نقدم خدمات متخصصة في مجال الحماية المدنية تشمل خدمات الإطفاء والإنقاذ البري والنهري، تفتيش المنشآت الهامة، وإعداد التقارير الفنية المتخصصة بعد المعاينة الميدانية.',
        en: 'We provide specialized services in civil protection including fire services, land and water rescue operations, critical facility inspections, and preparation of specialized technical reports after field inspection.'
      },
      services: [
        {
          title: { ar: 'خدمات الإطفاء والإنقاذ المتقدمة', en: 'Advanced Fire and Rescue Services' },
          description: { 
            ar: 'تخطيط وتنفيذ عمليات الإطفاء والإنقاذ البري والنهري مع تقييم المخاطر ووضع خطط الطوارئ وتدريب الفرق المتخصصة.',
            en: 'Planning and implementing fire and rescue operations including land and water rescue, risk assessment, emergency planning, and specialized team training.'
          },
          features: [
            { ar: 'تقييم مخاطر الحريق والسلامة العامة', en: 'Fire and general safety risk assessment' },
            { ar: 'وضع خطط الإخلاء والطوارئ المتقدمة', en: 'Advanced evacuation and emergency planning' },
            { ar: 'تدريب فرق الإطفاء والإنقاذ المتخصصة', en: 'Specialized fire and rescue team training' },
            { ar: 'عمليات الإنقاذ البري والنهري والجوي', en: 'Land, water, and aerial rescue operations' }
          ]
        },
        {
          title: { ar: 'تفتيش المنشآت الحيوية والهامة', en: 'Critical and Vital Facility Inspections' },
          description: { 
            ar: 'فحص شامل للمنشآت الحيوية لضمان الامتثال لمعايير السلامة والحماية المدنية مع إعداد تقارير فنية مفصلة.',
            en: 'Comprehensive inspection of vital facilities to ensure compliance with safety and civil protection standards with detailed technical reports.'
          },
          features: [
            { ar: 'تفتيش المصانع والمنشآت الصناعية الكبرى', en: 'Major factory and industrial facility inspections' },
            { ar: 'تقييم أنظمة السلامة والإنذار المتقدمة', en: 'Advanced safety and alarm system evaluation' },
            { ar: 'فحص معدات الإطفاء والسلامة المهنية', en: 'Fire equipment and occupational safety inspection' },
            { ar: 'تقييم مخارج الطوارئ وطرق الإخلاء الآمنة', en: 'Emergency exit and safe evacuation route assessment' }
          ]
        }
      ],
      caseStudy: {
        title: { ar: 'مثال من أعمالنا: تفتيش مجمع صناعي كبير', en: 'Case Study: Major Industrial Complex Inspection' },
        description: { 
          ar: 'قمنا بتفتيش شامل لمجمع صناعي يضم أكثر من 15 مصنعاً، وأعددنا تقريراً فنياً مفصلاً حدد 47 نقطة ضعف في أنظمة السلامة وقدم 85 توصية للتحسين.',
          en: 'We conducted a comprehensive inspection of an industrial complex comprising more than 15 factories, and prepared a detailed technical report identifying 47 weaknesses in safety systems and providing 85 improvement recommendations.'
        },
        results: [
          { ar: 'تحسين مستوى السلامة بنسبة 92%', en: '92% improvement in safety level' },
          { ar: 'تجنب 12 حادثة محتملة خطيرة', en: 'Prevention of 12 potential serious incidents' },
          { ar: 'توفير 2.3 مليون ريال في التكاليف', en: 'Savings of 2.3 million SAR in costs' }
        ]
      }
    },
    'forensics': {
      title: {
        ar: 'الأدلة الجنائية والطب الشرعي المتخصص',
        en: 'Specialized Forensic Evidence & Medicine'
      },
      description: {
        ar: 'نقدم خدمات متخصصة في تحليل الأدلة الجنائية والطب الشرعي، تشمل تحليل مسارح الجرائم وفحص الأسلحة والمفرقعات وقضايا التزييف والتزوير والتحاليل البيولوجية وتحديد أسباب الوفاة.',
        en: 'We provide specialized services in forensic evidence analysis and forensic medicine, including crime scene analysis, weapons and explosives examination, forgery cases, biological analysis, and death cause determination.'
      },
      services: [
        {
          title: { ar: 'تحليل مسارح الجرائم المتقدم', en: 'Advanced Crime Scene Analysis' },
          description: { 
            ar: 'تحليل شامل ومنهجي لمسارح الجرائم باستخدام أحدث التقنيات العلمية لجمع وتحليل الأدلة الجنائية مع ضمان سلامة سلسلة الأدلة.',
            en: 'Comprehensive and systematic analysis of crime scenes using the latest scientific techniques for collecting and analyzing forensic evidence while ensuring evidence chain integrity.'
          },
          features: [
            { ar: 'توثيق وتصوير مسرح الجريمة بدقة عالية', en: 'High-precision crime scene documentation and photography' },
            { ar: 'جمع وحفظ الأدلة المادية والبيولوجية', en: 'Physical and biological evidence collection and preservation' },
            { ar: 'تحليل أنماط الدم والبصمات', en: 'Blood pattern and fingerprint analysis' },
            { ar: 'إعادة بناء الأحداث والتسلسل الزمني', en: 'Event reconstruction and timeline analysis' }
          ]
        },
        {
          title: { ar: 'فحص الأسلحة والمفرقعات المتخصص', en: 'Specialized Weapons and Explosives Examination' },
          description: { 
            ar: 'فحص وتحليل متقدم للأسلحة النارية والمفرقعات مع تحديد نوع السلاح وتحليل المقذوفات والبقايا المتفجرة.',
            en: 'Advanced examination and analysis of firearms and explosives with weapon type identification and projectile and explosive residue analysis.'
          },
          features: [
            { ar: 'فحص الأسلحة النارية وتحديد خصائصها', en: 'Firearm examination and characteristic identification' },
            { ar: 'تحليل المقذوفات والخراطيش الفارغة', en: 'Bullet and cartridge case analysis' },
            { ar: 'فحص بقايا البارود والمتفجرات', en: 'Gunshot and explosive residue examination' },
            { ar: 'تحليل المواد المتفجرة وآثارها', en: 'Explosive material and trace analysis' }
          ]
        },
        {
          title: { ar: 'قضايا التزييف والتزوير المعقدة', en: 'Complex Forgery and Counterfeiting Cases' },
          description: { 
            ar: 'فحص متقدم للوثائق والتوقيعات والعملات المزيفة باستخدام تقنيات متطورة للكشف عن التلاعب والتزوير.',
            en: 'Advanced examination of documents, signatures, and counterfeit currencies using sophisticated techniques for detecting manipulation and forgery.'
          },
          features: [
            { ar: 'فحص الوثائق الرسمية والهوية', en: 'Official documents and identity examination' },
            { ar: 'تحليل التوقيعات والخطوط', en: 'Signature and handwriting analysis' },
            { ar: 'كشف العملات المزيفة', en: 'Counterfeit currency detection' },
            { ar: 'فحص الأختام والطوابع', en: 'Seal and stamp examination' }
          ]
        }
      ],
      caseStudy: {
        title: { ar: 'مثال من أعمالنا: قضية جريمة قتل معقدة', en: 'Case Study: Complex Murder Case' },
        description: { 
          ar: 'تحليل شامل لمسرح جريمة معقد تضمن فحص 127 قطعة دليل بيولوجي وتحليل أنماط الدم وإعادة بناء الأحداث، مما ساعد في كشف الحقيقة وتحديد الجاني خلال 72 ساعة.',
          en: 'Comprehensive analysis of a complex crime scene including examination of 127 pieces of biological evidence, blood pattern analysis, and event reconstruction, helping reveal the truth and identify the perpetrator within 72 hours.'
        },
        results: [
          { ar: 'تحديد الجاني بدقة 100% خلال 72 ساعة', en: '100% accurate perpetrator identification within 72 hours' },
          { ar: 'إدانة قضائية نهائية بناءً على الأدلة العلمية', en: 'Final judicial conviction based on scientific evidence' },
          { ar: 'كشف شبكة إجرامية مكونة من 7 أشخاص', en: 'Uncovered criminal network of 7 individuals' }
        ]
      }
    },
    'explosives-analysis': {
      title: {
        ar: 'مكافحة الحرائق والمفرقعات المتخصصة',
        en: 'Specialized Fire & Explosives Control'
      },
      description: {
        ar: 'نقدم خدمات متخصصة في تحقيقات الحرائق وتحليل المفرقعات والمواد المتفجرة، وإعداد التقارير الفنية المتخصصة والرد العلمي والفني على تقارير الخبراء.',
        en: 'We provide specialized services in fire investigations, explosives and explosive materials analysis, preparation of specialized technical reports, and scientific and technical responses to expert reports.'
      },
      services: [
        {
          title: { ar: 'تحقيقات الحرائق المتقدمة', en: 'Advanced Fire Investigations' },
          description: { 
            ar: 'تحقيقات شاملة في حوادث الحرائق لتحديد الأسباب الجذرية والظروف المحيطة بدقة علمية عالية مع إعداد تقارير فنية مفصلة.',
            en: 'Comprehensive investigations into fire incidents to determine root causes and surrounding circumstances with high scientific precision and detailed technical reports.'
          },
          features: [
            { ar: 'تحديد نقطة بداية الحريق بدقة متناهية', en: 'Precise fire origin point determination' },
            { ar: 'تحليل أسباب الاشتعال والعوامل المساهمة', en: 'Ignition cause analysis and contributing factors' },
            { ar: 'فحص الأدلة المادية والكيميائية', en: 'Physical and chemical evidence examination' },
            { ar: 'تحليل أنماط الاحتراق والانتشار', en: 'Burn pattern and spread analysis' }
          ]
        },
        {
          title: { ar: 'تحليل المفرقعات المتخصص', en: 'Specialized Explosives Analysis' },
          description: { 
            ar: 'تحليل متقدم للمواد المتفجرة والأجهزة المتفجرة مع تحديد نوع المتفجرات وطريقة التفجير والآثار الناتجة بدقة علمية عالية.',
            en: 'Advanced analysis of explosive materials and explosive devices with identification of explosive types, detonation methods, and resulting effects with high scientific precision.'
          },
          features: [
            { ar: 'تحليل بقايا المتفجرات بالتقنيات المتطورة', en: 'Explosive residue analysis with advanced techniques' },
            { ar: 'فحص الأجهزة المتفجرة المرتجلة', en: 'Improvised explosive device examination' },
            { ar: 'تحديد نوع المتفجرات والمصدر', en: 'Explosive type and source identification' },
            { ar: 'تحليل آثار الانفجار والأضرار', en: 'Blast effect and damage analysis' }
          ]
        },
        {
          title: { ar: 'التقارير الفنية والرد على الخبراء', en: 'Technical Reports and Expert Responses' },
          description: { 
            ar: 'إعداد تقارير فنية شاملة تدعم القضايا القانونية والتأمينية مع الرد العلمي والفني على تقارير الخبراء الآخرين.',
            en: 'Preparation of comprehensive technical reports supporting legal and insurance cases with scientific and technical responses to other expert reports.'
          },
          features: [
            { ar: 'تقارير الحرائق المفصلة', en: 'Detailed fire reports' },
            { ar: 'تقارير الانفجارات المعقدة', en: 'Complex explosion reports' },
            { ar: 'الرد العلمي على تقارير الخبراء', en: 'Scientific responses to expert reports' },
            { ar: 'تقارير معتمدة قانونياً', en: 'Legally certified reports' }
          ]
        }
      ],
      caseStudy: {
        title: { ar: 'مثال من أعمالنا: حريق مجمع تجاري كبير', en: 'Case Study: Major Commercial Complex Fire' },
        description: { 
          ar: 'تحقيق شامل في حريق مجمع تجاري أدى إلى أضرار بقيمة 15 مليون ريال، حيث تم تحديد السبب الجذري خلال 48 ساعة وإعداد تقرير فني مفصل بـ 127 صفحة.',
          en: 'Comprehensive investigation of a commercial complex fire that caused 15 million SAR in damages, where the root cause was identified within 48 hours and a detailed 127-page technical report was prepared.'
        },
        results: [
          { ar: 'تحديد السبب الحقيقي خلال 48 ساعة', en: 'Real cause identified within 48 hours' },
          { ar: 'تبرئة المالك من التهم الجنائية', en: 'Owner cleared of criminal charges' },
          { ar: 'استرداد 12 مليون ريال من التأمين', en: 'Recovery of 12 million SAR from insurance' }
        ]
      }
    }
  };

  const toggleService = (serviceCategory: string) => {
    setExpandedService(expandedService === serviceCategory ? null : serviceCategory);
  };

  if (loading) {
    return (
      <div className="min-h-screen py-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Default services if none loaded
  const defaultServices = [
    {
      id: '1',
      title: language === 'ar' ? 'استشارات الحماية المدنية' : 'Civil Protection Consulting',
      description: language === 'ar' ? 
        'إطفاء، إنقاذ بري ونهري، تفتيش منشآت هامة، تحرير تقارير فنية بعد المعاينة' :
        'Fire safety, rescue operations, facility inspections, technical reports after site examination',
      category: 'civil-protection',
      features: [
        language === 'ar' ? 'خدمات الإطفاء والإنقاذ' : 'Fire and rescue services',
        language === 'ar' ? 'تفتيش المنشآت الهامة' : 'Critical facility inspections',
        language === 'ar' ? 'التقارير الفنية المتخصصة' : 'Specialized technical reports',
        language === 'ar' ? 'استشارات السلامة' : 'Safety consulting'
      ]
    },
    {
      id: '2',
      title: language === 'ar' ? 'الأدلة الجنائية والطب الشرعي' : 'Forensic Evidence & Medicine',
      description: language === 'ar' ? 
        'تحليل مسارح الجرائم، الأسلحة، الحرائق، المفرقعات، قضايا التزييف والتزوير، التحاليل البيولوجية، تحديد أسباب الوفاة' :
        'Crime scene analysis, weapons examination, fires, explosives, forgery cases, biological analysis, cause of death determination',
      category: 'forensics',
      features: [
        language === 'ar' ? 'تحليل مسرح الجريمة' : 'Crime scene analysis',
        language === 'ar' ? 'فحص الأسلحة والمفرقعات' : 'Weapons and explosives examination',
        language === 'ar' ? 'قضايا التزييف والتزوير' : 'Forgery and counterfeiting cases',
        language === 'ar' ? 'تحديد سبب الوفاة' : 'Death cause determination'
      ]
    },
    {
      id: '3',
      title: language === 'ar' ? 'مكافحة الحرائق والمفرقعات' : 'Fire & Explosives Control',
      description: language === 'ar' ? 
        'تحقيقات الحرائق، تحليل المفرقعات، التقارير الفنية، الرد العلمي والفني على تقارير الخبراء' :
        'Fire investigation, explosives analysis, technical reports, expert responses to official reports',
      category: 'explosives-analysis',
      features: [
        language === 'ar' ? 'تحقيقات الحرائق' : 'Fire investigations',
        language === 'ar' ? 'تحليل المفرقعات' : 'Explosives analysis',
        language === 'ar' ? 'التقارير الفنية' : 'Technical reports',
        language === 'ar' ? 'الرد على تقارير الخبراء' : 'Expert report responses'
      ]
    }
  ];

  const displayServices = services.length > 0 ? services : defaultServices;

  return (
    <div className="min-h-screen py-16" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('services.title')}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {displayServices.map((service, index) => (
            <div key={service.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-r from-blue-800 to-blue-900 p-6">
                <img 
                  src="/a-professional-logo-design-featuring-the_mnJr88-WTni4jIkiKkhWJg_wHXCDmHAS-ynu2s4ZPeQhg-removebg-preview (1).png" 
                  alt="Service Icon" 
                  className="h-12 w-12 mb-4 filter brightness-0 invert" 
                />
                <h2 className="text-2xl font-bold text-white">{service.title}</h2>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-6">
                  {service.description}
                </p>
                <div className="space-y-3 mb-6">
                  {service.features?.slice(0, 4).map((feature: string, idx: number) => (
                    <div key={idx} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-800 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm text-gray-600">{feature}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>


        {/* CTA Section */}
        <div className="mt-16 bg-blue-800 text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Need Expert Consultation?</h2>
          <p className="text-xl text-blue-100 mb-6">
            Contact us today to discuss your specific needs and learn how we can help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
            >
              Book Consultation
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-800 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;