// types/task.ts
export interface Task {
  id: number
  name: string
  description?: string
  criticality: 'Низкий' | 'Средний' | 'Высокий' | 'Критичный'
  priority: 'Очень низкий' | 'Низкий' | 'Нормальный' | 'Высокий' | 'Очень высокий'
  status: 'Новое' | 'В работе' | 'Завершено' | 'Тестирование' | 'Код-ревью' | 'Отказ'
  author: User
  worker?: User
  createDate: string
  closeDate?: string
}

interface User {
  id: number
  login: string
  email: string
}