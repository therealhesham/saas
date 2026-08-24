"use client";

import { useActionState, useEffect, useState } from "react";
import { CheckCircle2, MessageSquare, Send, Sparkles, X } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { submitContactMessage, type ContactSubmitState } from "@/app/contact-actions";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

const servicesOptions = [
  "منظومة روائس للحلول السحابية (تجربة مجانية)",
  "منصة إدارة مكتب الاستقدام",
  "نظام إدارة تأجير السيارات",
  "منصة تنظيم الرحلات والسياحة",
  "مشروع خاص / برمجة مخصصة",
  "استفسارات عامة",
];

const ADMIN_WHATSAPP = "966500000000"; // يمكن للعميل تغييره

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
    if (initialService) {
      setService(initialService);
    }
  }, [initialService]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const buildWhatsappUrl = () => {
    const text = `مرحباً إدارة روائس 👋%0A%0Aأود طلب التجربة المجانية / التواصل معكم.%0A%0A👤 *الاسم:* ${encodeURIComponent(
      name || "غير محدد"
    )}%0A📱 *الفيسبوك/الواتساب:* ${encodeURIComponent(
      phone || "غير محدد"
    )}%0A📧 *البريد:* ${encodeURIComponent(
      email || "غير محدد"
    )}%0A📌 *الخدمة المطلوبة:* ${encodeURIComponent(
      service || "تجربة مجانية"
    )}%0A💬 *ملاحظات:* ${encodeURIComponent(message || "بدون ملاحظات")}`;

    return `https://wa.me/${ADMIN_WHATSAPP}?text=${text}`;
  };

  const handleWhatsappClick = () => {
    window.open(buildWhatsappUrl(), "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-900/60 p-4 backdrop-blur-sm transition-all duration-300 animate-in fade-in">
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-slate-900/10">
        {/* Header decoration bar */}
        <div className="h-2 w-full bg-gradient-to-r from-brand via-indigo-500 to-purple-600" />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 left-5 rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
          aria-label="إغلاق"
        >
          <X className="size-5" />
        </button>

        <div className="p-6 sm:p-8">
          {state.success ? (
            <div className="py-8 text-center animate-in zoom-in-95">
              <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-8 ring-emerald-50/50">
                <CheckCircle2 className="size-10" />
              </div>
              <h3 className="mt-5 text-2xl font-bold text-slate-900">
                تم إرسال طلبك بنجاح!
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                شكراً لتواصلك معنا. تم استلام طلبك لدى إدارة المنصة وسيتم التواصل
                معك في أسرع وقت.
              </p>

              <div className="mt-8 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={handleWhatsappClick}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-emerald-600/20 transition-all hover:bg-emerald-700"
                >
                  <FaWhatsapp className="size-5" />
                  متابعة الطلب عبر الواتساب فوراً
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full rounded-xl border border-slate-200 px-6 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  إغلاق النافذة
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2 text-xs font-semibold text-brand">
                <Sparkles className="size-4" />
                <span>تجربة مجانية وبدون أي التزام</span>
              </div>

              <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
                ابدأ مجاناً — تواصل مع الإدارة
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                أملاً النموذج أدناه لإرسال رسالة مباشرة لإدارة روائس وتفعيل حسابك
                أو طلب استشارة.
              </p>

              {state.error ? (
                <div className="mt-4 rounded-xl bg-rose-50 p-3.5 text-sm text-rose-700 border border-rose-200">
                  {state.error}
                </div>
              ) : null}

              <form action={formAction} className="mt-6 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    الاسم الكامل <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="مثال: أحمد المحمد"
                    className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 shadow-xs transition-colors placeholder:text-slate-400 focus:border-brand focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand/20"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700">
                      رقم الجوال / الواتساب <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="05XXXXXXXX"
                      className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 shadow-xs transition-colors placeholder:text-slate-400 focus:border-brand focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand/20"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700">
                      البريد الإلكتروني (اختياري)
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 shadow-xs transition-colors placeholder:text-slate-400 focus:border-brand focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    الخدمة المطلوبة
                  </label>
                  <select
                    name="service"
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 shadow-xs transition-colors focus:border-brand focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand/20"
                  >
                    <option value="">اختر الخدمة أو المنتج...</option>
                    {servicesOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    تفاصيل الرسالة أو ملاحظاتك
                  </label>
                  <textarea
                    name="message"
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="اكتب أي استفسار أو متطلبات خاصة هنا..."
                    className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 shadow-xs transition-colors placeholder:text-slate-400 focus:border-brand focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand/20 resize-none"
                  />
                </div>

                <div className="mt-6 flex flex-col gap-2.5 pt-2">
                  <button
                    type="submit"
                    disabled={pending}
                    className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand py-3.5 text-sm font-semibold text-white shadow-md shadow-brand/20 transition-all hover:bg-indigo-700 disabled:opacity-60"
                  >
                    <Send className="size-4 transition-transform group-hover:-translate-x-1" />
                    {pending ? "جاري إرسال الرسالة..." : "إرسال طلب للأدمن الآن"}
                  </button>

                  <button
                    type="button"
                    onClick={handleWhatsappClick}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200"
                  >
                    <FaWhatsapp className="size-4 text-emerald-600" />
                    أو المراسلة المباشرة عبر الواتساب
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
