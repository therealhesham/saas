"use client";

import { useState } from "react";
import { Layers, FolderGit2, PackageOpen, FolderKanban, Sparkles, Lightbulb, MessageSquare } from "lucide-react";
import { AddProductPanel, type EditableProduct } from "@/app/admin/product-form";
import { ProductRow } from "@/app/admin/product-row";
import { AddProjectPanel, type EditableProject } from "@/app/admin/project-form";
import { ProjectRow } from "@/app/admin/project-row";
import { AddSolutionPanel, type EditableSolution } from "@/app/admin/solution-form";
import { SolutionRow } from "@/app/admin/solution-row";
import { ContactMessagesPanel, type ContactMessageItem } from "@/app/admin/contact-messages-panel";

export function AdminTabs({
  products,
  projects,
  solutions,
  messages = [],
}: {
  products: EditableProduct[];
  projects: EditableProject[];
  solutions: EditableSolution[];
  messages?: ContactMessageItem[];
}) {
  const [activeTab, setActiveTab] = useState<"messages" | "projects" | "products" | "solutions">("messages");
  const newMessagesCount = messages.filter((m) => m.status === "جديد").length;

  return (
    <div>
      {/* Navigation Tabs */}
      <div className="mb-8 flex items-center gap-2 border-b border-slate-200 overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab("messages")}
          className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition-colors ${activeTab === "messages"
              ? "border-brand text-brand"
              : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
        >
          <MessageSquare className="size-4" />
          طلبات التواصل ({messages.length})
          {newMessagesCount > 0 ? (
            <span className="rounded-full bg-amber-500 px-2 py-0.5 text-[11px] font-bold text-white">
              {newMessagesCount} جديد
            </span>
          ) : null}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("solutions")}
          className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition-colors ${activeTab === "solutions"
              ? "border-brand text-brand"
              : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
        >
          إدارة الحلول ({solutions.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("projects")}
          className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition-colors ${activeTab === "projects"
              ? "border-brand text-brand"
              : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
        >
          <FolderGit2 className="size-4" />
          إدارة المشاريع ({projects.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("products")}
          className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition-colors ${activeTab === "products"
              ? "border-brand text-brand"
              : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
        >
          <Layers className="size-4" />
          إدارة المنتجات ({products.length})
        </button>
      </div>

      {/* Messages Tab */}
      {activeTab === "messages" && (
        <div>
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-slate-900">طلبات التواصل والتجربة المجانية</h1>
            <p className="mt-1 text-sm text-slate-500">
              جميع الرسائل والطلبات المستلمة من الزوار عبر نموذج "ابدأ مجاناً"
            </p>
          </div>

          <ContactMessagesPanel messages={messages} />
        </div>
      )}


      {/* Solutions Tab */}
      {activeTab === "solutions" && (
        <div>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">الحلول البرمجية</h1>
              <p className="mt-1 text-sm text-slate-500">
                إدارة الأنظمة والحلول المعروضة في صفحة /solutions وتحديث المميزات والألوان
              </p>
            </div>

            <AddSolutionPanel />
          </div>

          {solutions.length === 0 ? (
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center shadow-xs">
              <Lightbulb className="size-8 text-slate-400" />
              <p className="text-sm text-slate-500">
                لا توجد حلول مضافة بعد — ابدأ بإضافة حل جديد
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {solutions.map((solution, index) => (
                <SolutionRow
                  key={solution.id}
                  solution={solution}
                  isFirst={index === 0}
                  isLast={index === solutions.length - 1}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Projects Tab */}
      {activeTab === "projects" && (
        <div>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">مشاريعنا</h1>
              <p className="mt-1 text-sm text-slate-500">
                إدارة الأعمال والمشاريع المعروضة في صفحة /projects وتحديث صور DigitalOcean Spaces
              </p>
            </div>

            <AddProjectPanel />
          </div>

          {projects.length === 0 ? (
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center shadow-xs">
              <FolderKanban className="size-8 text-slate-400" />
              <p className="text-sm text-slate-500">
                لا توجد مشاريع مضافة بعد — ابدأ بإضافة مشروع جديد
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {projects.map((project, index) => (
                <ProjectRow
                  key={project.id}
                  project={project}
                  isFirst={index === 0}
                  isLast={index === projects.length - 1}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Products Tab */}
      {activeTab === "products" && (
        <div>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">المنتجات</h1>
              <p className="mt-1 text-sm text-slate-500">
                المنتجات المعروضة في الصفحة الرئيسية
              </p>
            </div>

            <AddProductPanel />
          </div>

          {products.length === 0 ? (
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center shadow-xs">
              <PackageOpen className="size-8 text-slate-400" />
              <p className="text-sm text-slate-500">
                لا توجد منتجات مضافة بعد — ابدأ بإضافة منتج جديد
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {products.map((product, index) => (
                <ProductRow
                  key={product.id}
                  product={product}
                  isFirst={index === 0}
                  isLast={index === products.length - 1}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

