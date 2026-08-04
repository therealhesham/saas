"use client";

import { useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  Eye,
  EyeOff,
  Pencil,
  Trash2,
} from "lucide-react";
import {
  deleteProduct,
  moveProduct,
  toggleProduct,
} from "@/app/admin/product-actions";
import { ProductForm, type EditableProduct } from "@/app/admin/product-form";
import { resolveProductAccent, resolveProductIcon } from "@/lib/product-icons";

const iconButtonClass =
  "inline-flex size-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-colors hover:bg-slate-50 disabled:opacity-40";

export function ProductRow({
  product,
  isFirst,
  isLast,
}: {
  product: EditableProduct;
  isFirst: boolean;
  isLast: boolean;
}) {
  const [editing, setEditing] = useState(false);
  const Icon = resolveProductIcon(product.icon);

  if (editing) {
    return (
      <div className="rounded-2xl border border-brand/40 bg-white p-6">
        <h3 className="mb-4 text-base font-bold text-slate-900">
          تعديل: {product.name}
        </h3>
        <ProductForm product={product} onDone={() => setEditing(false)} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 sm:flex-row sm:items-center">
      <span
        className={`inline-flex size-11 shrink-0 items-center justify-center rounded-xl ${resolveProductAccent(product.accent)}`}
      >
        <Icon className="size-5" strokeWidth={1.75} />
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-bold text-slate-900">{product.name}</h3>
          <span dir="ltr" className="text-xs text-slate-400">
            /{product.slug}
          </span>
          {!product.published ? (
            <span className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-500">
              مخفي
            </span>
          ) : null}
        </div>
        <p className="mt-1 truncate text-sm text-slate-500">
          {product.tagline}
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-1.5">
        <form action={moveProduct}>
          <input type="hidden" name="id" value={product.id} />
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

        <form action={moveProduct}>
          <input type="hidden" name="id" value={product.id} />
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

        <form action={toggleProduct}>
          <input type="hidden" name="id" value={product.id} />
          <button
            type="submit"
            aria-label={product.published ? "إخفاء" : "إظهار"}
            className={iconButtonClass}
          >
            {product.published ? (
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
          action={deleteProduct}
          onSubmit={(event) => {
            if (!confirm(`متأكد إنك عايز تحذف "${product.name}"؟`)) {
              event.preventDefault();
            }
          }}
        >
          <input type="hidden" name="id" value={product.id} />
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
