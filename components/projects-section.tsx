import Link from "next/link";
import { ArrowLeft, Code2, ExternalLink, Layers, Sparkles, ArrowUpRight } from "lucide-react";
import { prisma } from "@/lib/prisma";

export async function ProjectsSection() {
  let projects: Awaited<ReturnType<typeof prisma.project.findMany>> = [];

  try {
    projects = await prisma.project.findMany({
      where: { published: true },
      orderBy: [{ position: "asc" }, { id: "asc" }],
    });

    // إذا كانت قاعدة البيانات فارغة، نضيف نماذج أولية ممتازة للعرض الفوري
    if (projects.length === 0) {
      const sampleProjects = [
        {
          slug: "enterprise-saas-dashboard",
          title: "لوحة تحكم روائس السحابية",
          summary: "منصة إدارة البيانات والتحليلات الفورية للشركات والمؤسسات",
          description:
            "نظام متكامل لإدارة الأعمال يوفر لوحات قيادة مخصصة للتحليلات المباشرة، مع دعم الأمان العالي، التزامن الفوري، وتكامل التخزين السحابي.",
          category: "منصات SaaS",
          imageUrl:
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
          projectUrl: "https://rawaes.com",
          githubUrl: null,
          technologies: ["Next.js", "React 19", "TailwindCSS", "Prisma", "MySQL"],
          position: 1,
          published: true,
          featured: true,
        },
        {
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
        },
        {
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
        },
      ];

      for (const p of sampleProjects) {
        await prisma.project.create({ data: p });
      }

      projects = await prisma.project.findMany({
        where: { published: true },
        orderBy: [{ position: "asc" }, { id: "asc" }],
      });
    }
  } catch (error) {
    console.warn("تعذّر جلب المشاريع من قاعدة البيانات أثناء توليد الصفحة:", error);
  }

  if (projects.length === 0) {
    return null;
  }

  return (
    <section id="projects" className="bg-white py-24 sm:py-32 border-t border-slate-100">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-3.5 py-1 text-xs font-bold text-brand">
            معرض المشاريع والحلول
          </span>
          <h2 className="mt-4 text-3xl font-bold leading-snug text-slate-900 sm:text-4xl">
            مشاريع رقمية متميزة تم تطويرها بأحدث التقنيات
          </h2>
          <p className="mt-4 text-base leading-8 text-slate-600">
            نستعرض هنا نخبة من المشاريع والحلول البرمجية التي قمنا ببنائها وتطويرها بلمسة احترافية وأداء عالي الجودة.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => {
            const techs = Array.isArray(project.technologies)
              ? project.technologies.map(String)
              : [];

            return (
              <article
                key={project.id}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-slate-200/60"
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

                  {/* شارات التصنيف والمميز */}
                  <div className="absolute top-3 right-3 left-3 flex items-center justify-between pointer-events-none">
                    <span className="rounded-full bg-white/90 backdrop-blur-md px-3 py-1 text-[11px] font-semibold text-slate-800 shadow-xs">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/90 backdrop-blur-md px-3 py-1 text-[11px] font-bold text-white shadow-xs">
                        مميز
                      </span>
                    )}
                  </div>
                </Link>

                {/* المحتوى */}
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

                    {techs.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {techs.map((tech) => (
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

                  {/* الإجراءات */}
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
            );
          })}
        </div>

        {/* شريط الانتقال لكافة المشاريع */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-8 py-7 text-center sm:flex-row sm:text-start">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-brand/10 p-2.5 text-brand hidden sm:block">
              <Layers className="size-6" />
            </div>
            <div>
              <p className="font-bold text-slate-900 text-sm">
                هل تريد استكشاف كافة مشاريعنا وتصفيتها بالتقنيات والتصنيف؟
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                زور معرض المشاريع الكامل للاطلاع على أدق التفاصيل التقنية.
              </p>
            </div>
          </div>

          <a
            href="/projects"
            className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-bold text-white shadow-md shadow-brand/20 transition-colors hover:bg-indigo-700"
          >
            عرض كافة المشاريع
            <ArrowLeft className="size-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
