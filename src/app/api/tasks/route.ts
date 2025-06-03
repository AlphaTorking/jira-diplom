import { NextResponse } from 'next/server'
import prisma from '@/lib/prismaClient'
import { TaskPriorityLevel, TaskCriticalityLevel, TaskStatusLevel } from '@prisma/client';
import { getCurrentUser } from '@/lib/authUtils'; 

export async function GET(req: Request) {
  try {
    const userId = await getCurrentUser(req);
    const body = await req.json();
    console.log('Request Body:', body); // Добавим лог для отладки
    if (!userId) {
      return NextResponse.json(
        { error: 'Не авторизован' },
        { status: 401 }
      );
    }
    
    if (!body.name) {
      return NextResponse.json(
        { error: 'Название задачи обязательно' },
        { status: 400 }
      );
    }

    // Получаем пространство пользователя
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { spaceId: true }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Пользователь не найден' },
        { status: 404 }
      );
    }

    const tasks = await prisma.task.findMany({
      where: {
        spaceId: user.spaceId // Фильтруем по пространству
      },
      include: {
        author: true,
        worker: true,
        group: true,
        space: true
      },
      orderBy: { createDate: 'desc' }
    });
    
    return NextResponse.json(tasks);
  } catch (error) {
    console.error('Ошибка загрузки задач:', error);
    return NextResponse.json(
      { error: 'Ошибка сервера при загрузке задач' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const userId = await getCurrentUser(req);
    if (!userId) {
      return NextResponse.json(
        { error: 'Не авторизован' },
        { status: 401 }
      );
    }

    // Получаем данные пользователя
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { spaceId: true, companyId: true }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Пользователь не найден' },
        { status: 404 }
      );
    }

    const body = await req.json();
    
    // Валидация данных
    if (!body.name || !body.groupId) {
      return NextResponse.json(
        { error: 'Требуется аутентификация' },
        { status: 401 }
      );
    }
    
    const { 
      name, 
      description, 
      criticality, 
      priority, 
      groupId,
      workerId 
    } = await req.json();
    
    const newTask = await prisma.task.create({
      data: {
        name: body.name,
        description: body.description,
        criticality: body.criticality as TaskCriticalityLevel,
        priority: body.priority as TaskPriorityLevel,
        status: body.status as TaskStatusLevel,
        authorId: userId, // Используем ID текущего пользователя
        groupId: Number(body.groupId),
        spaceId: user.spaceId, // Используем пространство пользователя
        createDate: new Date(),
      },
      include: {
        author: true,
        worker: true
      }
    });
    
    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    console.error('Ошибка создания задачи:', error);
    return NextResponse.json(
      { error: 'Ошибка сервера при создании задачи' },
      { status: 500 }
    );
  }
}