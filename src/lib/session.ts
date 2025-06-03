import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

interface UserSession {
  id: number;
  login: string;
  email: string;
  isAdmin: boolean;
  companyId?: number;
  teamId?: number;
  spaceId?: number;
}

export async function getSession(): Promise<{ user: UserSession } | null> {
  // Используем синхронный вызов cookies()
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token')?.value;
  
  if (!token) return null;
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as UserSession;
    return { user: decoded };
  } catch (error) {
    console.error('Ошибка проверки токена:', error);
    return null;
  }
}

export async function setSessionToken(token: string) {
  // Используем синхронный вызов cookies()
  const cookieStore = await cookies();
  cookieStore.set({
    name: 'auth-token',
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // 1 неделя
    path: '/',
  });
}

export  async function clearSessionToken() {
  // Используем синхронный вызов cookies()
  const cookieStore = await cookies();
  cookieStore.delete('auth-token');
}