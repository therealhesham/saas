"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import {
  SESSION_COOKIE,
  createSessionValue,
  getSessionCookieOptions,
  verifyPassword,
} from "@/lib/auth";

export type LoginState = { error?: string };

export async function login(
  _prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/admin");

  if (!email || !password) {
    return { error: "يرجى أدخال البريد الإلكتروني وكلمة المرور" };
  }

  let isValid = false;

  try {
    const admin = await prisma.admin.findUnique({
      where: { email },
    });

    if (admin && admin.password) {
      isValid = verifyPassword(password, admin.password);
    }
  } catch (error) {
    console.warn("خطأ في التحقق من قاعدة البيانات، استخدام التحقق المسبق:", error);
  }

  // دعم الاحتياطي في حال تعذر الدخول بالـ DB
  if (!isValid && process.env.ADMIN_PASSWORD_HASH) {
    if (email === "admin@rawaes.com" || email === "admin") {
      isValid = verifyPassword(password, process.env.ADMIN_PASSWORD_HASH);
    }
  }

  if (!isValid) {
    return { error: "البريد الإلكتروني أو كلمة المرور غير صحيحة" };
  }

  const cookieStore = await cookies();
  cookieStore.set(
    SESSION_COOKIE,
    createSessionValue(),
    await getSessionCookieOptions(),
  );

  // نقبل المسارات الداخلية بس، عشان مايتحوّلش لثغرة open redirect
  redirect(next.startsWith("/admin") ? next : "/admin");
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);

  redirect("/admin/login");
}
