import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { ProjectsView, PublicProject } from "@/app/projects/projects-view";
import { prisma } from "@/lib/prisma";
import { ArrowLeft, Rocket } from "lucide-react";

export const metadata: Metadata = {
  title: "مشاريعنا — روائس",
  description:
    "استكشف معرض الأعمال والمشاريع الرقمية المتميزة التي قمنا بتطويرها باستخدام أحدث التقنيات السحابية.",
};

export const dynamic = "force-dynamic";

const sampleProjects: PublicProject[] = [
  {
    id: 1,
    slug: "enterprise-saas-dashboard",
    title: "لوحة تحكم روائس السحابية",
    summary: "منصة إدارة البيانات والتحليلات الفورية للشركات والمؤسسات",
    description:
      "نظام متكامل لإدارة الأعمال يوفر لوحات قيادة مخصصة للتحليلات المباشرة، مع دعم الأمان العالي، التزامن الفوري، وتكامل التخزين السحابي على DigitalOcean Spaces.",
    category: "منصات SaaS",
    imageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    projectUrl: "https://rawaes.com",
    githubUrl: null,
    technologies: ["Next.js", "React 19", "TailwindCSS", "Prisma", "MySQL"],
    featured: true,
  },
  {
    id: 2,
    slug: "e-commerce-ai-platform",
    title: "متجر الذكاء الاصطناعي التجاري",
    summary: "منصة تجارة إلكترونية ذكية تتيح توصية المنتجات المخصصة للمستخدمين",
    description:
      "تطبيق تجاري متطور يعتمد على تقنيات التعلم الآلي لاقتراح المنتجات وتسهيل عمليات الشراء، مع بوابة دفع إلكترونية سريعة وتصميم تجاوبي يخدم كافة الأجهزة.",
    category: "تطبيقات ويب",
    imageUrl:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    projectUrl: "https://rawaes.com",
    githubUrl: "https://github.com",
    technologies: ["Next.js", "TypeScript", "DigitalOcean Spaces", "Stripe"],
    featured: false,
  },
  {
    id: 3,
    slug: "cloud-asset-manager",
    title: "نظام إدارة الأصول الرقمية CloudSpace",
    summary: "تطبيق سحابي لرفع وإدارة الصور والملفات الضخمة بسرعة فائقة",
    description:
      "حل سحابي مخصص لرفع ومعالجة الصور وتخزينها على DigitalOcean Spaces مباشرة مع توليد روابط CDN سريعة وتوزيع أحمال آمن.",
    category: "حلول سحابية",
    imageUrl:
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1200&q=80",
    projectUrl: "https://rawaes.com",
    githubUrl: null,
    technologies: ["Node.js", "S3 SDK", "DigitalOcean", "Redis"],
    featured: true,
  },
];

async function getProjects(): Promise<PublicProject[]> {
  try {
    const projects = await prisma.project.findMany({
      where: { published: true },
      orderBy: [{ position: "asc" }, { id: "asc" }],
    });

    if (projects.length === 0) {
      // محاولة إضافة البيانات النموذجية لو قاعدة البيانات شغالة وفارغة
      try {
        for (const p of sampleProjects) {
          await prisma.project.create({
            data: {
              slug: p.slug,
              title: p.title,
              summary: p.summary,
              description: p.description,
              category: p.category,
              imageUrl: p.imageUrl,
              projectUrl: p.projectUrl,
              githubUrl: p.githubUrl,
              technologies: p.technologies,
              featured: p.featured,
              published: true,
            },
          });
        }
        const created = await prisma.project.findMany({
          where: { published: true },
          orderBy: [{ position: "asc" }, { id: "asc" }],
        });
        if (created.length > 0) {
          return created.map((p) => ({
            id: p.id,
            slug: p.slug,
            title: p.title,
            summary: p.summary,
            description: p.description,
            category: p.category,
            imageUrl: p.imageUrl,
            projectUrl: p.projectUrl,
            githubUrl: p.githubUrl,
            technologies: Array.isArray(p.technologies)
              ? p.technologies.map(String)
              : [],
            featured: p.featured,
          }));
        }
      } catch {
        // لو تعذّرت الإضافة، نرجع البيانات العادية في الذاكرة
      }
      return sampleProjects;
    }

    return projects.map((p) => ({
      id: p.id,
      slug: p.slug,
      title: p.title,
      summary: p.summary,
      description: p.description,
      category: p.category,
      imageUrl: p.imageUrl,
      projectUrl: p.projectUrl,
      githubUrl: p.githubUrl,
      technologies: Array.isArray(p.technologies)
        ? p.technologies.map(String)
        : [],
      featured: p.featured,
    }));
  } catch (error) {
    console.warn("تعذّر الاتصال بقاعدة البيانات أثناء جلب المشاريع، سيتم استخدام البيانات الافتراضية:", error);
    return sampleProjects;
  }
}

export default async function ProjectsPage() {
  notFound();
  const projects = await getProjects();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <SiteHeader />

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-slate-200/80 bg-white py-20 lg:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />

        <div className="relative mx-auto max-w-6xl px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/5 px-4 py-1.5 text-xs font-bold text-brand mb-6 shadow-xs">
            معرض الأعمال الرقمية
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            مشاريعنا المتميزة
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg text-slate-600 leading-relaxed">
            نستعرض هنا نخبة من المشاريع والحلول الرقمية التي قمنا ببنائها وتطويرها، مستخدمين أحدث التقنيات السحابية والتخزين السريع على DigitalOcean Spaces.
          </p>

          <div className="mt-8 flex items-center justify-center gap-4 text-xs font-semibold text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              {projects.length} مشاريع منشورة
            </span>
            <span>•</span>
            <span>تحديثات مستمرة</span>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="mx-auto max-w-6xl px-6 py-16 flex-1 w-full">
        <ProjectsView projects={projects} />
      </main>

      {/* Footer Call To Action */}
      <section className="border-t border-slate-200 bg-white py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <div className="inline-flex p-3 bg-brand/10 rounded-2xl text-brand mb-4">
            <Rocket className="size-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            هل لديك مشروع جديد تريد تنفيذه؟
          </h2>
          <p className="mt-2 text-sm text-slate-600 max-w-xl mx-auto">
            نحن هنا لتحويل أفكارك إلى منصة سحابية حية، فائقة السرعة وعالية الأداء.
          </p>

          <div className="mt-6 flex items-center justify-center gap-3">
            <a
              href="/#pricing"
              className="inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-bold text-white shadow-md shadow-brand/20 transition-all hover:bg-indigo-700"
            >
              تواصل معنا الآن
              <ArrowLeft className="size-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
