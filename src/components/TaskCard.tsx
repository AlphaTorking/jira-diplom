import { Task } from '@/types/task';

interface Props {
  task: Task;
}

export default function TaskCard({ task }: Props) {
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
          {task.description && (
            <p className="text-gray-600 mt-1">{task.description}</p>
          )}
          
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