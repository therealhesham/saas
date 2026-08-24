"use client";

import { useState } from "react";
import {
  CheckCircle2,
  Clock,
  Inbox,
  Mail,
  Phone,
  Trash2,
  User,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import {
  deleteContactMessage,
  updateContactMessageStatus,
} from "@/app/admin/contact-message-actions";

export interface ContactMessageItem {
  id: number;
  name: string;
  phone: string;
  email: string | null;
  service: string | null;
  message: string | null;
  status: string;
  createdAt: string;
}

export function ContactMessagesPanel({
  messages,
}: {
  messages: ContactMessageItem[];
}) {
  const [items, setItems] = useState(messages);

  const handleStatusChange = async (id: number, newStatus: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
    await updateContactMessageStatus(id, newStatus);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("هل أنت متأكد من إزالة هذه الرسالة؟")) return;
    setItems((prev) => prev.filter((item) => item.id !== id));
    await deleteContactMessage(id);
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border-2 border-dashed border-[#0D1B3D]/15 bg-[#0D1B3D]/3 py-20 text-center">
        <div className="flex size-16 items-center justify-center rounded-2xl bg-[#0D1B3D]/8">
          <Inbox className="size-8 text-[#0D1B3D]/40" />
        </div>
        <div>
          <h3 className="text-base font-bold text-[#0D1B3D]">لا توجد رسائل تواصل بعد</h3>
          <p className="mt-1 max-w-sm text-xs text-[#0D1B3D]/50 leading-relaxed">
            عندما يضغط الزوار على زر "ابدأ مجاناً" ويعبئون نموذج الطلب، ستظهر رسائلهم هنا.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {items.map((item) => {
        const cleanPhone = item.phone.replace(/[^0-9+]/g, "");
        const waLink = `https://wa.me/${cleanPhone.startsWith("+") ? cleanPhone.slice(1) : cleanPhone}`;
        const isNew = item.status === "جديد";

        return (
          <div
            key={item.id}
            className={`relative overflow-hidden rounded-2xl border bg-white shadow-xs transition-all ${
              isNew
                ? "border-[#D4A24A]/50 ring-1 ring-[#D4A24A]/20"
                : "border-slate-200"
            }`}
          >
            {/* Gold left accent for new messages */}
            {isNew && (
              <div className="absolute inset-y-0 right-0 w-1 bg-gradient-to-b from-[#B8862B] via-[#D4A24A] to-[#E5B869]" />
            )}

            <div className="p-5">
              {/* Header row */}
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  {/* Avatar */}
                  <div
                    className={`flex size-11 shrink-0 items-center justify-center rounded-xl font-bold text-base ${
                      isNew
                        ? "bg-[#D4A24A]/15 text-[#B8862B]"
                        : "bg-[#0D1B3D]/8 text-[#0D1B3D]/50"
                    }`}
                  >
                    <User className="size-5" />
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base font-bold text-[#0D1B3D]">{item.name}</h3>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                          isNew
                            ? "bg-[#D4A24A]/15 text-[#B8862B]"
                            : "bg-emerald-100 text-emerald-700"
                        }`}
                      >
                        {isNew ? "● رسالة جديدة" : "✓ تم التواصل"}
                      </span>
                    </div>

                    <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#0D1B3D]/50">
                      <span className="flex items-center gap-1">
                        <Phone className="size-3" />
                        {item.phone}
                      </span>
                      {item.email && (
                        <span className="flex items-center gap-1">
                          <Mail className="size-3" />
                          {item.email}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Clock className="size-3" />
                        {new Date(item.createdAt).toLocaleString("ar-EG")}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-sm shadow-emerald-600/20 transition-colors hover:bg-emerald-700"
                  >
                    <FaWhatsapp className="size-3.5" />
                    واتساب
                  </a>

                  {isNew ? (
                    <button
                      type="button"
                      onClick={() => handleStatusChange(item.id, "تم التواصل")}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-[#D4A24A]/40 bg-[#D4A24A]/8 px-3 py-1.5 text-xs font-semibold text-[#B8862B] transition-colors hover:bg-[#D4A24A]/15"
                    >
                      <CheckCircle2 className="size-3.5" />
                      تحديد كـ "تم التواصل"
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleStatusChange(item.id, "جديد")}
                      className="inline-flex items-center gap-1 rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                    >
                      إعادة كـ "جديد"
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    className="rounded-xl p-1.5 text-slate-300 transition-colors hover:bg-rose-50 hover:text-rose-500"
                    title="حذف الرسالة"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>

              {/* Service + message */}
              {(item.service || item.message) && (
                <div className="mt-4 border-t border-slate-100 pt-4 space-y-2">
                  {item.service && (
                    <div className="inline-flex items-center gap-1.5 rounded-lg border border-[#D4A24A]/30 bg-[#D4A24A]/8 px-3 py-1 text-xs font-semibold text-[#B8862B]">
                      📌 {item.service}
                    </div>
                  )}
                  {item.message && (
                    <p className="rounded-xl border border-slate-100 bg-slate-50 p-3 text-sm leading-relaxed text-[#0D1B3D]/70">
                      {item.message}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
