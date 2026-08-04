import type { Metadata } from "next";
import { Hexagon } from "lucide-react";
import { LoginForm } from "@/app/admin/login/login-form";

export const metadata: Metadata = {
  title: "دخول لوحة التحكم — روائس",
  robots: { index: false, follow: false },
};

// في Next.js 16 الـ searchParams بقت Promise ولازم تتعمل لها await
export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;

  return (
    <main className="flex flex-1 items-center justify-center bg-ink px-6 py-20">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <Hexagon
            className="size-9 fill-brand/20 text-brand-soft"
            strokeWidth={1.5}
          />
          <h1 className="text-xl font-bold text-white">لوحة تحكم روائس</h1>
          <p className="text-sm text-slate-400">
            سجّل دخولك عشان تقدر تدير المنتجات
          </p>
        </div>

        <div className="rounded-2xl border border-ink-line bg-ink-soft p-6">
          <LoginForm next={next ?? "/admin"} />
        </div>
      </div>
    </main>
  );
}
