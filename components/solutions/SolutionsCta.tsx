import { ArrowLeft, MessageCircle } from "lucide-react";

export function SolutionsCta() {
  return (
    <section dir="rtl" className="relative overflow-hidden bg-[#060c1e] py-24 sm:py-32">
      {/* Glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/4 size-96 rounded-full bg-indigo-600/10 blur-[100px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 right-1/4 size-96 rounded-full bg-[#D4A24A]/10 blur-[100px]"
      />

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        {/* Gold divider */}
        <div className="mx-auto mb-10 flex items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#D4A24A]/40" />
          <div className="size-2 rotate-45 bg-[#D4A24A]" />
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#D4A24A]/40" />
        </div>

        <h2 className="text-3xl font-extrabold leading-snug text-white sm:text-4xl lg:text-5xl">
          جاهز تبدأ مع{" "}
          <span
            style={{
              background:
                "linear-gradient(135deg, #D4A24A 0%, #E8BE70 60%, #B8862B 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            روائس؟
          </span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-slate-400">
          سواء كنت تبحث عن نظام استقدام، تأجير سيارات، أو منصة سياحية — فريقنا جاهز
          لمناقشة احتياجاتك وتقديم حل مُصمَّم خصيصاً لك.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="mailto:info@rawaes.com"
            className="group inline-flex items-center gap-2 rounded-xl bg-[#D4A24A] px-8 py-4 text-sm font-bold text-[#3D2800] shadow-lg shadow-amber-500/20 transition-all hover:bg-[#E8BE70] hover:shadow-amber-400/30"
          >
            <MessageCircle className="size-4" />
            تواصل معنا الآن
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
          </a>
          <a
            href="/projects"
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10"
          >
            شاهد أعمالنا
          </a>
        </div>

        {/* Contact Info */}
        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-10 text-sm text-slate-500">
          <span>📧 info@rawaes.com</span>
          <span className="hidden sm:block text-white/10">|</span>
          <span>📞 +966 5X XXX XXXX</span>
          <span className="hidden sm:block text-white/10">|</span>
          <span>🌐 rawaes.com</span>
        </div>

        {/* Gold divider bottom */}
        <div className="mx-auto mt-12 flex items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#D4A24A]/40" />
          <div className="size-2 rotate-45 bg-[#D4A24A]" />
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#D4A24A]/40" />
        </div>
      </div>
    </section>
  );
}
