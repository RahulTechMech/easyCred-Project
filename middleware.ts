import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken, SESSION_COOKIE_NAME } from "@/lib/auth/session";

const PUBLIC_ADMIN_PATHS = ["/admin/login"];
const PUBLIC_API_ADMIN_PATHS = ["/api/admin/login"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get(SESSION_COOKIE_NAME)?.value;
  const session = await verifySessionToken(token);

  const isAdminPage = pathname.startsWith("/admin");
  const isAdminApi = pathname.startsWith("/api/admin");
  const isPublicAdminPage = PUBLIC_ADMIN_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/"));
  const isPublicAdminApi = PUBLIC_API_ADMIN_PATHS.some((p) => pathname === p);

  // Admin page routes (except /admin/login)
  if (isAdminPage && !isPublicAdminPage) {
    if (!session) {
      const loginUrl = new URL("/admin/login", req.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  // Already-authenticated admins visiting the login page get sent to the dashboard
  if (pathname === "/admin/login" && session) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  // Admin API routes (except /api/admin/login)
  if (isAdminApi && !isPublicAdminApi) {
    if (!session) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
