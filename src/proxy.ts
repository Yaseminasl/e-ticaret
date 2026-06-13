import { NextResponse, type NextRequest } from "next/server";

const protectedRoutes = ["/cart", "/checkout", "/orders", "/profile"];
const authRoutes = ["/login", "/register"];

export function proxy(request: NextRequest) {
  const sessionUserId = request.cookies.get("sessionUserId")?.value;
  const pathname = request.nextUrl.pathname;

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  const isAuthRoute = authRoutes.includes(pathname);

  if (isProtectedRoute && !sessionUserId) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);

    return NextResponse.redirect(loginUrl);
  }

  if (isAuthRoute && sessionUserId) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/cart/:path*",
    "/checkout/:path*",
    "/orders/:path*",
    "/profile",
    "/login",
    "/register",
  ],
};
