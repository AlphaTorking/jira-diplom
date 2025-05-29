import { NextResponse } from 'next/server'
import prisma from '../../../../lib/prismaClient'
import { TaskPriorityLevel, TaskCriticalityLevel, TaskStatusLevel } from '@prisma/client';

console.log('DATABASE_URL:', process.env.DATABASE_URL)
console.log('Connection URL:', process.env.DATABASE_URL)

export async function GET() {
  try {
  await prisma.$connect()
  console.log('Database connected successfully')
} catch (connectError) {
  console.error('Connection error:', connectError)
}
  try {
    const tasks = await prisma.task.findMany({
      include: {
        author: true,
        worker: true,
        group: true,
        space: true
      }
    });
    
    return NextResponse.json({ tasks });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json(
      { error: 'Ошибка загрузки задач' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Валидация данных
    if (!body.name || !body.groupId) {
      return NextResponse.json(
        { error: 'Не заполнены обязательные поля' },
        { status: 400 }
      );
    }

    const newTask = await prisma.task.create({
      data: {
        name: body.name,
        description: body.description,
        criticality: body.criticality as TaskCriticalityLevel,
        priority: body.priority as TaskPriorityLevel,
        status: body.status as TaskStatusLevel,
        authorId: 1, // Временное решение - в реальном приложении брать из сессии
        groupId: Number(body.groupId),
        spaceId: 1, // Временное решение
        createDate: new Date(),
      },
      include: {
        author: true,
        group: true
      }
    });
    
    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    console.error('Task creation error:', error);
    return NextResponse.json(
      { error: 'Ошибка создания задачи' },
      { status: 500 }
    );
  }
}