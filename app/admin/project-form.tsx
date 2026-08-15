"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { Plus, Save, Upload, X, Image as ImageIcon } from "lucide-react";
import {
  saveProject,
  type ProjectFormState,
} from "@/app/admin/project-actions";

export type EditableProject = {
  id: number;
  slug: string;
  title: string;
  summary: string;
  description: string;
  category: string;
  imageUrl: string;
  projectUrl?: string | null;
  githubUrl?: string | null;
  technologies: string[];
  position: number;
  published: boolean;
  featured: boolean;
};

const fieldClass =
  "w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30";

export function ProjectForm({
  project,
  onDone,
}: {
  project?: EditableProject;
  onDone?: () => void;
}) {
  const [state, formAction, pending] = useActionState<
    ProjectFormState,
    FormData
  >(saveProject, {});
  const formRef = useRef<HTMLFormElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    project?.imageUrl || null
  );

  useEffect(() => {
    if (state.ok) {
      if (project) {
        onDone?.();
      } else {
        formRef.current?.reset();
        setImagePreview(null);
      }
    }
  }, [state.ok, project, onDone]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    }
  };

  return (
    <form ref={formRef} action={formAction} className="flex flex-col gap-4">
      {project ? <input type="hidden" name="id" value={project.id} /> : null}
      <input
        type="hidden"
        name="existingImageUrl"
        value={project?.imageUrl || ""}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-slate-600">عنوان المشروع</span>
          <input
            name="title"
            required
            defaultValue={project?.title}
            className={fieldClass}
            placeholder="منصة إدارة المهام الذكية"
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-slate-600">
            الـ slug (بالإنجليزي، للرابط)
          </span>
          <input
            name="slug"
            required
            dir="ltr"
            defaultValue={project?.slug}
            className={`${fieldClass} text-left`}
            placeholder="task-manager"
          />
        </label>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-slate-600">التصنيف</span>
          <input
            name="category"
            required
            defaultValue={project?.category ?? "تطبيق ويب"}
            className={fieldClass}
            placeholder="تطبيق ويب، SaaS، موبايل..."
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-slate-600">
            التقنيات المستعملة (مفصولة بفاصلة)
          </span>
          <input
            name="technologies"
            dir="ltr"
            defaultValue={project?.technologies.join(", ")}
            className={`${fieldClass} text-left`}
            placeholder="Next.js, TypeScript, TailwindCSS, Prisma"
          />
        </label>
      </div>

      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-medium text-slate-600">ملخص قصير</span>
        <input
          name="summary"
          required
          defaultValue={project?.summary}
          className={fieldClass}
          placeholder="منصة سحابية متكاملة لفرق العمل والشركات الناشئة"
        />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-medium text-slate-600">الوصف التفصيلي</span>
        <textarea
          name="description"
          required
          rows={3}
          defaultValue={project?.description}
          className={fieldClass}
          placeholder="شرح مميزات المشروع والتحديات التي تم حلها..."
        />
      </label>

      {/* صورة المشروع ورفعها لـ DigitalOcean Spaces */}
      <div className="flex flex-col gap-2 rounded-xl border border-slate-200 bg-slate-50 p-4">
        <span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
          <Upload className="size-4 text-brand" />
          صورة المشروع (تُرفع إلى DigitalOcean Spaces)
        </span>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          {imagePreview ? (
            <div className="relative size-24 shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imagePreview}
                alt="معاينة الصورة"
                className="h-full w-full object-cover"
              />
            </div>
          ) : (
            <div className="flex size-24 shrink-0 flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-white text-slate-400">
              <ImageIcon className="size-8" />
              <span className="text-[10px] mt-1">لا توجد صورة</span>
            </div>
          )}

          <div className="flex flex-1 flex-col gap-1 w-full">
            <input
              type="file"
              name="imageFile"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-xs text-slate-500 file:mr-0 file:ml-3 file:rounded-lg file:border-0 file:bg-brand/10 file:px-3 file:py-2 file:text-xs file:font-semibold file:text-brand hover:file:bg-brand/20 cursor-pointer"
            />
            <span className="text-[11px] text-slate-500">
              تصلح صيغ PNG, JPG, WebP. الحجم الأقصى الموصى به: 5MB.
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-slate-600">رابط المعاينة المباشرة (اختياري)</span>
          <input
            name="projectUrl"
            type="url"
            dir="ltr"
            defaultValue={project?.projectUrl || ""}
            className={`${fieldClass} text-left`}
            placeholder="https://example.com"
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-slate-600">رابط GitHub (اختياري)</span>
          <input
            name="githubUrl"
            type="url"
            dir="ltr"
            defaultValue={project?.githubUrl || ""}
            className={`${fieldClass} text-left`}
            placeholder="https://github.com/org/repo"
          />
        </label>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 items-center">
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-slate-600">ترتيب العرض</span>
          <input
            name="position"
            type="number"
            defaultValue={project?.position ?? 0}
            className={fieldClass}
          />
        </label>

        <label className="flex items-center gap-2 pt-4">
          <input
            type="checkbox"
            name="published"
            defaultChecked={project ? project.published : true}
            className="size-4 rounded border-slate-300 accent-brand"
          />
          <span className="text-sm font-medium text-slate-700">نشر المشروع (ظاهر للمستخدمين)</span>
        </label>

        <label className="flex items-center gap-2 pt-4">
          <input
            type="checkbox"
            name="featured"
            defaultChecked={project ? project.featured : false}
            className="size-4 rounded border-slate-300 accent-brand"
          />
          <span className="text-sm font-medium text-slate-700">مشروع مميّز (Featured)</span>
        </label>
      </div>

      {state.error ? (
        <p
          role="alert"
          className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700"
        >
          {state.error}
        </p>
      ) : null}

      {state.ok && !project ? (
        <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
          تم إضافة المشروع بنجاح ورفع الصورة!
        </p>
      ) : null}

      <div className="flex items-center gap-2 pt-2">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800 disabled:opacity-60"
        >
          {project ? <Save className="size-4" /> : <Plus className="size-4" />}
          {pending ? "جاري الرفع والحفظ..." : project ? "حفظ التعديلات" : "إضافة المشروع"}
        </button>

        {onDone ? (
          <button
            type="button"
            onClick={onDone}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
          >
            <X className="size-4" />
            إلغاء
          </button>
        ) : null}
      </div>
    </form>
  );
}

export function AddProjectPanel() {
  const [open, setOpen] = useState(false);

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-600 shadow-sm"
      >
        <Plus className="size-4" />
        إضافة مشروع جديد
      </button>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm mb-6">
      <h2 className="mb-4 text-base font-bold text-slate-900">مشروع جديد</h2>
      <ProjectForm onDone={() => setOpen(false)} />
    </div>
  );
}
