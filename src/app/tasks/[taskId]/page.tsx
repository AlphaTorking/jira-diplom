'use client';

import { useState, useEffect, useMemo } from 'react';
import { FiArrowLeft, FiEdit, FiSave, FiUser, FiX } from 'react-icons/fi';
import { useParams, useRouter } from 'next/navigation';
import type { User } from '@/types/users';
import type { Task } from '@/types/task';
import '../../globals.css'  
import { TaskStatusLevel, TaskPriorityLevel, TaskCriticalityLevel } from '@prisma/client';

export default function TaskDetail() {
  const params = useParams();
  const router = useRouter();
  const [task, setTask] = useState<Task | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  // Состояния для редактирования
  const [editedTask, setEditedTask] = useState({
    status: '',
    workerId: '',
    result: ''
  });
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

  // Загрузка задачи и пользователей
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Загружаем задачу 
        const taskRes = await fetch(`/api/tasks/${params.taskId}`);
        if (!taskRes.ok) throw new Error('Ошибка загрузки задачи');
        const taskData = await taskRes.json();
        setTask(taskData);
        
        // Устанавливаем значения для редактирования 
        setEditedTask({
          status: taskData.status || '',
          workerId: (taskData.worker?.id?.toString()) || '',
          result: taskData.result || ''
        });
        
        // Загружаем пользователей
        const usersRes = await fetch('/api/users');
        if (!usersRes.ok) throw new Error('Ошибка загрузки пользователей');
        const usersData = await usersRes.json();
        setUsers(usersData);
        
      } catch (err) {
        console.error(err);
        setError('Не удалось загрузить данные');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [params.taskId]); 

  // Обработка сохранения изменений
  const handleSave = async () => {
    try {
      const response = await fetch(`/api/tasks/${params.taskId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: editedTask.status,
          workerId: editedTask.workerId ? Number(editedTask.workerId) : null,
          result: editedTask.result,
          closeDate: editedTask.status === TaskStatusLevel.Завершено && task?.status !== TaskStatusLevel.Завершено 
            ? new Date().toISOString() 
            : task?.closeDate
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Ошибка обновления задачи');
      }
      
      const updatedTask = await response.json();
      setTask(updatedTask);
      setIsEditing(false);
      setError(''); // Сбрасываем ошибку при успешном сохранении
      
    } catch (err) {
      console.error('Ошибка обновления:', err);
    }
  };

  // Функция для форматирования даты 
  const formatDate = (dateString: string | Date) => {
    if (!dateString) return 'Нет даты';
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl">Загрузка задачи...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-red-500">{error}</div>
        <button 
          onClick={() => router.back()}
          className="ml-4 flex items-center text-blue-500 hover:text-blue-700"
        >
          <FiArrowLeft className="mr-2" />
          Назад
        </button>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-red-500">Задача не найдена</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Шапка */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <button 
            onClick={() => router.back()}
            className="flex items-center text-blue-500 hover:text-blue-700"
          >
            <FiArrowLeft className="mr-2" />
            Назад к задачам
          </button>
          
          <div className="text-xl font-bold">
            {task.name}
          </div>
          
          <div>
            {isEditing ? (
              <div className="flex space-x-2">
                <button 
                  onClick={() => setIsEditing(false)}
                  className="flex items-center bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
                >
                  <FiX className="mr-2" />
                  Отмена
                </button>
                <button 
                  onClick={handleSave}
                  className="flex items-center bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
                >
                  <FiSave className="mr-2" />
                  Сохранить
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setIsEditing(true)}
                className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
              >
                <FiEdit className="mr-2" />
                Редактировать
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Основной контент */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold">{task.name}</h1>
                <p className="text-gray-600 mt-1">{task.description}</p>
              </div>
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
            </div>
          </div>
          
          <div className="px-6 py-4 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Статическая информация */}
            <div>
              <h2 className="text-lg font-semibold mb-3">Основная информация</h2>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-sm text-gray-500">Статус</label>
                  <p className="font-medium">
                    {isEditing ? (
                      <select
                        value={editedTask.status}
                        onChange={(e) => setEditedTask({...editedTask, status: e.target.value})}
                        className="w-full p-2 border rounded-md"
                      >
                        {Object.entries(STATUS_LABELS).map(([status]) => (
                        <option 
                          key={status} 
                          value={status}
                        >
                          {status}
                        </option>
                      ))}
                      </select>
                    ) : (
                      STATUS_LABELS[task.status]
                    )}
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm text-gray-500">Автор</label>
                  <p className="font-medium flex items-center">
                    <FiUser className="mr-2" />
                    {task.author?.login || 'Неизвестно'}
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm text-gray-500">Исполнитель</label>
                  {isEditing ? (
                    <select
                      value={editedTask.workerId}
                      onChange={(e) => setEditedTask({...editedTask, workerId: e.target.value})}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="">Не назначен</option>
                      {users.map(user => (
                        <option key={user.id} value={user.id}>
                          {user.login}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <p className="font-medium flex items-center">
                      {task.worker ? (
                        <>
                          <FiUser className="mr-2" />
                          {task.worker.login}
                        </>
                      ) : 'Не назначен'}
                    </p>
                  )}
                </div>
              </div>
            </div>
            
            {/* Дополнительная информация */}
            <div>
              <h2 className="text-lg font-semibold mb-3">Детали задачи</h2>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-sm text-gray-500">Критичность</label>
                  {CRITICALITY_LABELS[task.criticality]}
                </div>
                
                <div>
                  <label className="block text-sm text-gray-500">Приоритет</label>
                  {PRIORITY_LABELS[task.priority]}
                </div>
                
                <div>
                  <label className="block text-sm text-gray-500">Дата создания</label>
                  <p className="font-medium">{formatDate(task.createDate)}</p>
                </div>
                
                {task.closeDate && (
                  <div>
                    <label className="block text-sm text-gray-500">Дата завершения</label>
                    <p className="font-medium">{formatDate(task.closeDate)}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Результат выполнения */}
          <div className="px-6 py-4 border-t">
            <h2 className="text-lg font-semibold mb-3">Результат выполнения</h2>
            
            {isEditing ? (
              <textarea
                value={editedTask.result}
                onChange={(e) => setEditedTask({...editedTask, result: e.target.value})}
                className="w-full p-3 border rounded-md min-h-[120px]"
                placeholder="Опишите результат выполнения задачи..."
              />
            ) : (
              <p className={`text-gray-700 ${task.result ? '' : 'italic text-gray-400'}`}>
                {task.result || 'Результат не указан'}
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}