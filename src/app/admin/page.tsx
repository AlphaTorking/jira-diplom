// app/admin/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { FiUser, FiUsers, FiBriefcase, FiGrid, FiPlus, FiEdit, FiTrash } from 'react-icons/fi';
import { adminColors } from '@/constants/colors';
import AdminGuard from '@/components/AdminGuard';
import CreateUserModal from '@/components/admin/CreateUserModal';
import CreateTeamModal from '@/components/admin/CreateTeamModal';
import CreateCompanyModal from '@/components/admin/CreateCompanyModal';
import CreateSpaceModal from '@/components/admin/CreateSpaceModal';

// Типы данных
interface User {
  id: number;
  login: string;
  email: string;
  isAdmin: boolean;
  company: { name: string } | null;
  team: { name: string } | null;
}

interface Team {
  id: number;
  name: string;
  space: { name: string } | null;
}

interface Company {
  id: number;
  name: string;
  contactNumber: string;
  contactEmail: string;
}

interface Space {
  id: number;
  company: { name: string };
}

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState<User[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false);
  const [isSpaceModalOpen, setIsSpaceModalOpen] = useState(false);

 // Обработчики создания
  const handleCreateUser = async (userData: any) => {
    // Реализация создания пользователя через API
  };
  
  const handleCreateTeam = async (teamData: any) => {
    // Реализация создания команды через API
  };
  
  const handleCreateCompany = async (companyData: any) => {
    // Реализация создания компании через API
  };
  
  const handleCreateSpace = async (spaceData: any) => {
    // Реализация создания пространства через API
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Загрузка данных в зависимости от активной вкладки
        let endpoint = '';
        switch (activeTab) {
          case 'users': endpoint = '/api/admin/users'; break;
          case 'teams': endpoint = '/api/admin/teams'; break;
          case 'companies': endpoint = '/api/admin/companies'; break;
          case 'spaces': endpoint = '/api/admin/spaces'; break;
          default: endpoint = '/api/admin/users';
        }
        
        const response = await fetch(endpoint);
        if (!response.ok) throw new Error('Ошибка загрузки данных');
        
        const data = await response.json();
        
        switch (activeTab) {
          case 'users': setUsers(data); break;
          case 'teams': setTeams(data); break;
          case 'companies': setCompanies(data); break;
          case 'spaces': setSpaces(data); break;
        }
        
      } catch (err) {
        setError('Не удалось загрузить данные');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [activeTab]);

  return (
    <AdminGuard>
    <div className="min-h-screen bg-gray-50">
      <CreateUserModal
        isOpen={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
        onCreate={handleCreateUser}
        companies={companies}
        teams={teams}
      />
      
      <CreateTeamModal
        isOpen={isTeamModalOpen}
        onClose={() => setIsTeamModalOpen(false)}
        onCreate={handleCreateTeam}
        spaces={spaces}
      />
      
      <CreateCompanyModal
        isOpen={isCompanyModalOpen}
        onClose={() => setIsCompanyModalOpen(false)}
        onCreate={handleCreateCompany}
      />
      
      <CreateSpaceModal
        isOpen={isSpaceModalOpen}
        onClose={() => setIsSpaceModalOpen(false)}
        onCreate={handleCreateSpace}
        companies={companies}
      />

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold mb-8">Административная панель</h1>
        
        {/* Навигация */}
        <div className="flex border-b mb-6">
          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 font-medium flex items-center ${
              activeTab === 'users'
                ? 'text-blue-500 border-b-2 border-blue-500'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <FiUser className="mr-2" />
            Пользователи
          </button>
          
          <button
            onClick={() => setActiveTab('teams')}
            className={`px-4 py-2 font-medium flex items-center ${
              activeTab === 'teams'
                ? 'text-blue-500 border-b-2 border-blue-500'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <FiUsers className="mr-2" />
            Команды
          </button>
          
          <button
            onClick={() => setActiveTab('companies')}
            className={`px-4 py-2 font-medium flex items-center ${
              activeTab === 'companies'
                ? 'text-blue-500 border-b-2 border-blue-500'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <FiBriefcase className="mr-2" />
            Компании
          </button>
          
          <button
            onClick={() => setActiveTab('spaces')}
            className={`px-4 py-2 font-medium flex items-center ${
              activeTab === 'spaces'
                ? 'text-blue-500 border-b-2 border-blue-500'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <FiGrid className="mr-2" />
            Пространства
          </button>
        </div>
        
        {/* Контент */}
        {isLoading ? (
          <div className="text-center py-10">Загрузка...</div>
        ) : error ? (
          <div className="text-center text-red-500 py-10">{error}</div>
        ) : (
          <div>
            {/* Пользователи */}
            {activeTab === 'users' && (
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Управление пользователями</h2>
          <button 
            onClick={() => setIsUserModalOpen(true)}
            className={`${adminColors.primary} text-white px-4 py-2 rounded-md flex items-center`}
          >
            <FiPlus className="mr-2" />
            Добавить пользователя
          </button>
        </div>
      )}
      
      {activeTab === 'teams' && (
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Управление командами</h2>
          <button 
            onClick={() => setIsTeamModalOpen(true)}
            className={`${adminColors.primary} text-white px-4 py-2 rounded-md flex items-center`}
          >
            <FiPlus className="mr-2" />
            Добавить команду
          </button>
        </div>
      )}
      
      {activeTab === 'companies' && (
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Управление компаниями</h2>
          <button 
            onClick={() => setIsCompanyModalOpen(true)}
            className={`${adminColors.primary} text-white px-4 py-2 rounded-md flex items-center`}
          >
            <FiPlus className="mr-2" />
            Добавить компанию
          </button>
        </div>
      )}
      
      {activeTab === 'spaces' && (
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Управление пространствами</h2>
          <button 
            onClick={() => setIsSpaceModalOpen(true)}
            className={`${adminColors.primary} text-white px-4 py-2 rounded-md flex items-center`}
          >
            <FiPlus className="mr-2" />
            Добавить пространство
          </button>
        </div>
      )}
          </div>
        )}
      </div>
    </div>
    </AdminGuard>
  );
}