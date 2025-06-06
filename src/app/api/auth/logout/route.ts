import { NextResponse } from 'next/server';
import prisma from '@/lib/prismaClient';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/tokens';

export async function POST(req: Request) {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refreshToken')?.value;

  try {
    if (refreshToken) {
      const decoded = verifyToken(refreshToken);
      if (decoded) {
        // Не очищаем refreshToken полностью, а устанавливаем в null
        await prisma.user.update({
          where: { id: decoded.userId },
          data: { refreshToken: null }
        });
      }
    }
  } catch (error) {
    console.error('Logout cleanup error:', error);
  }

  const response = NextResponse.json({ message: 'Вы вышли из системы' });
  response.cookies.delete('refreshToken');
  return response;
}