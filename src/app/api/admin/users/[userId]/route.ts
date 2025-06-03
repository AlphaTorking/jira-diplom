import { NextResponse } from 'next/server';
import prisma from '@/lib/prismaClient';
import { getSession } from '@/lib/session';

export async function GET(req: Request, { params }: { params: { userId: string } }) {
  try {
    const session = await getSession();
    if (!session?.user || !session.user.isAdmin) {
      return NextResponse.json(
        { error: 'Доступ запрещен' },
        { status: 403 }
      );
    }
    
    const user = await prisma.user.findUnique({
      where: { id: parseInt(params.userId) },
      include: {
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
    
    // Убираем пароль из ответа
    const { password, ...userWithoutPassword } = user;
    
    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    console.error('Ошибка загрузки пользователя:', error);
    return NextResponse.json(
      { error: 'Ошибка сервера при загрузке пользователя' },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request, { params }: { params: { userId: string } }) {
  try {
    const session = await getSession();
    if (!session?.user || !session.user.isAdmin) {
      return NextResponse.json(
        { error: 'Доступ запрещен' },
        { status: 403 }
      );
    }
    
    const userId = parseInt(params.userId);
    const { 
      login, 
      email, 
      password, 
      isAdmin, 
      companyId, 
      teamId, 
      spaceId 
    } = await req.json();
    
    let updateData: any = {
      login,
      email,
      isAdmin,
      companyId: companyId ? parseInt(companyId) : null,
      teamId: teamId ? parseInt(teamId) : null,
      spaceId: spaceId ? parseInt(spaceId) : null
    };
    
    if (password) {
      updateData.password = password;
    }
    
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
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
    
    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Ошибка обновления пользователя:', error);
    return NextResponse.json(
      { error: 'Ошибка сервера при обновлении пользователя' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request, { params }: { params: { userId: string } }) {
  try {
    const session = await getSession();
    if (!session?.user || !session.user.isAdmin) {
      return NextResponse.json(
        { error: 'Доступ запрещен' },
        { status: 403 }
      );
    }
    
    const userId = parseInt(params.userId);
    
    // Проверяем, не удаляет ли пользователь сам себя
    if (userId === session.user.id) {
      return NextResponse.json(
        { error: 'Нельзя удалить себя' },
        { status: 400 }
      );
    }
    
    // Удаляем пользователя
    await prisma.user.delete({
      where: { id: userId }
    });
    
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Ошибка удаления пользователя:', error);
    return NextResponse.json(
      { error: 'Ошибка сервера при удалении пользователя' },
      { status: 500 }
    );
  }
}