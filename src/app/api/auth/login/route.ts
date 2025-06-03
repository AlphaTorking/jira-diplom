<<<<<<< HEAD
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
=======
import { NextResponse } from 'next/server';
import prisma from '@/lib/prismaClient';
import { generateTokens } from '@/lib/tokens';
import bcrypt from 'bcrypt';

export async function POST(req: Request) {
  const { login, password, rememberMe } = await req.json();

  try {
    const user = await prisma.user.findUnique({
      where: { login }
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json(
        { error: 'Неверный логин или пароль' },
        { status: 401 }
      );
    }

    const { accessToken, refreshToken } = generateTokens(user.id);

    // Обновляем refresh token в базе
    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken }
    });

    const response = NextResponse.json({
      user: {
        id: user.id,
        login: user.login,
        email: user.email,
        isAdmin: user.isAdmin,
        accessToken 
      },
      accessToken
    });

    // Устанавливаем refreshToken в httpOnly cookie
    response.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: rememberMe ? 7 * 24 * 60 * 60 : undefined // 7 дней если "запомнить меня"
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Ошибка сервера при авторизации' },
>>>>>>> 862663a (Модуль Авторизации, Сохранение Сессиии. Добавлено Хэширование и jwt-токены)
      { status: 500 }
    );
  }
}