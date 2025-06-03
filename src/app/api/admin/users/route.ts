import { NextResponse } from 'next/server';
import prisma from '@/lib/prismaClient';
import { getSession } from '@/lib/session';

export async function GET(req: Request) {
  try {
    const session = await getSession();
    if (!session?.user || !session.user.isAdmin) {
      return NextResponse.json(
        { error: 'Доступ запрещен' },
        { status: 403 }
      );
    }
    
    const users = await prisma.user.findMany({
      include: {
        company: true,
        team: true,
        space: true
      }
    });
    
    // Убираем пароли из ответа
    const usersWithoutPasswords = users.map(user => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
    
    return NextResponse.json(usersWithoutPasswords);
  } catch (error) {
    console.error('Ошибка загрузки пользователей:', error);
    return NextResponse.json(
      { error: 'Ошибка сервера при загрузке пользователей' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session?.user || !session.user.isAdmin) {
      return NextResponse.json(
        { error: 'Доступ запрещен' },
        { status: 403 }
      );
    }
    
    const { 
      login, 
      email, 
      password, 
      isAdmin, 
      companyId, 
      teamId, 
      spaceId 
    } = await req.json();
    
    
    const newUser = await prisma.user.create({
      data: {
        login,
        email,
        password,
        isAdmin,
        companyId,
        teamId: teamId ? parseInt(teamId) : null,
        spaceId
      },
      select: {
        id: true,
        login: true,
        email: true,
        isAdmin: true,
        company: true,
        team: true,
        space: true
      }
    });
    
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error('Ошибка создания пользователя:', error);
    return NextResponse.json(
      { error: 'Ошибка сервера при создании пользователя' },
      { status: 500 }
    );
  }
}