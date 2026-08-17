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
    <section dir="rtl" className="bg-slate-50 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold text-brand">
            لماذا روائس؟
          </span>
          <h2 className="mt-3 text-3xl font-bold leading-snug text-slate-900 sm:text-4xl">
            أكثر من مجرد برنامج — شريك نجاح حقيقي
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-600">
            نبني أنظمة تنمو مع أعمالك وتتكيّف مع متطلباتك المتغيّرة دائماً.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason) => {
            const Icon = reason.icon;
            return (
              <div
                key={reason.title}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 transition-all duration-300 hover:border-slate-300 hover:shadow-md"
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

                <h3 className="mt-5 text-base font-bold text-slate-900">
                  {reason.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">
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
