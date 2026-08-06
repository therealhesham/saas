import { ArrowLeft, CircleCheck } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { resolveProductAccent, resolveProductIcon } from "@/lib/product-icons";

export async function ProductsSection() {
  let products: Awaited<ReturnType<typeof prisma.product.findMany>> = [];
  try {
    products = await prisma.product.findMany({
      where: { published: true },
      orderBy: [{ position: "asc" }, { id: "asc" }],
    });
  } catch (error) {
    console.warn("تعذّر جلب المنتجات من قاعدة البيانات أثناء توليد الصفحة:", error);
  }

  // مفيش منتجات منشورة؟ نخفي السكشن كله بدل ما نسيب فراغ في الصفحة
  if (products.length === 0) {
    return null;
  }

  return (
    <section id="products" className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold text-brand">المنتجات</span>
          <h2 className="mt-3 text-3xl font-bold leading-snug text-slate-900 sm:text-4xl">
            منظومة منتجات متكاملة، تشتغل مع بعضها
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-600">
            كل منتج قوي بمفرده، ولمّا تجمعهم بتحصل على بيانات موحّدة وحساب واحد
            وفاتورة واحدة. ابدأ بمنتج واحد وأضف الباقي وقت ما تحتاج.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => {
            const Icon = resolveProductIcon(product.icon);
            const highlights = Array.isArray(product.highlights)
              ? product.highlights.map(String)
              : [];

            return (
              <article
                key={product.id}
                className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-7 transition-all hover:border-brand/40 hover:shadow-lg hover:shadow-slate-200/60"
              >
                <span
                  className={`inline-flex size-12 items-center justify-center rounded-xl ${resolveProductAccent(product.accent)}`}
                >
                  <Icon className="size-6" strokeWidth={1.75} />
                </span>

                <h3 className="mt-5 text-lg font-bold text-slate-900">
                  {product.name}
                </h3>
                <p className="mt-1 text-sm font-medium text-slate-500">
                  {product.tagline}
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {product.description}
                </p>

                {highlights.length > 0 ? (
                  <ul className="mt-5 flex flex-col gap-2">
                    {highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex items-center gap-2 text-sm text-slate-700"
                      >
                        <CircleCheck className="size-4 shrink-0 text-brand" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                ) : null}

                <a
                  href={`#${product.slug}`}
                  className="mt-6 inline-flex items-center gap-1.5 pt-1 text-sm font-semibold text-brand transition-colors hover:text-indigo-500"
                >
                  اعرف أكثر
                  <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
                </a>
              </article>
            );
          })}
        </div>

        <div className="mt-14 flex flex-col items-center justify-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-8 py-7 text-center sm:flex-row sm:text-start">
          <p className="text-sm leading-7 text-slate-700">
            <span className="font-bold text-slate-900">
              احصل على المنظومة كاملة
            </span>{" "}
            — كل المنتجات في اشتراك واحد، ووفّر حتى 35% مقارنة بشرائها منفصلة.
          </p>
          <a
            href="#pricing"
            className="shrink-0 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
          >
            قارن الباقات
          </a>
        </div>
      </div>
    </section>
  );
}
