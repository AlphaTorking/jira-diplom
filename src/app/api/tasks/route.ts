import { NextResponse } from 'next/server';
import prisma from '@/lib/prismaClient';
import { getSession } from '@/lib/session';

export async function GET(req: Request) {
  try {
    const session = await getSession();
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Требуется аутентификация' },
        { status: 401 }
      );
    }
    
    const tasks = await prisma.task.findMany({
      where: { 
        OR: [
          { authorId: session.user.id },
          { workerId: session.user.id }
        ]
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
    const session = await getSession();
    if (!session?.user) {
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
        name,
        description: description || '',
        criticality,
        priority,
        status: 'Новое',
        authorId: session.user.id,
        workerId: workerId ? parseInt(workerId) : null,
        groupId: parseInt(groupId),
        spaceId: session.user.spaceId, 
        createDate: new Date()
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