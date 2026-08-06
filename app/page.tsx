import { CtaSection } from "@/components/cta-section";
import { HeroSection } from "@/components/hero-section";
import { ProductsSection } from "@/components/products-section";

// الصفحة بتترسم مع كل طلب بدل ما تتولّد وقت البناء.
// السبب: المنتجات بتتقري من الداتابيز، ولو الصفحة اتولّدت وقت البناء يبقى
// `next build` مش هيعدّي غير لما الداتابيز تكون متاحة — وده بيمنع بناء صورة
// الدوكر في CI أو على أي جهاز مش شايف الداتابيز.
// مكسب إضافي: أي تعديل من لوحة الأدمن بيظهر على طول من غير انتظار revalidation.
export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main className="flex-1">
      <HeroSection />
      <ProductsSection />
      <CtaSection />
    </main>
  );
}
