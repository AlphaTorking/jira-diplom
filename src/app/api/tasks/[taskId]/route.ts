import { NextResponse } from 'next/server';
import prisma from '@/lib/prismaClient';
import { getCurrentUser } from '@/lib/authUtils';

export async function GET(
  request: Request,
  { params }: { params: { taskId: string } }
) {
  try {
    const userId = await getCurrentUser(request);
    if (!userId) {
      return NextResponse.json(
        { error: 'Не авторизован' },
        { status: 401 }
      );
    }

    const taskId = params.taskId;
    
    if (!taskId || isNaN(Number(taskId))) {
      return NextResponse.json(
        { error: 'Некорректный ID задачи' },
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

    const task = await prisma.task.findUnique({
      where: { 
        id: Number(taskId),
        spaceId: user.spaceId // Проверяем принадлежность к пространству
      },
      include: {
        author: true,
        worker: true,
        group: true,
        space: true
      }
    });

    if (!task) {
      return NextResponse.json(
        { error: 'Задача не найдена или нет доступа' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(task);
  } catch (error) {
    console.error('Error fetching task:', error);
    return NextResponse.json(
      { error: 'Ошибка загрузки задачи'},
      { status: 500 }
    );
  }
}

export async function PUT(req: Request, { params }: { params: { taskId: string } }) {
  try {
    const userId = await getCurrentUser(req);
    if (!userId) {
      return NextResponse.json(
        { error: 'Не авторизован' },
        { status: 401 }
      );
    }
    const body = await req.json();
    
    const taskId = parseInt(params.taskId);
    const { 
      status, 
      workerId, 
      result,
      criticality,
      priority
    } = await req.json();
    
    // Проверяем существование задачи
    const existingTask = await prisma.task.findUnique({
      where: { id: taskId }
    });
    
    if (!existingTask) {
      return NextResponse.json(
        { error: 'Задача не найдена' },
        { status: 404 }
      );
    }
    
    
    // Обновляем задачу
    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: {
        status,
        workerId: workerId ? parseInt(workerId) : null,
        result: result || null,
        criticality,
        priority,
        closeDate: status === 'Завершено' ? new Date() : existingTask.closeDate
      },
      include: {
        author: true,
        worker: true
      }
    });
    
    return NextResponse.json(updatedTask);
  } catch (error) {
    console.error('Ошибка обновления задачи:', error);
    return NextResponse.json(
      { error: 'Ошибка сервера при обновлении задачи' },
      { status: 500 }
    );
  }
}

