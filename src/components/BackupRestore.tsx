import React, { useState } from 'react';
import { Download, Upload, Database, Calendar, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface BackupItem {
  id: string;
  name: string;
  date: string;
  size: string;
  type: 'full' | 'content' | 'settings';
  status: 'completed' | 'in-progress' | 'failed';
}

const BackupRestore = () => {
  const { language, t } = useLanguage();
  const [backups, setBackups] = useState<BackupItem[]>([
    {
      id: '1',
      name: language === 'ar' ? 'نسخة احتياطية كاملة - يناير 2024' : 'Full Backup - January 2024',
      date: '2024-01-15T10:30:00Z',
      size: '45.2 MB',
      type: 'full',
      status: 'completed'
    },
    {
      id: '2',
      name: language === 'ar' ? 'نسخة احتياطية للمحتوى - يناير 2024' : 'Content Backup - January 2024',
      date: '2024-01-10T14:20:00Z',
      size: '12.8 MB',
      type: 'content',
      status: 'completed'
    },
    {
      id: '3',
      name: language === 'ar' ? 'نسخة احتياطية للإعدادات - ديسمبر 2023' : 'Settings Backup - December 2023',
      date: '2023-12-28T09:15:00Z',
      size: '2.1 MB',
      type: 'settings',
      status: 'completed'
    }
  ]);

  const [isCreatingBackup, setIsCreatingBackup] = useState(false);
  const [backupType, setBackupType] = useState<'full' | 'content' | 'settings'>('full');
  const [isRestoring, setIsRestoring] = useState(false);

  const handleCreateBackup = async () => {
    setIsCreatingBackup(true);
    
    // Simulate backup creation
    setTimeout(() => {
      const newBackup: BackupItem = {
        id: Date.now().toString(),
        name: `${getBackupTypeLabel(backupType)} - ${new Date().toLocaleDateString(language === 'ar' ? 'ar' : 'en')}`,
        date: new Date().toISOString(),
        size: backupType === 'full' ? '48.5 MB' : backupType === 'content' ? '15.2 MB' : '2.3 MB',
        type: backupType,
        status: 'completed'
      };
      
      setBackups(prev => [newBackup, ...prev]);
      setIsCreatingBackup(false);
      alert(language === 'ar' ? 'تم إنشاء النسخة الاحتياطية بنجاح!' : 'Backup created successfully!');
    }, 3000);
  };

  const handleRestore = async (backupId: string) => {
    if (!confirm(language === 'ar' ? 'هل أنت متأكد من استعادة هذه النسخة الاحتياطية؟ سيتم استبدال البيانات الحالية.' : 'Are you sure you want to restore this backup? Current data will be replaced.')) {
      return;
    }

    setIsRestoring(true);
    
    // Simulate restore process
    setTimeout(() => {
      setIsRestoring(false);
      alert(language === 'ar' ? 'تم استعادة النسخة الاحتياطية بنجاح!' : 'Backup restored successfully!');
    }, 5000);
  };

  const handleDownload = (backupId: string) => {
    const backup = backups.find(b => b.id === backupId);
    if (backup) {
      // Simulate download
      const link = document.createElement('a');
      link.href = '#';
      link.download = `${backup.name.replace(/\s+/g, '_')}.zip`;
      link.click();
    }
  };

  const handleUploadRestore = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!confirm(language === 'ar' ? 'هل أنت متأكد من استعادة هذا الملف؟' : 'Are you sure you want to restore this file?')) {
        return;
      }
      
      setIsRestoring(true);
      
      // Simulate upload and restore
      setTimeout(() => {
        setIsRestoring(false);
        alert(language === 'ar' ? 'تم رفع واستعادة الملف بنجاح!' : 'File uploaded and restored successfully!');
      }, 4000);
    }
  };

  const getBackupTypeLabel = (type: string) => {
    const labels = {
      full: language === 'ar' ? 'نسخة احتياطية كاملة' : 'Full Backup',
      content: language === 'ar' ? 'نسخة احتياطية للمحتوى' : 'Content Backup',
      settings: language === 'ar' ? 'نسخة احتياطية للإعدادات' : 'Settings Backup'
    };
    return labels[type as keyof typeof labels];
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'in-progress':
        return <Loader className="h-4 w-4 text-blue-600 animate-spin" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Create Backup Section */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            {language === 'ar' ? 'إنشاء نسخة احتياطية' : 'Create Backup'}
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            {language === 'ar' ? 'إنشاء نسخة احتياطية من بيانات الموقع' : 'Create a backup of your website data'}
          </p>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'ar' ? 'نوع النسخة الاحتياطية' : 'Backup Type'}
              </label>
              <select
                value={backupType}
                onChange={(e) => setBackupType(e.target.value as 'full' | 'content' | 'settings')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isCreatingBackup}
              >
                <option value="full">{getBackupTypeLabel('full')}</option>
                <option value="content">{getBackupTypeLabel('content')}</option>
                <option value="settings">{getBackupTypeLabel('settings')}</option>
              </select>
            </div>
            
            <div className="flex items-end">
              <button
                onClick={handleCreateBackup}
                disabled={isCreatingBackup}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 space-x-reverse"
              >
                {isCreatingBackup ? (
                  <>
                    <Loader className="h-4 w-4 animate-spin" />
                    <span>{language === 'ar' ? 'جاري الإنشاء...' : 'Creating...'}</span>
                  </>
                ) : (
                  <>
                    <Database className="h-4 w-4" />
                    <span>{language === 'ar' ? 'إنشاء نسخة احتياطية' : 'Create Backup'}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Restore Section */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            {language === 'ar' ? 'استعادة من ملف' : 'Restore from File'}
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            {language === 'ar' ? 'رفع واستعادة نسخة احتياطية من ملف' : 'Upload and restore a backup file'}
          </p>
        </div>
        
        <div className="p-6">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">
              {language === 'ar' ? 'اختر ملف النسخة الاحتياطية للاستعادة' : 'Choose backup file to restore'}
            </p>
            <label className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer inline-flex items-center space-x-2 space-x-reverse">
              <Upload className="h-4 w-4" />
              <span>{language === 'ar' ? 'اختيار ملف' : 'Choose File'}</span>
              <input
                type="file"
                className="hidden"
                accept=".zip,.json"
                onChange={handleUploadRestore}
                disabled={isRestoring}
              />
            </label>
          </div>
        </div>
      </div>

      {/* Backup History */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            {language === 'ar' ? 'سجل النسخ الاحتياطية' : 'Backup History'}
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            {language === 'ar' ? 'عرض وإدارة النسخ الاحتياطية المحفوظة' : 'View and manage saved backups'}
          </p>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            {backups.map((backup) => (
              <div key={backup.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Database className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{backup.name}</div>
                    <div className="text-sm text-gray-500 flex items-center space-x-4 space-x-reverse">
                      <span className="flex items-center space-x-1 space-x-reverse">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(backup.date).toLocaleDateString(language === 'ar' ? 'ar' : 'en')}</span>
                      </span>
                      <span>{backup.size}</span>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        backup.type === 'full' ? 'bg-green-100 text-green-800' :
                        backup.type === 'content' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {getBackupTypeLabel(backup.type)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 space-x-reverse">
                  {getStatusIcon(backup.status)}
                  
                  <button
                    onClick={() => handleDownload(backup.id)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                    title={language === 'ar' ? 'تحميل' : 'Download'}
                  >
                    <Download className="h-4 w-4" />
                  </button>
                  
                  <button
                    onClick={() => handleRestore(backup.id)}
                    disabled={isRestoring || backup.status !== 'completed'}
                    className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isRestoring ? (
                      <Loader className="h-3 w-3 animate-spin" />
                    ) : (
                      language === 'ar' ? 'استعادة' : 'Restore'
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Restore Progress */}
      {isRestoring && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="text-center">
              <Loader className="h-12 w-12 text-blue-600 animate-spin mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {language === 'ar' ? 'جاري الاستعادة...' : 'Restoring...'}
              </h3>
              <p className="text-gray-600">
                {language === 'ar' ? 'يرجى الانتظار، جاري استعادة البيانات' : 'Please wait, restoring data'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BackupRestore;