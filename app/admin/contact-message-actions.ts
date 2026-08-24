"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function updateContactMessageStatus(id: number, status: string) {
  try {
    await prisma.contactMessage.update({
      where: { id },
      data: { status },
    });
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("خطأ أثناء تحديث حالة الرسالة:", error);
    return { error: "فشل تحديث حالة الرسالة" };
  }
}

export async function deleteContactMessage(id: number) {
  try {
    await prisma.contactMessage.delete({
      where: { id },
    });
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("خطأ أثناء حذف الرسالة:", error);
    return { error: "فشل حذف الرسالة" };
  }
}
