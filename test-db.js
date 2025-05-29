const { PrismaClient } = require('@prisma/client')

async function main() {
  const prisma = new PrismaClient()
  const users = await prisma.user.findMany()
  console.log(users)
}

main().catch(e => {
  console.error(e)
  process.exit(1)
})