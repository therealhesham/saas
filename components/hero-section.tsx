import Image from "next/image";
import { ArrowLeft, CirclePlay, Sparkles, Star } from "lucide-react";
import { DashboardPreview } from "@/components/dashboard-preview";
import { LaptopMockup } from "@/components/laptop-mockup";
import { SiteHeader } from "@/components/site-header";
import { findScreenshot } from "@/lib/screenshots";

const stats = [
  { value: "6", label: "منتجات متكاملة" },
  { value: "+12,000", label: "فريق يستخدم المنظومة" },
  { value: "%99.9", label: "جاهزية الخدمة" },
];

export function HeroSection() {
  // حط صورتك في public/screenshots/hero.png وهتظهر تلقائياً مكان البديل
  const screenshot = findScreenshot("hero");

  return (
    <section className="relative overflow-hidden bg-ink">
      {/* توهج خلفي خفيف */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 size-[46rem] -translate-x-1/2 rounded-full bg-brand/20 blur-[140px]"
      />

      <SiteHeader />

      <div className="relative mx-auto max-w-6xl px-6 pt-20 pb-24 text-center sm:pt-28 sm:pb-32">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-brand-soft">
          <Sparkles className="size-3.5" />
          6 منتجات في منظومة واحدة — بحساب واحد وفاتورة واحدة
        </span>

        <h1 className="mx-auto mt-8 max-w-3xl text-4xl font-bold leading-[1.25] text-white sm:text-5xl lg:text-6xl lg:leading-[1.2]">
          منظومة منتجات
          <span className="text-brand-soft"> تدير أعمالك بالكامل</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
          من إدارة العملاء والمبيعات، للتحليلات والأتمتة والدعم والفوترة
          والموارد البشرية — منتجات مستقلة تشتغل مع بعضها على نفس البيانات.
          ابدأ بمنتج واحد وأضف الباقي وقت ما تحتاج.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#signup"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition-colors hover:bg-indigo-500 sm:w-auto"
          >
            ابدأ تجربتك المجانية
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
          </a>
          <a
            href="#demo"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10 sm:w-auto"
          >
            <CirclePlay className="size-4" />
            شاهد العرض التوضيحي
          </a>
        </div>

        <p className="mt-5 flex items-center justify-center gap-2 text-xs text-slate-500">
          <span className="flex gap-0.5">
            {Array.from({ length: 5 }, (_, index) => (
              <Star
                key={index}
                className="size-3.5 fill-amber-400 text-amber-400"
              />
            ))}
          </span>
          تقييم 4.9 من 5 بناءً على أكثر من 800 مراجعة
        </p>

        {/* لاب توب يعرض لقطة من داخل المنتج */}
        <div className="mt-16 sm:mt-20">
          <LaptopMockup>
            {screenshot ? (
              <Image
                src={screenshot}
                alt="لقطة من داخل منصة روائس للاستقدام"
                fill
                priority
                sizes="(max-width: 896px) 100vw, 896px"
                className="object-cover object-right-top"
              />
            ) : (
              <DashboardPreview />
            )}
          </LaptopMockup>
        </div>

        <dl className="mx-auto mt-16 grid max-w-3xl grid-cols-1 gap-px overflow-hidden rounded-2xl border border-ink-line bg-ink-line sm:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-ink-soft px-6 py-8">
              <dt className="text-3xl font-bold text-white">{stat.value}</dt>
              <dd className="mt-2 text-sm text-slate-400">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
