import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const solutions = [
  {
    slug: "recruitment",
    tag: "الاستقدام",
    title: "نظام إدارة الاستقدام",
    subtitle: "من الطلب حتى الوصول",
    description: "منصة متكاملة تُغطّي كامل دورة حياة عملية الاستقدام — من إدارة الطلبات والمرشّحين إلى متابعة الأوراق الرسمية والتأشيرات وإحصائيات الأداء.",
    accentColor: "#3B5BDB",
    features: [
      { icon: "Users", text: "إدارة المرشّحين والعمال بالكامل" },
      { icon: "FileText", text: "متابعة الأوراق والتأشيرات" },
      { icon: "Search", text: "بحث وفلترة متقدّمة" },
      { icon: "BarChart3", text: "تقارير وإحصائيات تفصيلية" },
      { icon: "Globe", text: "دعم متعدد المكاتب والدول" },
      { icon: "Shield", text: "صلاحيات وأدوار متعددة" }
    ],
    ctaText: "استكشف نظام الاستقدام",
    ctaHref: "#recruitment",
    position: 0,
    published: true
  },
  {
    slug: "rentcar",
    tag: "تأجير السيارات",
    title: "نظام تأجير السيارات",
    subtitle: "أسطولك في راحة يدك",
    description: "منصة سحابية شاملة لإدارة أسطول السيارات، حجوزات العملاء، العقود، الفواتير، والصيانة — كل شيء في مكان واحد.",
    accentColor: "#D4A24A",
    features: [
      { icon: "Car", text: "إدارة الأسطول والسيارات" },
      { icon: "Calendar", text: "نظام حجوزات متكامل" },
      { icon: "KeyRound", text: "عقود إيجار رقمية" },
      { icon: "CreditCard", text: "فواتير ومدفوعات إلكترونية" },
      { icon: "MapPin", text: "تتبّع مواقع الاستلام والتسليم" },
      { icon: "Clock", text: "تنبيهات الصيانة والتجديد" }
    ],
    ctaText: "استكشف نظام التأجير",
    ctaHref: "#rentcar",
    position: 1,
    published: true
  },
  {
    slug: "tourism",
    tag: "السياحة",
    title: "النظام السياحي المتكامل",
    subtitle: "رحلات لا تُنسى، إدارة لا مثيل لها",
    description: "منصة سياحية متكاملة لإدارة البرامج والباقات السياحية، الحجوزات، الفنادق، تذاكر الطيران، والعملاء — تصمّم تجارب استثنائية بكفاءة عالية.",
    accentColor: "#10B981",
    features: [
      { icon: "Package", text: "إدارة الباقات والبرامج السياحية" },
      { icon: "Hotel", text: "حجوزات الفنادق والإقامة" },
      { icon: "Plane", text: "إدارة تذاكر الطيران" },
      { icon: "Compass", text: "بناء مسارات سياحية مخصصة" },
      { icon: "Star", text: "تقييمات العملاء والتغذية الراجعة" },
      { icon: "BarChart3", text: "تقارير الإيرادات والأداء" }
    ],
    ctaText: "استكشف النظام السياحي",
    ctaHref: "#tourism",
    position: 2,
    published: true
  }
];

async function main() {
  console.log("Seeding solutions...");
  for (const sol of solutions) {
    await prisma.solution.upsert({
      where: { slug: sol.slug },
      update: sol,
      create: sol
    });
    console.log("Done: " + sol.title);
  }
  console.log("All done!");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
