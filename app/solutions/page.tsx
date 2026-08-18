import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SolutionsHero } from "@/components/solutions/SolutionsHero";
import { SolutionsList, type PublicSolutionItem } from "@/components/solutions/SolutionsList";
import { WhyRawaes } from "@/components/solutions/WhyRawaes";
import { SolutionsCta } from "@/components/solutions/SolutionsCta";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "الحلول — روائس للحلول البرمجية",
  description:
    "منظومة حلول برمجية متكاملة لقطاعات الاستقدام وتأجير السيارات والسياحة. أنظمة سحابية جاهزة، قابلة للتوسّع، ومبنية بأحدث التقنيات.",
};

export default async function SolutionsPage() {
  const solutionsRaw = await prisma.solution.findMany({
    where: { published: true },
    orderBy: [{ position: "asc" }, { id: "asc" }],
  });

  const solutions: PublicSolutionItem[] = solutionsRaw.map((sol) => ({
    id: sol.id,
    slug: sol.slug,
    tag: sol.tag,
    title: sol.title,
    subtitle: sol.subtitle,
    description: sol.description,
    accentColor: sol.accentColor,
    features: Array.isArray(sol.features)
      ? (sol.features as Array<{ icon: string; text: string }>)
      : [],
    ctaText: sol.ctaText,
    ctaHref: sol.ctaHref,
  }));

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <SolutionsHero />
        <SolutionsList solutions={solutions} />
        <WhyRawaes />
        <SolutionsCta />
      </main>
    </>
  );
}
