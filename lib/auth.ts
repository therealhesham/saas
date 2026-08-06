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

/**
 * خصائص كوكي الجلسة.
 *
 * `secure` بيتحدّد من بروتوكول الطلب الفعلي مش من NODE_ENV.
 * السبب: لو حطّينا secure=true والموقع شغال على HTTP عادي، المتصفح بيرمي
 * الكوكي أصلاً، فبعد تسجيل الدخول ترجع لصفحة الدخول تاني في دايرة مقفولة.
 *
 * لما تنقل الموقع لـ HTTPS الـ reverse proxy بيبعت x-forwarded-proto: https
 * والكوكي بتترفّع لـ Secure تلقائياً من غير أي تعديل.
 *
 * تقدر تفرض القيمة يدوياً بمتغيّر البيئة COOKIE_SECURE=true أو false.
 */
export async function getSessionCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: await isSecureRequest(),
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  };
}

async function isSecureRequest(): Promise<boolean> {
  const override = process.env.COOKIE_SECURE;

  if (override === "true") return true;
  if (override === "false") return false;

  const { headers } = await import("next/headers");
  const headerList = await headers();

  // ممكن تيجي كسلسلة زي "https,http" لو عدّت على أكتر من proxy — الأول هو الأصلي
  const forwardedProto = headerList.get("x-forwarded-proto");

  if (forwardedProto) {
    return forwardedProto.split(",")[0].trim().toLowerCase() === "https";
  }

  return false;
}
