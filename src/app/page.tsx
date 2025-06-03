// src/app/page.tsx
"use client";
import { useEffect, useState, useMemo } from 'react';
import { FiUser, FiFilter, FiPlus, FiChevronDown, FiChevronRight, FiX } from 'react-icons/fi';
import './globals.css' 
import TaskCard from '@/components/TaskCard';
import type { Task, Group } from '@/types/task';
import { GroupItem } from '@/components/GroupItem';
import { useRouter } from 'next/navigation';
import { TaskStatusLevel, TaskPriorityLevel, TaskCriticalityLevel } from '@prisma/client';
import { useAuth } from '@/components/AuthProvider';
import prisma from '@/lib/prismaClient';

interface Filters {
  status: TaskStatusLevel[];
  priority: TaskPriorityLevel[];
  criticality: TaskCriticalityLevel[];
  search: string;
  group: number | null;
}

export default function TasksPage() {
  const router = useRouter();
  const { getAccessToken } = useAuth(); // Получаем функцию для доступа к токену
  const [groups, setGroups] = useState<Group[]>([]);
  const [activeTab, setActiveTab] = useState('tasks');
  const CRITICALITY_LABELS: Record<TaskCriticalityLevel, string> = {
  [TaskCriticalityLevel.Низкий]: 'Низкий',
  [TaskCriticalityLevel.Средний]: 'Средний',
  [TaskCriticalityLevel.Высокий]: 'Высокий',
  [TaskCriticalityLevel.Критичный]: 'Критичный'
  };
  const STATUS_LABELS: Record<TaskStatusLevel, string> = {
    [TaskStatusLevel.Новое]: 'Новое',
    [TaskStatusLevel.В_работе]: 'В работе',
    [TaskStatusLevel.Код_ревью]: 'Код ревью',
    [TaskStatusLevel.Тестирование]: 'Тестирование',
    [TaskStatusLevel.Завершено]: 'Завершено',
    [TaskStatusLevel.Отказ] :'Отказ'
  };
  const PRIORITY_LABELS: Record<TaskPriorityLevel, string> = {
    [TaskPriorityLevel.Очень_низкий] : 'Очень низкий',
    [TaskPriorityLevel.Низкий] : 'Низкий',
    [TaskPriorityLevel.Нормальный]: 'Нормальный',
    [TaskPriorityLevel.Высокий]: 'Высокий',
    [TaskPriorityLevel.Очень_высокий]: 'Очень высокий'
  };
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newGroupName, setNewGroupName] = useState('');
  const [newTask, setNewTask] = useState({
    name: '',
    description: '',
    criticality: TaskCriticalityLevel.Низкий,
    priority: TaskPriorityLevel.Нормальный,
    status: TaskStatusLevel.Новое,
    groupId: 1,
  });
   const [filters, setFilters] = useState<Filters>({
    status: [],
    priority: [],
    criticality: [],
    search: '',
    group: null
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Фильтрация задач
  const filteredGroups = useMemo(() => {
    return groups.map(group => ({
      ...group,
      tasks: group.tasks.filter(task => {

        const taskPriority = task.priority as TaskPriorityLevel;
        const taskStatus = task.status as TaskStatusLevel;
        const taskCriticality = task.criticality as TaskCriticalityLevel;

        // Фильтр по статусу
        if (filters.status.length > 0 && !filters.status.includes(taskStatus)) {
          return false;
        }
        
        // Фильтр по приоритету
        if (filters.priority.length > 0 && !filters.priority.includes(taskPriority)) {
          return false;
        }
        
        // Фильтр по критичности
        if (filters.criticality.length > 0 && !filters.criticality.includes(taskCriticality)) {
          return false;
        }
        
        // Фильтр по поиску
        if (filters.search && 
            !task.name.toLowerCase().includes(filters.search.toLowerCase()) &&
            !task.description?.toLowerCase().includes(filters.search.toLowerCase())) {
          return false;
        }
        
        // Фильтр по группе
        if (filters.group && task.group.id !== filters.group) {
          return false;
        }
        
        return true;
      })
    }));
  }, [groups, filters]);

  // Обработчики фильтров
  const toggleStatusFilter = (status: TaskStatusLevel) => {
    setFilters(prev => ({
      ...prev,
      status: prev.status.includes(status)
        ? prev.status.filter(s => s !== status)
        : [...prev.status, status]
    }));
  };
  const togglePriorityFilter = (priority: TaskPriorityLevel) => {
    setFilters(prev => ({
      ...prev,
      priority: prev.priority.includes(priority)
        ? prev.priority.filter(s => s !== priority)
        : [...prev.priority, priority]
    }));
  };
  const toggleCriticalityFilter = (criticality: TaskCriticalityLevel) => {
    setFilters(prev => ({
      ...prev,
      criticality: prev.criticality.includes(criticality)
        ? prev.criticality.filter(s => s !== criticality)
        : [...prev.criticality, criticality]
    }));
  };

  useEffect(() => {
    if (activeTab === 'profile') {
      setIsRedirecting(true);
      router.push('/profile');
    }
  }, [activeTab, router]);

  // Загрузка групп и задач
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
      
      // Получаем токен
      const accessToken = getAccessToken();
      
      if (!accessToken) {
        setError('Пользователь не авторизован');
        return;
      }
      
      const response = await fetch('/api/groups', {
        headers: {
          'Authorization': `Bearer ${accessToken}` // Добавляем токен в заголовок
        }
      });
        
        if (!response.ok) {
          throw new Error('Ошибка загрузки данных');
        }
        
        const data = await response.json();
        
        // Добавляем состояние isOpen для каждой группы
        const groupsWithState = data.map((group: any) => ({
          ...group,
          isOpen: false,
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

  if (isRedirecting) {
    return <div className="text-center py-8">Перенаправление на профиль...</div>;
  }

  const toggleGroup = (groupId: number) => {
    setGroups(groups.map(group => 
      group.id === groupId ? { ...group, isOpen: !group.isOpen } : group
    ));
  };

  // Создание задачи
  const handleCreateTask = async () => {
    try {
      const accessToken = getAccessToken();

  
    
    // Проверка обязательных полей
    if (!newTask.name.trim()) {
      setError('Название задачи обязательно');
      return;
    }

    const response = await fetch('/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify(newTask)
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error response:', errorData);
      setError(errorData.error || 'Ошибка создания задачи');
      return;
    }
    
    const createdTask = await response.json();
    console.log('Created task response:', createdTask);
      
     // Обновляем группы с новой задачей
    setGroups(groups.map(group => {
      if (group.id === newTask.groupId) {
        return {
          ...group,
          tasks: [...group.tasks, {
            ...createdTask,
            createDate: new Date(createdTask.createDate).toLocaleDateString('ru-RU'),
            closeDate: createdTask.closeDate 
              ? new Date(createdTask.closeDate).toLocaleDateString('ru-RU') 
              : null
          }]
        };
      }
      return group;
    }));
      
      // Закрываем модальное окно и сбрасываем форму
      setIsCreateModalOpen(false);
      setNewTask({
        name: '',
        description: '',
        criticality: TaskCriticalityLevel.Низкий,
        priority: TaskPriorityLevel.Нормальный,
        status: TaskStatusLevel.Новое,
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
   // Создание группы
  const handleCreateGroup = async () => {
    try {
      const response = await fetch('/api/groups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newGroupName })
      });
      
      if (!response.ok) throw new Error('Ошибка создания группы');
      
      const newGroup = await response.json();
      
      setGroups([
        ...groups,
        {
          ...newGroup,
          isOpen: true,
          tasks: []
        }
      ]);
      
      setIsGroupModalOpen(false);
      setNewGroupName('');
      
    } catch (err) {
      console.error('Ошибка создания группы:', err);
      setError('Не удалось создать группу');
    }
  };


  return (

     <div className="min-h-screen flex flex-col">
      {/* Модальное окно создания группы */}
      {isGroupModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Создать новую группу</h2>
              <button onClick={() => setIsGroupModalOpen(false)}>
                <FiX size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Название группы *
                </label>
                <input
                  type="text"
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={() => setIsGroupModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
                >
                  Отмена
                </button>
                <button
                  onClick={handleCreateGroup}
                  disabled={!newGroupName.trim()}
                  className={`px-4 py-2 rounded-md text-white ${
                    !newGroupName.trim()
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-green-500 hover:bg-green-600'
                  }`}
                >
                  Создать группу
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
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
                    {Object.values(TaskCriticalityLevel).map(criticality => (
                    <option 
                      key={criticality} 
                      value={criticality}
                    >
                      {CRITICALITY_LABELS[criticality]}
                    </option>
                  ))}
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
                    {Object.values(TaskPriorityLevel).map(priority => (
                    <option 
                      key={priority} 
                      value={priority}
                    >
                      {PRIORITY_LABELS[priority]}
                    </option>
                  ))}
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
               {/* Кнопка фильтров */}
              <div className="relative">
                <button 
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className={`p-2 rounded-full flex items-center ${
                    Object.values(filters).some(f => f.length > 0 || f !== '') 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <FiFilter className="mr-1" />
                  <span>Фильтры</span>
                </button>
                {/* Выпадающее меню фильтров */}
                {isFilterOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white shadow-xl rounded-lg z-50 p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-bold">Фильтры задач</h3>
                      <button onClick={() => setIsFilterOpen(false)}>
                        <FiX />
                      </button>
                    </div>
                    
                    {/* Поиск */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-1">Поиск</label>
                      <input
                        type="text"
                        placeholder="Название или описание"
                        value={filters.search}
                        onChange={e => setFilters({...filters, search: e.target.value})}
                        className="w-full p-2 border rounded-md"
                      />
                    </div>
                    
                    {/* Фильтр по группам */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-1">Группа</label>
                      <select
                        value={filters.group || ''}
                        onChange={e => setFilters({
                          ...filters, 
                          group: e.target.value ? Number(e.target.value) : null
                        })}
                        className="w-full p-2 border rounded-md"
                      >
                        <option value="">Все группы</option>
                        {groups.map(group => (
                          <option key={group.id} value={group.id}>
                            {group.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    {/* Фильтр по статусу */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-1">Статус</label>
                      <div className="grid grid-cols-2 gap-2">
                        {Object.entries(STATUS_LABELS).map(([enumValue, displayName]) => (
                          <button
                            key={enumValue}
                            onClick={() => toggleStatusFilter(enumValue as TaskStatusLevel)}
                            className={`px-3 py-1 rounded-full text-xs ${
                              filters.status.includes(enumValue as TaskStatusLevel)
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-100 hover:bg-gray-200'
                            }`}
                          >
                            {displayName}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Фильтр по приоритету */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-1">Приоритет</label>
                      <div className="grid grid-cols-2 gap-2">
                        {Object.entries(PRIORITY_LABELS).map(([enumValue, displayName]) => (
                          <button
                            key={enumValue}
                            onClick={() => togglePriorityFilter(enumValue as TaskPriorityLevel)}
                            className={`px-3 py-1 rounded-full text-xs ${
                              filters.priority.includes(enumValue as TaskPriorityLevel)
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-100 hover:bg-gray-200'
                            }`}
                          >
                            {displayName}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Фильтр по критичности */}
                    <div>
                      <label className="block text-sm font-medium mb-1">Критичность</label>
                      <div className="grid grid-cols-2 gap-2">
                        {Object.entries(CRITICALITY_LABELS).map(([enumValue,displayName]) => (
                          <button
                            key={enumValue}
                            onClick={() => toggleCriticalityFilter(enumValue as TaskCriticalityLevel)}
                            className={`px-3 py-1 rounded-full text-xs ${
                              filters.criticality.includes(enumValue as TaskCriticalityLevel)
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-100 hover:bg-gray-200'
                            }`}
                          >
                            {displayName}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Кнопка сброса */}
                    <div className="mt-4">
                      <button
                        onClick={() => setFilters({
                          status: [],
                          priority: [],
                          criticality: [],
                          search: '',
                          group: null
                        })}
                        className="w-full py-2 text-blue-500 border border-blue-500 rounded-md hover:bg-blue-50"
                      >
                        Сбросить фильтры
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <button className="ml-2 p-2 rounded-full hover:bg-gray-100">
                <FiPlus className="text-gray-600" />
              </button>
              <button 
                className={`ml-4 px-4 border-b-2 font-medium flex items-center ${
                  activeTab === 'profile' 
                    ? 'border-blue-500 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('profile')}
              >
                <FiUser className="mr-2" />
                Профиль 
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
            <button 
              onClick={() => setIsGroupModalOpen(true)}
              className="text-green-500 hover:text-green-700"
            >
              <FiPlus size={20} />
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
            {filteredGroups.flatMap(group => 
              group.isOpen ? group.tasks.map(task => (
                <TaskCard key={task.id} task={task} />
              )) : []
            )}
            
            {filteredGroups.flatMap(g => g.tasks).length === 0 && (
              <div className="text-center py-10 text-gray-500">
                <FiFilter className="mx-auto text-3xl mb-2" />
                <p>Задачи не найдены по выбранным фильтрам</p>
                <button 
                  onClick={() => setFilters({
                    status: [],
                    priority: [],
                    criticality: [],
                    search: '',
                    group: null
                  })}
                  className="mt-2 text-blue-500 hover:underline"
                >
                  Сбросить фильтры
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
    </div>
    </div>
  );
}