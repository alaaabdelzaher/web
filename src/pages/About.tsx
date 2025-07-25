import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Users, Target, CheckCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { DatabaseService } from '../lib/supabase';

const About = () => {
  const { language, t } = useLanguage();
  const [teamMembers, setTeamMembers] = React.useState<any[]>([]);
  const [aboutContent, setAboutContent] = React.useState<any>({
    mission_ar: 'تقديم تحليل جنائي دقيق وموثوق وسليم علمياً وخدمات الحماية المدنية التي تخدم العدالة وتحمي المجتمعات.',
    mission_en: 'To provide accurate, reliable, and scientifically sound forensic analysis and civil protection services that serve justice and protect communities.',
    team_ar: 'فريق مخصص من المهنيين المعتمدين مع خبرة واسعة في علوم الطب الشرعي والحماية المدنية وشهادة الخبراء.',
    team_en: 'A dedicated team of certified professionals with extensive experience in forensic science, civil protection, and expert witness testimony.',
    values_ar: 'النزاهة والدقة والصرامة العلمية توجه كل ما نقوم به. نحن ملتزمون بأعلى معايير التميز المهني.',
    values_en: 'Integrity, accuracy, and scientific rigor guide everything we do. We are committed to the highest standards of professional excellence.',
    history_ar: 'تأسست شركتنا على يد خبراء متخصصين في مجال الطب الشرعي والحماية المدنية، ومنذ ذلك الحين نقدم خدمات عالية الجودة للعملاء في جميع أنحاء المنطقة.',
    history_en: 'Our company was founded by specialized experts in forensic medicine and civil protection, and since then we have been providing high-quality services to clients throughout the region.'
  });
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const teamData = await DatabaseService.getTeamMembers();
        
        setTeamMembers(teamData);
        
        // Load about content from database
        const aboutData = await DatabaseService.getContentSection('about_content');
        if (aboutData?.content) {
          try {
            const parsedContent = JSON.parse(aboutData.content);
            setAboutContent(prev => ({ ...prev, ...parsedContent }));
          } catch (e) {
            console.log('Using default about content');
          }
        }
      } catch (error) {
        console.error('Error loading about data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('about.title')}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('about.subtitle')}
          </p>
        </div>

        {/* Mission & Values */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <Target className="h-12 w-12 text-blue-800 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold mb-4">{t('about.mission.title')}</h3>
            <p className="text-gray-600">
              {language === 'ar' ? aboutContent.mission_ar : aboutContent.mission_en}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <Users className="h-12 w-12 text-blue-800 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold mb-4">{t('about.team.title')}</h3>
            <p className="text-gray-600">
              {language === 'ar' ? aboutContent.team_ar : aboutContent.team_en}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <Award className="h-12 w-12 text-blue-800 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold mb-4">{t('about.values.title')}</h3>
            <p className="text-gray-600">
              {language === 'ar' ? aboutContent.values_ar : aboutContent.values_en}
            </p>
          </div>
        </div>

        {/* Company History */}
        <div className="bg-gray-50 rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">{t('about.history.title')}</h2>
          <div className="text-center">
            <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto">
              {language === 'ar' ? aboutContent.history_ar : aboutContent.history_en}
            </p>
          </div>
        </div>

        {/* Team */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Leadership Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold mb-2">Dr. John Smith</h3>
              <p className="text-blue-800 font-medium mb-2">Founder & Chief Forensic Scientist</p>
              <p className="text-gray-600 text-sm">
                PhD in Forensic Science, Former FBI Special Agent, 
                25+ years of experience in forensic analysis.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold mb-2">Sarah Johnson</h3>
              <p className="text-blue-800 font-medium mb-2">Director of Civil Protection</p>
              <p className="text-gray-600 text-sm">
                MS in Fire Protection Engineering, Certified Fire Investigator, 
                15+ years in emergency planning and fire analysis.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold mb-2">Michael Chen</h3>
              <p className="text-blue-800 font-medium mb-2">Lead Explosives Analyst</p>
              <p className="text-gray-600 text-sm">
                MS in Chemistry, ATF Certified Explosives Expert, 
                12+ years in explosives analysis and bomb investigation.
              </p>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-blue-800 text-white rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Why Choose ForensicPro?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-1" />
                <div>
                  <h3 className="font-semibold">Proven Track Record</h3>
                  <p className="text-blue-100 text-sm">Over 1,000 cases successfully analyzed with 100% court acceptance rate</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-1" />
                <div>
                  <h3 className="font-semibold">Scientific Rigor</h3>
                  <p className="text-blue-100 text-sm">Adherence to the highest scientific standards and peer-reviewed methodologies</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-1" />
                <div>
                  <h3 className="font-semibold">Expert Testimony</h3>
                  <p className="text-blue-100 text-sm">Court-qualified experts with clear, professional communication skills</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-1" />
                <div>
                  <h3 className="font-semibold">State-of-the-Art Equipment</h3>
                  <p className="text-blue-100 text-sm">Latest technology and analytical instruments for accurate results</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-1" />
                <div>
                  <h3 className="font-semibold">Rapid Response</h3>
                  <p className="text-blue-100 text-sm">24/7 availability for emergency consultations and time-sensitive cases</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-1" />
                <div>
                  <h3 className="font-semibold">Comprehensive Services</h3>
                  <p className="text-blue-100 text-sm">Full spectrum of forensic and civil protection services under one roof</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Work with Us?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Contact us today to discuss your forensic and civil protection needs.
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
              className="bg-blue-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-900 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;