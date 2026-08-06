"use client";

import { useActionState } from "react";
import { LockKeyhole } from "lucide-react";
import { login, type LoginState } from "@/app/admin/auth-actions";

export function LoginForm({ next }: { next: string }) {
  const [state, formAction, pending] = useActionState<LoginState, FormData>(
    login,
    {},
  );

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <input type="hidden" name="next" value={next} />

      <label className="flex flex-col gap-2">
        <span className="text-sm font-medium text-slate-300">
          باسورد الأدمن
        </span>
        <input
          type="password"
          name="password"
          required
          autoFocus
          autoComplete="current-password"
          className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40"
          placeholder="••••••••"
        />
      </label>

      {state.error ? (
        <p
          role="alert"
          className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-4 py-2.5 text-sm text-rose-300"
        >
          {state.error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-500 disabled:opacity-60"
      >
        <LockKeyhole className="size-4" />
        {pending ? "جاري الدخول..." : "دخول"}
      </button>
    </form>
  );
}
