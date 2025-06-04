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
      { status: 500 }
    );
  }
}