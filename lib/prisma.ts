import { PrismaClient } from "@prisma/client";

// في التطوير الـ hot reload بيعيد تنفيذ الملف كل مرة، فبنخزّن العميل على
// globalThis عشان مانفتحش اتصالات جديدة مع كل تعديل ونستنفد الـ connection pool.
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
