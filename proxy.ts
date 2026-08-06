import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE, isValidSessionValue } from "@/lib/auth";

// ملاحظة: في Next.js 16 اتغيّر اسم middleware لـ proxy، والـ runtime هنا
// nodejs دايماً (مش edge)، فـ node:crypto اللي في lib/auth شغّال عادي.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // صفحة تسجيل الدخول لازم تفضل مفتوحة وإلا هيحصل redirect loop
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  const session = request.cookies.get(SESSION_COOKIE)?.value;

  // isValidSessionValue بيرمي استثناء لو AUTH_SECRET ناقص أو أقصر من 16 حرف.
  // من غير الـ try ده أي طلب على /admin كان بيرجّع 500 ("page couldn't load")
  // بدل ما يوديك لصفحة الدخول — وده صعب تشخيصه على سيرفر.
  try {
    if (isValidSessionValue(session)) {
      return NextResponse.next();
    }
  } catch (error) {
    console.error("[proxy] فشل التحقق من الجلسة:", error);
  }

  const loginUrl = new URL("/admin/login", request.url);
  loginUrl.searchParams.set("next", pathname);

  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*"],
};
