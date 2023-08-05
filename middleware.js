import { NextResponse } from "next/server";

export function middleware(request) {
  const isLogin = request.cookies.get("access_token");

  if (request.nextUrl.pathname === "/" && isLogin) {
    return NextResponse.redirect(new URL("/me", request.nextUrl));
  }

  if (request.nextUrl.pathname.startsWith("/me") && !isLogin) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
}
