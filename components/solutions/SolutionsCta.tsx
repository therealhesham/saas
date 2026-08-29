import { ArrowLeft, MessageCircle } from "lucide-react";

export function SolutionsCta() {
  return (
    <section dir="rtl" className="relative overflow-hidden bg-slate-50 py-24 sm:py-32">
      {/* Glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/4 size-96 rounded-full bg-brand/8 blur-[100px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 right-1/4 size-96 rounded-full bg-brand/5 blur-[100px]"
      />

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        {/* Gold divider */}
        <div className="mx-auto mb-10 flex items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-slate-300" />
          <div className="size-2 rotate-45 bg-brand" />
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-slate-300" />
        </div>

        <h2 className="text-3xl font-bold leading-snug text-slate-900 sm:text-4xl lg:text-5xl">
          جاهز تبدأ مع{" "}
          <span className="text-brand">روائس؟</span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-slate-600">
          سواء كنت تبحث عن نظام استقدام، تأجير سيارات، أو منصة سياحية — فريقنا جاهز
          لمناقشة احتياجاتك وتقديم حل مُصمَّم خصيصاً لك.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="mailto:info@rawaes.com"
            className="group inline-flex items-center gap-2 rounded-xl bg-brand px-8 py-4 text-sm font-bold text-white shadow-lg shadow-brand/20 transition-all hover:bg-indigo-700"
          >
            <MessageCircle className="size-4" />
            تواصل معنا الآن
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
          </a>
        </div>

        {/* Contact Info */}
        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-10 text-sm text-slate-500">
          <span>📧 info@rawaes.com</span>
          <span className="hidden sm:block text-slate-300">|</span>
          <span>📞 +966 5X XXX XXXX</span>
          <span className="hidden sm:block text-slate-300">|</span>
          <span>🌐 rawaes.com</span>
        </div>

        {/* Gold divider bottom */}
        <div className="mx-auto mt-12 flex items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-slate-300" />
          <div className="size-2 rotate-45 bg-brand" />
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-slate-300" />
        </div>
      </div>
    </section>
  );
}
