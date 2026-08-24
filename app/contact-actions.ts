"use server";

import { prisma } from "@/lib/prisma";

export type ContactSubmitState = {
  success?: boolean;
  error?: string;
  messageId?: number;
};

export async function submitContactMessage(
  _prevState: ContactSubmitState,
  formData: FormData
): Promise<ContactSubmitState> {
  try {
    const name = formData.get("name")?.toString().trim();
    const phone = formData.get("phone")?.toString().trim();
    const email = formData.get("email")?.toString().trim() || null;
    const service = formData.get("service")?.toString().trim() || null;
    const message = formData.get("message")?.toString().trim() || null;

    if (!name) {
      return { error: "يرجى كتابة الاسم الكامل." };
    }

    if (!phone) {
      return { error: "يرجى أدخال رقم الجوال أو الواتساب للتواصل." };
    }

    const created = await prisma.contactMessage.create({
      data: {
        name,
        phone,
        email,
        service,
        message,
        status: "جديد",
      },
    });

    return {
      success: true,
      messageId: created.id,
    };
  } catch (error) {
    console.error("خطأ أثناء حفظ طلب التواصل:", error);
    return {
      error: "حدث خطأ غير متوقع أثناء إرسال طلبك. يرجى المحاولة لاحقاً.",
    };
  }
}
