"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ExternalLink,
  Code2,
  Search,
  Sparkles,
  X,
  Layers,
  ArrowUpRight,
  Filter,
} from "lucide-react";

export type PublicProject = {
  id: number;
  slug: string;
  title: string;
  summary: string;
  description: string;
  category: string;
  imageUrl: string;
  projectUrl: string | null;
  githubUrl: string | null;
  technologies: string[];
  featured: boolean;
};

export function ProjectsView({ projects }: { projects: PublicProject[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>("الكل");
  const [searchQuery, setSearchQuery] = useState("");

  // استخراج قائمة التصنيفات المتاحة بدون تكرار
  const categories = [
    "الكل",
    ...Array.from(new Set(projects.map((p) => p.category).filter(Boolean))),
  ];

  // تصفية المشاريع حسب التصنيف والبحث
  const filteredProjects = projects.filter((project) => {
    const matchesCategory =
      selectedCategory === "الكل" || project.category === selectedCategory;
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some((tech) =>
        tech.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col gap-10">
      {/* شريط البحث والفلاتر */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200/80 pb-6">
        {/* أزرار التصنيفات */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-400 flex items-center gap-1 ml-2">
            <Filter className="size-3.5" />
            التصنيف:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? "bg-brand text-white shadow-md shadow-brand/20 scale-105"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* حقل البحث */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث في المشاريع والتقنيات..."
            className="w-full rounded-full border border-slate-200 bg-white py-2 pr-10 pl-4 text-xs text-slate-900 placeholder:text-slate-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 shadow-xs"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="size-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* قائمة المشاريع */}
      {filteredProjects.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white py-20 text-center">
          <Layers className="size-12 text-slate-300 mb-3" />
          <h3 className="text-base font-bold text-slate-800">لا توجد مشاريع تطابق بحثك</h3>
          <p className="text-xs text-slate-500 mt-1">جرّب تغيير كلمات البحث أو اختر تصنيفاً آخر</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-slate-200/50"
            >
              {/* صورة الغلاف تحيل لصفحة التفاصيل */}
              <Link
                href={`/projects/${project.slug}`}
                className="relative aspect-16/10 w-full overflow-hidden bg-slate-900 block"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-40" />

                {/* شارة التصنيف والمميّز */}
                <div className="absolute top-3 right-3 left-3 flex items-center justify-between pointer-events-none">
                  <span className="rounded-full bg-white/90 backdrop-blur-md px-3 py-1 text-[11px] font-semibold text-slate-800 shadow-xs">
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/90 backdrop-blur-md px-3 py-1 text-[11px] font-bold text-white shadow-xs">
                      <Sparkles className="size-3" />
                      مميز
                    </span>
                  )}
                </div>
              </Link>

              {/* محتوى البطاقة */}
              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <Link href={`/projects/${project.slug}`} className="block group/link">
                    <h3 className="text-lg font-bold tracking-tight text-slate-900 group-hover/link:text-brand transition-colors">
                      {project.title}
                    </h3>
                  </Link>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600 line-clamp-2">
                    {project.summary}
                  </p>

                  {/* وسوم التقنيات */}
                  {project.technologies.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md bg-slate-100 px-2.5 py-1 text-[10px] font-medium text-slate-600 border border-slate-200/50"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* الأزرار والإجراءات */}
                <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-brand transition-colors hover:text-indigo-700"
                  >
                    عرض التفاصيل
                    <ArrowUpRight className="size-3.5" />
                  </Link>

                  <div className="flex items-center gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                        title="GitHub Repo"
                      >
                        <Code2 className="size-4" />
                      </a>
                    )}
                    {project.projectUrl && (
                      <a
                        href={project.projectUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-slate-800"
                      >
                        المعاينة
                        <ExternalLink className="size-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
