import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const authCookie = request.cookies.get("admin_auth")?.value;

  let user: { role?: string } | null = null;

  if (authCookie) {
    try {
      user = JSON.parse(decodeURIComponent(authCookie));
    } catch {
      user = null;
    }
  }

  if (pathname === "/admin") {
    // belum login → login page
    if (!user) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    // sudah login → dashboard
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    if (!user) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    if (!["manager", "sales", "admin"].includes(user.role ?? "")) {
      return NextResponse.redirect(new URL("/403", request.url));
    }
  }

  if (pathname === "/admin/login" && user) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
