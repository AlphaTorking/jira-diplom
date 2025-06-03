import { NextResponse } from 'next/server';
import prisma from '@/lib/prismaClient';
import { getSession } from '@/lib/session';

export async function GET(req: Request) {
  try {
    const session = await getSession();
    if (!session?.user || !session.user.isAdmin) {
      return NextResponse.json(
        { error: 'Доступ запрещен' },
        { status: 403 }
      );
    }
    
    const companies = await prisma.company.findMany();
    return NextResponse.json(companies);
  } catch (error) {
    console.error('Ошибка загрузки компаний:', error);
    return NextResponse.json(
      { error: 'Ошибка сервера при загрузке компаний' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session?.user || !session.user.isAdmin) {
      return NextResponse.json(
        { error: 'Доступ запрещен' },
        { status: 403 }
      );
    }
    
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
    
    const newCompany = await prisma.company.create({
      data: { name, phone, email }
    });
    
    return NextResponse.json(newCompany, { status: 201 });
  } catch (error) {
    console.error('Ошибка создания компании:', error);
    return NextResponse.json(
      { error: 'Ошибка сервера при создании компании' },
      { status: 500 }
    );
  }
}