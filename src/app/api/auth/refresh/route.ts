import { NextResponse } from 'next/server';
import prisma from '@/lib/prismaClient';
import { generateTokens, verifyToken } from '@/lib/tokens';
import { cookies } from 'next/headers';

export async function POST() {
   const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refreshToken')?.value;

  if (!refreshToken) {
    return NextResponse.json(
      { error: 'Токен отсутствует' },
      { status: 401 }
    );
  }

  try {
    const decoded = verifyToken(refreshToken);
    if (!decoded) throw new Error('Invalid token');

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId }
    });

    if (!user) throw new Error('User not found');

    if (user.refreshToken !== refreshToken) {
      throw new Error('Token mismatch');
    }

    const { accessToken, refreshToken: newRefreshToken } = generateTokens(user.id);

    // Обновляем refresh token в базе
    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: newRefreshToken }
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

    // Обновляем куку
    response.cookies.set('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60,
      sameSite: 'lax',
      path: '/',
    });

    return response;
  } catch (error) {
     const response = NextResponse.json(
      { error: 'Требуется повторная авторизация' },
      { status: 401 }
    );
    response.cookies.delete('refreshToken');
  }
  
}