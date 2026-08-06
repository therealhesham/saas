import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // بيخرّج سيرفر مستقل في .next/standalone فيه بس الملفات المطلوبة للتشغيل،
  // فصورة الدوكر بتبقى أصغر بكتير من نسخ node_modules كلها.
  output: "standalone",
};

export default nextConfig;
