import { NextResponse } from 'next/server';
import prisma from '@/lib/prismaClient';
import { getSession } from '@/lib/session';

export async function GET(req: Request, { params }: { params: { companyId: string } }) {
  try {
    const session = await getSession();
    if (!session?.user || !session.user.isAdmin) {
      return NextResponse.json(
        { error: 'Доступ запрещен' },
        { status: 403 }
      );
    }
    
    const company = await prisma.company.findUnique({
      where: { id: parseInt(params.companyId) }
    });
    
    if (!company) {
      return NextResponse.json(
        { error: 'Компания не найдена' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(company);
  } catch (error) {
    console.error('Ошибка загрузки компании:', error);
    return NextResponse.json(
      { error: 'Ошибка сервера при загрузке компании' },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request, { params }: { params: { companyId: string } }) {
  try {
    const session = await getSession();
    if (!session?.user || !session.user.isAdmin) {
      return NextResponse.json(
        { error: 'Доступ запрещен' },
        { status: 403 }
      );
    }
    
    const companyId = parseInt(params.companyId);
    const { name, phone, email } = await req.json();
    
    // Проверка формата телефона
    const phoneRegex = /^\+7\s?[0-9]{3}\s?[0-9]{3}[\s-]?[0-9]{2}[\s-]?[0-9]{2}$/;
    if (!phoneRegex.test(phone)) {
      return NextResponse.json(
        { error: 'Неверный формат телефона' },
        { status: 400 }
      );
    }
    
    // Проверка формата email
    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Неверный формат email' },
        { status: 400 }
      );
    }
    
    const updatedCompany = await prisma.company.update({
      where: { id: companyId },
      data: { name, phone, email }
    });
    
    return NextResponse.json(updatedCompany);
  } catch (error) {
    console.error('Ошибка обновления компании:', error);
    return NextResponse.json(
      { error: 'Ошибка сервера при обновлении компании' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request, { params }: { params: { companyId: string } }) {
  try {
    const session = await getSession();
    if (!session?.user || !session.user.isAdmin) {
      return NextResponse.json(
        { error: 'Доступ запрещен' },
        { status: 403 }
      );
    }
    
    const companyId = parseInt(params.companyId);
    
    // Проверяем, есть ли связанные пространства
    const spacesCount = await prisma.space.count({
      where: { companyId }
    });
    
    if (spacesCount > 0) {
      return NextResponse.json(
        { error: 'Невозможно удалить компанию с пространствами' },
        { status: 400 }
      );
    }
    
    // Удаляем компанию
    await prisma.company.delete({
      where: { id: companyId }
    });
    
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Ошибка удаления компании:', error);
    return NextResponse.json(
      { error: 'Ошибка сервера при удалении компании' },
      { status: 500 }
    );
  }
}