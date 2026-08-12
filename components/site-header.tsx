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
    <header className="relative z-20 border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-5">
        <a href="#" className="flex items-center gap-2 text-slate-900">
          <Hexagon
            className="size-7 fill-brand/10 text-brand"
            strokeWidth={1.5}
          />
          <span className="text-lg font-bold tracking-tight">روائس</span>
        </a>

        <ul className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
          {navLinks.map((link) => (
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

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="#login"
            className="rounded-lg px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900"
          >
            تسجيل الدخول
          </a>
          <a
            href="#signup"
            className="rounded-lg bg-brand px-4.5 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700"
          >
            ابدأ مجاناً
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
          className="rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 md:hidden"
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </nav>

      {open ? (
        <div className="border-t border-slate-200 bg-white/95 px-6 py-4 backdrop-blur-md md:hidden">
          <ul className="flex flex-col gap-1 text-sm text-slate-600">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2.5 transition-colors hover:bg-slate-100 hover:text-slate-900"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-col gap-2">
            <a
              href="#login"
              className="rounded-lg border border-slate-200 px-4 py-2.5 text-center text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
            >
              تسجيل الدخول
            </a>
            <a
              href="#signup"
              className="rounded-lg bg-brand px-4 py-2.5 text-center text-sm font-semibold text-white shadow-sm"
            >
              ابدأ مجاناً
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
