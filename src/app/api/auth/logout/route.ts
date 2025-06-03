import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    // В реальном приложении здесь будет инвалидация токена
    return NextResponse.json({ 
      message: 'Выход выполнен успешно' 
    });
  } catch (error) {
    console.error('Ошибка выхода:', error);
    return NextResponse.json(
      { error: 'Ошибка сервера при выходе' },
      { status: 500 }
    );
  }
}