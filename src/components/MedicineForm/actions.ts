/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import { z } from "zod";
import { formSchema } from "./schema"; // move schema to a shared file or adjust import

export async function createMedicine(values: z.infer<typeof formSchema>) {
  try {
    // await receptionistService.createDoctor(values);
    return { success: true };
  } catch (error) {
    return { success: false, error: "Something went wrong" };
  }
}
