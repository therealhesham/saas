import type { ReactNode } from "react";

type LaptopMockupProps = {
  /**
   * محتوى الشاشة — صورة سكرين شوت للمنتج أو واجهة معروضة كـ HTML.
   * لعرض سكرين شوت حقيقي مرّر <Image fill className="object-cover" ... />
   */
  children: ReactNode;
};

export function LaptopMockup({ children }: LaptopMockupProps) {
  return (
    <div className="mx-auto w-full max-w-4xl">
      {/* غطاء اللاب توب والشاشة */}
      <div className="rounded-t-2xl border border-white/10 bg-gradient-to-b from-[#252d40] to-[#161d2b] p-2.5 shadow-2xl shadow-black/50 sm:p-3">
        {/* كاميرا */}
        <div className="mx-auto mb-2 flex items-center justify-center">
          <span className="size-1.5 rounded-full bg-white/20 ring-2 ring-black/40" />
        </div>

        <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-ink ring-1 ring-white/10">
          {children}
          {/* انعكاس ضوئي خفيف على الشاشة */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-white/[0.07]"
          />
        </div>
      </div>

      {/* قاعدة اللاب توب — هوامش سالبة متساوية عشان تفضل متمركزة */}
      <div className="relative -mx-[4%]">
        <div className="h-3.5 rounded-b-xl bg-gradient-to-b from-[#2b3346] to-[#12161f] shadow-lg shadow-black/40 sm:h-4" />
        {/* فتحة فتح الغطاء */}
        <div
          aria-hidden
          className="absolute left-1/2 top-0 h-1.5 w-24 -translate-x-1/2 rounded-b-lg bg-black/30"
        />
      </div>

      {/* ظل تحت الجهاز */}
      <div
        aria-hidden
        className="mx-auto h-8 w-[80%] rounded-[100%] bg-black/40 blur-2xl"
      />
    </div>
  );
}
