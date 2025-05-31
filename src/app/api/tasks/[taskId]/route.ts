import { NextResponse } from 'next/server';
import prisma from 'lib/prismaClient';

export async function GET(req: Request, { params }: { params: { taskId: string } }) {
  try {
    const task = await prisma.task.findUnique({
      where: { id: Number(params.taskId) },
      include: {
        author: true,
        worker: true,
        group: true
      }
    });
    
    if (!task) {
      return NextResponse.json(
        { error: 'Задача не найдена' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(task);
  } catch (error) {
    console.error('Error fetching task:', error);
    return NextResponse.json(
      { error: 'Ошибка загрузки задачи' },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request, { params }: { params: { taskId: string } }) {
  try {
    const body = await req.json();
    
    const updatedTask = await prisma.task.update({
      where: { id: Number(params.taskId) },
      data: {
        status: body.status,
        workerId: body.workerId ? Number(body.workerId) : null,
        result: body.result,
        closeDate: body.closeDate ? new Date(body.closeDate) : null
      },
      include: {
        author: true,
        worker: true
      }
    });
    
    return NextResponse.json(updatedTask);
  } catch (error) {
    console.error('Error updating task:', error);
    return NextResponse.json(
      { error: 'Ошибка обновления задачи' },
      { status: 500 }
    );
  }
}