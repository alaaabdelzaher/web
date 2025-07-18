import React, { useState } from 'react';
import { Menu, Plus, Edit3, Trash2, Move, Eye, EyeOff } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface NavigationItem {
  id: string;
  label: string;
  labelAr: string;
  url: string;
  order: number;
  isVisible: boolean;
  hasChildren: boolean;
  children?: NavigationItem[];
}

const NavigationManagement = () => {
  const { language, t } = useLanguage();
  const [navigationItems, setNavigationItems] = useState<NavigationItem[]>([
    {
      id: '1',
      label: 'Home',
      labelAr: 'الرئيسية',
      url: '/',
      order: 1,
      isVisible: true,
      hasChildren: false
    },
    {
      id: '2',
      label: 'Services',
      labelAr: 'الخدمات',
      url: '/services',
      order: 2,
      isVisible: true,
      hasChildren: true,
      children: [
        {
          id: '2-1',
          label: 'Civil Protection',
          labelAr: 'الحماية المدنية',
          url: '/services/civil-protection',
          order: 1,
          isVisible: true,
          hasChildren: false
        },
        {
          id: '2-2',
          label: 'Forensics',
          labelAr: 'الطب الشرعي',
          url: '/services/forensics',
          order: 2,
          isVisible: true,
          hasChildren: false
        },
        {
          id: '2-3',
          label: 'Explosives Analysis',
          labelAr: 'تحليل المتفجرات',
          url: '/services/explosives-analysis',
          order: 3,
          isVisible: true,
          hasChildren: false
        }
      ]
    },
    {
      id: '3',
      label: 'About',
      labelAr: 'من نحن',
      url: '/about',
      order: 3,
      isVisible: true,
      hasChildren: false
    },
    {
      id: '4',
      label: 'Blog',
      labelAr: 'المدونة',
      url: '/blog',
      order: 4,
      isVisible: true,
      hasChildren: false
    },
    {
      id: '5',
      label: 'Contact',
      labelAr: 'اتصل بنا',
      url: '/contact',
      order: 5,
      isVisible: true,
      hasChildren: false
    }
  ]);

  const [showAddItem, setShowAddItem] = useState(false);
  const [editingItem, setEditingItem] = useState<NavigationItem | null>(null);

  const handleToggleVisibility = (itemId: string) => {
    setNavigationItems(items =>
      items.map(item =>
        item.id === itemId ? { ...item, isVisible: !item.isVisible } : item
      )
    );
  };

  const handleDeleteItem = (itemId: string) => {
    if (confirm(language === 'ar' ? 'هل أنت متأكد من حذف هذا العنصر؟' : 'Are you sure you want to delete this item?')) {
      setNavigationItems(items => items.filter(item => item.id !== itemId));
    }
  };

  const handleMoveUp = (itemId: string) => {
    setNavigationItems(items => {
      const newItems = [...items];
      const index = newItems.findIndex(item => item.id === itemId);
      if (index > 0) {
        [newItems[index], newItems[index - 1]] = [newItems[index - 1], newItems[index]];
        // Update order numbers
        newItems[index].order = index + 1;
        newItems[index - 1].order = index;
      }
      return newItems;
    });
  };

  const handleMoveDown = (itemId: string) => {
    setNavigationItems(items => {
      const newItems = [...items];
      const index = newItems.findIndex(item => item.id === itemId);
      if (index < newItems.length - 1) {
        [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];
        // Update order numbers
        newItems[index].order = index + 1;
        newItems[index + 1].order = index + 2;
      }
      return newItems;
    });
  };

  return (
    <div className="space-y-6" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              {language === 'ar' ? 'إدارة التنقل' : 'Navigation Management'}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {language === 'ar' ? 'إدارة عناصر القائمة الرئيسية والفرعية' : 'Manage main and sub-menu items'}
            </p>
          </div>
          <button
            onClick={() => setShowAddItem(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2 space-x-reverse"
          >
            <Plus className="h-4 w-4" />
            <span>{language === 'ar' ? 'إضافة عنصر' : 'Add Item'}</span>
          </button>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {navigationItems.map((item, index) => (
              <div key={item.id} className="border border-gray-200 rounded-lg">
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <Menu className="h-5 w-5 text-gray-400" />
                    <div>
                      <div className="font-medium text-gray-900">
                        {language === 'ar' ? item.labelAr : item.label}
                      </div>
                      <div className="text-sm text-gray-500">{item.url}</div>
                    </div>
                    {item.hasChildren && (
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {language === 'ar' ? `${item.children?.length} عناصر فرعية` : `${item.children?.length} sub-items`}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center space-x-2 space-x-reverse">
                    <button
                      onClick={() => handleToggleVisibility(item.id)}
                      className={`p-2 rounded ${item.isVisible ? 'text-green-600 hover:bg-green-50' : 'text-gray-400 hover:bg-gray-50'}`}
                      title={item.isVisible ? (language === 'ar' ? 'إخفاء' : 'Hide') : (language === 'ar' ? 'إظهار' : 'Show')}
                    >
                      {item.isVisible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                    </button>

                    <button
                      onClick={() => handleMoveUp(item.id)}
                      disabled={index === 0}
                      className="p-2 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      title={language === 'ar' ? 'تحريك لأعلى' : 'Move Up'}
                    >
                      <Move className="h-4 w-4 rotate-180" />
                    </button>

                    <button
                      onClick={() => handleMoveDown(item.id)}
                      disabled={index === navigationItems.length - 1}
                      className="p-2 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      title={language === 'ar' ? 'تحريك لأسفل' : 'Move Down'}
                    >
                      <Move className="h-4 w-4" />
                    </button>

                    <button
                      onClick={() => setEditingItem(item)}
                      className="p-2 text-blue-600 hover:bg-blue-50"
                      title={language === 'ar' ? 'تعديل' : 'Edit'}
                    >
                      <Edit3 className="h-4 w-4" />
                    </button>

                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="p-2 text-red-600 hover:bg-red-50"
                      title={language === 'ar' ? 'حذف' : 'Delete'}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Sub-items */}
                {item.hasChildren && item.children && (
                  <div className="border-t border-gray-200 bg-gray-50">
                    {item.children.map((child) => (
                      <div key={child.id} className="p-3 pl-12 flex items-center justify-between border-b border-gray-100 last:border-b-0">
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                          <div>
                            <div className="text-sm font-medium text-gray-700">
                              {language === 'ar' ? child.labelAr : child.label}
                            </div>
                            <div className="text-xs text-gray-500">{child.url}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <button
                            onClick={() => handleToggleVisibility(child.id)}
                            className={`p-1 rounded ${child.isVisible ? 'text-green-600' : 'text-gray-400'}`}
                          >
                            {child.isVisible ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                          </button>
                          <button
                            onClick={() => setEditingItem(child)}
                            className="p-1 text-blue-600"
                          >
                            <Edit3 className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Preview */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            {language === 'ar' ? 'معاينة التنقل' : 'Navigation Preview'}
          </h3>
        </div>
        <div className="p-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <nav className="flex space-x-6 space-x-reverse">
              {navigationItems
                .filter(item => item.isVisible)
                .sort((a, b) => a.order - b.order)
                .map((item) => (
                  <div key={item.id} className="relative group">
                    <button className="text-gray-700 hover:text-blue-600 font-medium">
                      {language === 'ar' ? item.labelAr : item.label}
                    </button>
                    {item.hasChildren && item.children && (
                      <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 group-hover:opacity-100 transition-opacity">
                        {item.children
                          .filter(child => child.isVisible)
                          .map((child) => (
                            <a
                              key={child.id}
                              href={child.url}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                            >
                              {language === 'ar' ? child.labelAr : child.label}
                            </a>
                          ))}
                      </div>
                    )}
                  </div>
                ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationManagement;