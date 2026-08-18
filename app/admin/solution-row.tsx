"use client";

import { useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  Eye,
  EyeOff,
  Pencil,
  Trash2,
  Sparkles,
} from "lucide-react";
import {
  deleteSolution,
  moveSolution,
  toggleSolution,
} from "@/app/admin/solution-actions";
import {
  SolutionForm,
  type EditableSolution,
} from "@/app/admin/solution-form";

const iconButtonClass =
  "inline-flex size-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-colors hover:bg-slate-50 disabled:opacity-40";

export function SolutionRow({
  solution,
  isFirst,
  isLast,
}: {
  solution: EditableSolution;
  isFirst: boolean;
  isLast: boolean;
}) {
  const [editing, setEditing] = useState(false);

  if (editing) {
    return (
      <div className="rounded-2xl border border-brand/40 bg-white p-6 shadow-xs">
        <h3 className="mb-4 text-base font-bold text-slate-900">
          تعديل الحل: {solution.title}
        </h3>
        <SolutionForm solution={solution} onDone={() => setEditing(false)} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 sm:flex-row sm:items-center">
      {/* Icon / Accent Preview Badge */}
      <span
        className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl text-white font-bold shadow-xs"
        style={{ backgroundColor: solution.accentColor }}
      >
        <Sparkles className="size-5" />
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className="inline-block rounded-full px-2.5 py-0.5 text-xs font-bold"
            style={{
              backgroundColor: `${solution.accentColor}18`,
              color: solution.accentColor,
            }}
          >
            {solution.tag}
          </span>
          <h3 className="font-bold text-slate-900">{solution.title}</h3>
          <span dir="ltr" className="text-xs text-slate-400">
            /{solution.slug}
          </span>
          {!solution.published ? (
            <span className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-500">
              مخفي
            </span>
          ) : null}
        </div>

        <p className="mt-1 truncate text-sm text-slate-600 font-medium">
          {solution.subtitle}
        </p>

        <div className="mt-1.5 flex flex-wrap gap-2 text-xs text-slate-500">
          <span>{solution.features.length} ميزات</span>
          <span>•</span>
          <span>الزر: {solution.ctaText}</span>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-1.5">
        <form action={moveSolution}>
          <input type="hidden" name="id" value={solution.id} />
          <input type="hidden" name="direction" value="up" />
          <button
            type="submit"
            disabled={isFirst}
            aria-label="تحريك لأعلى"
            className={iconButtonClass}
          >
            <ArrowUp className="size-4" />
          </button>
        </form>

        <form action={moveSolution}>
          <input type="hidden" name="id" value={solution.id} />
          <input type="hidden" name="direction" value="down" />
          <button
            type="submit"
            disabled={isLast}
            aria-label="تحريك لأسفل"
            className={iconButtonClass}
          >
            <ArrowDown className="size-4" />
          </button>
        </form>

        <form action={toggleSolution}>
          <input type="hidden" name="id" value={solution.id} />
          <button
            type="submit"
            aria-label={solution.published ? "إخفاء" : "إظهار"}
            className={iconButtonClass}
          >
            {solution.published ? (
              <Eye className="size-4" />
            ) : (
              <EyeOff className="size-4" />
            )}
          </button>
        </form>

        <button
          type="button"
          onClick={() => setEditing(true)}
          aria-label="تعديل"
          className={iconButtonClass}
        >
          <Pencil className="size-4" />
        </button>

        <form
          action={deleteSolution}
          onSubmit={(event) => {
            if (!confirm(`متأكد إنك عايز تحذف حل "${solution.title}"؟`)) {
              event.preventDefault();
            }
          }}
        >
          <input type="hidden" name="id" value={solution.id} />
          <button
            type="submit"
            aria-label="حذف"
            className="inline-flex size-9 items-center justify-center rounded-lg border border-rose-200 text-rose-600 transition-colors hover:bg-rose-50"
          >
            <Trash2 className="size-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
