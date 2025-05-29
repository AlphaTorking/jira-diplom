import { PrismaClient } from '@prisma/client'

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

const prisma = global.prisma || new PrismaClient()

if (typeof window === 'undefined' && process.env.NODE_ENV === 'development') {
  global.prisma = prisma
}

export default prisma