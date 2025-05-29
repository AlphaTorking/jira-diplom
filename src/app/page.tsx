// src/app/page.tsx
"use client";
import { useState } from 'react';
import { FiUser, FiFilter, FiPlus, FiChevronDown, FiChevronRight } from 'react-icons/fi';
import "tailwindcss";

// Типы данных
interface Task {
  id: number;
  name: string;
  description: string;
  criticality: string;
  priority: string;
  status: string;
  author: { id: number; login: string };
  worker?: { id: number; login: string };
  createDate: string;
  closeDate?: string;
  group: { id: number; name: string };
}

interface Group {
  id: number;
  name: string;
  tasks: Task[];
  isOpen: boolean;
}

const mockGroups: Group[] = [
  {
    id: 1,
    name: 'Бэклог',
    isOpen: true,
    tasks: [
      {
        id: 101,
        name: 'Рефакторинг кода',
        description: 'Провести рефакторинг модуля авторизации',
        criticality: 'Средний',
        priority: 'Высокий',
        status: 'Новое',
        author: { id: 1, login: 'admin' },
        createDate: '2023-10-15',
        group: { id: 1, name: 'Бэклог' }
      },
      {
        id: 102,
        name: 'Добавить документацию',
        description: 'Создать документацию для API',
        criticality: 'Низкий',
        priority: 'Нормальный',
        status: 'Новое',
        author: { id: 2, login: 'dev1' },
        createDate: '2023-10-16',
        group: { id: 1, name: 'Бэклог' }
      }
    ]
  },
  {
    id: 2,
    name: 'В работе',
    isOpen: true,
    tasks: [
      {
        id: 201,
        name: 'Исправить баг с авторизацией',
        description: 'При входе иногда выдает ошибку 500',
        criticality: 'Высокий',
        priority: 'Очень высокий',
        status: 'В работе',
        author: { id: 3, login: 'manager' },
        worker: { id: 2, login: 'dev1' },
        createDate: '2023-10-10',
        closeDate: '2023-10-20',
        group: { id: 2, name: 'В работе' }
      }
    ]
  },
  {
    id: 3,
    name: 'Завершено',
    isOpen: false,
    tasks: [
      {
        id: 301,
        name: 'Обновить дизайн',
        description: 'Обновить дизайн главной страницы',
        criticality: 'Средний',
        priority: 'Высокий',
        status: 'Завершено',
        author: { id: 1, login: 'admin' },
        worker: { id: 2, login: 'dev1' },
        createDate: '2023-09-20',
        closeDate: '2023-10-05',
        group: { id: 3, name: 'Завершено' }
      }
    ]
  }
];

// Компонент карточки задачи
function TaskCard({ task }: { task: Task }) {
  const statusColors: Record<string, string> = {
    'Новое': 'bg-blue-200',
    'В работе': 'bg-yellow-200',
    'Завершено': 'bg-green-200',
    'Тестирование': 'bg-purple-200',
    'Код-ревью': 'bg-orange-200',
    'Отказ': 'bg-red-200'
  };

  return (
    <div className="border rounded-lg p-4 mb-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-lg">{task.name}</h3>
          <p className="text-gray-600 mt-1">{task.description}</p>
          
          <div className="flex flex-wrap gap-2 mt-3">
            <span className={`px-2 py-1 rounded-full text-xs ${statusColors[task.status]}`}>
              {task.status}
            </span>
            <span className="px-2 py-1 rounded-full text-xs bg-gray-100">
              Приоритет: {task.priority}
            </span>
            <span className="px-2 py-1 rounded-full text-xs bg-gray-100">
              Критичность: {task.criticality}
            </span>
          </div>
        </div>
        
        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
      </div>
      
      <div className="mt-4 pt-2 border-t border-gray-100 flex justify-between text-sm">
        <div>
          <p>Автор: <span className="font-medium">{task.author.login}</span></p>
          {task.worker && <p>Исполнитель: <span className="font-medium">{task.worker.login}</span></p>}
        </div>
        <div className="text-right">
          <p>Создана: {task.createDate}</p>
          {task.closeDate && <p>Завершена: {task.closeDate}</p>}
        </div>
      </div>
    </div>
  );
}

// Компонент группы задач
function GroupItem({ group, toggleGroup }: { 
  group: Group; 
  toggleGroup: (id: number) => void 
}) {
  return (
    <div className="mb-4">
      <div 
        className="flex items-center justify-between p-3 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200"
        onClick={() => toggleGroup(group.id)}
      >
        <div className="flex items-center">
          {group.isOpen ? <FiChevronDown className="mr-2" /> : <FiChevronRight className="mr-2" />}
          <h3 className="font-semibold">{group.name}</h3>
        </div>
        <span className="bg-blue-500 text-white rounded-full px-2 py-1 text-xs">
          {group.tasks.length}
        </span>
      </div>
      
      {group.isOpen && (
        <div className="mt-2 ml-4">
          {group.tasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
}

// Главный компонент страницы
export default function TasksPage() {
  const [groups, setGroups] = useState<Group[]>(mockGroups);
  const [activeTab, setActiveTab] = useState('tasks');

  const toggleGroup = (groupId: number) => {
    setGroups(groups.map(group => 
      group.id === groupId ? { ...group, isOpen: !group.isOpen } : group
    ));
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Тулбар */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <button 
                className={`px-4 border-b-2 font-medium ${
                  activeTab === 'tasks' 
                    ? 'border-blue-500 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('tasks')}
              >
                Задачи
              </button>
            </div>
            
            <div className="flex items-center">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <FiFilter className="text-gray-600" />
              </button>
              <button className="ml-2 p-2 rounded-full hover:bg-gray-100">
                <FiPlus className="text-gray-600" />
              </button>
              <button 
                className="ml-4 flex items-center text-sm rounded-full focus:outline-none"
                onClick={() => setActiveTab('profile')}
              >
                <FiUser className="mr-2" />
                <span>Профиль</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Основной контент */}
      <main className="flex-grow flex">
        {/* Левая панель - Группы задач */}
        <div className="w-1/4 bg-white border-r p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Группы задач</h2>
            <button className="text-blue-500 hover:text-blue-700">
              <FiPlus />
            </button>
          </div>
          
          <div className="space-y-4">
            {groups.map(group => (
              <GroupItem 
                key={group.id} 
                group={group} 
                toggleGroup={toggleGroup} 
              />
            ))}
          </div>
        </div>
        
        {/* Правая панель - Задачи */}
        <div className="w-3/4 p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold">Все задачи</h1>
              <p className="text-gray-600">Просмотр и управление задачами</p>
            </div>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center">
              <FiPlus className="mr-2" />
              Новая задача
            </button>
          </div>
          
          <div className="space-y-4">
            {groups.flatMap(group => 
              group.isOpen ? group.tasks.map(task => (
                <TaskCard key={task.id} task={task} />
              )) : []
            )}
          </div>
        </div>
      </main>
    </div>
  );
}