import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prismaClient';
import jwt from 'jsonwebtoken';

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('Authorization');
    
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Требуется аутентификация' },
        { status: 401 }
      );
    }
    
    const token = authHeader.split(' ')[1];
    
    // Верифицируем токен
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { 
      userId: number; 
      isAdmin: boolean 
    };
    
    // Получаем данные пользователя
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
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
    
    if (!user) {
      return NextResponse.json(
        { error: 'Пользователь не найден' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ user });
    
  } catch (error) {
    console.error('Ошибка проверки сессии:', error);
    
    if (error instanceof jwt.TokenExpiredError) {
      return NextResponse.json(
        { error: 'Токен истек' },
        { status: 401 }
      );
    }
    
    return NextResponse.json(
      { error: 'Неверный токен аутентификации' },
      { status: 401 }
    );
  }
}