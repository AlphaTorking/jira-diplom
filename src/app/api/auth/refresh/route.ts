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
      where: { id: decoded.userId, refreshToken }
    });

    if (!user) throw new Error('User not found');

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
    });

    return response;
  } catch (error) {
    console.error('Token refresh failed:', error);
    return NextResponse.json(
      { error: 'Невалидный токен' },
      { status: 401 }
    );
  }
}