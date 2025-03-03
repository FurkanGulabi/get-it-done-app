import { Pool } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";

// This is needed when using Neon with Prisma
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });

// Create a singleton instance of PrismaClient
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Using type assertion to bypass version compatibility issues between Prisma packages
// This is a temporary workaround until the packages are properly aligned
const adapter = new PrismaNeon(pool) as any; // eslint-disable-line @typescript-eslint/no-explicit-any
const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
