import Image from "next/image";
import { CirclePlay, Sparkles, Star } from "lucide-react";
import { DashboardPreview } from "@/components/dashboard-preview";
import { LaptopMockup } from "@/components/laptop-mockup";
import { SiteHeader } from "@/components/site-header";
import { StartFreeButton } from "@/components/start-free-button";
import { prisma } from "@/lib/prisma";
import { findScreenshot } from "@/lib/screenshots";


async function countPublishedProjects(): Promise<number | null> {
  try {
    return await prisma.project.count({ where: { published: true } });
  } catch (error) {
    console.warn("تعذّر حساب عدد المشاريع من قاعدة البيانات:", error);
    return null;
  }
}

export async function HeroSection() {
  // حط صورتك في public/screenshots/hero.png وهتظهر تلقائياً مكان البديل
  const screenshot = findScreenshot("hero");

  const projectCount = await countPublishedProjects();

  const stats = [
    projectCount === null
      ? null
      : { value: String(projectCount), label: "مشروع رقمي منجز" },
    { value: "+12,000", label: "مستخدم يتصفح أعمالنا" },
    { value: "%99.9", label: "جاهزية وسرعة الأداء" },
  ].filter((stat) => stat !== null);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50/60">
      {/* توهج خلفي خفيف */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 size-[46rem] -translate-x-1/2 rounded-full bg-brand/10 blur-[130px]"
      />

      <SiteHeader />

      <div className="relative mx-auto max-w-6xl px-6 pt-20 pb-24 text-center sm:pt-28 sm:pb-32">

        <h1 className="mx-auto mt-8 max-w-3xl text-4xl font-bold leading-[1.25] text-slate-900 sm:text-5xl lg:text-6xl lg:leading-[1.2]">
          مشاريع سحابية وحلول رقمية
          <span className="text-brand"> تبهر عملاءك</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
          استكشف حلولنا البرمجية المبتكرة ومشاريعنا الرقمية المتطورة.
          نصمم ونبني تطبيقات ويب وسحابية فائقة السرعة تلبّي كافة تطلعاتك.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <StartFreeButton
            label="ابدأ تجربتك المجانية"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand/20 transition-colors hover:bg-indigo-700 sm:w-auto"
            showIcon={true}
          />
          <a

            href="#demo"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-7 py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-50 hover:text-slate-900 sm:w-auto"
          >
            <CirclePlay className="size-4 text-brand" />
            شاهد العرض التوضيحي
          </a>
        </div>

        <p className="mt-5 flex items-center justify-center gap-2 text-xs font-medium text-slate-500">
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

        <dl className="mx-auto mt-16 grid max-w-3xl grid-cols-1 gap-px overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-200/80 shadow-sm sm:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white px-6 py-8">
              <dt className="text-3xl font-bold text-slate-900">{stat.value}</dt>
              <dd className="mt-2 text-sm font-medium text-slate-500">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
