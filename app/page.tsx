import { CtaSection } from "@/components/cta-section";
import { HeroSection } from "@/components/hero-section";
import { ProjectsSection } from "@/components/projects-section";

// الصفحة بتترسم مع كل طلب بدل ما تتولّد وقت البناء.
export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main className="flex-1">
      <HeroSection />
      <ProjectsSection />
      <CtaSection />
    </main>
  );
}

