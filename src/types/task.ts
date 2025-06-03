// types/task.ts
import { TaskStatusLevel, TaskPriorityLevel, TaskCriticalityLevel } from '@prisma/client';
export interface Task {
  id: number;
  name: string;
  description: string | null;
  criticality: TaskCriticalityLevel;
  priority: TaskPriorityLevel;
  status: TaskStatusLevel;
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