// types/task.ts
import { Group } from '@prisma/client';

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
}

interface User {
  id: number
  login: string
  email: string
}