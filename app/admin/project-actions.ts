"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/session";
import { uploadToSpaces } from "@/lib/s3";

export type ProjectFormState = { error?: string; ok?: boolean };

const SLUG_PATTERN = /^[a-z0-9-]+$/;

function revalidateAll() {
  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath("/admin");
}

export async function saveProject(
  _prevState: ProjectFormState,
  formData: FormData
): Promise<ProjectFormState> {
  await requireAdmin();

  const rawId = formData.get("id");
  const id = rawId ? Number(rawId) : null;

  const slug = String(formData.get("slug") ?? "").trim().toLowerCase();
  const title = String(formData.get("title") ?? "").trim();
  const summary = String(formData.get("summary") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const category = String(formData.get("category") ?? "عام").trim();
  const projectUrl = String(formData.get("projectUrl") ?? "").trim();
  const githubUrl = String(formData.get("githubUrl") ?? "").trim();
  const published = formData.get("published") === "on";
  const featured = formData.get("featured") === "on";
  const position = Number(formData.get("position") ?? 0);
  const existingImageUrl = String(formData.get("existingImageUrl") ?? "").trim();

  const technologies = String(formData.get("technologies") ?? "")
    .split(",")
    .map((tech) => tech.trim())
    .filter(Boolean);

  if (!slug || !SLUG_PATTERN.test(slug)) {
    return { error: "الـ slug يجب أن يحتوى على أحرف إنجليزية صغيرة وأرقام وشرطات فقط" };
  }

  if (!title || !summary || !description) {
    return { error: "العنوان والملخص والوصف تفاصيل مطلوبة" };
  }

  let finalImageUrl = existingImageUrl;

  const imageFile = formData.get("imageFile") as File | null;

  if (imageFile && imageFile.size > 0) {
    try {
      finalImageUrl = await uploadToSpaces(
        imageFile,
        imageFile.name,
        imageFile.type || "image/jpeg"
      );
    } catch (uploadError) {
      console.error("[Project Action Upload Error]:", uploadError);
      return { error: "حدث خطأ أثناء رفع الصورة إلى DigitalOcean Spaces" };
    }
  }

  if (!finalImageUrl) {
    return { error: "يرجى اختيار صورة للمشروع" };
  }

  try {
    const data = {
      slug,
      title,
      summary,
      description,
      category,
      imageUrl: finalImageUrl,
      projectUrl: projectUrl || null,
      githubUrl: githubUrl || null,
      technologies,
      published,
      featured,
      position: Math.trunc(position),
    };

    if (id) {
      await prisma.project.update({ where: { id }, data });
    } else {
      await prisma.project.create({ data });
    }
  } catch (error) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === "P2002"
    ) {
      return { error: "هناك مشروع آخر يملك نفس الرابط الفريد (slug)" };
    }
    throw error;
  }

  revalidateAll();
  return { ok: true };
}

export async function deleteProject(formData: FormData) {
  await requireAdmin();

  const id = Number(formData.get("id"));

  if (!Number.isInteger(id)) {
    return;
  }

  await prisma.project.delete({ where: { id } });
  revalidateAll();
}

export async function toggleProject(formData: FormData) {
  await requireAdmin();

  const id = Number(formData.get("id"));

  if (!Number.isInteger(id)) {
    return;
  }

  const project = await prisma.project.findUnique({ where: { id } });

  if (!project) {
    return;
  }

  await prisma.project.update({
    where: { id },
    data: { published: !project.published },
  });

  revalidateAll();
}

export async function moveProject(formData: FormData) {
  await requireAdmin();

  const id = Number(formData.get("id"));
  const direction = String(formData.get("direction"));

  if (!Number.isInteger(id) || !["up", "down"].includes(direction)) {
    return;
  }

  const current = await prisma.project.findUnique({ where: { id } });

  if (!current) {
    return;
  }

  const neighbour = await prisma.project.findFirst({
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
    prisma.project.update({
      where: { id: current.id },
      data: { position: neighbour.position },
    }),
    prisma.project.update({
      where: { id: neighbour.id },
      data: { position: current.position },
    }),
  ]);

  revalidateAll();
}
