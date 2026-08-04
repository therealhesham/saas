import { CtaSection } from "@/components/cta-section";
import { HeroSection } from "@/components/hero-section";
import { ProductsSection } from "@/components/products-section";

// الصفحة بتتولّد مرة وتتخزّن، والأدمن بينادي revalidatePath("/") بعد أي تعديل.
// الرقم ده شبكة أمان: لو الموقع شغال على أكتر من نسخة (instance) فالـ
// revalidatePath بيمسح كاش النسخة اللي استقبلت الطلب بس، والباقي بيتحدّث خلال دقيقة.
export const revalidate = 60;

export default function Home() {
  return (
    <main className="flex-1">
      <HeroSection />
      <ProductsSection />
      <CtaSection />
    </main>
  );
}
