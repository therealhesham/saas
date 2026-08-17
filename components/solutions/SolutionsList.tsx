"use client";

import { useRef } from "react";
import {
  Users,
  FileText,
  Search,
  Globe,
  BarChart3,
  CheckCircle2,
  ArrowLeft,
  Car,
  KeyRound,
  CreditCard,
  MapPin,
  Calendar,
  Star,
  Compass,
  Hotel,
  Plane,
  Package,
  Clock,
  Shield,
} from "lucide-react";

const solutions = [
  {
    id: "recruitment",
    tag: "الاستقدام",
    title: "نظام إدارة الاستقدام",
    subtitle: "من الطلب حتى الوصول",
    description:
      "منصة متكاملة تُغطّي كامل دورة حياة عملية الاستقدام — من إدارة الطلبات والمرشّحين إلى متابعة الأوراق الرسمية والتأشيرات وإحصائيات الأداء.",
    color: "#0D1B3D",
    accentColor: "#3B5BDB",
    glowColor: "rgba(59, 91, 219, 0.15)",
    lightBg: "#EEF2FF",
    iconBg: "bg-indigo-600",
    badgeClass: "bg-indigo-100 text-indigo-700",
    features: [
      { icon: Users, text: "إدارة المرشّحين والعمال بالكامل" },
      { icon: FileText, text: "متابعة الأوراق والتأشيرات" },
      { icon: Search, text: "بحث وفلترة متقدّمة" },
      { icon: BarChart3, text: "تقارير وإحصائيات تفصيلية" },
      { icon: Globe, text: "دعم متعدد المكاتب والدول" },
      { icon: Shield, text: "صلاحيات وأدوار متعددة" },
    ],
    cta: "استكشف نظام الاستقدام",
    href: "#recruitment",
    gradient: "from-indigo-950 to-[#080e24]",
    borderGlow: "hover:border-indigo-500/40",
  },
  {
    id: "rentcar",
    tag: "تأجير السيارات",
    title: "نظام تأجير السيارات",
    subtitle: "أسطولك في راحة يدك",
    description:
      "منصة سحابية شاملة لإدارة أسطول السيارات، حجوزات العملاء، العقود، الفواتير، والصيانة — كل شيء في مكان واحد.",
    color: "#3D2800",
    accentColor: "#D4A24A",
    glowColor: "rgba(212, 162, 74, 0.15)",
    lightBg: "#FEFCE8",
    iconBg: "bg-amber-500",
    badgeClass: "bg-amber-100 text-amber-700",
    features: [
      { icon: Car, text: "إدارة الأسطول والسيارات" },
      { icon: Calendar, text: "نظام حجوزات متكامل" },
      { icon: KeyRound, text: "عقود إيجار رقمية" },
      { icon: CreditCard, text: "فواتير ومدفوعات إلكترونية" },
      { icon: MapPin, text: "تتبّع مواقع الاستلام والتسليم" },
      { icon: Clock, text: "تنبيهات الصيانة والتجديد" },
    ],
    cta: "استكشف نظام التأجير",
    href: "#rentcar",
    gradient: "from-amber-950 to-[#080e24]",
    borderGlow: "hover:border-amber-500/40",
  },
  {
    id: "tourism",
    tag: "السياحة",
    title: "النظام السياحي المتكامل",
    subtitle: "رحلات لا تُنسى، إدارة لا مثيل لها",
    description:
      "منصة سياحية متكاملة لإدارة البرامج والباقات السياحية، الحجوزات، الفنادق، تذاكر الطيران، والعملاء — تصمّم تجارب استثنائية بكفاءة عالية.",
    color: "#0D2B20",
    accentColor: "#10B981",
    glowColor: "rgba(16, 185, 129, 0.15)",
    lightBg: "#ECFDF5",
    iconBg: "bg-emerald-600",
    badgeClass: "bg-emerald-100 text-emerald-700",
    features: [
      { icon: Package, text: "إدارة الباقات والبرامج السياحية" },
      { icon: Hotel, text: "حجوزات الفنادق والإقامة" },
      { icon: Plane, text: "إدارة تذاكر الطيران" },
      { icon: Compass, text: "بناء مسارات سياحية مخصصة" },
      { icon: Star, text: "تقييمات العملاء والتغذية الراجعة" },
      { icon: BarChart3, text: "تقارير الإيرادات والأداء" },
    ],
    cta: "استكشف النظام السياحي",
    href: "#tourism",
    gradient: "from-emerald-950 to-[#080e24]",
    borderGlow: "hover:border-emerald-500/40",
  },
];

export function SolutionsList() {
  return (
    <section
      id="solutions-list"
      dir="rtl"
      className="bg-[#060c1e] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-[#D4A24A]/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-[#D4A24A]">
            حلولنا
          </span>
          <h2 className="mt-4 text-3xl font-extrabold leading-snug text-white sm:text-4xl">
            ثلاثة قطاعات، منظومة واحدة متكاملة
          </h2>
          <p className="mt-4 text-base leading-8 text-slate-400">
            كل نظام مُصمَّم خصيصاً لقطاعه، ويمكن دمجها معاً لتحقيق أقصى كفاءة تشغيلية.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-16 flex flex-col gap-8">
          {solutions.map((sol, idx) => {
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
  solution: (typeof solutions)[0];
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

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: "transform 0.3s ease" }}
      className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] transition-all duration-300 ${solution.borderGlow} hover:shadow-2xl`}
    >
      {/* Glow BG */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at 50% 50%, ${solution.glowColor}, transparent 60%)`,
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

          <h3 className="mt-4 text-2xl font-extrabold text-white sm:text-3xl">
            {solution.title}
          </h3>
          <p
            className="mt-1 text-sm font-semibold"
            style={{ color: solution.accentColor }}
          >
            {solution.subtitle}
          </p>
          <p className="mt-4 text-sm leading-7 text-slate-400">
            {solution.description}
          </p>

          <a
            href={solution.href}
            className="group/btn mt-8 inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white shadow-lg transition-all"
            style={{
              background: solution.accentColor,
              boxShadow: `0 8px 24px ${solution.glowColor}`,
              color: solution.id === "rentcar" ? "#3D2800" : "white",
            }}
          >
            {solution.cta}
            <ArrowLeft className="size-4 transition-transform group-hover/btn:-translate-x-1" />
          </a>
        </div>

        {/* Right: Features Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {solution.features.map((feat) => {
              const Icon = feat.icon;
              return (
                <div
                  key={feat.text}
                  className="flex items-start gap-3 rounded-2xl border border-white/8 bg-white/[0.04] px-4 py-3.5 backdrop-blur-sm transition-all duration-200 hover:bg-white/[0.07]"
                >
                  <span
                    className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg"
                    style={{ background: `${solution.accentColor}20` }}
                  >
                    <Icon
                      className="size-4"
                      style={{ color: solution.accentColor }}
                    />
                  </span>
                  <span className="text-sm font-medium leading-6 text-slate-300">
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
