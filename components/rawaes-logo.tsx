import React from "react";

interface RawaesLogoProps {
  variant?: "full" | "horizontal" | "icon" | "navbar";
  className?: string;
  iconOnly?: boolean;
}

export function RawaesLogo({
  variant = "horizontal",
  className = "h-9",
  iconOnly = false,
}: RawaesLogoProps) {
  if (iconOnly || variant === "icon") {
    return (
      <svg
        viewBox="0 0 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-label="شعار روائس"
      >
        <defs>
          <linearGradient id="rawaes-gold" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#B8862B" />
            <stop offset="50%" stopColor="#D4A24A" />
            <stop offset="100%" stopColor="#E5B869" />
          </linearGradient>
        </defs>

        {/* 4 Navy Pixels (Bottom Left) */}
        <rect x="24" y="100" width="10" height="10" rx="1.5" fill="#0D1B3D" />
        <rect x="24" y="115" width="10" height="10" rx="1.5" fill="#0D1B3D" />
        <rect x="39" y="115" width="10" height="10" rx="1.5" fill="#0D1B3D" />
        <rect x="54" y="115" width="10" height="10" rx="1.5" fill="#0D1B3D" />

        {/* Inner Gold Swoosh */}
        <path
          d="M 50 128 C 45 110, 52 90, 72 75 C 84 66, 96 62, 108 62 C 104 74, 95 82, 84 87 C 70 94, 62 108, 62 128 Z"
          fill="url(#rawaes-gold)"
        />

        {/* Main Navy R Wing, Loop & Right Leg */}
        <path
          d="M 28 44 C 28 32, 40 24, 68 24 L 105 24 C 132 24, 146 38, 146 58 C 146 76, 134 88, 114 93 L 148 138 C 151 142, 148 146, 142 146 L 122 146 C 117 146, 113 143, 109 137 L 82 98 L 68 98 C 62 98, 56 102, 56 108 L 56 128 C 56 138, 44 142, 38 134 C 30 123, 28 100, 28 88 L 28 44 Z
             M 68 44 L 68 76 L 98 76 C 112 76, 120 69, 120 60 C 120 50, 112 44, 98 44 Z"
          fill="#0D1B3D"
          fillRule="evenodd"
        />
      </svg>
    );
  }

  // Full / Horizontal Navbar version with strict dir="ltr" to prevent RTL reversal
  return (
    <div
      className={`inline-flex items-center gap-3.5 ${className}`}
      dir="ltr"
    >
      {/* Logo Icon */}
      <svg
        viewBox="0 0 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto shrink-0"
        style={{ aspectRatio: "1/1" }}
        aria-label="شعار روائس"
      >
        <defs>
          <linearGradient id="rawaes-gold-hdr" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#B8862B" />
            <stop offset="50%" stopColor="#D4A24A" />
            <stop offset="100%" stopColor="#E5B869" />
          </linearGradient>
        </defs>

        {/* 4 Navy Pixels */}
        <rect x="24" y="100" width="10" height="10" rx="1.5" fill="#0D1B3D" />
        <rect x="24" y="115" width="10" height="10" rx="1.5" fill="#0D1B3D" />
        <rect x="39" y="115" width="10" height="10" rx="1.5" fill="#0D1B3D" />
        <rect x="54" y="115" width="10" height="10" rx="1.5" fill="#0D1B3D" />

        {/* Inner Gold Swoosh */}
        <path
          d="M 50 128 C 45 110, 52 90, 72 75 C 84 66, 96 62, 108 62 C 104 74, 95 82, 84 87 C 70 94, 62 108, 62 128 Z"
          fill="url(#rawaes-gold-hdr)"
        />

        {/* Navy R Wing, Loop & Right Leg */}
        <path
          d="M 28 44 C 28 32, 40 24, 68 24 L 105 24 C 132 24, 146 38, 146 58 C 146 76, 134 88, 114 93 L 148 138 C 151 142, 148 146, 142 146 L 122 146 C 117 146, 113 143, 109 137 L 82 98 L 68 98 C 62 98, 56 102, 56 108 L 56 128 C 56 138, 44 142, 38 134 C 30 123, 28 100, 28 88 L 28 44 Z
             M 68 44 L 68 76 L 98 76 C 112 76, 120 69, 120 60 C 120 50, 112 44, 98 44 Z"
          fill="#0D1B3D"
          fillRule="evenodd"
        />
      </svg>

      {/* Vertical Separator line if variant === "full" */}
      {variant === "full" && (
        <div className="h-9 w-px bg-slate-300/80 self-center hidden sm:block" />
      )}

      {/* Brand Text Branding */}
      <div className="flex flex-col justify-center select-none" dir="ltr">
        {/* RAWAES header text strictly LTR */}
        <div className="flex items-center text-[#0D1B3D] font-extrabold tracking-wider text-xl leading-none" dir="ltr">
          <span>R</span>
          <span>A</span>
          <span>W</span>
          {/* Second A with Gold Triangle Apex */}
          <span className="relative inline-flex items-center justify-center px-0.5">
            A
            <span
              className="absolute top-[-1px] size-0 border-x-[3.5px] border-x-transparent border-b-[5px] border-b-[#D4A24A]"
              style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
            />
          </span>
          <span>E</span>
          <span>S</span>
        </div>

        {/* Arabic Subtitle */}
        <div className="mt-1 flex items-center gap-1 text-[11px] font-bold text-[#0D1B3D] tracking-tight" dir="rtl">
          <span className="h-[1px] w-2.5 bg-[#D4A24A]" />
          <span>روائس للحلول البرمجية</span>
          <span className="h-[1px] w-2.5 bg-[#D4A24A]" />
        </div>

        {/* English Subtitle for full variant */}
        {variant === "full" && (
          <div className="mt-0.5 text-[7.5px] font-bold text-[#D4A24A] tracking-[0.22em] uppercase" dir="ltr">
            Software Solutions
          </div>
        )}
      </div>
    </div>
  );
}
