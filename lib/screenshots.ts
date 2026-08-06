import { readdirSync } from "node:fs";
import path from "node:path";

const SCREENSHOTS_DIR = path.join(process.cwd(), "public", "screenshots");

/**
 * يدوّر على سكرين شوت باسم معيّن داخل `public/screenshots` بأي امتداد
 * (png / jpg / webp / avif) ويرجّع مساره الجاهز للاستخدام في <Image>.
 *
 * لو الملف مش موجود بيرجّع null، فالواجهة بتعرض البديل المرسوم بالـ HTML.
 * يعني تحط الصورة في الفولدر وتظهر على طول من غير أي تعديل في الكود.
 */
export function findScreenshot(name: string): string | null {
  try {
    const file = readdirSync(SCREENSHOTS_DIR).find(
      (entry) => entry.replace(/\.[^.]+$/, "") === name,
    );

    return file ? `/screenshots/${file}` : null;
  } catch {
    // الفولدر نفسه مش موجود
    return null;
  }
}
