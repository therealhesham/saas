"use client";

import { useState } from "react";
import { Hexagon, Menu, X } from "lucide-react";

const navLinks = [
  { label: "المنتجات", href: "#products" },
  { label: "الحلول", href: "#solutions" },
  { label: "الأسعار", href: "#pricing" },
  { label: "الشركاء", href: "#partners" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative z-20 border-b border-white/5">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-5">
        <a href="#" className="flex items-center gap-2 text-white">
          <Hexagon
            className="size-7 fill-brand/20 text-brand-soft"
            strokeWidth={1.5}
          />
          <span className="text-lg font-bold tracking-tight">روائس</span>
        </a>

        <ul className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="transition-colors hover:text-white"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="#login"
            className="rounded-lg px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:text-white"
          >
            تسجيل الدخول
          </a>
          <a
            href="#signup"
            className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-slate-200"
          >
            ابدأ مجاناً
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
          className="rounded-lg p-2 text-slate-300 transition-colors hover:bg-white/5 hover:text-white md:hidden"
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </nav>

      {open ? (
        <div className="border-t border-white/5 px-6 py-4 md:hidden">
          <ul className="flex flex-col gap-1 text-sm text-slate-300">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2.5 transition-colors hover:bg-white/5 hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-col gap-2">
            <a
              href="#login"
              className="rounded-lg border border-white/10 px-4 py-2.5 text-center text-sm font-medium text-white"
            >
              تسجيل الدخول
            </a>
            <a
              href="#signup"
              className="rounded-lg bg-white px-4 py-2.5 text-center text-sm font-semibold text-ink"
            >
              ابدأ مجاناً
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
