import Link from "next/link";
import { ExternalLink, Hexagon, LogOut, PackageOpen } from "lucide-react";
import { logout } from "@/app/admin/auth-actions";
import { AddProductPanel } from "@/app/admin/product-form";
import { ProductRow } from "@/app/admin/product-row";
import { prisma } from "@/lib/prisma";

// اللوحة لازم تقرأ أحدث بيانات من الداتابيز مع كل زيارة، مش نسخة مبنية وقت الـ build
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const products = await prisma.product.findMany({
    orderBy: [{ position: "asc" }, { id: "asc" }],
  });

  const editable = products.map((product) => ({
    id: product.id,
    slug: product.slug,
    name: product.name,
    tagline: product.tagline,
    description: product.description,
    icon: product.icon,
    accent: product.accent,
    // العمود متخزن JSON، فبنتأكد إنه مصفوفة نصوص قبل ما نمرّره للواجهة
    highlights: Array.isArray(product.highlights)
      ? product.highlights.map(String)
      : [],
    position: product.position,
    published: product.published,
  }));

  return (
    <main className="flex-1 bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-4">
          <div className="flex items-center gap-2">
            <Hexagon className="size-6 text-brand" strokeWidth={1.5} />
            <span className="font-bold text-slate-900">لوحة تحكم روائس</span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-50"
            >
              <ExternalLink className="size-4" />
              عرض الموقع
            </Link>

            <form action={logout}>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-50"
              >
                <LogOut className="size-4" />
                خروج
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">المنتجات</h1>
            <p className="mt-1 text-sm text-slate-500">
              {products.length} منتج — الترتيب هنا هو نفس ترتيب الظهور في
              الصفحة الرئيسية
            </p>
          </div>

          <AddProductPanel />
        </div>

        {editable.length === 0 ? (
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center">
            <PackageOpen className="size-8 text-slate-400" />
            <p className="text-sm text-slate-500">
              مفيش منتجات لسه — ابدأ بإضافة واحد
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {editable.map((product, index) => (
              <ProductRow
                key={product.id}
                product={product}
                isFirst={index === 0}
                isLast={index === editable.length - 1}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
