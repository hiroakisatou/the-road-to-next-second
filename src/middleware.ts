import { getSessionCookie } from "better-auth/cookies";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { setCookiesByKey } from "@/lib/cookies";

import { signInPath } from "@/path";

const middleware = async (request: NextRequest) => {
  const sessionCookie = getSessionCookie(request);

  const protectedRouds = [
    "/tickets",
    "/tickets/:path*",
    "/tickets/:path*/edit",
    "/tickets/:path*/delete",
  ];
  const isProtectedRoute = protectedRouds.some((route) =>
    request.nextUrl.pathname.startsWith(route),
  );

  if (isProtectedRoute && !sessionCookie) {
    await setCookiesByKey(
      "toast",
      "You need to be signed in to access this page",
    );
    return NextResponse.redirect(new URL(signInPath(), request.url));
  }
  return NextResponse.next();
};

export const config = {
  matcher: [
    "/tickets",
    "/tickets/:path*",
    "/tickets/:path*/edit",
    "/tickets/:path*/delete",
  ],
};

export default middleware;
