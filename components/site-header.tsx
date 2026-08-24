"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { RawaesLogo } from "@/components/rawaes-logo";
import { useContactModal } from "@/components/contact-modal-context";

const navLinks = [
  { label: "المشاريع", href: "/#projects" },
  { label: "معرض الأعمال", href: "/projects" },
  { label: "الحلول", href: "/solutions" },
  { label: "الأسعار", href: "/#pricing" },
  { label: "الشركاء", href: "/#partners" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { openContactModal } = useContactModal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`relative z-20 transition-all duration-300 ${scrolled
        ? "border-b border-[#0D1B3D]/10 bg-white/95 shadow-sm shadow-[#0D1B3D]/5 backdrop-blur-md"
        : "border-b border-transparent bg-white/80 backdrop-blur-sm"
        }`}
    >
      {/* Top gold micro-line */}
      <div className="h-0.5 w-full bg-gradient-to-r from-[#B8862B] via-[#D4A24A] to-[#E5B869]" />

      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-3.5">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 transition-opacity hover:opacity-85">
          <RawaesLogo variant="horizontal" className="h-10" />
        </a>

        {/* Desktop nav links */}
        <ul className="hidden items-center gap-7 text-sm font-semibold text-[#0D1B3D]/65 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="relative py-1 transition-colors hover:text-[#0D1B3D] after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:scale-x-0 after:rounded-full after:bg-[#D4A24A] after:transition-transform after:duration-200 hover:after:scale-x-100"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden items-center md:flex">
          <button
            type="button"
            onClick={() => openContactModal()}
            className="group relative overflow-hidden rounded-xl bg-[#0D1B3D] px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-[#0D1B3D]/25 transition-all hover:bg-[#1a2e5a] hover:shadow-lg hover:shadow-[#0D1B3D]/30"
          >
            {/* Gold shimmer */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-[#D4A24A]/20 to-transparent transition-transform duration-700 group-hover:translate-x-full"
            />
            <span className="relative flex items-center gap-1.5">
              ابدأ مجاناً
            </span>
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
          className="rounded-lg p-2 text-[#0D1B3D]/70 transition-colors hover:bg-[#0D1B3D]/8 hover:text-[#0D1B3D] md:hidden"
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="border-t border-[#D4A24A]/20 bg-white/98 px-5 pb-5 pt-3 backdrop-blur-md md:hidden">
          <ul className="flex flex-col gap-0.5 text-sm text-[#0D1B3D]/70">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 rounded-xl px-3 py-2.5 font-medium transition-colors hover:bg-[#0D1B3D]/5 hover:text-[#0D1B3D]"
                >
                  <span className="size-1.5 rounded-full bg-[#D4A24A]" />
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-4 border-t border-slate-100 pt-4">
            <button
              type="button"
              onClick={() => { setOpen(false); openContactModal(); }}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0D1B3D] px-4 py-3 text-sm font-bold text-white shadow-md shadow-[#0D1B3D]/20"
            >
              ابدأ مجاناً
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
