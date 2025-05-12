import { NextRequest, NextResponse } from "next/server";
import { UserRole } from "./types";

export async function middleware(request: NextRequest) {
  const role = request.cookies.get("role")?.value || null;
  const { pathname } = request.nextUrl;
  if (role == "null") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Root path redirect logic
  if (pathname === "/") {
    switch (role) {
      case UserRole.Admin:
        return NextResponse.redirect(new URL("/admin", request.url));
      case UserRole.Doctor:
        return NextResponse.redirect(new URL("/doctor", request.url));
      case UserRole.Patient:
        return NextResponse.redirect(new URL("/patient", request.url));
      case UserRole.Receptionist:
        return NextResponse.redirect(new URL("/receptionist", request.url));

      default:
        return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }

  return NextResponse.next(); // Allow request to continue
}

export const config = {
  matcher: ["/", "/unauthorized"],
};
