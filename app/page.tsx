import { CtaSection } from "@/components/cta-section";
import { HeroSection } from "@/components/hero-section";
import { ProductsSection } from "@/components/products-section";

export default function Home() {
  return (
    <main className="flex-1">
      <HeroSection />
      <ProductsSection />
      <CtaSection />
    </main>
  );
}
