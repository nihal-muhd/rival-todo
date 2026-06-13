import { NextResponse, type NextRequest } from "next/server";

import { AUTH_COOKIE_NAME } from "@/lib/auth-config";

const protectedRoutes = ["/inbox", "/today", "/calendar"];
const authRoutes = ["/login", "/signup"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasAuthCookie = request.cookies.has(AUTH_COOKIE_NAME);
  const isProtectedRoute = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
  const isAuthRoute = authRoutes.includes(pathname);

  if (isProtectedRoute && !hasAuthCookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAuthRoute && hasAuthCookie) {
    return NextResponse.redirect(new URL("/inbox", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/inbox/:path*",
    "/today/:path*",
    "/calendar/:path*",
    "/login",
    "/signup",
  ],
};
