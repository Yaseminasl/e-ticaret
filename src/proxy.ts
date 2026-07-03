import { NextResponse, type NextRequest } from "next/server";

const protectedRoutes = ["/cart", "/checkout", "/orders", "/profile"];

export function proxy(request: NextRequest) {
  const sessionUserId = request.cookies.get("sessionUserId")?.value;
  const pathname = request.nextUrl.pathname;

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (isProtectedRoute && !sessionUserId) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/cart/:path*", "/checkout/:path*", "/orders/:path*", "/profile"],
};
