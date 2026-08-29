import { Check, Mail } from "lucide-react";
import { FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { RawaesLogo } from "@/components/rawaes-logo";
import { StartFreeButton } from "@/components/start-free-button";

const perks = [
  "14 يوم تجربة لكل المنتجات",
  "بدون بطاقة ائتمانية",
  "إلغاء في أي وقت",
];

const footerLinks = [
  { label: "عن روائس", href: "#about" },
  { label: "الأسعار", href: "#pricing" },
  { label: "الدعم", href: "#support" },
  { label: "الخصوصية", href: "#privacy" },
];

const socials = [
  { label: "إكس", href: "#x", icon: FaXTwitter },
  { label: "لينكدإن", href: "#linkedin", icon: FaLinkedinIn },
  { label: "البريد", href: "#email", icon: Mail },
];

export function CtaSection() {
  return (
    <section className="relative overflow-hidden border-t border-[#0D1B3D]/10 bg-[#0D1B3D]">
      {/* Background pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #D4A24A 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />
      {/* Gold glow blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/4 size-96 rounded-full bg-[#D4A24A]/12 blur-[110px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 right-1/4 size-80 rounded-full bg-[#D4A24A]/8 blur-[100px]"
      />

      <div className="relative mx-auto max-w-6xl px-6 py-24 sm:py-32">
        {/* Gold divider */}
        <div className="mx-auto mb-12 flex max-w-xs items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#D4A24A]/40" />
          <div className="size-2.5 rotate-45 bg-[#D4A24A]" />
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#D4A24A]/40" />
        </div>

        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold leading-snug text-white sm:text-4xl lg:text-5xl">
            جرّب المنظومة كاملة{" "}
            <span className="text-[#D4A24A]">قبل ما تقرر</span>
          </h2>
          <p className="mt-5 text-base leading-8 text-white/60">
            أنشئ حسابك في أقل من دقيقة، واستكشف المنتجات كلها خلال فترة
            التجربة المجانية — بدون التزام.
          </p>

          <div className="mx-auto mt-10 flex justify-center">
            <StartFreeButton
              label="ابدأ تجربتك المجانية الآن"
              showIcon={true}
              className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-xl bg-[#D4A24A] px-8 py-4 text-base font-bold text-[#0D1B3D] shadow-xl shadow-[#D4A24A]/25 transition-all hover:bg-[#E5B869] hover:shadow-[#D4A24A]/40"
            />
          </div>

          {/* Perks */}
          <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-semibold text-white/55">
            {perks.map((perk) => (
              <li key={perk} className="flex items-center gap-1.5">
                <Check className="size-3.5 text-[#D4A24A]" />
                {perk}
              </li>
            ))}
          </ul>
        </div>

        {/* Gold divider */}
        <div className="mx-auto mt-16 mb-12 flex items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#D4A24A]/20" />
          <div className="size-2 rotate-45 bg-[#D4A24A]/50" />
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#D4A24A]/20" />
        </div>

        {/* Footer */}
        <footer className="flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-10 sm:flex-row">
          <a href="/" className="transition-opacity hover:opacity-80">
            <RawaesLogo variant="full" className="h-8" light={true} />
          </a>

          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/50">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="transition-colors hover:text-[#D4A24A]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            {socials.map((social) => (
              <a
                key={social.href}
                href={social.href}
                aria-label={social.label}
                className="inline-flex size-9 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-white/50 shadow-xs transition-colors hover:border-[#D4A24A]/40 hover:bg-[#D4A24A]/10 hover:text-[#D4A24A]"
              >
                <social.icon className="size-4" />
              </a>
            ))}
          </div>
        </footer>

        <p className="mt-8 text-center text-xs text-white/30">
          © {new Date().getFullYear()} روائس. جميع الحقوق محفوظة.
        </p>
      </div>
    </section>
  );
}
