"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { Plus, Save, X } from "lucide-react";
import {
  saveProduct,
  type ProductFormState,
} from "@/app/admin/product-actions";
import {
  PRODUCT_ACCENT_NAMES,
  PRODUCT_ICON_NAMES,
} from "@/lib/product-icons";

export type EditableProduct = {
  id: number;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  accent: string;
  highlights: string[];
  position: number;
  published: boolean;
};

const fieldClass =
  "w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30";

export function ProductForm({
  product,
  onDone,
}: {
  product?: EditableProduct;
  onDone?: () => void;
}) {
  const [state, formAction, pending] = useActionState<
    ProductFormState,
    FormData
  >(saveProduct, {});
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.ok) {
      if (product) {
        onDone?.();
      } else {
        // إضافة منتج جديد: نفضّي الفورم عشان يقدر يضيف واحد بعده
        formRef.current?.reset();
      }
    }
  }, [state.ok, product, onDone]);

  return (
    <form ref={formRef} action={formAction} className="flex flex-col gap-4">
      {product ? <input type="hidden" name="id" value={product.id} /> : null}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-slate-600">اسم المنتج</span>
          <input
            name="name"
            required
            defaultValue={product?.name}
            className={fieldClass}
            placeholder="روائس للتحليلات"
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-slate-600">
            الـ slug (بالإنجليزي، للرابط)
          </span>
          <input
            name="slug"
            required
            dir="ltr"
            defaultValue={product?.slug}
            className={`${fieldClass} text-left`}
            placeholder="analytics"
          />
        </label>
      </div>

      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-medium text-slate-600">وصف مختصر</span>
        <input
          name="tagline"
          required
          defaultValue={product?.tagline}
          className={fieldClass}
          placeholder="لوحات بيانات وتقارير"
        />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-medium text-slate-600">الوصف الكامل</span>
        <textarea
          name="description"
          required
          rows={3}
          defaultValue={product?.description}
          className={fieldClass}
        />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-medium text-slate-600">
          النقاط المميزة — كل نقطة في سطر
        </span>
        <textarea
          name="highlights"
          rows={3}
          defaultValue={product?.highlights.join("\n")}
          className={fieldClass}
          placeholder={"تقارير فورية\nمؤشرات مخصّصة"}
        />
      </label>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-slate-600">الأيقونة</span>
          <select
            name="icon"
            defaultValue={product?.icon ?? "Blocks"}
            className={fieldClass}
          >
            {PRODUCT_ICON_NAMES.map((icon) => (
              <option key={icon} value={icon}>
                {icon}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-slate-600">اللون</span>
          <select
            name="accent"
            defaultValue={product?.accent ?? "sky"}
            className={fieldClass}
          >
            {PRODUCT_ACCENT_NAMES.map((accent) => (
              <option key={accent} value={accent}>
                {accent}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-slate-600">الترتيب</span>
          <input
            name="position"
            type="number"
            defaultValue={product?.position ?? 0}
            className={fieldClass}
          />
        </label>
      </div>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="published"
          defaultChecked={product ? product.published : true}
          className="size-4 rounded border-slate-300 accent-brand"
        />
        <span className="text-sm text-slate-700">ظاهر في الصفحة الرئيسية</span>
      </label>

      {state.error ? (
        <p
          role="alert"
          className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700"
        >
          {state.error}
        </p>
      ) : null}

      {state.ok && !product ? (
        <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
          تمت الإضافة بنجاح
        </p>
      ) : null}

      <div className="flex items-center gap-2">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800 disabled:opacity-60"
        >
          {product ? <Save className="size-4" /> : <Plus className="size-4" />}
          {pending ? "جاري الحفظ..." : product ? "حفظ التعديلات" : "إضافة"}
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

/** كارت "إضافة منتج" اللي بيتفتح ويتقفل */
export function AddProductPanel() {
  const [open, setOpen] = useState(false);

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-500"
      >
        <Plus className="size-4" />
        إضافة منتج جديد
      </button>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <h2 className="mb-4 text-base font-bold text-slate-900">منتج جديد</h2>
      <ProductForm onDone={() => setOpen(false)} />
    </div>
  );
}
