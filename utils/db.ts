// this prevents prisma from being instantiated repeatedly during hot reloads in dev
import { PrismaClient } from '@prisma/client';

// add global const for prisma singleton
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// instantiate prisma singleton if it doesn't exist
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    // log: ['query'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
