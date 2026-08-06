import path from "node:path";
import type { NextConfig } from "next";

/**
 * الدومينات المسموح للـ Server Actions تتنادى منها.
 *
 * ليه ده مهم: Next بيعمل فحص CSRF بيقارن هيدر Origin بالـ Host (أو
 * x-forwarded-host). لما الموقع بيقف وراء reverse proxy — زي استضافات
 * Coolify/Traefik/nginx — الاتنين ممكن مايتطابقوش فالـ action بيتلغي
 * والمستخدم بيشوف "This page couldn't load. A server error occurred."
 *
 * حط دوميناتك في متغيّر البيئة ALLOWED_ORIGINS مفصولة بفاصلة، مثلاً:
 *   ALLOWED_ORIGINS="rawaes.com,www.rawaes.com,*.rawaes.com"
 *
 * ملاحظة: الإعداد ده بيتقري وقت `next build` مش وقت التشغيل، فلو غيّرته
 * لازم تعيد بناء الصورة.
 */
const allowedOrigins = (process.env.ALLOWED_ORIGINS ?? "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const nextConfig: NextConfig = {
  // بيخرّج سيرفر مستقل في .next/standalone فيه بس الملفات المطلوبة للتشغيل،
  // فصورة الدوكر بتبقى أصغر بكتير من نسخ node_modules كلها.
  output: "standalone",

  // مهم: فيه package.json في المجلد الأب للمشروع، وNext كان بيعتبره جذر
  // workspace فيطلّع المخرجات في .next/standalone/saas/ بدل .next/standalone/.
  // تثبيت الجذر هنا بيخلّي المخرجات ثابتة محلياً وجوه الدوكر على السواء.
  outputFileTracingRoot: path.join(__dirname),

  experimental: {
    serverActions: {
      // لو المتغيّر فاضي بنسيب Next على سلوكه الافتراضي (نفس الدومين بس)
      ...(allowedOrigins.length > 0 ? { allowedOrigins } : {}),
    },
  },
};

export default nextConfig;
