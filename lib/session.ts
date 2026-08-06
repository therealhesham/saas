import { cookies } from "next/headers";
import { SESSION_COOKIE, isValidSessionValue } from "@/lib/auth";

/**
 * التحقق من الجلسة جوّه الكود اللي بيشتغل على السيرفر.
 *
 * الـ proxy لوحده مش كفاية: الـ Server Actions ممكن تتنادى بـ POST مباشر
 * من غير ما تعدّي على الصفحة، فكل action بيغيّر بيانات لازم ينادي
 * requireAdmin() بنفسه.
 */
export async function isAdmin(): Promise<boolean> {
  const cookieStore = await cookies();

  return isValidSessionValue(cookieStore.get(SESSION_COOKIE)?.value);
}

export async function requireAdmin(): Promise<void> {
  if (!(await isAdmin())) {
    throw new Error("غير مصرّح — لازم تسجّل دخول كأدمن");
  }
}
