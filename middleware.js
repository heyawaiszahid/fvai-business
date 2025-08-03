import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(request) {
  const token = await getToken({ req: request });
  const { pathname } = request.nextUrl;

  const publicPaths = ["/signin", "/signup", "/reset-password", "/join-free-course"];
  if (publicPaths.includes(pathname)) {
    if (token) {
      if (pathname !== "/dashboard") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    }
    return NextResponse.next();
  }

  const protectedPaths = ["/dashboard", "/settings", "/questionnaire", "/questionnaire/valuation"];
  if (protectedPaths.some((path) => pathname.startsWith(path))) {
    if (!token) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }
  }

  if (token?.role === 2) {
    const adminRestrictedPaths = ["/", "/questionnaire", "/questionnaire/valuation"];

    if (adminRestrictedPaths.includes(pathname)) {
      if (pathname !== "/dashboard") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    }
  }

  return NextResponse.next();
}
