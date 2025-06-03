// components/admin/CreateCompanyModal.tsx
"use client";

import { useState } from 'react';
import { FiX, FiBriefcase, FiPhone, FiMail } from 'react-icons/fi';
import { adminColors } from '@/constants/colors';

interface CreateCompanyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (companyData: any) => void;
}

export default function CreateCompanyModal({ 
  isOpen, 
  onClose, 
  onCreate
}: CreateCompanyModalProps) {
  const [companyData, setCompanyData] = useState({
    name: '',
    phone: '',
    email: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCompanyData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate(companyData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Создать компанию</h2>
          <button onClick={onClose}>
            <FiX size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Название компании *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiBriefcase className="text-gray-400" />
                </div>
                <input
                  type="text"
                  name="name"
                  value={companyData.name}
                  onChange={handleChange}
                  className="pl-10 w-full p-2 border rounded-md"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Контактный телефон *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiPhone className="text-gray-400" />
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={companyData.phone}
                  onChange={handleChange}
                  className="pl-10 w-full p-2 border rounded-md"
                  placeholder="+7 XXX XXX-XX-XX"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Контактный email *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={companyData.email}
                  onChange={handleChange}
                  className="pl-10 w-full p-2 border rounded-md"
                  required
                />
              </div>
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