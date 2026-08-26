import { NextRequest, NextResponse } from "next/server";

const FILE_PATH = /\.[a-z0-9]+$/i;
const LEGACY_HOSTS = new Set(["vastgoedmakelaarzoeken.be", "www.vastgoedmakelaarzoeken.be"]);

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const migrationTargetHost = process.env.MIGRATION_TARGET_HOST?.trim().toLowerCase();

  // Wordt pas actief wanneer MIGRATION_TARGET_HOST tijdens de domeinmigratie wordt
  // ingesteld. Host- en slashnormalisatie gebeuren dan in één klassieke 301-hop.
  if (
    migrationTargetHost &&
    LEGACY_HOSTS.has(request.nextUrl.hostname.toLowerCase()) &&
    request.nextUrl.hostname.toLowerCase() !== migrationTargetHost
  ) {
    const destination = new URL(request.url);
    destination.protocol = "https:";
    destination.hostname = migrationTargetHost;
    destination.port = "";
    if (pathname.length > 1 && pathname.endsWith("/") && !FILE_PATH.test(pathname)) {
      destination.pathname = pathname.replace(/\/+$/, "");
    }
    return new NextResponse(null, {
      status: 301,
      headers: { Location: destination.toString() },
    });
  }

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
