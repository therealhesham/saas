import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// نفس المنتجات اللي كانت مكتوبة في components/products-section.tsx
const products = [
  {
    slug: "crm",
    name: "روائس CRM",
    tagline: "إدارة العملاء والمبيعات",
    description:
      "تابع عملاءك من أول تواصل لحد إتمام الصفقة، مع خط أنابيب مبيعات واضح وتنبيهات تلقائية.",
    icon: "UsersRound",
    accent: "sky",
    highlights: ["خط أنابيب مرئي", "تتبّع المحادثات", "توقّعات مبيعات"],
    position: 1,
  },
  {
    slug: "analytics",
    name: "روائس للتحليلات",
    tagline: "لوحات بيانات وتقارير",
    description:
      "حوّل بياناتك لقرارات بلوحات تحليلية محدّثة لحظياً وتقارير جاهزة للمشاركة مع فريقك.",
    icon: "ChartColumn",
    accent: "violet",
    highlights: ["تقارير فورية", "مؤشرات مخصّصة", "تصدير تلقائي"],
    position: 2,
  },
  {
    slug: "automation",
    name: "روائس للأتمتة",
    tagline: "سير عمل بدون كود",
    description:
      "اربط خطواتك المتكررة في سير عمل يشتغل لوحده، وابنِ أتمتتك بالسحب والإفلات بدون برمجة.",
    icon: "Workflow",
    accent: "amber",
    highlights: ["محرّر مرئي", "مشغّلات ذكية", "تكامل مع أدواتك"],
    position: 3,
  },
  {
    slug: "support",
    name: "روائس للدعم",
    tagline: "تذاكر ومحادثات العملاء",
    description:
      "صندوق وارد موحّد يجمع رسائل عملائك من كل القنوات، مع توزيع تلقائي للتذاكر على الفريق.",
    icon: "LifeBuoy",
    accent: "emerald",
    highlights: ["صندوق موحّد", "قاعدة معرفة", "قياس زمن الرد"],
    position: 4,
  },
  {
    slug: "billing",
    name: "روائس للفوترة",
    tagline: "اشتراكات ومدفوعات",
    description:
      "أصدر فواتيرك وحصّل مدفوعاتك واتابع الاشتراكات المتجددة من مكان واحد بعملات متعددة.",
    icon: "CreditCard",
    accent: "rose",
    highlights: ["فواتير تلقائية", "اشتراكات متجددة", "تقارير إيرادات"],
    position: 5,
  },
  {
    slug: "hr",
    name: "روائس للموارد البشرية",
    tagline: "إدارة الفريق والحضور",
    description:
      "ملفات موظفين، طلبات إجازات، وحضور وانصراف — كلها مربوطة بباقي منتجات المنظومة.",
    icon: "BriefcaseBusiness",
    accent: "cyan",
    highlights: ["ملفات الموظفين", "طلبات الإجازات", "كشوف المرتبات"],
    position: 6,
  },
];

for (const product of products) {
  await prisma.product.upsert({
    where: { slug: product.slug },
    update: {},
    create: product,
  });
}

console.log(`تم إدخال/تأكيد ${products.length} منتجات`);

await prisma.$disconnect();
