import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // بيخرّج سيرفر مستقل في .next/standalone فيه بس الملفات المطلوبة للتشغيل،
  // فصورة الدوكر بتبقى أصغر بكتير من نسخ node_modules كلها.
  output: "standalone",

  // مهم: فيه package.json في المجلد الأب للمشروع، وNext كان بيعتبره جذر
  // workspace فيطلّع المخرجات في .next/standalone/saas/ بدل .next/standalone/.
  // تثبيت الجذر هنا بيخلّي المخرجات ثابتة محلياً وجوه الدوكر على السواء.
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
