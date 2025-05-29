import { NextResponse } from 'next/server'
import prisma from '../../../../lib/prismaClient'

export async function GET() {
  try {
    const tasks = await prisma.task.findMany({
      include: {
        author: true,
        worker: true
      }
    })
    return NextResponse.json(tasks)
  } catch (error) {
    return NextResponse.json(
      { error: 'Ошибка загрузки задач' },
      { status: 500 }
    )
  }
}