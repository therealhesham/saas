import { ArrowLeft, Check, Mail } from "lucide-react";
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
    <section className="relative overflow-hidden border-t border-slate-200/80 bg-slate-50">
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-56 left-1/2 size-[44rem] -translate-x-1/2 rounded-full bg-brand/10 blur-[130px]"
      />

      <div className="relative mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold leading-snug text-slate-900 sm:text-4xl">
            جرّب المنظومة كاملة قبل ما تقرر
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-600">
            أنشئ حسابك في أقل من دقيقة، واستكشف الستة منتجات كلها خلال فترة
            التجربة المجانية — بدون التزام.
          </p>

          <div className="mx-auto mt-10 flex max-w-lg justify-center">
            <StartFreeButton
              label="ابدأ تجربتك المجانية الآن"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-8 py-4 text-base font-semibold text-white shadow-lg shadow-brand/25 transition-all hover:bg-indigo-700 hover:shadow-brand/35"
              showIcon={true}
            />
          </div>


          <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-slate-600">
            {perks.map((perk) => (
              <li key={perk} className="flex items-center gap-1.5">
                <Check className="size-4 text-brand" />
                {perk}
              </li>
            ))}
          </ul>
        </div>

        <footer className="mt-20 flex flex-col items-center justify-between gap-6 border-t border-slate-200 pt-8 sm:flex-row">
          <a href="/" className="transition-opacity hover:opacity-90">
            <RawaesLogo variant="full" className="h-8" />
          </a>

          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-600">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="transition-colors hover:text-slate-900"
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
                className="inline-flex size-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 shadow-xs transition-colors hover:bg-slate-100 hover:text-slate-900"
              >
                <social.icon className="size-4" />
              </a>
            ))}
          </div>
        </footer>

        <p className="mt-8 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} روائس. جميع الحقوق محفوظة.
        </p>
      </div>
    </section>
  );
}
