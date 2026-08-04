import {
  Blocks,
  Bot,
  BriefcaseBusiness,
  Building2,
  ChartColumn,
  CreditCard,
  FileText,
  Globe,
  LifeBuoy,
  Plane,
  ShieldCheck,
  UsersRound,
  Workflow,
  Zap,
  type LucideIcon,
} from "lucide-react";

/**
 * قائمة الأيقونات المسموح بيها. الـ DB بتخزّن الاسم كنص، والنص ده جاي من
 * لوحة الأدمن — فلازم يتحوّل لمكوّن من خلال الخريطة دي بس، عشان محدش يقدر
 * يحقن اسم عشوائي ويكسر الرندر.
 */
export const PRODUCT_ICONS = {
  UsersRound,
  ChartColumn,
  Workflow,
  LifeBuoy,
  CreditCard,
  BriefcaseBusiness,
  Building2,
  Plane,
  FileText,
  ShieldCheck,
  Bot,
  Globe,
  Zap,
  Blocks,
} satisfies Record<string, LucideIcon>;

export type ProductIconName = keyof typeof PRODUCT_ICONS;

export const PRODUCT_ICON_NAMES = Object.keys(PRODUCT_ICONS) as ProductIconName[];

export function resolveProductIcon(name: string): LucideIcon {
  return PRODUCT_ICONS[name as ProductIconName] ?? Blocks;
}

/**
 * ألوان الكروت. متعرّفة كـ classes كاملة مش مركّبة بالـ string interpolation،
 * لأن Tailwind بيفحص الكود نصياً ومش هيولّد كلاس مبني وقت التشغيل.
 */
export const PRODUCT_ACCENTS = {
  sky: "text-sky-600 bg-sky-50",
  violet: "text-violet-600 bg-violet-50",
  amber: "text-amber-600 bg-amber-50",
  emerald: "text-emerald-600 bg-emerald-50",
  rose: "text-rose-600 bg-rose-50",
  cyan: "text-cyan-600 bg-cyan-50",
  indigo: "text-indigo-600 bg-indigo-50",
  slate: "text-slate-600 bg-slate-100",
} as const;

export type ProductAccent = keyof typeof PRODUCT_ACCENTS;

export const PRODUCT_ACCENT_NAMES = Object.keys(
  PRODUCT_ACCENTS,
) as ProductAccent[];

export function resolveProductAccent(name: string): string {
  return PRODUCT_ACCENTS[name as ProductAccent] ?? PRODUCT_ACCENTS.sky;
}
