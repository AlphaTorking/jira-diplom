<<<<<<< HEAD
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
    
    const groups = await prisma.group.findMany({
      where: { spaceId: session.user.spaceId || undefined },
      include: {
        tasks: true,
        space: true
=======
import { NextResponse } from 'next/server'
import prisma from '@/lib/prismaClient'
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

    const groups = await prisma.group.findMany({
      where: {
        spaceId: user.spaceId // Фильтруем по пространству
      },
      include: {
        tasks: {
          include: {
            author: true,
            worker: true,
            space: true,
            group: true
          }
        }
>>>>>>> 862663a (Модуль Авторизации, Сохранение Сессиии. Добавлено Хэширование и jwt-токены)
      }
    });
    
    return NextResponse.json(groups);
  } catch (error) {
<<<<<<< HEAD
    console.error('Ошибка загрузки групп:', error);
=======
>>>>>>> 862663a (Модуль Авторизации, Сохранение Сессиии. Добавлено Хэширование и jwt-токены)
    return NextResponse.json(
      { error: 'Ошибка сервера при загрузке групп' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
<<<<<<< HEAD
    const session = await getSession();
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Требуется аутентификация' },
        { status: 401 }
      );
    }
    
    const { name } = await req.json();
    
    const newGroup = await prisma.group.create({
      data: {
        name,
        spaceId: session.user.spaceId || 1
=======
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

    const { name } = await req.json();

    const newGroup = await prisma.group.create({
      data: {
        name,
        spaceId: user.spaceId
>>>>>>> 862663a (Модуль Авторизации, Сохранение Сессиии. Добавлено Хэширование и jwt-токены)
      }
    });
    
    return NextResponse.json(newGroup, { status: 201 });
  } catch (error) {
    console.error('Ошибка создания группы:', error);
    return NextResponse.json(
      { error: 'Ошибка сервера при создании группы' },
      { status: 500 }
    );
  }
}