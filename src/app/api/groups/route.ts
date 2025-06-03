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
      }
    });
    
    return NextResponse.json(groups);
  } catch (error) {
    console.error('Ошибка загрузки групп:', error);
    return NextResponse.json(
      { error: 'Ошибка сервера при загрузке групп' },
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
    
    const { name } = await req.json();
    
    const newGroup = await prisma.group.create({
      data: {
        name,
        spaceId: session.user.spaceId || 1
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