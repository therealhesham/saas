"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
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
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/admin");
  const storedHash = process.env.ADMIN_PASSWORD_HASH;

  if (!storedHash) {
    return { error: "ADMIN_PASSWORD_HASH مش متظبط في ملف .env" };
  }

  if (!verifyPassword(password, storedHash)) {
    return { error: "الباسورد غير صحيح" };
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
