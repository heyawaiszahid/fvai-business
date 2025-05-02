import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(request) {
  const token = await getToken({ req: request });
  const { pathname } = request.nextUrl;
  const protectedPaths = ["/dashboard", "/settings", "/questionnaire", "/questionnaire/valuation", "/free-course"];
  const authPaths = ["/signin", "/signup", "/join-free-course", "/reset-password"];

  if (authPaths.includes(pathname)) {
    if (token) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  if (protectedPaths.some((path) => pathname.startsWith(path))) {
    if (!token) {
      return NextResponse.redirect(new URL("/signup", request.url));
    }
  }

  return NextResponse.next();
}
