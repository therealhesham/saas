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
  className = "rounded-lg bg-brand px-4.5 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700",
  service = "",
  showIcon = false,
}: StartFreeButtonProps) {
  const { openContactModal } = useContactModal();

  return (
    <button
      type="button"
      onClick={() => openContactModal(service)}
      className={className}
    >
      {label}
      {showIcon ? (
        <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
      ) : null}
    </button>
  );
}
