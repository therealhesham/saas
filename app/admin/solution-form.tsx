"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { Plus, Save, Trash2, X } from "lucide-react";
import {
  saveSolution,
  type SolutionFormState,
} from "@/app/admin/solution-actions";
import {
  SOLUTION_ICON_NAMES,
  resolveSolutionIcon,
} from "@/lib/solution-icons";

export type EditableSolutionFeature = {
  icon: string;
  text: string;
};

export type EditableSolution = {
  id: number;
  slug: string;
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  accentColor: string;
  features: EditableSolutionFeature[];
  ctaText: string;
  ctaHref: string;
  position: number;
  published: boolean;
};

const fieldClass =
  "w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30";

const PRESET_ACCENTS = [
  { label: "أزرق إنديجو", hex: "#3B5BDB" },
  { label: "ذهبي دافئ", hex: "#D4A24A" },
  { label: "أخضر زمرّدي", hex: "#10B981" },
  { label: "بنفسجي الملكي", hex: "#8B5CF6" },
  { label: "أحمر قرمزي", hex: "#EF4444" },
  { label: "سمائي داكن", hex: "#0284C7" },
];

export function SolutionForm({
  solution,
  onDone,
}: {
  solution?: EditableSolution;
  onDone?: () => void;
}) {
  const [state, formAction, pending] = useActionState<
    SolutionFormState,
    FormData
  >(saveSolution, {});
  const formRef = useRef<HTMLFormElement>(null);

  const [accentColor, setAccentColor] = useState(
    solution?.accentColor ?? "#3B5BDB"
  );
  const [features, setFeatures] = useState<EditableSolutionFeature[]>(
    solution?.features ?? [
      { icon: "CheckCircle2", text: "" },
    ]
  );

  useEffect(() => {
    if (state.ok) {
      if (solution) {
        onDone?.();
      } else {
        formRef.current?.reset();
        setAccentColor("#3B5BDB");
        setFeatures([{ icon: "CheckCircle2", text: "" }]);
      }
    }
  }, [state.ok, solution, onDone]);

  const addFeature = () => {
    setFeatures((prev) => [...prev, { icon: "CheckCircle2", text: "" }]);
  };

  const updateFeatureText = (index: number, text: string) => {
    setFeatures((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], text };
      return next;
    });
  };

  const updateFeatureIcon = (index: number, icon: string) => {
    setFeatures((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], icon };
      return next;
    });
  };

  const removeFeature = (index: number) => {
    setFeatures((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <form ref={formRef} action={formAction} className="flex flex-col gap-4">
      {solution ? <input type="hidden" name="id" value={solution.id} /> : null}
      <input type="hidden" name="features" value={JSON.stringify(features)} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-slate-600">عنوان الحل</span>
          <input
            name="title"
            required
            defaultValue={solution?.title}
            className={fieldClass}
            placeholder="نظام إدارة الاستقدام"
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-slate-600">
            الوسم (Tag)
          </span>
          <input
            name="tag"
            required
            defaultValue={solution?.tag}
            className={fieldClass}
            placeholder="الاستقدام"
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-slate-600">
            الـ slug (بالإنجليزي)
          </span>
          <input
            name="slug"
            required
            dir="ltr"
            defaultValue={solution?.slug}
            className={`${fieldClass} text-left`}
            placeholder="recruitment"
          />
        </label>
      </div>

      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-medium text-slate-600">العنوان الفرعي</span>
        <input
          name="subtitle"
          required
          defaultValue={solution?.subtitle}
          className={fieldClass}
          placeholder="من الطلب حتى الوصول"
        />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-medium text-slate-600">الوصف الكامل</span>
        <textarea
          name="description"
          required
          rows={3}
          defaultValue={solution?.description}
          className={fieldClass}
          placeholder="منصة متكاملة تُغطّي كامل دورة حياة العمل..."
        />
      </label>

      {/* Accent Color Selection */}
      <div className="flex flex-col gap-1.5">
        <span className="text-xs font-medium text-slate-600">
          لون التمييز (Accent Color HEX)
        </span>
        <div className="flex flex-wrap items-center gap-3">
          <input
            type="color"
            value={accentColor}
            onChange={(e) => setAccentColor(e.target.value)}
            className="size-9 cursor-pointer rounded-lg border border-slate-300 p-1"
          />
          <input
            name="accentColor"
            type="text"
            dir="ltr"
            value={accentColor}
            onChange={(e) => setAccentColor(e.target.value)}
            className={`${fieldClass} max-w-[140px] text-left font-mono`}
            placeholder="#3B5BDB"
          />
          <div className="flex flex-wrap gap-1.5">
            {PRESET_ACCENTS.map((preset) => (
              <button
                key={preset.hex}
                type="button"
                onClick={() => setAccentColor(preset.hex)}
                className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-50"
              >
                <span
                  className="size-3 rounded-full"
                  style={{ backgroundColor: preset.hex }}
                />
                {preset.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Dynamic Features List */}
      <div className="flex flex-col gap-2 rounded-xl border border-slate-200 bg-slate-50 p-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700">
            قائمة الميزات والخصائص ({features.length})
          </span>
          <button
            type="button"
            onClick={addFeature}
            className="inline-flex items-center gap-1 text-xs font-semibold text-brand hover:underline"
          >
            <Plus className="size-3.5" />
            إضافة ميزة
          </button>
        </div>

        <div className="flex flex-col gap-2.5 mt-1">
          {features.map((feat, idx) => {
            const IconComp = resolveSolutionIcon(feat.icon);
            return (
              <div key={idx} className="flex items-center gap-2">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700">
                  <IconComp className="size-4" style={{ color: accentColor }} />
                </div>

                <select
                  value={feat.icon}
                  onChange={(e) => updateFeatureIcon(idx, e.target.value)}
                  className="w-36 shrink-0 rounded-lg border border-slate-300 bg-white px-2 py-2 text-xs text-slate-900 focus:outline-none"
                >
                  {SOLUTION_ICON_NAMES.map((iconName) => (
                    <option key={iconName} value={iconName}>
                      {iconName}
                    </option>
                  ))}
                </select>

                <input
                  type="text"
                  value={feat.text}
                  onChange={(e) => updateFeatureText(idx, e.target.value)}
                  placeholder="نص الميزة (مثال: إدارة المرشّحين والعمال بالكامل)"
                  className={`${fieldClass} bg-white`}
                />

                <button
                  type="button"
                  onClick={() => removeFeature(idx)}
                  className="flex size-9 shrink-0 items-center justify-center rounded-lg text-rose-500 hover:bg-rose-50 transition-colors"
                  title="حذف الميزة"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-slate-600">
            نص زر الدعوة للعمل (CTA)
          </span>
          <input
            name="ctaText"
            defaultValue={solution?.ctaText ?? "استكشف الحل"}
            className={fieldClass}
            placeholder="استكشف نظام الاستقدام"
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-slate-600">
            رابط الزر (CTA Href)
          </span>
          <input
            name="ctaHref"
            defaultValue={solution?.ctaHref ?? "#"}
            className={fieldClass}
            placeholder="#recruitment أو /solutions/recruitment"
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-slate-600">الترتيب</span>
          <input
            name="position"
            type="number"
            defaultValue={solution?.position ?? 0}
            className={fieldClass}
          />
        </label>
      </div>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="published"
          defaultChecked={solution ? solution.published : true}
          className="size-4 rounded border-slate-300 accent-brand"
        />
        <span className="text-sm text-slate-700">ظاهر في صفحة الحلول</span>
      </label>

      {state.error ? (
        <p
          role="alert"
          className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700"
        >
          {state.error}
        </p>
      ) : null}

      {state.ok && !solution ? (
        <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
          تمت إضافة الحل بنجاح
        </p>
      ) : null}

      <div className="flex items-center gap-2 mt-2">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800 disabled:opacity-60"
        >
          {solution ? <Save className="size-4" /> : <Plus className="size-4" />}
          {pending ? "جاري الحفظ..." : solution ? "حفظ التعديلات" : "إضافة الحل"}
        </button>

        {onDone ? (
          <button
            type="button"
            onClick={onDone}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
          >
            <X className="size-4" />
            إلغاء
          </button>
        ) : null}
      </div>
    </form>
  );
}

/** كارت "إضافة حل جديد" */
export function AddSolutionPanel() {
  const [open, setOpen] = useState(false);

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-500"
      >
        <Plus className="size-4" />
        إضافة حل جديد
      </button>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
      <h2 className="mb-4 text-base font-bold text-slate-900">حل جديد</h2>
      <SolutionForm onDone={() => setOpen(false)} />
    </div>
  );
}
