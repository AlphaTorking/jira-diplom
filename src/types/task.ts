// types/task.ts
export interface Task {
  id: number;
  name: string;
  description: string | null;
  criticality: string;
  priority: string;
  status: string;
  author: User;
  worker?: User | null;
  createDate: string; // Форматированная дата
  closeDate?: string | null; // Форматированная дата
  group: Group;
  result: string | null;
}

interface User {
  id: number
  login: string
  email: string
}

export interface Group {
  id: number;
  name: string;
  tasks: Task[];
  isOpen: boolean;
}