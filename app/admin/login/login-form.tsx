"use client";

import { useState, useActionState } from "react";
import { AlertCircle, Eye, EyeOff, Lock, Mail, ArrowLeft } from "lucide-react";
import { login, type LoginState } from "@/app/admin/auth-actions";

export function LoginForm({ next }: { next: string }) {
  const [showPassword, setShowPassword] = useState(false);
  const [state, formAction, pending] = useActionState<LoginState, FormData>(
    login,
    {},
  );

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <input type="hidden" name="next" value={next} />

      {/* Email input */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-xs font-bold text-[#0D1B3D]/80">
          البريد الإلكتروني
        </label>
        <div className="relative flex items-center">
          <Mail className="absolute right-3.5 size-4 text-slate-400 pointer-events-none" />
          <input
            id="email"
            type="email"
            name="email"
            defaultValue="admin@rawaes.com"
            required
            autoFocus
            autoComplete="username"
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-3 pr-10 pl-4 text-sm text-slate-900 shadow-xs transition-all placeholder:text-slate-400 focus:border-[#D4A24A] focus:bg-white focus:outline-none focus:ring-3 focus:ring-[#D4A24A]/15"
            placeholder="admin@rawaes.com"
          />
        </div>
      </div>

      {/* Password input */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="password" className="text-xs font-bold text-[#0D1B3D]/80">
          كلمة المرور
        </label>
        <div className="relative flex items-center">
          <Lock className="absolute right-3.5 size-4 text-slate-400 pointer-events-none" />
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            name="password"
            defaultValue="123456789"
            required
            autoComplete="current-password"
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-3 pr-10 pl-11 text-sm text-slate-900 shadow-xs transition-all placeholder:text-slate-400 focus:border-[#D4A24A] focus:bg-white focus:outline-none focus:ring-3 focus:ring-[#D4A24A]/15"
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            tabIndex={-1}
            className="absolute left-3 p-1 text-slate-400 transition-colors hover:text-slate-600 focus:outline-none"
            aria-label={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
          >
            {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>
      </div>

      {/* Error alert */}
      {state.error ? (
        <div
          role="alert"
          className="flex items-center gap-2.5 rounded-xl border border-rose-200 bg-rose-50/90 p-3.5 text-xs font-medium text-rose-800 animate-in fade-in slide-in-from-top-1"
        >
          <AlertCircle className="size-4 shrink-0 text-rose-600" />
          <span>{state.error}</span>
        </div>
      ) : null}

      {/* Submit button */}
      <button
        type="submit"
        disabled={pending}
        className="group relative mt-1 flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-[#0D1B3D] px-6 py-3.5 text-sm font-bold text-white shadow-md shadow-[#0D1B3D]/20 transition-all hover:bg-[#1a2e5a] hover:shadow-lg hover:shadow-[#0D1B3D]/30 disabled:opacity-60"
      >
        {/* Shimmer effect */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-[#D4A24A]/25 to-transparent transition-transform duration-700 group-hover:translate-x-full"
        />
        <span className="relative flex items-center gap-2">
          {pending ? (
            <>
              <span className="size-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              جاري تسجيل الدخول...
            </>
          ) : (
            <>
              تسجيل الدخول
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            </>
          )}
        </span>
      </button>
    </form>
  );
}
