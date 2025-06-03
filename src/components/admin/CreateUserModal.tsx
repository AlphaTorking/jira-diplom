// components/admin/CreateUserModal.tsx

"use client";

import { useState } from 'react';
import { FiX, FiUser, FiMail, FiLock } from 'react-icons/fi';
import { adminColors } from '@/constants/colors';

interface CreateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (userData: any) => void;
  companies: any[];
  teams: any[];
}

export default function CreateUserModal({ 
  isOpen, 
  onClose, 
  onCreate,
  companies,
  teams
}: CreateUserModalProps) {
  const [userData, setUserData] = useState({
    login: '',
    email: '',
    password: '',
    isAdmin: false,
    companyId: '',
    teamId: '',
    spaceId: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setUserData(prev => ({ ...prev, [name]: val }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate(userData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Создать пользователя</h2>
          <button onClick={onClose}>
            <FiX size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Логин *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="text-gray-400" />
                </div>
                <input
                  type="text"
                  name="login"
                  value={userData.login}
                  onChange={handleChange}
                  className="pl-10 w-full p-2 border rounded-md"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  className="pl-10 w-full p-2 border rounded-md"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Пароль *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="text-gray-400" />
                </div>
                <input
                  type="password"
                  name="password"
                  value={userData.password}
                  onChange={handleChange}
                  className="pl-10 w-full p-2 border rounded-md"
                  required
                />
              </div>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                name="isAdmin"
                checked={userData.isAdmin}
                onChange={handleChange}
                className="mr-2 h-5 w-5 text-blue-600 rounded"
              />
              <label className="text-sm font-medium text-gray-700">
                Администратор
              </label>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Компания
              </label>
              <select
                name="companyId"
                value={userData.companyId}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              >
                <option value="">Выберите компанию</option>
                {companies.map(company => (
                  <option key={company.id} value={company.id}>
                    {company.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Команда
              </label>
              <select
                name="teamId"
                value={userData.teamId}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              >
                <option value="">Выберите команду</option>
                {teams.map(team => (
                  <option key={team.id} value={team.id}>
                    {team.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
              >
                Отмена
              </button>
              <button
                type="submit"
                className={`px-4 py-2 ${adminColors.primary} text-white rounded-md`}
              >
                Создать
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}