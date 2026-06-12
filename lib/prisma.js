import { PrismaClient } from '@prisma/client'
import { createClient } from '@libsql/client'
import { PrismaLibSql } from '@prisma/adapter-libsql'
import path from 'path'

const globalForPrisma = globalThis

const getPrisma = () => {
  if (!globalForPrisma.prisma) {
    const dbPath = path.join(process.cwd(), 'dev.db')
    const libsql = createClient({
      url: `file:${dbPath}`
    })
    const adapter = new PrismaLibSql(libsql)

    globalForPrisma.prisma = new PrismaClient({
      adapter,
      log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    })
  }
  return globalForPrisma.prisma
}

export const prisma = new Proxy({}, {
  get(target, prop) {
    return getPrisma()[prop]
  }
})

