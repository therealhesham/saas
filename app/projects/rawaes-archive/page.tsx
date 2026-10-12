import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowLeft,
  ScanText,
  QrCode,
  ShieldCheck,
  Users,
  BarChart3,
  Cloud,
  ExternalLink,
  CheckCircle2,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { CtaSection } from "@/components/cta-section";

export const metadata: Metadata = {
  title: "روائس للأرشفة الإلكترونية — معرض أعمال روائس",
  description:
    "نظام أرشفة إلكترونية ذكي يحوّل مستنداتك الورقية والرقمية لأرشيف منظم قابل للبحث، باستخراج نص تلقائي (OCR) وترميز QR/Barcode للأرشيف الورقي.",
  openGraph: {
    title: "روائس للأرشفة الإلكترونية",
    description:
      "نظام أرشفة إلكترونية ذكي يحوّل مستنداتك الورقية والرقمية لأرشيف منظم قابل للبحث.",
    images: ["/screenshots/rawaes-archive/dashboard.jpg"],
  },
};

const features = [
  {
    icon: ScanText,
    title: "استخراج نص تلقائي (OCR)",
    desc: "تحويل أي مستند ممسوح ضوئيًا إلى نص قابل للبحث والفهرسة تلقائيًا.",
  },
  {
    icon: QrCode,
    title: "أرشفة ورقية بـ QR/Barcode",
    desc: "ترميز الملفات والصناديق الفعلية وربطها بالنظام الإلكتروني لتتبّع فوري.",
  },
  {
    icon: BarChart3,
    title: "لوحة بيانات حيّة",
    desc: "إحصائيات مباشرة للمستندات حسب القطاع، النوع، وتاريخ الانتهاء.",
  },
  {
    icon: Users,
    title: "أدوار وصلاحيات دقيقة",
    desc: "تحكم كامل في صلاحيات كل مستخدم حسب القسم والمهمة.",
  },
  {
    icon: ShieldCheck,
    title: "سجل تدقيق أمني",
    desc: "توثيق كل حركة دخول وتعديل داخل النظام بالتاريخ والوقت.",
  },
  {
    icon: Cloud,
    title: "تخزين سحابي وتكامل Notion",
    desc: "تخزين موثوق للملفات مع إمكانية مزامنة البيانات مع Notion.",
  },
];

const gallery = [
  { src: "/screenshots/rawaes-archive/dashboard.jpg", alt: "لوحة البيانات" },
  { src: "/screenshots/rawaes-archive/documents.jpg", alt: "إدارة المستندات" },
  { src: "/screenshots/rawaes-archive/document-detail.jpg", alt: "عرض المستند مع OCR" },
  { src: "/screenshots/rawaes-archive/inventory.jpg", alt: "ترميز الأرشيف الورقي" },
  { src: "/screenshots/rawaes-archive/sectors.jpg", alt: "القطاعات" },
  { src: "/screenshots/rawaes-archive/document-types.jpg", alt: "أنواع المستندات" },
  { src: "/screenshots/rawaes-archive/roles.jpg", alt: "الأدوار والصلاحيات" },
  { src: "/screenshots/rawaes-archive/users.jpg", alt: "إدارة المستخدمين" },
  { src: "/screenshots/rawaes-archive/reports.jpg", alt: "التقارير والإحصائيات" },
  { src: "/screenshots/rawaes-archive/audit-log.jpg", alt: "سجل التدقيق" },
  { src: "/screenshots/rawaes-archive/storage.jpg", alt: "إدارة التخزين السحابي" },
];

export default function RawaesArchiveProjectPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-200/80 bg-white py-20 lg:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />

        <div className="relative mx-auto max-w-6xl px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/5 px-4 py-1.5 text-xs font-bold text-[#0D1B3D] mb-6 shadow-xs">
            أرشفة إلكترونية · SaaS
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            روائس — نظام الأرشفة الإلكترونية
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg text-slate-600 leading-relaxed">
            نظام أرشفة إلكترونية ذكي يحوّل مستنداتك الورقية والرقمية لأرشيف
            منظم قابل للبحث، باستخراج نص تلقائي (OCR) وترميز QR/Barcode
            للأرشيف الورقي.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://archive.rawaes.com/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#0D1B3D] px-6 py-3 text-sm font-bold text-white shadow-md shadow-[#0D1B3D]/20 transition-all hover:bg-[#1a2e5a]"
            >
              معاينة المشروع الحي
              <ExternalLink className="size-4" />
            </a>
            <a
              href="/#pricing"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 transition-all hover:bg-slate-50"
            >
              اطلب نظام مشابه
              <ArrowLeft className="size-4" />
            </a>
          </div>
        </div>

        {/* صورة غلاف */}
        <div className="relative mx-auto mt-14 max-w-5xl px-6">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-900 shadow-2xl shadow-slate-300/40">
            <Image
              src="/screenshots/rawaes-archive/dashboard.jpg"
              alt="لوحة بيانات نظام روائس للأرشفة الإلكترونية"
              width={1600}
              height={936}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
            مميزات النظام
          </h2>
          <p className="mt-3 text-sm text-slate-600">
            كل اللي محتاجه عشان تدير أرشيف إلكتروني كامل لمؤسستك
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="group rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/60"
            >
              <div className="inline-flex size-11 items-center justify-center rounded-xl bg-[#0D1B3D]/5 text-[#0D1B3D] transition-colors group-hover:bg-brand/10 group-hover:text-brand">
                <f.icon className="size-5" />
              </div>
              <h3 className="mt-4 text-sm font-bold text-slate-900">
                {f.title}
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section className="border-t border-slate-200/80 bg-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              لقطات من النظام
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              جولة سريعة داخل لوحة تحكم نظام روائس للأرشفة
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.map((shot) => (
              <div
                key={shot.src}
                className="group overflow-hidden rounded-xl border border-slate-200/80 bg-slate-900 shadow-sm"
              >
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  width={1200}
                  height={700}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="border-t border-slate-100 bg-white px-4 py-3">
                  <p className="text-xs font-semibold text-slate-700">
                    {shot.alt}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech / Highlights strip */}
      <section className="mx-auto max-w-4xl px-6 py-16">
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {[
            "بحث فوري بالاسم أو رقم الوثيقة أو المحتوى",
            "فلترة وتصدير بيانات بصيغة CSV",
            "تنبيهات لانتهاء صلاحية المستندات",
            "ربط المستندات بالقطاعات والأنواع المخصصة",
            "صندوق استقبال للمسح الضوئي المباشر",
            "واجهة عربية RTL بالكامل",
          ].map((item) => (
            <li
              key={item}
              className="flex items-center gap-2.5 rounded-xl bg-white border border-slate-200/70 px-4 py-3 text-xs font-medium text-slate-700 shadow-xs"
            >
              <CheckCircle2 className="size-4 shrink-0 text-brand" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      <CtaSection />
    </div>
  );
}
