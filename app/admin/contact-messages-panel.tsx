"use client";

import { useState } from "react";
import {
  Calendar,
  CheckCircle2,
  Clock,
  Inbox,
  Mail,
  MessageSquare,
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
    if (!confirm("هل أنت تأكد من إزالة هذه الرسالة؟")) return;
    setItems((prev) => prev.filter((item) => item.id !== id));
    await deleteContactMessage(id);
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center shadow-xs">
        <Inbox className="size-10 text-slate-400" />
        <h3 className="text-base font-bold text-slate-700">لا توجد رسائل تواصل جديدة</h3>
        <p className="max-w-md text-xs text-slate-500">
          عندما يقوم أي زائر بالضغط على زر "ابدأ مجاناً" وتعبئة نموذج الطلب، ستظهر
          رسائله هنا مباشرة.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {items.map((item) => {
        const cleanPhone = item.phone.replace(/[^0-9+]/g, "");
        const waLink = `https://wa.me/${cleanPhone.startsWith("+") ? cleanPhone.slice(1) : cleanPhone}`;

        return (
          <div
            key={item.id}
            className={`relative overflow-hidden rounded-2xl border bg-white p-5 shadow-xs transition-all ${
              item.status === "جديد"
                ? "border-brand/40 bg-brand/5/10 ring-1 ring-brand/20"
                : "border-slate-200"
            }`}
          >
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-brand/10 text-brand font-bold">
                  <User className="size-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-slate-900">
                      {item.name}
                    </h3>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        item.status === "جديد"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-emerald-100 text-emerald-800"
                      }`}
                    >
                      {item.status === "جديد" ? "رسالة جديدة" : "تم التواصل"}
                    </span>
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Phone className="size-3.5" />
                      {item.phone}
                    </span>
                    {item.email ? (
                      <span className="flex items-center gap-1">
                        <Mail className="size-3.5" />
                        {item.email}
                      </span>
                    ) : null}
                    <span className="flex items-center gap-1 text-slate-400">
                      <Clock className="size-3.5" />
                      {new Date(item.createdAt).toLocaleString("ar-EG")}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={waLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-emerald-700"
                >
                  <FaWhatsapp className="size-4" />
                  مراسلة واتساب
                </a>

                {item.status === "جديد" ? (
                  <button
                    type="button"
                    onClick={() => handleStatusChange(item.id, "تم التواصل")}
                    className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
                  >
                    <CheckCircle2 className="size-3.5 text-emerald-600" />
                    تحديد كـ "تم التواصل"
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleStatusChange(item.id, "جديد")}
                    className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
                  >
                    إعادة كـ "جديد"
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => handleDelete(item.id)}
                  className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-colors"
                  title="حذف الرسالة"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>

            <div className="mt-3 text-xs">
              {item.service ? (
                <div className="mb-2 inline-block rounded-md bg-slate-100 px-2.5 py-1 text-slate-700 font-medium">
                  📌 الخدمة المطلوبة: {item.service}
                </div>
              ) : null}

              {item.message ? (
                <p className="rounded-xl bg-slate-50 p-3 text-sm leading-relaxed text-slate-700 border border-slate-100">
                  {item.message}
                </p>
              ) : (
                <p className="text-slate-400 italic">بدون تفاصيل إضافية</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
