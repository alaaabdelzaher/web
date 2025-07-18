import React, { useState } from 'react';
import { Users, Plus, Edit3, Trash2, Shield, Mail, Phone, Calendar } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  status: 'active' | 'inactive';
  lastLogin: string;
  createdAt: string;
}

const UserManagement = () => {
  const { language, t } = useLanguage();
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: language === 'ar' ? 'أحمد محمد' : 'Ahmed Mohamed',
      email: 'ahmed@forensicpro.com',
      role: 'admin',
      status: 'active',
      lastLogin: '2024-01-15T10:30:00Z',
      createdAt: '2023-06-01T09:00:00Z'
    },
    {
      id: '2',
      name: language === 'ar' ? 'فاطمة علي' : 'Fatima Ali',
      email: 'fatima@forensicpro.com',
      role: 'editor',
      status: 'active',
      lastLogin: '2024-01-14T15:45:00Z',
      createdAt: '2023-08-15T11:30:00Z'
    }
  ]);

  const [showAddUser, setShowAddUser] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const handleAddUser = () => {
    setShowAddUser(true);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
  };

  const handleDeleteUser = (userId: string) => {
    if (confirm(language === 'ar' ? 'هل أنت متأكد من حذف هذا المستخدم؟' : 'Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  const getRoleLabel = (role: string) => {
    const roleLabels = {
      admin: language === 'ar' ? 'مدير' : 'Admin',
      editor: language === 'ar' ? 'محرر' : 'Editor',
      viewer: language === 'ar' ? 'مشاهد' : 'Viewer'
    };
    return roleLabels[role as keyof typeof roleLabels];
  };

  const getStatusLabel = (status: string) => {
    return status === 'active' ? 
      (language === 'ar' ? 'نشط' : 'Active') : 
      (language === 'ar' ? 'غير نشط' : 'Inactive');
  };

  return (
    <div className="space-y-6" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              {language === 'ar' ? 'إدارة المستخدمين' : 'User Management'}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {language === 'ar' ? 'إدارة حسابات المستخدمين والصلاحيات' : 'Manage user accounts and permissions'}
            </p>
          </div>
          <button
            onClick={handleAddUser}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2 space-x-reverse"
          >
            <Plus className="h-4 w-4" />
            <span>{language === 'ar' ? 'إضافة مستخدم' : 'Add User'}</span>
          </button>
        </div>

        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-right py-3 px-4 font-medium text-gray-700">
                    {language === 'ar' ? 'المستخدم' : 'User'}
                  </th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">
                    {language === 'ar' ? 'الدور' : 'Role'}
                  </th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">
                    {language === 'ar' ? 'الحالة' : 'Status'}
                  </th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">
                    {language === 'ar' ? 'آخر دخول' : 'Last Login'}
                  </th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">
                    {language === 'ar' ? 'الإجراءات' : 'Actions'}
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Users className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <Mail className="h-3 w-3 mr-1" />
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        user.role === 'admin' ? 'bg-red-100 text-red-800' :
                        user.role === 'editor' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {getRoleLabel(user.role)}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {getStatusLabel(user.status)}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600">
                      {new Date(user.lastLogin).toLocaleDateString(language === 'ar' ? 'ar' : 'en')}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <button
                          onClick={() => handleEditUser(user)}
                          className="text-blue-600 hover:text-blue-800"
                          title={language === 'ar' ? 'تعديل' : 'Edit'}
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-600 hover:text-red-800"
                          title={language === 'ar' ? 'حذف' : 'Delete'}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* User Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                {language === 'ar' ? 'إجمالي المستخدمين' : 'Total Users'}
              </p>
              <p className="text-2xl font-bold text-gray-900">{users.length}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-full">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                {language === 'ar' ? 'المستخدمون النشطون' : 'Active Users'}
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {users.filter(u => u.status === 'active').length}
              </p>
            </div>
            <div className="p-3 bg-green-50 rounded-full">
              <Shield className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                {language === 'ar' ? 'المديرون' : 'Administrators'}
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {users.filter(u => u.role === 'admin').length}
              </p>
            </div>
            <div className="p-3 bg-red-50 rounded-full">
              <Shield className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;