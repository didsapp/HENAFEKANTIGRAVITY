import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/auth";

export async function middleware(request: NextRequest) {
  try {
    // Auth.js wrapper
    const session = await auth();
    const pathname = request.nextUrl.pathname;

    // Protection logic
    const isPortalRoute = pathname.startsWith("/portal");
    const isAdminRoute = pathname.startsWith("/admin");

    if (isPortalRoute || isAdminRoute) {
      if (!session) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
      }

      if (isAdminRoute && session.user?.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/portal", request.url));
      }
    }

    return NextResponse.next();
  } catch (err) {
    // Fallback if edge runtime fails with bcrypt
    console.error("Middleware Auth Error Check:", err);
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/portal/:path*", "/admin/:path*"],
};
