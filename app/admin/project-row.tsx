"use client";

import { useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  Eye,
  EyeOff,
  Globe,
  Pencil,
  Trash2,
  Star,
  Code2,
} from "lucide-react";
import {
  deleteProject,
  moveProject,
  toggleProject,
} from "@/app/admin/project-actions";
import {
  ProjectForm,
  type EditableProject,
} from "@/app/admin/project-form";

export function ProjectRow({
  project,
  isFirst,
  isLast,
}: {
  project: EditableProject;
  isFirst: boolean;
  isLast: boolean;
}) {
  const [editing, setEditing] = useState(false);

  if (editing) {
    return (
      <div className="rounded-2xl border border-brand/30 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-bold text-slate-900">تعديل: {project.title}</h3>
          <button
            type="button"
            onClick={() => setEditing(false)}
            className="text-xs text-slate-500 hover:text-slate-900"
          >
            إغلاق
          </button>
        </div>
        <ProjectForm project={project} onDone={() => setEditing(false)} />
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col gap-4 rounded-xl border p-4 transition-all sm:flex-row sm:items-center sm:justify-between ${
        project.published
          ? "border-slate-200 bg-white shadow-xs"
          : "border-slate-200/60 bg-slate-50 opacity-75"
      }`}
    >
      <div className="flex items-center gap-4">
        {/* صورة مصلّغة */}
        <div className="relative size-16 shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
          {project.imageUrl ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={project.imageUrl}
              alt={project.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs text-slate-400">
              لا صورة
            </div>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-slate-900">{project.title}</h3>
            <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">
              {project.category}
            </span>
            {project.featured && (
              <span className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-700 border border-amber-200">
                <Star className="size-3 fill-amber-500 text-amber-500" />
                مميز
              </span>
            )}
            {!project.published && (
              <span className="rounded-md bg-slate-200 px-2 py-0.5 text-[11px] font-medium text-slate-700">
                مخفي
              </span>
            )}
          </div>

          <p className="text-xs text-slate-500 line-clamp-1">{project.summary}</p>

          <div className="flex items-center gap-3 text-xs text-slate-400 mt-0.5">
            <span className="font-mono dir-ltr">/{project.slug}</span>
            {project.technologies.length > 0 && (
              <span>• {project.technologies.join("، ")}</span>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1.5 self-end sm:self-center">
        {project.projectUrl && (
          <a
            href={project.projectUrl}
            target="_blank"
            rel="noreferrer"
            title="رابط المشروع"
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
          >
            <Globe className="size-4" />
          </a>
        )}

        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            title="رابط GitHub"
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
          >
            <Code2 className="size-4" />
          </a>
        )}

        {/* إعادة الترتيب */}
        <form action={moveProject}>
          <input type="hidden" name="id" value={project.id} />
          <input type="hidden" name="direction" value="up" />
          <button
            type="submit"
            disabled={isFirst}
            title="تحريك لأعلى"
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 disabled:opacity-30"
          >
            <ArrowUp className="size-4" />
          </button>
        </form>

        <form action={moveProject}>
          <input type="hidden" name="id" value={project.id} />
          <input type="hidden" name="direction" value="down" />
          <button
            type="submit"
            disabled={isLast}
            title="تحريك لأسفل"
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 disabled:opacity-30"
          >
            <ArrowDown className="size-4" />
          </button>
        </form>

        {/* إظهار / إخفاء */}
        <form action={toggleProject}>
          <input type="hidden" name="id" value={project.id} />
          <button
            type="submit"
            title={project.published ? "إخفاء المشروع" : "نشر المشروع"}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
          >
            {project.published ? (
              <EyeOff className="size-4 text-slate-500" />
            ) : (
              <Eye className="size-4 text-brand" />
            )}
          </button>
        </form>

        {/* زر التعديل */}
        <button
          type="button"
          onClick={() => setEditing(true)}
          title="تعديل المشروع"
          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
        >
          <Pencil className="size-4" />
        </button>

        {/* زر الحذف */}
        <form
          action={deleteProject}
          onSubmit={(e) => {
            if (!confirm(`هل أنت تأكد من حذف مشروع "${project.title}"؟`)) {
              e.preventDefault();
            }
          }}
        >
          <input type="hidden" name="id" value={project.id} />
          <button
            type="submit"
            title="حذف المشروع"
            className="rounded-lg p-2 text-rose-500 hover:bg-rose-50 hover:text-rose-700"
          >
            <Trash2 className="size-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
