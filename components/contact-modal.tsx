"use client";

import { useActionState, useEffect, useState } from "react";
import { CheckCircle2, Send, Sparkles, X } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { submitContactMessage, type ContactSubmitState } from "@/app/contact-actions";
import { RawaesLogo } from "@/components/rawaes-logo";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

const servicesOptions = [
  "منظومة روائس السحابية (تجربة مجانية)",
  "منصة إدارة مكتب الاستقدام",
  "نظام إدارة تأجير السيارات",
  "منصة تنظيم الرحلات والسياحة",
  "مشروع خاص / برمجة مخصصة",
  "استفسارات عامة",
];

const ADMIN_WHATSAPP = "966500000000";

export function ContactModal({
  isOpen,
  onClose,
  initialService = "",
}: ContactModalProps) {
  const [service, setService] = useState(initialService);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [state, formAction, pending] = useActionState<ContactSubmitState, FormData>(
    submitContactMessage,
    {}
  );

  useEffect(() => {
    if (initialService) setService(initialService);
  }, [initialService]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  const buildWhatsappUrl = () => {
    const text = `مرحباً إدارة روائس 👋%0A%0Aأود التواصل وطلب التجربة المجانية.%0A%0A👤 *الاسم:* ${encodeURIComponent(name || "غير محدد")}%0A📱 *الجوال:* ${encodeURIComponent(phone || "غير محدد")}%0A📧 *البريد:* ${encodeURIComponent(email || "غير محدد")}%0A📌 *الخدمة:* ${encodeURIComponent(service || "تجربة مجانية")}%0A💬 *ملاحظات:* ${encodeURIComponent(message || "بدون ملاحظات")}`;
    return `https://wa.me/${ADMIN_WHATSAPP}?text=${text}`;
  };

  const inputBase =
    "mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-3 text-sm text-[#0D1B3D] shadow-xs transition-all placeholder:text-slate-400 focus:border-[#D4A24A] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#D4A24A]/25";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0D1B3D]/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-[#0D1B3D]/10 animate-in fade-in zoom-in-95 duration-200">

        {/* Top gold bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#B8862B] via-[#D4A24A] to-[#E5B869]" />

        {/* Navy header */}
        <div className="relative bg-[#0D1B3D] px-6 pt-5 pb-6">
          {/* Decorative gold dots */}
          <div className="pointer-events-none absolute right-6 top-4 flex gap-1 opacity-30">
            {[20, 14, 8].map((s) => (
              <span key={s} style={{ width: s, height: s }} className="rounded-full bg-[#D4A24A]" />
            ))}
          </div>

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 left-4 rounded-full p-1.5 text-white/50 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="إغلاق"
          >
            <X className="size-5" />
          </button>

          {/* Logo + title */}
          <div className="flex flex-col items-center gap-3 text-center">
            <RawaesLogo variant="icon" className="h-12 opacity-90" />
            <div>
              <h2 className="text-xl font-extrabold tracking-wide text-white sm:text-2xl">
                ابدأ مجاناً
              </h2>
              <p className="mt-1 text-[13px] text-white/60 leading-relaxed">
                أرسل طلبك وسيتواصل معك فريقنا في أقرب وقت
              </p>
            </div>

            {/* Gold badge */}
            <div className="inline-flex items-center gap-1.5 rounded-full border border-[#D4A24A]/40 bg-[#D4A24A]/10 px-3 py-1 text-[11px] font-bold text-[#E5B869]">
              14 يوماً تجربة مجانية · بدون بطاقة ائتمانية
            </div>
          </div>
        </div>

        {/* Form body */}
        <div className="px-6 py-6">
          {state.success ? (
            /* ── Success State ── */
            <div className="py-6 text-center animate-in zoom-in-95 duration-300">
              <div className="mx-auto mb-5 flex size-20 items-center justify-center rounded-full bg-[#D4A24A]/10 ring-8 ring-[#D4A24A]/10">
                <CheckCircle2 className="size-10 text-[#D4A24A]" />
              </div>
              <h3 className="text-xl font-bold text-[#0D1B3D]">تم إرسال طلبك!</h3>
              <p className="mx-auto mt-2 max-w-xs text-sm text-slate-500 leading-relaxed">
                استلمنا طلبك بنجاح. سيتواصل معك فريق روائس في أقرب وقت ممكن.
              </p>

              <div className="mt-7 flex flex-col gap-2.5">
                <a
                  href={buildWhatsappUrl()}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0D1B3D] py-3.5 text-sm font-bold text-[#D4A24A] shadow-lg shadow-[#0D1B3D]/20 transition-all hover:bg-[#1a2e5a]"
                >
                  <FaWhatsapp className="size-5 text-emerald-400" />
                  متابعة عبر الواتساب
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full rounded-xl border border-slate-200 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  إغلاق
                </button>
              </div>
            </div>
          ) : (
            /* ── Form State ── */
            <>
              {state.error && (
                <div className="mb-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                  {state.error}
                </div>
              )}

              <form action={formAction} className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-xs font-bold text-[#0D1B3D]">
                    الاسم الكامل <span className="text-[#D4A24A]">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="مثال: أحمد المحمد"
                    className={inputBase}
                  />
                </div>

                {/* Phone + Email */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold text-[#0D1B3D]">
                      رقم الجوال / الواتساب <span className="text-[#D4A24A]">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="05XXXXXXXX"
                      className={inputBase}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#0D1B3D]">
                      البريد الإلكتروني
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@company.com"
                      className={inputBase}
                    />
                  </div>
                </div>

                {/* Service */}
                <div>
                  <label className="block text-xs font-bold text-[#0D1B3D]">
                    الخدمة المطلوبة
                  </label>
                  <select
                    name="service"
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className={inputBase}
                  >
                    <option value="">اختر الخدمة...</option>
                    {servicesOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-bold text-[#0D1B3D]">
                    تفاصيل الرسالة
                  </label>
                  <textarea
                    name="message"
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="اكتب أي استفسار أو تفاصيل إضافية هنا..."
                    className={`${inputBase} resize-none`}
                  />
                </div>

                {/* Actions */}
                <div className="space-y-2.5 pt-1">
                  <button
                    type="submit"
                    disabled={pending}
                    className="group inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-[#0D1B3D] py-3.5 text-sm font-bold text-white shadow-lg shadow-[#0D1B3D]/25 transition-all hover:bg-[#1a2e5a] disabled:opacity-60"
                  >
                    <Send className="size-4 text-[#D4A24A] transition-transform group-hover:-translate-x-1" />
                    {pending ? "جاري الإرسال..." : "إرسال الطلب للإدارة"}
                  </button>

                  <button
                    type="button"
                    onClick={() => window.open(buildWhatsappUrl(), "_blank")}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[#D4A24A]/40 bg-[#D4A24A]/5 py-3 text-sm font-semibold text-[#0D1B3D] transition-all hover:border-[#D4A24A] hover:bg-[#D4A24A]/10"
                  >
                    <FaWhatsapp className="size-4 text-emerald-600" />
                    مراسلة مباشرة عبر الواتساب
                  </button>
                </div>
              </form>
            </>
          )}
        </div>

        {/* Bottom gold accent */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#D4A24A]/30 to-transparent" />
      </div>
    </div>
  );
}
