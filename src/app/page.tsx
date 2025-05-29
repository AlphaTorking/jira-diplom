// src/app/page.tsx
"use client";
import { useEffect, useState } from 'react';
import { FiUser, FiFilter, FiPlus, FiChevronDown, FiChevronRight, FiX } from 'react-icons/fi';
import './globals.css'

// Типы данных (адаптированные под Prisma)
interface Task {
  id: number;
  name: string;
  description: string | null;
  criticality: string;
  priority: string;
  status: string;
  author: { id: number; login: string };
  worker?: { id: number; login: string } | null;
  createDate: Date;
  closeDate?: Date | null;
  group: { id: number; name: string };
}

interface Group {
  id: number;
  name: string;
  tasks: Task[];
  isOpen: boolean;
}

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
          <p>Создана: {task.createDate.toString()}</p>
          {task.closeDate && <p>Завершена: {task.closeDate.toString()}</p>}
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

export default function TasksPage() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [activeTab, setActiveTab] = useState('tasks');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [newTask, setNewTask] = useState({
    name: '',
    description: '',
    criticality: 'Низкий',
    priority: 'Нормальный',
    status: 'Новое',
    groupId: 1,
  });

  // Загрузка групп и задач
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/groups');
        
        if (!response.ok) {
          throw new Error('Ошибка загрузки данных');
        }
        
        const data = await response.json();
        
        // Добавляем состояние isOpen для каждой группы
        const groupsWithState = data.map((group: any) => ({
          ...group,
          isOpen: true,
          tasks: group.tasks.map((task: any) => ({
            ...task,
            createDate: new Date(task.createDate).toLocaleDateString('ru-RU'),
            closeDate: task.closeDate 
              ? new Date(task.closeDate).toLocaleDateString('ru-RU') 
              : null
          }))
        }));
        
        setGroups(groupsWithState);
      } catch (err) {
        console.error('Ошибка загрузки:', err);
        setError('Не удалось загрузить данные');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const toggleGroup = (groupId: number) => {
    setGroups(groups.map(group => 
      group.id === groupId ? { ...group, isOpen: !group.isOpen } : group
    ));
  };

  const handleCreateTask = async () => {
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTask)
      });
      
      if (!response.ok) {
        throw new Error('Ошибка создания задачи');
      }
      
      const createdTask = await response.json();
      
      // Форматируем даты для отображения
      const formattedTask = {
        ...createdTask,
        createDate: new Date(createdTask.createDate).toLocaleDateString('ru-RU'),
        closeDate: createdTask.closeDate 
          ? new Date(createdTask.closeDate).toLocaleDateString('ru-RU') 
          : null,
        group: groups.find(g => g.id === createdTask.groupId)
      };
      
      // Обновляем группы с новой задачей
      setGroups(groups.map(group => {
        if (group.id === newTask.groupId) {
          return {
            ...group,
            tasks: [...group.tasks, formattedTask]
          };
        }
        return group;
      }));
      
      // Закрываем модальное окно и сбрасываем форму
      setIsCreateModalOpen(false);
      setNewTask({
        name: '',
        description: '',
        criticality: 'Низкий',
        priority: 'Нормальный',
        status: 'Новое',
        groupId: 1,
      });
      
    } catch (err) {
      console.error('Ошибка создания задачи:', err);
      setError('Не удалось создать задачу');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewTask(prev => ({
      ...prev,
      [name]: value
    }));
  };
   if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl">Загрузка данных...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-red-500">{error}</div>
      </div>
    );
  }


  return (
    <div className="min-h-screen flex flex-col">
      {/* Модальное окно создания задачи */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Создать новую задачу</h2>
              <button 
                onClick={() => setIsCreateModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Название задачи *
                </label>
                <input
                  type="text"
                  name="name"
                  value={newTask.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Описание
                </label>
                <textarea
                  name="description"
                  value={newTask.description}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md h-32"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Критичность
                  </label>
                  <select
                    name="criticality"
                    value={newTask.criticality}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="Низкий">Низкий</option>
                    <option value="Средний">Средний</option>
                    <option value="Высокий">Высокий</option>
                    <option value="Критичный">Критичный</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Приоритет
                  </label>
                  <select
                    name="priority"
                    value={newTask.priority}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="Очень низкий">Очень низкий</option>
                    <option value="Низкий">Низкий</option>
                    <option value="Нормальный">Нормальный</option>
                    <option value="Высокий">Высокий</option>
                    <option value="Очень высокий">Очень высокий</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Группа
                  </label>
                  <select
                    name="groupId"
                    value={newTask.groupId}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md"
                  >
                    {groups.map(group => (
                      <option key={group.id} value={group.id}>
                        {group.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
                >
                  Отмена
                </button>
                <button
                  onClick={handleCreateTask}
                  disabled={!newTask.name.trim()}
                  className={`px-4 py-2 rounded-md text-white ${
                    !newTask.name.trim()
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-blue-500 hover:bg-blue-600'
                  }`}
                >
                  Создать задачу
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
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
          <button 
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
          >
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
    </div>
    
  );
}