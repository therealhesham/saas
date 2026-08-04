"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/session";
import {
  PRODUCT_ACCENT_NAMES,
  PRODUCT_ICON_NAMES,
} from "@/lib/product-icons";

export type ProductFormState = { error?: string; ok?: boolean };

const SLUG_PATTERN = /^[a-z0-9-]+$/;

function parseForm(formData: FormData) {
  const slug = String(formData.get("slug") ?? "").trim().toLowerCase();
  const name = String(formData.get("name") ?? "").trim();
  const tagline = String(formData.get("tagline") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const icon = String(formData.get("icon") ?? "");
  const accent = String(formData.get("accent") ?? "");
  const published = formData.get("published") === "on";
  const position = Number(formData.get("position") ?? 0);

  const highlights = String(formData.get("highlights") ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  if (!slug || !SLUG_PATTERN.test(slug)) {
    return {
      error: "الـ slug لازم يكون حروف إنجليزي صغيرة وأرقام وشرطات بس",
    } as const;
  }

  if (!name || !tagline || !description) {
    return { error: "الاسم والوصف المختصر والوصف الكامل كلهم مطلوبين" } as const;
  }

  // الأيقونة واللون جايين من المتصفح، فبنتحقق إنهم من القائمة المسموح بيها
  if (!PRODUCT_ICON_NAMES.includes(icon as never)) {
    return { error: "الأيقونة المختارة غير معروفة" } as const;
  }

  if (!PRODUCT_ACCENT_NAMES.includes(accent as never)) {
    return { error: "اللون المختار غير معروف" } as const;
  }

  if (!Number.isFinite(position)) {
    return { error: "الترتيب لازم يكون رقم" } as const;
  }

  return {
    data: {
      slug,
      name,
      tagline,
      description,
      icon,
      accent,
      highlights,
      published,
      position: Math.trunc(position),
    },
  } as const;
}

/** إعادة توليد الصفحة الرئيسية ولوحة الأدمن بعد أي تعديل */
function revalidateAll() {
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function saveProduct(
  _prevState: ProductFormState,
  formData: FormData,
): Promise<ProductFormState> {
  await requireAdmin();

  const parsed = parseForm(formData);

  if ("error" in parsed) {
    return { error: parsed.error };
  }

  const rawId = formData.get("id");
  const id = rawId ? Number(rawId) : null;

  try {
    if (id) {
      await prisma.product.update({ where: { id }, data: parsed.data });
    } else {
      await prisma.product.create({ data: parsed.data });
    }
  } catch (error) {
    // P2002 = خرق قيد التفرّد، وهنا مفيش غير الـ slug
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === "P2002"
    ) {
      return { error: "في منتج تاني مستخدم نفس الـ slug" };
    }

    throw error;
  }

  revalidateAll();

  return { ok: true };
}

export async function deleteProduct(formData: FormData) {
  await requireAdmin();

  const id = Number(formData.get("id"));

  if (!Number.isInteger(id)) {
    return;
  }

  await prisma.product.delete({ where: { id } });
  revalidateAll();
}

export async function toggleProduct(formData: FormData) {
  await requireAdmin();

  const id = Number(formData.get("id"));

  if (!Number.isInteger(id)) {
    return;
  }

  const product = await prisma.product.findUnique({ where: { id } });

  if (!product) {
    return;
  }

  await prisma.product.update({
    where: { id },
    data: { published: !product.published },
  });

  revalidateAll();
}

export async function moveProduct(formData: FormData) {
  await requireAdmin();

  const id = Number(formData.get("id"));
  const direction = String(formData.get("direction"));

  if (!Number.isInteger(id) || !["up", "down"].includes(direction)) {
    return;
  }

  const current = await prisma.product.findUnique({ where: { id } });

  if (!current) {
    return;
  }

  // بندوّر على أقرب جار في اتجاه الحركة ونبدّل معاه الترتيب
  const neighbour = await prisma.product.findFirst({
    where:
      direction === "up"
        ? { position: { lt: current.position } }
        : { position: { gt: current.position } },
    orderBy: { position: direction === "up" ? "desc" : "asc" },
  });

  if (!neighbour) {
    return;
  }

  await prisma.$transaction([
    prisma.product.update({
      where: { id: current.id },
      data: { position: neighbour.position },
    }),
    prisma.product.update({
      where: { id: neighbour.id },
      data: { position: current.position },
    }),
  ]);

  revalidateAll();
}
