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
  notFound();
}
