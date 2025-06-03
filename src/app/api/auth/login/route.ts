// app/api/auth/login/route.ts

import { NextResponse } from 'next/server';
import prisma from '@/lib/prismaClient';
import jwt from 'jsonwebtoken';

export async function POST(req: Request) {
  try {
    const { username, password, rememberMe  } = await req.json();
    
    // Ищем пользователя
    const user = await prisma.user.findUnique({
      where: { login: username }
    });
    
    if (!user) {
      return NextResponse.json(
        { error: 'Неверные учетные данные' },
        { status: 401 }
      );
    }
    

    if (password !== user.password) {
      return NextResponse.json(
        { error: 'Неверные учетные данные' },
        { status: 401 }
      );
    }
    
    // Создаем объект пользователя без пароля
    const { password: _, ...userWithoutPassword } = user;
    
    // В реальном приложении здесь генерируется JWT токен
    const token = jwt.sign(
      { userId: user.id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET!,
      { expiresIn: rememberMe ? '30d' : '1d' }
    );
    
    return NextResponse.json({
      token,
      user: userWithoutPassword,
      message: 'Аутентификация успешна'
    });
    
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Ошибка сервера' },
      { status: 500 }
    );
  }
}