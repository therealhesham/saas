import {
  ArrowLeft,
  BriefcaseBusiness,
  ChartColumn,
  CircleCheck,
  CreditCard,
  LifeBuoy,
  UsersRound,
  Workflow,
} from "lucide-react";

const products = [
  {
    icon: UsersRound,
    name: "روائس CRM",
    slug: "crm",
    tagline: "إدارة العملاء والمبيعات",
    description:
      "تابع عملاءك من أول تواصل لحد إتمام الصفقة، مع خط أنابيب مبيعات واضح وتنبيهات تلقائية.",
    highlights: ["خط أنابيب مرئي", "تتبّع المحادثات", "توقّعات مبيعات"],
    accent: "text-sky-600 bg-sky-50",
  },
  {
    icon: ChartColumn,
    name: "روائس للتحليلات",
    slug: "analytics",
    tagline: "لوحات بيانات وتقارير",
    description:
      "حوّل بياناتك لقرارات بلوحات تحليلية محدّثة لحظياً وتقارير جاهزة للمشاركة مع فريقك.",
    highlights: ["تقارير فورية", "مؤشرات مخصّصة", "تصدير تلقائي"],
    accent: "text-violet-600 bg-violet-50",
  },
  {
    icon: Workflow,
    name: "روائس للأتمتة",
    slug: "automation",
    tagline: "سير عمل بدون كود",
    description:
      "اربط خطواتك المتكررة في سير عمل يشتغل لوحده، وابنِ أتمتتك بالسحب والإفلات بدون برمجة.",
    highlights: ["محرّر مرئي", "مشغّلات ذكية", "تكامل مع أدواتك"],
    accent: "text-amber-600 bg-amber-50",
  },
  {
    icon: LifeBuoy,
    name: "روائس للدعم",
    slug: "support",
    tagline: "تذاكر ومحادثات العملاء",
    description:
      "صندوق وارد موحّد يجمع رسائل عملائك من كل القنوات، مع توزيع تلقائي للتذاكر على الفريق.",
    highlights: ["صندوق موحّد", "قاعدة معرفة", "قياس زمن الرد"],
    accent: "text-emerald-600 bg-emerald-50",
  },
  {
    icon: CreditCard,
    name: "روائس للفوترة",
    slug: "billing",
    tagline: "اشتراكات ومدفوعات",
    description:
      "أصدر فواتيرك وحصّل مدفوعاتك واتابع الاشتراكات المتجددة من مكان واحد بعملات متعددة.",
    highlights: ["فواتير تلقائية", "اشتراكات متجددة", "تقارير إيرادات"],
    accent: "text-rose-600 bg-rose-50",
  },
  {
    icon: BriefcaseBusiness,
    name: "روائس للموارد البشرية",
    slug: "hr",
    tagline: "إدارة الفريق والحضور",
    description:
      "ملفات موظفين، طلبات إجازات، وحضور وانصراف — كلها مربوطة بباقي منتجات المنظومة.",
    highlights: ["ملفات الموظفين", "طلبات الإجازات", "كشوف المرتبات"],
    accent: "text-cyan-600 bg-cyan-50",
  },
];

export function ProductsSection() {
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
          {products.map((product) => (
            <article
              key={product.name}
              className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-7 transition-all hover:border-brand/40 hover:shadow-lg hover:shadow-slate-200/60"
            >
              <span
                className={`inline-flex size-12 items-center justify-center rounded-xl ${product.accent}`}
              >
                <product.icon className="size-6" strokeWidth={1.75} />
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

              <ul className="mt-5 flex flex-col gap-2">
                {product.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-center gap-2 text-sm text-slate-700"
                  >
                    <CircleCheck className="size-4 shrink-0 text-brand" />
                    {highlight}
                  </li>
                ))}
              </ul>

              <a
                href={`#${product.slug}`}
                className="mt-6 inline-flex items-center gap-1.5 pt-1 text-sm font-semibold text-brand transition-colors hover:text-indigo-500"
              >
                اعرف أكثر
                <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
              </a>
            </article>
          ))}
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
