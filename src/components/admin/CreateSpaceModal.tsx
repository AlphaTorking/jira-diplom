// components/admin/CreateSpaceModal.tsx
"use client";

import { useState } from 'react';
import { FiX, FiGrid } from 'react-icons/fi';
import { adminColors } from '@/constants/colors';

interface CreateSpaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (spaceData: any) => void;
  companies: any[];
}

export default function CreateSpaceModal({ 
  isOpen, 
  onClose, 
  onCreate,
  companies
}: CreateSpaceModalProps) {
  const [spaceData, setSpaceData] = useState({
    companyId: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSpaceData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate(spaceData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Создать пространство</h2>
          <button onClick={onClose}>
            <FiX size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Компания *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiGrid className="text-gray-400" />
                </div>
                <select
                  name="companyId"
                  value={spaceData.companyId}
                  onChange={handleChange}
                  className="pl-10 w-full p-2 border rounded-md"
                  required
                >
                  <option value="">Выберите компанию</option>
                  {companies.map(company => (
                    <option key={company.id} value={company.id}>
                      {company.name}
                    </option>
                  ))}
                </select>
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