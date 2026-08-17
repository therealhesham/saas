"use client";

import { useEffect, useRef } from "react";
import { ArrowLeft } from "lucide-react";

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
      className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50/60 py-24 sm:py-36"
    >
      {/* توهج خلفي خفيف مطابق للرئيسية */}
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 size-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/10 blur-[130px] transition-transform duration-500"
      />

      <div className="relative mx-auto max-w-5xl px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center rounded-full border border-brand/20 bg-brand/5 px-4 py-1.5 text-xs font-semibold text-brand">
          حلول برمجية متكاملة لأعمالك
        </div>

        <h1 className="mx-auto mt-8 max-w-3xl text-4xl font-bold leading-[1.25] text-slate-900 sm:text-5xl lg:text-6xl lg:leading-[1.2]">
          أنظمة ذكية تُحرّك{" "}
          <span className="text-brand">قطاعك بأكمله</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
          روائس تقدّم أنظمة سحابية جاهزة ومُخصَّصة لقطاعات الاستقدام، تأجير السيارات،
          والسياحة — مبنية بأحدث التقنيات وقابلة للتوسّع مع نموّ أعمالك.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#solutions-list"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand/20 transition-colors hover:bg-indigo-700 sm:w-auto"
          >
            استكشف الحلول
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
          </a>
          <a
            href="#contact"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-7 py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-50 hover:text-slate-900 sm:w-auto"
          >
            تواصل مع فريقنا
          </a>
        </div>

        {/* Stats — مطابقة لتصميم الرئيسية */}
        <dl className="mx-auto mt-16 grid max-w-3xl grid-cols-1 gap-px overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-200/80 shadow-sm sm:grid-cols-3">
          {[
            { value: "+3", label: "قطاعات متخصصة" },
            { value: "+50", label: "عميل نشط" },
            { value: "%99.9", label: "وقت التشغيل" },
          ].map((stat) => (
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

