import type { Metadata } from "next";
import { RawaesLogo } from "@/components/rawaes-logo";
import { LoginForm } from "@/app/admin/login/login-form";

export const metadata: Metadata = {
  title: "دخول لوحة التحكم — روائس",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;

  return (
    <main className="relative flex min-h-screen flex-1 items-center justify-center overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-100/80 px-6 py-12">
      {/* Background glow effects */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 size-[44rem] -translate-x-1/2 rounded-full bg-[#0D1B3D]/5 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 right-1/4 size-80 rounded-full bg-[#D4A24A]/8 blur-[90px]"
      />

      <div className="relative w-full max-w-md">
        {/* Top decorative line */}
        <div className="mx-auto mb-6 h-1 w-20 rounded-full bg-gradient-to-r from-[#B8862B] via-[#D4A24A] to-[#E5B869]" />

        {/* Card Header */}
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <RawaesLogo variant="full" className="h-12" />
          <h1 className="mt-3 text-2xl font-extrabold text-[#0D1B3D]">لوحة تحكم روائس</h1>
          <p className="text-sm font-medium text-slate-500">
            أدخل بريدك الإلكتروني وكلمة المرور لإدارة النظام
          </p>
        </div>

        {/* Card Body */}
        <div className="rounded-3xl border border-slate-200/80 bg-white/90 p-8 shadow-xl shadow-[#0D1B3D]/5 backdrop-blur-md">
          <LoginForm next={next ?? "/admin"} />
        </div>

        {/* Card Footer */}
        <div className="mt-6 text-center text-xs font-medium text-slate-400">
          منظومة روائس الرقمية &copy; {new Date().getFullYear()} — جميع الحقوق محفوظة
        </div>
      </div>
    </main>
  );
}
