import { auth } from "@/auth";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  privateRoutes,
  publicRoutes,
} from "@/routes";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const isLoggedIn = !!(await auth());

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isPrivateRoute = privateRoutes.includes(nextUrl.pathname);

  // Handle API auth routes
  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  // Handle public routes
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Handle auth routes - redirect to dashboard if already logged in
  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return NextResponse.next();
  }

  // Handle private routes - redirect to home if not logged in
  if (isPrivateRoute) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/", nextUrl));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!.+\\.[\\w]+$|_next).*)",
  ],
};
