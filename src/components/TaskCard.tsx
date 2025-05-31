import { Task } from '@/types/task';
import { useRouter } from 'next/navigation';
import { TaskStatusLevel, TaskPriorityLevel, TaskCriticalityLevel } from '@prisma/client';

interface Props {
  task: Task;
}

export default function TaskCard({ task }: Props) {
  const router = useRouter();
  
  const handleClick = () => {
    router.push(`/tasks/${task.id}`);
  };
  //Цвета для статуса
  const statusColors: Record<string, string> = {
  [TaskStatusLevel.Новое]: 'bg-blue-100 text-blue-800',
  [TaskStatusLevel.В_работе]: 'bg-yellow-100 text-yellow-800',
  [TaskStatusLevel.Завершено]: 'bg-green-100 text-green-800',
  [TaskStatusLevel.Тестирование]: 'bg-purple-100 text-purple-800',
  [TaskStatusLevel.Код_ревью]: 'bg-indigo-100 text-indigo-800',
  [TaskStatusLevel.Отказ]: 'bg-red-100 text-red-800',
  };
  // Цвета для критичности
  const criticalityColors: Record<string, string> = {
    [TaskCriticalityLevel.Низкий]: 'bg-green-100 text-green-800',
    [TaskCriticalityLevel.Средний]: 'bg-yellow-100 text-yellow-800',
    [TaskCriticalityLevel.Высокий]: 'bg-orange-100 text-orange-800',
    [TaskCriticalityLevel.Критичный]: 'bg-red-100 text-red-800'
  };

  // Цвета для приоритета
  const priorityColors: Record<string, string> = {
    [TaskPriorityLevel.Очень_низкий]: 'bg-gray-100 text-gray-800',
    [TaskPriorityLevel.Низкий]: 'bg-blue-100 text-blue-800',
    [TaskPriorityLevel.Нормальный]: 'bg-green-100 text-green-800',
    [TaskPriorityLevel.Высокий]: 'bg-orange-100 text-orange-800',
    [TaskPriorityLevel.Очень_высокий]: 'bg-red-100 text-red-800'
  };

  return (
    <div 
      className="border rounded-lg p-4 mb-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-lg">{task.name}</h3>
          {task.description && (
            <p className="text-gray-600 mt-1">{task.description}</p>
          )}
          
         <div className="flex flex-wrap gap-2 mt-3">
        <span className={`px-2 py-1 rounded-full text-xs ${statusColors[task.status]}`}>
          {task.status}
        </span>
        <span className={`px-2 py-1 rounded-full text-xs ${priorityColors[task.priority]}`}>
          Приоритет: {task.priority}
        </span>
        <span className={`px-2 py-1 rounded-full text-xs ${criticalityColors[task.criticality]}`}>
          Критичность: {task.criticality}
        </span>
      </div>
      </div>
        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
      </div>
      
      <div className="mt-4 pt-2 border-t border-gray-100 flex justify-between text-sm">
        <div>
          <p>Автор: <span className="font-medium">{task.author.login}</span></p>
          {task.worker && (
            <p>Исполнитель: <span className="font-medium">{task.worker.login}</span></p>
          )}
        </div>
        <div className="text-right">
          <p>Создана: {task.createDate}</p>
          {task.closeDate && <p>Завершена: {task.closeDate}</p>}
        </div>
      </div>
    </div>
  );
}