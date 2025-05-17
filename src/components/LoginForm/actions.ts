/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import { z } from "zod";
import { createSession, deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { authService } from "@/services";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .trim(),
});

export async function login(prevState: any, formData: FormData) {
  const result = loginSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { email, password } = result.data;

  try {
    const response = await authService.login({ email, password });
    const { user } = response.data;
    await createSession({ user });

    return { user, errors: {} }; // success
  } catch (error) {
    return {
      user: undefined,
      errors: {
        email: ["Invalid email or password"],
        password: ["Invalid email or password"],
      },
    };
  }
}

export async function logout() {
  try {
    await deleteSession();
  } catch (error) {
    console.log("Logout Error");
    return;
  }
}
