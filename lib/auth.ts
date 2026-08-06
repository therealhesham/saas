import {
  createHmac,
  randomBytes,
  scryptSync,
  timingSafeEqual,
} from "node:crypto";

export const SESSION_COOKIE = "rawaes_admin";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // أسبوع

function requireSecret(): string {
  const secret = process.env.AUTH_SECRET;

  if (!secret || secret.length < 16) {
    throw new Error(
      "AUTH_SECRET ناقص أو قصير جداً — لازم يتظبط في ملف .env قبل تشغيل لوحة الأدمن",
    );
  }

  return secret;
}

/** مقارنة ثابتة الزمن، بترجع false لو الطولين مختلفين بدل ما ترمي استثناء */
function safeEqual(a: string, b: string): boolean {
  const bufferA = Buffer.from(a, "utf8");
  const bufferB = Buffer.from(b, "utf8");

  if (bufferA.length !== bufferB.length) {
    return false;
  }

  return timingSafeEqual(bufferA, bufferB);
}

/** بيولّد `salt:hash` بـ scrypt — يستخدم في سكربت تغيير الباسورد */
export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const derived = scryptSync(password, salt, 32).toString("hex");

  return `${salt}:${derived}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, expected] = stored.split(":");

  if (!salt || !expected) {
    return false;
  }

  const derived = scryptSync(password, salt, 32).toString("hex");

  return safeEqual(derived, expected);
}

/** توقيع قيمة الجلسة: صلاحية + HMAC عشان محدش يقدر يزوّر الكوكي */
export function createSessionValue(): string {
  const expiresAt = Date.now() + SESSION_MAX_AGE_SECONDS * 1000;
  const signature = createHmac("sha256", requireSecret())
    .update(String(expiresAt))
    .digest("hex");

  return `${expiresAt}.${signature}`;
}

export function isValidSessionValue(value: string | undefined): boolean {
  if (!value) {
    return false;
  }

  const [expiresAt, signature] = value.split(".");

  if (!expiresAt || !signature) {
    return false;
  }

  const expected = createHmac("sha256", requireSecret())
    .update(expiresAt)
    .digest("hex");

  if (!safeEqual(signature, expected)) {
    return false;
  }

  return Number(expiresAt) > Date.now();
}

export const sessionCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: SESSION_MAX_AGE_SECONDS,
};
