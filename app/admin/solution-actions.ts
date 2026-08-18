"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/session";

export type SolutionFormState = { error?: string; ok?: boolean };

const SLUG_PATTERN = /^[a-z0-9-]+$/;
const HEX_COLOR_PATTERN = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

type SolutionFeature = {
  icon: string;
  text: string;
};

function parseForm(formData: FormData) {
  const slug = String(formData.get("slug") ?? "").trim().toLowerCase();
  const tag = String(formData.get("tag") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const subtitle = String(formData.get("subtitle") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const accentColor = String(formData.get("accentColor") ?? "#3B5BDB").trim();
  const ctaText = String(formData.get("ctaText") ?? "استكشف الحل").trim();
  const ctaHref = String(formData.get("ctaHref") ?? "#").trim();
  const published = formData.get("published") === "on";
  const position = Number(formData.get("position") ?? 0);

  // Features جايّة كـ JSON string من الـ Client component
  const rawFeatures = String(formData.get("features") ?? "[]");
  let features: SolutionFeature[] = [];

  try {
    const parsed = JSON.parse(rawFeatures);
    if (Array.isArray(parsed)) {
      features = parsed
        .map((item) => ({
          icon: String(item.icon ?? "CheckCircle2"),
          text: String(item.text ?? "").trim(),
        }))
        .filter((item) => item.text.length > 0);
    }
  } catch {
    return { error: "تنسيق الميزات غير صحيح" } as const;
  }

  if (!slug || !SLUG_PATTERN.test(slug)) {
    return {
      error: "الـ slug لازم يكون حروف إنجليزي صغيرة وأرقام وشرطات بس",
    } as const;
  }

  if (!tag || !title || !subtitle || !description) {
    return { error: "الوسم، العنوان، العنوان الفرعي والوصف كلهم مطلوبين" } as const;
  }

  if (accentColor && !HEX_COLOR_PATTERN.test(accentColor)) {
    return { error: "اللون لازم يكون بصيغة HEX صحيحة مثل #3B5BDB" } as const;
  }

  if (!Number.isFinite(position)) {
    return { error: "الترتيب لازم يكون رقم" } as const;
  }

  return {
    data: {
      slug,
      tag,
      title,
      subtitle,
      description,
      accentColor: accentColor || "#3B5BDB",
      features,
      ctaText: ctaText || "استكشف الحل",
      ctaHref: ctaHref || "#",
      published,
      position: Math.trunc(position),
    },
  } as const;
}

/** إعادة توليد صفحة الحلول ولوحة الأدمن بعد أي تعديل */
function revalidateAll() {
  revalidatePath("/solutions");
  revalidatePath("/admin");
}

export async function saveSolution(
  _prevState: SolutionFormState,
  formData: FormData,
): Promise<SolutionFormState> {
  await requireAdmin();

  const parsed = parseForm(formData);

  if ("error" in parsed) {
    return { error: parsed.error };
  }

  const rawId = formData.get("id");
  const id = rawId ? Number(rawId) : null;

  try {
    if (id) {
      await prisma.solution.update({ where: { id }, data: parsed.data });
    } else {
      await prisma.solution.create({ data: parsed.data });
    }
  } catch (error) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === "P2002"
    ) {
      return { error: "في حل تاني مستخدم نفس الـ slug" };
    }

    throw error;
  }

  revalidateAll();

  return { ok: true };
}

export async function deleteSolution(formData: FormData) {
  await requireAdmin();

  const id = Number(formData.get("id"));

  if (!Number.isInteger(id)) {
    return;
  }

  await prisma.solution.delete({ where: { id } });
  revalidateAll();
}

export async function toggleSolution(formData: FormData) {
  await requireAdmin();

  const id = Number(formData.get("id"));

  if (!Number.isInteger(id)) {
    return;
  }

  const solution = await prisma.solution.findUnique({ where: { id } });

  if (!solution) {
    return;
  }

  await prisma.solution.update({
    where: { id },
    data: { published: !solution.published },
  });

  revalidateAll();
}

export async function moveSolution(formData: FormData) {
  await requireAdmin();

  const id = Number(formData.get("id"));
  const direction = String(formData.get("direction"));

  if (!Number.isInteger(id) || !["up", "down"].includes(direction)) {
    return;
  }

  const current = await prisma.solution.findUnique({ where: { id } });

  if (!current) {
    return;
  }

  const neighbour = await prisma.solution.findFirst({
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
    prisma.solution.update({
      where: { id: current.id },
      data: { position: neighbour.position },
    }),
    prisma.solution.update({
      where: { id: neighbour.id },
      data: { position: current.position },
    }),
  ]);

  revalidateAll();
}
