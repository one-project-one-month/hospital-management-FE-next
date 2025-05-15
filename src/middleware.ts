import { UserRole } from "./types";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./lib/session";

type Session = {
  userId: string;
  role: UserRole;
};

// Define which roles can access which route prefixes
const roleBasedAccess: Record<string, UserRole[]> = {
  "/admin": [UserRole.Admin],
  "/doctor": [UserRole.Doctor],
  "/patient": [UserRole.Patient],
  "/receptionist": [UserRole.Receptionist],
  "/unauthorized": [
    UserRole.Admin,
    UserRole.Doctor,
    UserRole.Patient,
    UserRole.Receptionist,
  ],
};

const publicRoutes = ["/login"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const cookie = (await cookies()).get("session")?.value;
  const session = cookie ? ((await decrypt(cookie)) as Session) : null;

  const isPublicRoute = publicRoutes.includes(path);

  // Redirect unauthenticated users from protected pages
  const protectedPrefixes = Object.keys(roleBasedAccess);
  const matchedPrefix = protectedPrefixes.find((prefix) =>
    path.startsWith(prefix),
  );

  if (matchedPrefix) {
    if (!session?.userId) {
      return NextResponse.redirect(new URL("/login", req.nextUrl));
    }

    const allowedRoles = roleBasedAccess[matchedPrefix];
    if (!allowedRoles.includes(session.role)) {
      return NextResponse.redirect(new URL("/unauthorized", req.nextUrl));
    }
  }

  // Redirect authenticated users away from public routes (e.g., login)
  if (isPublicRoute && session?.userId) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  // Handle root `/` redirection based on role
  if (path === "/" && session?.role) {
    switch (session.role) {
      case UserRole.Admin:
        return NextResponse.redirect(new URL("/admin", req.url));
      case UserRole.Doctor:
        return NextResponse.redirect(new URL("/doctor", req.url));
      case UserRole.Patient:
        return NextResponse.redirect(new URL("/patient", req.url));
      case UserRole.Receptionist:
        return NextResponse.redirect(new URL("/receptionist", req.url));
      default:
        return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
  }

  return NextResponse.next();
}
