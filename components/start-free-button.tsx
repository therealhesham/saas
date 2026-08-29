"use client";

import { useContactModal } from "@/components/contact-modal-context";
import { ArrowLeft } from "lucide-react";

interface StartFreeButtonProps {
  label?: string;
  className?: string;
  service?: string;
  showIcon?: boolean;
}

export function StartFreeButton({
  label = "ابدأ مجاناً",
  className,
  service = "",
  showIcon = false,
}: StartFreeButtonProps) {
  const { openContactModal } = useContactModal();

  const defaultClass = className ??
    "group relative overflow-hidden rounded-xl bg-[#0D1B3D] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#0D1B3D]/25 transition-all hover:bg-[#1a2e5a] hover:shadow-xl hover:shadow-[#0D1B3D]/30 inline-flex items-center gap-2";

  return (
    <button
      type="button"
      onClick={() => openContactModal(service)}
      className={`${defaultClass} cursor-pointer`}
    >
      {/* Gold shimmer sweep */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-[#D4A24A]/25 to-transparent transition-transform duration-700 group-hover:translate-x-full"
      />
      <span className="relative text-[#D4A24A]">✦</span>
      <span className="relative">{label}</span>
      {showIcon && (
        <ArrowLeft className="relative size-4 transition-transform group-hover:-translate-x-1" />
      )}
    </button>
  );
}
