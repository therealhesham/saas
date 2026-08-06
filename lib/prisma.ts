import { PrismaClient } from "@prisma/client";

// لو DATABASE_URL مش موجود أو فاضي وقت البناء، بنستخدم رابط وهمي عشان PrismaClient مايرميش Validation Error في schema.prisma:7
if (!process.env.DATABASE_URL || process.env.DATABASE_URL.trim() === "") {
  process.env.DATABASE_URL = "mysql://dummy:dummy@127.0.0.1:3306/dummy";
}

// في التطوير الـ hot reload بيعيد تنفيذ الملف كل مرة، فبنخزّن العميل على
// globalThis عشان مانفتحش اتصالات جديدة مع كل تعديل ونستنفد الـ connection pool.
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL,
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

