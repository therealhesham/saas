import Image from "next/image";
import { CirclePlay, Star } from "lucide-react";
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
      {/* Navy glow blob */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-56 left-1/2 size-[52rem] -translate-x-1/2 rounded-full bg-[#0D1B3D]/6 blur-[140px]"
      />
      {/* Gold accent glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 right-1/4 size-72 rounded-full bg-[#D4A24A]/8 blur-[90px]"
      />

      <SiteHeader />

      <div className="relative mx-auto max-w-6xl px-6 pt-20 pb-24 text-center sm:pt-28 sm:pb-32">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-[#D4A24A]/35 bg-[#D4A24A]/8 px-4 py-1.5 text-xs font-bold text-[#B8862B]">
          <span className="size-1.5 rounded-full bg-[#D4A24A] animate-pulse" />
          حلول سحابية مبنية للمؤسسات والشركات
        </div>

        <h1 className="mx-auto mt-7 max-w-3xl text-4xl font-extrabold leading-[1.2] text-[#0D1B3D] sm:text-5xl lg:text-6xl lg:leading-[1.15]">
          مشاريع سحابية وحلول رقمية
          <span className="relative">
            {" "}
            <span className="text-[#D4A24A]">تبهر عملاءك</span>
            {/* Gold underline decoration */}
            <span
              aria-hidden
              className="absolute -bottom-1 right-0 h-[3px] w-full rounded-full bg-gradient-to-r from-[#B8862B] via-[#D4A24A] to-[#E5B869] opacity-60"
            />
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#0D1B3D]/60 sm:text-lg">
          استكشف حلولنا البرمجية المبتكرة ومشاريعنا الرقمية المتطورة.
          نصمم ونبني تطبيقات ويب وسحابية فائقة السرعة تلبّي كافة تطلعاتك.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <StartFreeButton
            label="ابدأ تجربتك المجانية"
            showIcon={true}
            className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-[#0D1B3D] px-7 py-3.5 text-sm font-bold text-white shadow-xl shadow-[#0D1B3D]/25 transition-all hover:bg-[#1a2e5a] hover:shadow-[#0D1B3D]/35 sm:w-auto"
          />
          <a
            href="#demo"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[#0D1B3D]/15 bg-white px-7 py-3.5 text-sm font-semibold text-[#0D1B3D] shadow-sm transition-colors hover:border-[#D4A24A]/50 hover:bg-[#D4A24A]/5 sm:w-auto"
          >
            <CirclePlay className="size-4 text-[#D4A24A]" />
            شاهد العرض التوضيحي
          </a>
        </div>

        {/* Stars */}
        <p className="mt-5 flex items-center justify-center gap-2 text-xs font-medium text-[#0D1B3D]/50">
          <span className="flex gap-0.5">
            {Array.from({ length: 5 }, (_, i) => (
              <Star key={i} className="size-3.5 fill-[#D4A24A] text-[#D4A24A]" />
            ))}
          </span>
          تقييم 4.9 من 5 بناءً على أكثر من 800 مراجعة
        </p>

        {/* Laptop mockup */}
        <div className="mt-16 sm:mt-20">
          <LaptopMockup>
            {screenshot ? (
              <Image
                src={screenshot}
                alt="لقطة من داخل منصة روائس"
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

        {/* Stats bar */}
        <dl className="mx-auto mt-16 grid max-w-3xl grid-cols-1 gap-px overflow-hidden rounded-2xl border border-[#0D1B3D]/10 bg-[#0D1B3D]/8 shadow-sm sm:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="relative bg-white px-6 py-8 group">
              {/* Gold top accent on hover */}
              <span className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-[#B8862B] to-[#E5B869] transition-transform duration-300 group-hover:scale-x-100" />
              <dt className="text-3xl font-extrabold text-[#0D1B3D]">{stat.value}</dt>
              <dd className="mt-2 text-sm font-medium text-[#0D1B3D]/50">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
