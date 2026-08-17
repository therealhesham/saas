import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SolutionsHero } from "@/components/solutions/SolutionsHero";
import { SolutionsList } from "@/components/solutions/SolutionsList";
import { WhyRawaes } from "@/components/solutions/WhyRawaes";
import { SolutionsCta } from "@/components/solutions/SolutionsCta";

export const metadata: Metadata = {
  title: "الحلول — روائس للحلول البرمجية",
  description:
    "منظومة حلول برمجية متكاملة لقطاعات الاستقدام وتأجير السيارات والسياحة. أنظمة سحابية جاهزة، قابلة للتوسّع، ومبنية بأحدث التقنيات.",
};

export default function SolutionsPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <SolutionsHero />
        <SolutionsList />
        <WhyRawaes />
        <SolutionsCta />
      </main>
    </>
  );
}
