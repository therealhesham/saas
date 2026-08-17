"use client";

import { useEffect, useRef } from "react";
import { ArrowLeft, Sparkles } from "lucide-react";

export function SolutionsHero() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!dotRef.current) return;
      const rect = dotRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / 30;
      const dy = (e.clientY - cy) / 30;
      dotRef.current.style.transform = `translate(${dx}px, ${dy}px)`;
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <section
      dir="rtl"
      className="relative overflow-hidden bg-[#080e24] py-24 sm:py-36"
    >
      {/* شبكة نقاط خلفية */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* كرات التوهج */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-32 size-[480px] rounded-full bg-indigo-600/20 blur-[100px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-20 -left-20 size-[360px] rounded-full bg-[#B8862B]/15 blur-[90px]"
      />

      {/* دائرة تتبع الماوس */}
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 size-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/10 blur-3xl transition-transform duration-500"
      />

      <div className="relative mx-auto max-w-5xl px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold text-[#D4A24A] backdrop-blur-sm">
          <Sparkles className="size-3.5" />
          حلول برمجية متكاملة لثلاثة قطاعات
        </div>

        <h1 className="mx-auto mt-8 max-w-3xl text-4xl font-extrabold leading-[1.2] text-white sm:text-5xl lg:text-6xl">
          أنظمة ذكية تُحرّك{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #D4A24A 0%, #E8BE70 60%, #B8862B 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            قطاعك بأكمله
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
          روائس تقدّم أنظمة سحابية جاهزة ومُخصَّصة لقطاعات الاستقدام، تأجير السيارات،
          والسياحة — مبنية بأحدث التقنيات وقابلة للتوسّع مع نموّ أعمالك.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#solutions-list"
            className="group inline-flex items-center gap-2 rounded-xl bg-[#D4A24A] px-7 py-3.5 text-sm font-bold text-[#080e24] shadow-lg shadow-amber-500/20 transition-all hover:bg-[#E8BE70]"
          >
            استكشف الحلول
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10"
          >
            تواصل مع فريقنا
          </a>
        </div>

        {/* Stats */}
        <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-3 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5">
          {[
            { value: "+3", label: "قطاعات متخصصة" },
            { value: "+50", label: "عميل نشط" },
            { value: "%99.9", label: "وقت التشغيل" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white/[0.03] px-4 py-7 text-center backdrop-blur-sm"
            >
              <dt className="text-3xl font-bold text-[#D4A24A]">{stat.value}</dt>
              <dd className="mt-2 text-xs font-medium text-slate-400">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
