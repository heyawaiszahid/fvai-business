import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(request) {
  const token = await getToken({ req: request });
  const { pathname, searchParams } = request.nextUrl;

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

  if (pathname === "/questionnaire/valuation" && !searchParams.has("qid")) {
    return NextResponse.redirect(new URL("/questionnaire", request.url));
  }

  if (token?.role === 1 || token?.role === 2) {
    const teamRestrictedPaths = ["/", "/questionnaire"];

    if (teamRestrictedPaths.includes(pathname)) {
      if (pathname !== "/dashboard") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    }
  }

  return NextResponse.next();
}
