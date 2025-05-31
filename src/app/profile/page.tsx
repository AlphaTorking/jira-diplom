"use client";

import { useState, useEffect } from 'react';
import { FiUser, FiMail, FiPhone, FiLogOut, FiSave } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: ''
  });

  // Загрузка данных пользователя
  useEffect(() => {
    // В реальном приложении здесь будет запрос к API
    const mockUser = {
      id: 1,
      name: 'Иван Иванов',
      email: 'ivanov@example.com',
      phone: '+7 912 345-67-89',
      company: 'ООО "ТехноПрогресс"',
      role: 'Администратор',
      createdAt: '2023-01-15',
    };
    
    setTimeout(() => {
      setUser(mockUser);
      setFormData({
        name: mockUser.name,
        email: mockUser.email,
        phone: mockUser.phone,
        company: mockUser.company
      });
      setIsLoading(false);
    }, 500);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Здесь будет запрос на обновление данных
    console.log('Сохранение данных:', formData);
    setIsEditing(false);
    // В реальном приложении: 
    // fetch('/api/profile', { method: 'PUT', body: JSON.stringify(formData) })
  };

  const handleLogout = () => {
    // Очистка данных сессии/токена
    localStorage.removeItem('authToken');
    // Перенаправление на страницу входа
    router.push('/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl">Загрузка профиля...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h1 className="text-2xl font-bold">Профиль пользователя</h1>
            <button
              onClick={handleLogout}
              className="flex items-center text-red-500 hover:text-red-700"
            >
              <FiLogOut className="mr-2" />
              Выйти
            </button>
          </div>
          
          <div className="px-6 py-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1 flex flex-col items-center">
                <div className="bg-gray-200 border-2 border-dashed rounded-full w-32 h-32 mb-4" />
                <h2 className="text-xl font-semibold">{user.name}</h2>
                <p className="text-gray-600">{user.role}</p>
              </div>
              
              <div className="md:col-span-2">
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        ФИО
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FiUser className="text-gray-400" />
                        </div>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="pl-10 w-full p-2 border rounded-md"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FiMail className="text-gray-400" />
                        </div>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="pl-10 w-full p-2 border rounded-md"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Телефон
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FiPhone className="text-gray-400" />
                        </div>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="pl-10 w-full p-2 border rounded-md"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Компания
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-md"
                      />
                    </div>
                    
                    <div className="flex justify-end space-x-3 pt-4">
                      <button
                        onClick={() => setIsEditing(false)}
                        className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
                      >
                        Отмена
                      </button>
                      <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md flex items-center"
                      >
                        <FiSave className="mr-2" />
                        Сохранить
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <FiUser className="text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">ФИО</p>
                        <p className="font-medium">{user.name}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <FiMail className="text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium">{user.email}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <FiPhone className="text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Телефон</p>
                        <p className="font-medium">{user.phone}</p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500">Компания</p>
                      <p className="font-medium">{user.company}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div>
                        <p className="text-sm text-gray-500">Роль</p>
                        <p className="font-medium">{user.role}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500">Дата регистрации</p>
                        <p className="font-medium">{user.createdAt}</p>
                      </div>
                    </div>
                    
                    <div className="pt-6">
                      <button
                        onClick={() => setIsEditing(true)}
                        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                      >
                        Редактировать профиль
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}