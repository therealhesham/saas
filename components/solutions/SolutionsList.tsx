"use client";

import { useRef } from "react";
import { ArrowLeft } from "lucide-react";
import { resolveSolutionIcon } from "@/lib/solution-icons";

export type PublicSolutionItem = {
  id: number | string;
  slug: string;
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  accentColor: string;
  features: Array<{ icon: string; text: string }>;
  ctaText: string;
  ctaHref: string;
};

const DEFAULT_SOLUTIONS: PublicSolutionItem[] = [
  {
    id: "recruitment",
    slug: "recruitment",
    tag: "الاستقدام",
    title: "نظام إدارة الاستقدام",
    subtitle: "من الطلب حتى الوصول",
    description:
      "منصة متكاملة تُغطّي كامل دورة حياة عملية الاستقدام — من إدارة الطلبات والمرشّحين إلى متابعة الأوراق الرسمية والتأشيرات وإحصائيات الأداء.",
    accentColor: "#3B5BDB",
    features: [
      { icon: "Users", text: "إدارة المرشّحين والعمال بالكامل" },
      { icon: "FileText", text: "متابعة الأوراق والتأشيرات" },
      { icon: "Search", text: "بحث وفلترة متقدّمة" },
      { icon: "BarChart3", text: "تقارير وإحصائيات تفصيلية" },
      { icon: "Globe", text: "دعم متعدد المكاتب والدول" },
      { icon: "Shield", text: "صلاحيات وأدوار متعددة" },
    ],
    ctaText: "استكشف نظام الاستقدام",
    ctaHref: "#recruitment",
  },
  {
    id: "rentcar",
    slug: "rentcar",
    tag: "تأجير السيارات",
    title: "نظام تأجير السيارات",
    subtitle: "أسطولك في راحة يدك",
    description:
      "منصة سحابية شاملة لإدارة أسطول السيارات، حجوزات العملاء، العقود، الفواتير، والصيانة — كل شيء في مكان واحد.",
    accentColor: "#D4A24A",
    features: [
      { icon: "Car", text: "إدارة الأسطول والسيارات" },
      { icon: "Calendar", text: "نظام حجوزات متكامل" },
      { icon: "KeyRound", text: "عقود إيجار رقمية" },
      { icon: "CreditCard", text: "فواتير ومدفوعات إلكترونية" },
      { icon: "MapPin", text: "تتبّع مواقع الاستلام والتسليم" },
      { icon: "Clock", text: "تنبيهات الصيانة والتجديد" },
    ],
    ctaText: "استكشف نظام التأجير",
    ctaHref: "#rentcar",
  },
  {
    id: "tourism",
    slug: "tourism",
    tag: "السياحة",
    title: "النظام السياحي المتكامل",
    subtitle: "رحلات لا تُنسى، إدارة لا مثيل لها",
    description:
      "منصة سياحية متكاملة لإدارة البرامج والباقات السياحية، الحجوزات، الفنادق، تذاكر الطيران، والعملاء — تصمّم تجارب استثنائية بكفاءة عالية.",
    accentColor: "#10B981",
    features: [
      { icon: "Package", text: "إدارة الباقات والبرامج السياحية" },
      { icon: "Hotel", text: "حجوزات الفنادق والإقامة" },
      { icon: "Plane", text: "إدارة تذاكر الطيران" },
      { icon: "Compass", text: "بناء مسارات سياحية مخصصة" },
      { icon: "Star", text: "تقييمات العملاء والتغذية الراجعة" },
      { icon: "BarChart3", text: "تقارير الإيرادات والأداء" },
    ],
    ctaText: "استكشف النظام السياحي",
    ctaHref: "#tourism",
  },
];

export function SolutionsList({
  solutions,
}: {
  solutions?: PublicSolutionItem[];
}) {
  const items = solutions && solutions.length > 0 ? solutions : DEFAULT_SOLUTIONS;

  return (
    <section
      id="solutions-list"
      dir="rtl"
      className="bg-white py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold text-brand">
            حلولنا
          </span>
          <h2 className="mt-3 text-3xl font-bold leading-snug text-slate-900 sm:text-4xl">
            منظومة حلول متكاملة لأعمالك
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-600">
            كل نظام مُصمَّم خصيصاً لقطاعه، ويمكن دمجها معاً لتحقيق أقصى كفاءة تشغيلية.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-16 flex flex-col gap-8">
          {items.map((sol, idx) => {
            return (
              <SolutionCard key={sol.id} solution={sol} reversed={idx % 2 === 1} />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SolutionCard({
  solution,
  reversed,
}: {
  solution: PublicSolutionItem;
  reversed: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -4;
    const rotY = ((x - cx) / cx) * 4;
    card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(4px)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)";
    }
  };

  const glowColor = `${solution.accentColor}25`;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: "transform 0.3s ease" }}
      className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/80"
    >
      {/* Glow BG */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at 50% 50%, ${glowColor}, transparent 60%)`,
        }}
      />

      <div
        className={`flex flex-col gap-8 p-8 sm:p-10 lg:flex-row ${reversed ? "lg:flex-row-reverse" : ""} lg:items-center lg:gap-16`}
      >
        {/* Left: Content */}
        <div className="flex-1">
          {/* Badge */}
          <span
            className="inline-block rounded-full px-3 py-1 text-xs font-bold"
            style={{
              background: `${solution.accentColor}20`,
              color: solution.accentColor,
            }}
          >
            {solution.tag}
          </span>

          <h3 className="mt-4 text-2xl font-extrabold text-slate-900 sm:text-3xl">
            {solution.title}
          </h3>
          <p
            className="mt-1 text-sm font-semibold"
            style={{ color: solution.accentColor }}
          >
            {solution.subtitle}
          </p>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            {solution.description}
          </p>

          <a
            href={solution.ctaHref}
            className="group/btn mt-8 inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold shadow-lg transition-all"
            style={{
              background: solution.accentColor,
              boxShadow: `0 8px 24px ${glowColor}`,
              color: solution.slug === "rentcar" || solution.accentColor.toLowerCase() === "#d4a24a" ? "#3D2800" : "white",
            }}
          >
            {solution.ctaText}
            <ArrowLeft className="size-4 transition-transform group-hover/btn:-translate-x-1" />
          </a>
        </div>

        {/* Right: Features Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {solution.features.map((feat, idx) => {
              const Icon = resolveSolutionIcon(feat.icon);
              return (
                <div
                  key={idx}
                  className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3.5 transition-all duration-200 hover:bg-slate-100/80"
                >
                  <span
                    className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg"
                    style={{ background: `${solution.accentColor}15` }}
                  >
                    <Icon
                      className="size-4"
                      style={{ color: solution.accentColor }}
                    />
                  </span>
                  <span className="text-sm font-medium leading-6 text-slate-700">
                    {feat.text}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `linear-gradient(to right, transparent, ${solution.accentColor}, transparent)`,
        }}
      />
    </div>
  );
}
