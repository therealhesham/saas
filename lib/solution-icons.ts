import {
  Users,
  FileText,
  Search,
  Globe,
  BarChart3,
  Shield,
  Car,
  KeyRound,
  CreditCard,
  MapPin,
  Calendar,
  Clock,
  Package,
  Hotel,
  Plane,
  Compass,
  Star,
  CheckCircle2,
  Zap,
  Building2,
  type LucideIcon,
} from "lucide-react";

/**
 * allowlist للأيقونات المسموح بيها في الحلول.
 * الـ DB بتخزّن الاسم كنص، والـ resolve بيتم هنا بس
 * عشان محدش يقدر يحقن اسم عشوائي.
 */
export const SOLUTION_ICONS = {
  Users,
  FileText,
  Search,
  Globe,
  BarChart3,
  Shield,
  Car,
  KeyRound,
  CreditCard,
  MapPin,
  Calendar,
  Clock,
  Package,
  Hotel,
  Plane,
  Compass,
  Star,
  CheckCircle2,
  Zap,
  Building2,
} satisfies Record<string, LucideIcon>;

export type SolutionIconName = keyof typeof SOLUTION_ICONS;

export const SOLUTION_ICON_NAMES = Object.keys(
  SOLUTION_ICONS
) as SolutionIconName[];

export function resolveSolutionIcon(name: string): LucideIcon {
  return SOLUTION_ICONS[name as SolutionIconName] ?? CheckCircle2;
}
