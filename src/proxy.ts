import { NextRequest, NextResponse } from "next/server";

const FILE_PATH = /\.[a-z0-9]+$/i;

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.length <= 1 || !pathname.endsWith("/") || FILE_PATH.test(pathname)) {
    return NextResponse.next();
  }

  const destination = new URL(request.url);
  destination.pathname = pathname.replace(/\/+$/, "");
  return new NextResponse(null, {
    status: 301,
    headers: { Location: destination.toString() },
  });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image).*)"],
};
