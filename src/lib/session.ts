import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { User } from "@/types";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function createSession({
  user,
  token,
}: {
  user: User;
  token: string;
}) {
  const { id, roles } = user;
  const primaryRole = roles[0];

  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt({
    userId: id,
    role: primaryRole,
    token,
    expiresAt,
  });

  (await cookies()).set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
  });
}

export async function deleteSession() {
  (await cookies()).delete("session");
}

type SessionPayload = {
  userId: number;
  role: string;
  token: string;
  expiresAt: Date;
};

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log("Failed to verify session");
    console.log(error);
  }
}

export async function getAccessToken(): Promise<string | null> {
  const sessionCookie = (await cookies()).get("session")?.value;
  if (!sessionCookie) return null;

  const payload = await decrypt(sessionCookie);
  if (!payload) return null;

  return payload.token as string;
}
