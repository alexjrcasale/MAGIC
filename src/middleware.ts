import { NextResponse, type NextRequest } from "next/server";
import { can } from "@/lib/rbac";
import { routeToResource } from "@/lib/route-rbac";
import type { RoleCode } from "@/types/rbac";

const PUBLIC_PATHS = ["/login", "/api/health"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  const role = request.cookies.get("mt_role")?.value as RoleCode | undefined;

  if (!role) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const rule = routeToResource.find((r) => pathname.startsWith(r.prefix));
  if (rule && !can(role, rule.resource, "view")) {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};
