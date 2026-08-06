import { cookies } from "next/headers";
import { redirect } from "next/navigation";
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
  if (await isAdmin()) {
    return;
  }

  // مهم: بنعمل redirect مش throw.
  // الـ throw كان بيطلّع للمستخدم شاشة خطأ خام لما الجلسة تنتهي أو تبطل
  // (مثلاً بعد تغيير AUTH_SECRET)، بدل ما يترحّل لصفحة الدخول بهدوء.
  // redirect() جوّه Server Action بيرجّع 303 والمتصفح بيتابعه عادي.
  redirect("/admin/login?next=/admin");
}
