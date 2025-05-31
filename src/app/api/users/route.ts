import { NextResponse } from 'next/server';
import prisma from 'lib/prismaClient';

export async function GET() {
  try {
    const users = await prisma.user.findMany({
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