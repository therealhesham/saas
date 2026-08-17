import {
  Zap,
  ShieldCheck,
  HeadphonesIcon,
  RefreshCw,
  Globe2,
  Code2,
} from "lucide-react";

const reasons = [
  {
    icon: Zap,
    title: "سرعة في التسليم",
    description: "أنظمة جاهزة للاستخدام الفوري مع إمكانية التخصيص حسب احتياجاتك.",
    color: "#D4A24A",
  },
  {
    icon: ShieldCheck,
    title: "أمان وموثوقية",
    description: "بنية تحتية سحابية بمعايير أمان enterprise مع نسخ احتياطية يومية.",
    color: "#3B5BDB",
  },
  {
    icon: HeadphonesIcon,
    title: "دعم فني متواصل",
    description: "فريق دعم متخصص يرافقك من يوم التسليم وعلى مدار السنة.",
    color: "#10B981",
  },
  {
    icon: RefreshCw,
    title: "تحديثات مستمرة",
    description: "نُطوّر أنظمتنا باستمرار ونوصّل التحسينات لعملائنا تلقائياً.",
    color: "#8B5CF6",
  },
  {
    icon: Globe2,
    title: "متعدد اللغات والمناطق",
    description: "دعم كامل للعربية، الإنجليزية، ومتعدد العملات والمناطق الزمنية.",
    color: "#EC4899",
  },
  {
    icon: Code2,
    title: "واجهة برمجية مفتوحة",
    description: "API مرن للتكامل مع أنظمتك الحالية أو تطوير حلول مخصصة.",
    color: "#F59E0B",
  },
];

export function WhyRawaes() {
  return (
    <section dir="rtl" className="bg-[#080e24] py-24 sm:py-32">
      {/* فاصل تدرج */}
      <div className="pointer-events-none -mt-1 h-20 bg-gradient-to-b from-[#060c1e] to-[#080e24]" />

      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-white/5 px-4 py-1 text-xs font-bold uppercase tracking-widest text-[#D4A24A]">
            لماذا روائس؟
          </span>
          <h2 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl">
            أكثر من مجرد برنامج — شريك نجاح حقيقي
          </h2>
          <p className="mt-4 text-base leading-8 text-slate-400">
            نبني أنظمة تنمو مع أعمالك وتتكيّف مع متطلباتك المتغيّرة دائماً.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason) => {
            const Icon = reason.icon;
            return (
              <div
                key={reason.title}
                className="group relative overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03] p-7 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06]"
              >
                {/* Icon */}
                <span
                  className="inline-flex size-12 items-center justify-center rounded-xl"
                  style={{ background: `${reason.color}15` }}
                >
                  <Icon
                    className="size-6"
                    style={{ color: reason.color }}
                    strokeWidth={1.75}
                  />
                </span>

                <h3 className="mt-5 text-base font-bold text-white">
                  {reason.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-slate-400">
                  {reason.description}
                </p>

                {/* Bottom Accent */}
                <div
                  aria-hidden
                  className="absolute bottom-0 left-4 right-4 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background: `linear-gradient(to right, transparent, ${reason.color}, transparent)`,
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
