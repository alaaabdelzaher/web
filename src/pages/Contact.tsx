import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { DatabaseService } from '../lib/supabase';

const Contact = () => {
  const { language, t } = useLanguage();
  const [contactInfo, setContactInfo] = useState({
    phone: '+966 XX XXX XXXX',
    email: 'info@aabdelzaher.com',
    address_ar: 'المملكة العربية السعودية، الرياض',
    address_en: 'Saudi Arabia, Riyadh',
    emergency_phone: '+966 XX XXX XXXX'
  });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  React.useEffect(() => {
    const loadContactInfo = async () => {
      try {
        const contactData = await DatabaseService.getContentSection('contact_info');
        if (contactData?.content) {
          const parsedContact = JSON.parse(contactData.content);
          setContactInfo(prev => ({ ...prev, ...parsedContact }));
        }
      } catch (error) {
        console.log('Using default contact info');
      }
    };
    loadContactInfo();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setSubmitMessage(language === 'ar' ? 'يرجى ملء جميع الحقول المطلوبة' : 'Please fill in all required fields');
      return;
    }

    try {
      setSubmitting(true);
      const messageData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
        status: 'new',
        ip_address: null,
        user_agent: navigator.userAgent
      };
      
      const result = await DatabaseService.createContactMessage(messageData);
      
      if (!result) {
        throw new Error('Failed to send message');
      }
      
      setSubmitMessage(language === 'ar' ? 
        'شكراً لك على رسالتك. سنعود إليك خلال 24 ساعة.' : 
        'Thank you for your message. We will get back to you within 24 hours.'
      );
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      setSubmitMessage(language === 'ar' ? 
        'حدث خطأ في إرسال الرسالة. يرجى المحاولة مرة أخرى.' : 
        'Error sending message. Please try again.'
      );
    } finally {
      setSubmitting(false);
      setTimeout(() => setSubmitMessage(''), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen py-16" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('contact.title')}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('contact.form.title')}</h2>
            
            {submitMessage && (
              <div className={`mb-6 p-4 rounded-lg ${
                submitMessage.includes('خطأ') || submitMessage.includes('Error') 
                  ? 'bg-red-50 text-red-700 border border-red-200' 
                  : 'bg-green-50 text-green-700 border border-green-200'
              }`}>
                {submitMessage}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  {t('contact.form.name')} <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select a subject</option>
                  <option value="consultation">General Consultation</option>
                  <option value="civil-protection">Civil Protection Services</option>
                  <option value="forensics">Forensic Analysis</option>
                  <option value="explosives">Explosives Analysis</option>
                  <option value="testimony">Expert Testimony</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Please provide details about your case or inquiry..."
                />
              </div>
              
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-900 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-4 w-4 mr-2" />
                {submitting ? (
                  language === 'ar' ? 'جاري الإرسال...' : 'Sending...'
                ) : (
                  language === 'ar' ? 'إرسال الرسالة' : 'Send Message'
                )}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-blue-800" />
                  <div>
                    <div className="font-semibold">Phone</div>
                    <div className="text-gray-600">{contactInfo.phone}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-blue-800" />
                  <div>
                    <div className="font-semibold">Email</div>
                    <div className="text-gray-600">{contactInfo.email}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-blue-800" />
                  <div>
                    <div className="font-semibold">Address</div>
                    <div className="text-gray-600">
                      {language === 'ar' ? contactInfo.address_ar : contactInfo.address_en}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Business Hours</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Monday - Friday</span>
                  <span className="text-gray-600">8:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Saturday</span>
                  <span className="text-gray-600">9:00 AM - 2:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Sunday</span>
                  <span className="text-gray-600">Closed</span>
                </div>
                <div className="mt-4 p-3 bg-orange-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-orange-600" />
                    <span className="text-sm font-medium text-orange-800">24/7 Emergency Services Available</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-800 text-white rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-4">Emergency Contact</h2>
              <p className="text-blue-100 mb-4">
                For urgent technical consultations or emergency cases, 
                contact our 24/7 emergency hotline:
              </p>
              <div className="text-2xl font-bold">{contactInfo.emergency_phone}</div>
              <div className="text-blue-100 text-sm mt-2">
                Available 24 hours a day, 7 days a week
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;