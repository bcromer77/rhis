import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // ✅ Always allow API + Next.js internals
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  // ✅ Get password from query (?pwd=...) or cookie
  const expectedPassword = process.env.NEXT_PUBLIC_DASHBOARD_PASSWORD;
  const cookiePassword = request.cookies.get("dashboard-password")?.value;
  const queryPassword = searchParams.get("pwd");

  const validPassword =
    cookiePassword === expectedPassword || queryPassword === expectedPassword;

  // ✅ If user goes to /horizon without valid password → redirect to login screen
  if (pathname.startsWith("/horizon") && !validPassword) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

