"use client";

import { ArrowLeft, ExternalLink } from "lucide-react";
import { useContactModal } from "@/components/contact-modal-context";

export function RawaesArchiveCtaButtons() {
  const { openContactModal } = useContactModal();

  return (
    <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
      <a
        href="https://test.archive.rawaes.com"
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 rounded-xl bg-[#0D1B3D] px-6 py-3 text-sm font-bold text-white shadow-md shadow-[#0D1B3D]/20 transition-all hover:bg-[#1a2e5a]"
      >
        معاينة مشروع تجريبي
        <ExternalLink className="size-4" />
      </a>
      <button
        type="button"
        onClick={() => openContactModal("نظام الأرشفة الإلكترونية")}
        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 transition-all hover:bg-slate-50"
      >
        اطلب نظام مشابه
        <ArrowLeft className="size-4" />
      </button>
    </div>
  );
}
