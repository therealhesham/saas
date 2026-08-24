import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  CheckCircle2,
  Code2,
  ExternalLink,
  Folder,
  Globe,
  Layers,
  Sparkles,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { CtaSection } from "@/components/cta-section";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const sampleProjectsList = [
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
    position: 1,
    published: true,
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date(),
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
    position: 2,
    published: true,
    featured: false,
    createdAt: new Date(),
    updatedAt: new Date(),
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
    position: 3,
    published: true,
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

interface Props {
  params: Promise<{ slug: string }>;
}

async function getProject(slug: string) {
  try {
    const project = await prisma.project.findUnique({
      where: { slug },
    });
    if (project && project.published) return project;
  } catch (error) {
    console.warn("تعذّر الاتصال بقاعدة البيانات أثناء جلب تفاصيل المشروع:", error);
  }

  // Fallback لو قاعدة البيانات غير متاحة أو المشروع مش موجود في DB
  return sampleProjectsList.find((p) => p.slug === slug) ?? null;
}

async function getRelatedProjects(currentSlug: string) {
  try {
    return await prisma.project.findMany({
      where: {
        published: true,
        slug: { not: currentSlug },
      },
      take: 3,
      orderBy: [{ position: "asc" }, { id: "asc" }],
    });
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    return {
      title: "المشروع غير موجود — روائس",
    };
  }

  return {
    title: `${project.title} — معرض أعمال روائس`,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.summary,
      images: [project.imageUrl],
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  const relatedProjects = await getRelatedProjects(slug);

  const technologies = Array.isArray(project.technologies)
    ? project.technologies.map(String)
    : [];

  // تقسيم الوصف لفقرات مفصلة
  const paragraphs = project.description.split("\n\n").filter(Boolean);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <SiteHeader />

      <main className="flex-1">
        {/* هيدر الصفحة والمسار (Breadcrumb) */}
        <section className="relative overflow-hidden border-b border-slate-200/80 bg-white py-12 sm:py-16">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-40 left-1/2 size-[36rem] -translate-x-1/2 rounded-full bg-brand/5 blur-[120px]"
          />

          <div className="relative mx-auto max-w-5xl px-6">
            {/* Breadcrumb */}
            <nav className="mb-6 flex items-center gap-2 text-xs font-medium text-slate-500">
              <Link
                href="/"
                className="transition-colors hover:text-slate-900"
              >
                الرئيسية
              </Link>
              <span>/</span>
              <Link
                href="/projects"
                className="transition-colors hover:text-slate-900"
              >
                معرض المشاريع
              </Link>
              <span>/</span>
              <span className="text-slate-900 font-semibold truncate max-w-xs">
                {project.title}
              </span>
            </nav>

            {/* الشارات والمعلومات الأولية */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-3.5 py-1 text-xs font-bold text-brand">
                <Folder className="size-3.5" />
                {project.category}
              </span>

              {project.featured && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3.5 py-1 text-xs font-bold text-amber-700 border border-amber-200">
                  مشروع مميز
                </span>
              )}
            </div>

            {/* عنوان المشروع والملخص */}
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl leading-tight">
              {project.title}
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-600 sm:text-lg">
              {project.summary}
            </p>

            {/* أزرار الإجراءات السريعة */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {project.projectUrl && (
                <a
                  href={project.projectUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white shadow-md shadow-brand/20 transition-colors hover:bg-indigo-700"
                >
                  <Globe className="size-4" />
                  معاينة التطبيق المباشر
                  <ExternalLink className="size-4" />
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-xs transition-colors hover:bg-slate-50 hover:text-slate-900"
                >
                  <Code2 className="size-4" />
                  عرض مستودع GitHub
                </a>
              )}

              <Link
                href="/projects"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-100/80 px-5 py-3 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-200 hover:text-slate-900"
              >
                <ArrowRight className="size-4" />
                العودة للمشاريع
              </Link>
            </div>
          </div>
        </section>

        {/* عرض المعاينة البصرية والوصف المفصل */}
        <section className="mx-auto max-w-5xl px-6 py-12 sm:py-16">
          {/* صورة غلاف المشروع المتميزة */}
          <div className="relative aspect-16/9 w-full overflow-hidden rounded-3xl border border-slate-200/80 bg-slate-900 shadow-xl mb-12">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.imageUrl}
              alt={project.title}
              className="h-full w-full object-cover"
            />
          </div>

          {/* محتوى المشروع والتقنيات */}
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            {/* تفاصيل الوصف (2 عمود) */}
            <div className="lg:col-span-2 space-y-8">
              <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xs">
                <h2 className="text-xl font-bold text-slate-900 mb-4 border-b border-slate-100 pb-3 flex items-center gap-2">
                  <Layers className="size-5 text-brand" />
                  نظرة عامة عن المشروع
                </h2>

                <div className="space-y-4 text-sm sm:text-base leading-relaxed text-slate-700">
                  {paragraphs.length > 0 ? (
                    paragraphs.map((p, idx) => <p key={idx}>{p}</p>)
                  ) : (
                    <p>{project.description}</p>
                  )}
                </div>
              </div>

              {/* التقنيات المستخدمة في المشروع */}
              {technologies.length > 0 && (
                <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xs">
                  <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Code2 className="size-5 text-brand" />
                    التقنيات وبنية التطبيق
                  </h3>

                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {technologies.map((tech) => (
                      <div
                        key={tech}
                        className="flex items-center gap-2 rounded-xl border border-slate-200/60 bg-slate-50 px-4 py-3 text-xs font-semibold text-slate-800"
                      >
                        <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                        <span>{tech}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* بطاقة معلومات جانبية (1 عمود) */}
            <div className="space-y-6">
              <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs space-y-6">
                <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
                  معلومات المشروع
                </h3>

                <div className="space-y-4 text-xs font-medium">
                  <div>
                    <span className="text-slate-400 block mb-1">التصنيف الرئيسي</span>
                    <span className="text-sm font-bold text-slate-800">
                      {project.category}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-400 block mb-1">تاريخ النشر</span>
                    <span className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                      <Calendar className="size-4 text-slate-400" />
                      {new Date(project.createdAt).toLocaleDateString("ar-EG", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>

                  {project.projectUrl && (
                    <div>
                      <span className="text-slate-400 block mb-1">رابط المعاينة</span>
                      <a
                        href={project.projectUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm font-bold text-brand hover:underline flex items-center gap-1 truncate"
                      >
                        {project.projectUrl}
                        <ExternalLink className="size-3 shrink-0" />
                      </a>
                    </div>
                  )}

                  {project.githubUrl && (
                    <div>
                      <span className="text-slate-400 block mb-1">مستودع الكود</span>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm font-bold text-slate-800 hover:text-brand flex items-center gap-1 truncate"
                      >
                        GitHub Repository
                        <ExternalLink className="size-3 shrink-0" />
                      </a>
                    </div>
                  )}
                </div>
              </div>

              <div className="rounded-3xl bg-slate-900 p-6 text-white shadow-lg space-y-4">
                <h4 className="font-bold text-base">تريد تطبيقاً مشابهاً لمشروعك؟</h4>
                <p className="text-xs leading-relaxed text-slate-300">
                  فريق روائس جاهز لتصميم وتطوير وتدشين تطبيقك الرقمي بأحدث التقنيات وبسرعة عالية.
                </p>
                <Link
                  href="/#pricing"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-indigo-700"
                >
                  تواصل معنا للبدء
                  <ArrowLeft className="size-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* قسم مشاريع ذات صلة */}
        {relatedProjects.length > 0 && (
          <section className="border-t border-slate-200/80 bg-white py-16">
            <div className="mx-auto max-w-5xl px-6">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    مشاريع أخرى قد تهمك
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    استكشف المزيد من الأعمال والحلول التي قمنا بتطويرها
                  </p>
                </div>
                <Link
                  href="/projects"
                  className="text-xs font-bold text-brand hover:underline flex items-center gap-1"
                >
                  جميع المشاريع
                  <ArrowLeft className="size-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                {relatedProjects.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/projects/${rel.slug}`}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-50/50 transition-all hover:-translate-y-1 hover:shadow-md hover:bg-white"
                  >
                    <div className="relative aspect-16/10 w-full overflow-hidden bg-slate-900">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={rel.imageUrl}
                        alt={rel.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4 flex flex-1 flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-semibold text-brand">
                          {rel.category}
                        </span>
                        <h3 className="text-sm font-bold text-slate-900 group-hover:text-brand transition-colors mt-1">
                          {rel.title}
                        </h3>
                        <p className="text-xs text-slate-600 line-clamp-2 mt-1">
                          {rel.summary}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <CtaSection />
      </main>
    </div>
  );
}
