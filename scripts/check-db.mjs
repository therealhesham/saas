/**
 * فحص الاتصال بقاعدة البيانات قبل تشغيل المايجريشنز.
 * الاستخدام: npm run db:check
 */
import { PrismaClient } from "@prisma/client";

const url = process.env.DATABASE_URL;

if (!url) {
  console.error("✗ DATABASE_URL مش موجود في .env");
  process.exit(1);
}

/** طباعة الرابط من غير الباسورد */
function maskUrl(value) {
  try {
    const parsed = new URL(value);
    if (parsed.password) {
      parsed.password = "****";
    }
    return parsed.toString();
  } catch {
    return "(رابط غير صالح الصيغة)";
  }
}

let host = "";
let database = "";
let hasSsl = false;

try {
  const parsed = new URL(url);
  host = parsed.host;
  database = parsed.pathname.replace(/^\//, "");
  hasSsl = parsed.searchParams.has("sslaccept");
} catch {
  console.error("✗ صيغة DATABASE_URL غلط. لو الباسورد فيه @ أو : أو / لازم تعمله URL-encode.");
  process.exit(1);
}

console.log(`الرابط    : ${maskUrl(url)}`);
console.log(`السيرفر   : ${host}`);
console.log(`الداتابيز : ${database}`);
console.log(`SSL       : ${hasSsl ? "مفعّل" : "غير مفعّل"}`);

const isRemote = !/^(localhost|127\.0\.0\.1|\[::1\])/.test(host);

if (isRemote && !hasSsl) {
  console.log(
    "\n⚠ سيرفر خارجي من غير SSL — أغلب الاستضافات هترفض. جرّب تضيف ?sslaccept=strict",
  );
}

const prisma = new PrismaClient();
const startedAt = Date.now();

try {
  await prisma.$queryRaw`SELECT 1`;
  console.log(`\n✓ الاتصال نجح في ${Date.now() - startedAt}ms`);
} catch (error) {
  // رسالة Prisma بتبدأ بسطر فاضي وبتتلف على كذا سطر، فبنفلترها الأول
  const lines = String(error?.message ?? error)
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  const message = lines.join(" ");

  console.error("\n✗ الاتصال فشل");
  console.error(`  ${lines[1] ?? lines[0] ?? "خطأ غير معروف"}\n`);

  if (/can't reach database server|ECONNREFUSED|ETIMEDOUT/i.test(message)) {
    console.error("  السبب المرجّح: السيرفر مش بيرد.");
    console.error("  • اتأكد إن العنوان والبورت صح");
    console.error("  • اسمح للـ IP بتاعك في firewall الاستضافة");
  } else if (/authentication failed|access denied/i.test(message)) {
    console.error("  السبب المرجّح: اسم المستخدم أو الباسورد غلط.");
    console.error("  • لو الباسورد فيه رموز خاصة (@ : / ? #) لازم تعمله URL-encode");
    console.error("    مثلاً: الباسورد p@ss يتكتب p%40ss");
  } else if (/was denied access on the database|unknown database/i.test(message)) {
    console.error(`  السبب المرجّح: الداتابيز "${database}" مش موجودة أو المستخدم`);
    console.error("  مالوش صلاحية عليها. اعملها الأول على الاستضافة واديله صلاحية.");
  } else if (/ssl|tls|handshake/i.test(message)) {
    console.error("  السبب المرجّح: مشكلة SSL.");
    console.error("  • جرّب ?sslaccept=strict");
    console.error("  • لو الشهادة self-signed استخدم ?sslaccept=accept_invalid_certs");
  }

  await prisma.$disconnect();
  process.exit(1);
}

// الجداول موجودة ولا لسه محتاجة مايجريشن؟
try {
  const count = await prisma.product.count();
  console.log(`✓ جدول Product موجود وفيه ${count} صف`);
} catch {
  console.log("\n⚠ جدول Product لسه مش موجود — شغّل: npm run db:deploy");
}

await prisma.$disconnect();
