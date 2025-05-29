import { Task } from '@/types/task'

interface Props {
  task: Task
}

const statusColors = {
  'Новое': 'bg-blue-200',
  'В работе': 'bg-yellow-200',
  'Завершено': 'bg-green-200',
  'Тестирование': 'bg-purple-200',
  'Код-ревью': 'bg-orange-200',
  'Отказ': 'bg-red-200'
}

export default function TaskCard({ task }: { task: Task }) {
  return (
    <div className="p-4 mb-2 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <h3 className="text-lg font-semibold">{task.name}</h3>
      <div className={`mt-2 px-2 py-1 rounded-full text-sm w-fit ${statusColors[task.status]}`}>
        {task.status}
      </div>
    </div>
  )
}