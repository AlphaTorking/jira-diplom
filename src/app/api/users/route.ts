import { NextResponse } from 'next/server';
import prisma from '@/lib/prismaClient';
import { getCurrentUser } from '@/lib/authUtils';

export async function GET(req: Request) {
  try {
    const userId = await getCurrentUser(req);
    if (!userId) {
      return NextResponse.json(
        { error: 'Не авторизован' },
        { status: 401 }
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

    const users = await prisma.user.findMany({
      where: {
        spaceId: user.spaceId // Фильтруем по пространству
      },
      select: {
        id: true,
        login: true,
        email: true
      }
    });
    
    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Ошибка загрузки пользователей' },
      { status: 500 }
    );
  }
}