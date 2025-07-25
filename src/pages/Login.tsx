import React, { useState } from 'react';
import { Shield, Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const { language, t } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Check credentials
    if (email === 'alaaabdelzaher@gmail.com' && password === 'Fr3on123456@') {
      localStorage.setItem('dashboard_auth', 'true');
      onLogin();
    } else {
      setError(language === 'ar' ? 'بيانات الدخول غير صحيحة' : 'Invalid credentials');
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 flex items-center justify-center p-4" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <img 
              src="/a-professional-logo-design-featuring-the_mnJr88-WTni4jIkiKkhWJg_wHXCDmHAS-ynu2s4ZPeQhg-removebg-preview (1).png" 
              alt="aabdelzaher Logo" 
              className="h-12 w-12" 
            />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {language === 'ar' ? 'لوحة التحكم الإدارية' : 'Admin Dashboard'}
          </h1>
          <p className="text-gray-600">
            {language === 'ar' ? 'تسجيل الدخول للوصول إلى لوحة التحكم' : 'Sign in to access the dashboard'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={language === 'ar' ? 'أدخل البريد الإلكتروني' : 'Enter your email'}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'ar' ? 'كلمة المرور' : 'Password'}
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={language === 'ar' ? 'أدخل كلمة المرور' : 'Enter your password'}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-800 text-white py-3 rounded-lg font-semibold hover:bg-blue-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                {language === 'ar' ? 'جاري تسجيل الدخول...' : 'Signing in...'}
              </div>
            ) : (
              language === 'ar' ? 'تسجيل الدخول' : 'Sign In'
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            {language === 'ar' ? 'محمي بأمان متقدم' : 'Secured with advanced protection'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;