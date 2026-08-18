import Link from "next/link";
import { ExternalLink, LogOut } from "lucide-react";
import { RawaesLogo } from "@/components/rawaes-logo";
import { logout } from "@/app/admin/auth-actions";
import { AdminTabs } from "@/app/admin/admin-tabs";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const [productsRaw, projectsRaw, solutionsRaw] = await Promise.all([
    prisma.product.findMany({
      orderBy: [{ position: "asc" }, { id: "asc" }],
    }),
    prisma.project.findMany({
      orderBy: [{ position: "asc" }, { id: "asc" }],
    }),
    prisma.solution.findMany({
      orderBy: [{ position: "asc" }, { id: "asc" }],
    }),
  ]);

  const editableProducts = productsRaw.map((product) => ({
    id: product.id,
    slug: product.slug,
    name: product.name,
    tagline: product.tagline,
    description: product.description,
    icon: product.icon,
    accent: product.accent,
    highlights: Array.isArray(product.highlights)
      ? product.highlights.map(String)
      : [],
    position: product.position,
    published: product.published,
  }));

  const editableProjects = projectsRaw.map((project) => ({
    id: project.id,
    slug: project.slug,
    title: project.title,
    summary: project.summary,
    description: project.description,
    category: project.category,
    imageUrl: project.imageUrl,
    projectUrl: project.projectUrl,
    githubUrl: project.githubUrl,
    technologies: Array.isArray(project.technologies)
      ? project.technologies.map(String)
      : [],
    position: project.position,
    published: project.published,
    featured: project.featured,
  }));

  const editableSolutions = solutionsRaw.map((solution) => ({
    id: solution.id,
    slug: solution.slug,
    tag: solution.tag,
    title: solution.title,
    subtitle: solution.subtitle,
    description: solution.description,
    accentColor: solution.accentColor,
    features: Array.isArray(solution.features)
      ? (solution.features as Array<{ icon: string; text: string }>)
      : [],
    ctaText: solution.ctaText,
    ctaHref: solution.ctaHref,
    position: solution.position,
    published: solution.published,
  }));

  return (
    <main className="min-h-screen flex-1 bg-slate-50">
      <header className="border-b border-slate-200 bg-white sticky top-0 z-10">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-4">
          <div className="flex items-center gap-3">
            <RawaesLogo variant="horizontal" className="h-8" />
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">لوحة التحكم</span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/solutions"
              target="_blank"
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-50"
            >
              <ExternalLink className="size-4" />
              صفحة الحلول
            </Link>

            <Link
              href="/projects"
              target="_blank"
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-50"
            >
              <ExternalLink className="size-4" />
              صفحة مشاريعنا
            </Link>

            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-50"
            >
              <ExternalLink className="size-4" />
              الموقع الرئيسي
            </Link>

            <form action={logout}>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-50"
              >
                <LogOut className="size-4" />
                خروج
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 py-8">
        <AdminTabs
          products={editableProducts}
          projects={editableProjects}
          solutions={editableSolutions}
        />
      </div>
    </main>
  );
}
