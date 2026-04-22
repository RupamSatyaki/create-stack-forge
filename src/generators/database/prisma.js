export function getPrismaSchema(provider) {
  return `generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "${provider}"
  url      = env("DATABASE_URL")
}

model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  password  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
`
}

export const prismaDbConfig = `import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()

export const connectDB = async () => {
  await prisma.$connect()
  console.log('Database connected via Prisma')
}
`

export function getPrismaEnv(provider) {
  const urls = {
    postgresql: 'postgresql://user:password@localhost:5432/myapp',
    mysql:      'mysql://user:password@localhost:3306/myapp',
    sqlite:     'file:./dev.db',
  }
  return `DATABASE_URL="${urls[provider] || urls.postgresql}"\nPORT=3000\nJWT_SECRET=your_jwt_secret_here\n`
}
