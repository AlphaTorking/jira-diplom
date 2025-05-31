import { NextResponse } from 'next/server'
import prisma from 'lib/prismaClient'

export async function GET() {
    try {
  await prisma.$connect()
  console.log('Database connected successfully')
} catch (connectError) {
  console.error('Connection error:', connectError)
}
  try {
    // 1. Запрашивает все группы из БД
    const groups = await prisma.group.findMany({
      // 2. Включает связанные задачи
      include: {
        tasks: {
          // 3. Для каждой задачи включает дополнительные данные
          include: {
            author: true,     // Автор задачи
            worker: true,     // Исполнитель
            space: true,      // Пространство
            group: true       // Группа
          }
        }
      }
    });
    
    // 4. Возвращает данные в формате JSON
    return NextResponse.json(groups);
  } catch (error) {
    // 5. Обработка ошибок
    return NextResponse.json(
      { error: 'Ошибка загрузки групп' },
      { status: 500 }
    );
  }
}
export async function POST(req: Request) {
  try {
    const { name, spaceId = 1 } = await req.json(); // spaceId временно фиксирован
    
    if (!name) {
      return NextResponse.json(
        { error: 'Название группы обязательно' },
        { status: 400 }
      );
    }

    const newGroup = await prisma.group.create({
      data: {
        name,
        spaceId: Number(spaceId)
      }
    });
    
    return NextResponse.json(newGroup, { status: 201 });
  } catch (error) {
    console.error('Error creating group:', error);
    return NextResponse.json(
      { error: 'Ошибка создания группы' },
      { status: 500 }
    );
  }
}