import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;

// Prisma Client is a query builder. It's a Node.js and TypeScript ORM for PostgreSQL, MySQL, MariaDB, SQL Server, SQLite, and Prisma DB.
