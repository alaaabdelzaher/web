import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="relative">
      <button
        onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
        className="flex items-center space-x-2 space-x-reverse px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
        title={language === 'en' ? 'Switch to Arabic' : 'التبديل إلى الإنجليزية'}
      >
        <Globe className="h-4 w-4" />
        <span className="text-sm font-medium">
          {language === 'en' ? 'العربية' : 'English'}
        </span>
      </button>
    </div>
  );
};

export default LanguageToggle;