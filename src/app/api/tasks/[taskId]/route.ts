import { NextResponse } from 'next/server';
import prisma from '@/lib/prismaClient';
<<<<<<< HEAD
import { getSession } from '@/lib/session';
=======
import { getCurrentUser } from '@/lib/authUtils';
>>>>>>> 862663a (Модуль Авторизации, Сохранение Сессиии. Добавлено Хэширование и jwt-токены)

export async function GET(req: Request, { params }: { params: { taskId: string } }) {
  try {
<<<<<<< HEAD
    const session = await getSession();
    if (!session?.user) {
=======
    const userId = await getCurrentUser(request);
    if (!userId) {
      return NextResponse.json(
        { error: 'Не авторизован' },
        { status: 401 }
      );
    }

    const taskId = params.taskId;
    
    if (!taskId) {
>>>>>>> 862663a (Модуль Авторизации, Сохранение Сессиии. Добавлено Хэширование и jwt-токены)
      return NextResponse.json(
        { error: 'Требуется аутентификация' },
        { status: 401 }
      );
    }
    
    const task = await prisma.task.findUnique({
<<<<<<< HEAD
      where: { id: parseInt(params.taskId) },
=======
      where: { 
        id: Number(taskId),
        // Проверяем принадлежность задачи пользователю
        OR: [
          { authorId: userId },
          { workerId: userId }
        ]
      },
>>>>>>> 862663a (Модуль Авторизации, Сохранение Сессиии. Добавлено Хэширование и jwt-токены)
      include: {
        author: true,
        worker: true,
        group: true,
        space: true
      }
    });
<<<<<<< HEAD
    
=======
>>>>>>> 862663a (Модуль Авторизации, Сохранение Сессиии. Добавлено Хэширование и jwt-токены)
    if (!task) {
      return NextResponse.json(
        { error: 'Задача не найдена' },
        { status: 404 }
      );
    }
    
    // Проверка прав доступа
    if (task.authorId !== session.user.id && task.workerId !== session.user.id) {
      return NextResponse.json(
        { error: 'Доступ запрещен' },
        { status: 403 }
      );
    }
    
    return NextResponse.json(task);
  } catch (error) {
    console.error('Ошибка загрузки задачи:', error);
    return NextResponse.json(
      { error: 'Ошибка сервера при загрузке задачи' },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request, { params }: { params: { taskId: string } }) {
  try {
<<<<<<< HEAD
    const session = await getSession();
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Требуется аутентификация' },
        { status: 401 }
      );
    }
=======
    const userId = await getCurrentUser(req);
    if (!userId) {
      return NextResponse.json(
        { error: 'Не авторизован' },
        { status: 401 }
      );
    }
    const body = await req.json();
>>>>>>> 862663a (Модуль Авторизации, Сохранение Сессиии. Добавлено Хэширование и jwt-токены)
    
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
    
    // Проверка прав доступа
    if (existingTask.authorId !== session.user.id && existingTask.workerId !== session.user.id) {
      return NextResponse.json(
        { error: 'Доступ запрещен' },
        { status: 403 }
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

export async function DELETE(req: Request, { params }: { params: { taskId: string } }) {
  try {
    const session = await getSession();
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Требуется аутентификация' },
        { status: 401 }
      );
    }
    
    const taskId = parseInt(params.taskId);
    
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
    
    // Только автор может удалить задачу
    if (existingTask.authorId !== session.user.id) {
      return NextResponse.json(
        { error: 'Доступ запрещен' },
        { status: 403 }
      );
    }
    
    // Удаляем задачу
    await prisma.task.delete({
      where: { id: taskId }
    });
    
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Ошибка удаления задачи:', error);
    return NextResponse.json(
      { error: 'Ошибка сервера при удалении задачи' },
      { status: 500 }
    );
  }
}