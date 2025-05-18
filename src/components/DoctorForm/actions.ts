/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import { z } from "zod";
import { doctorFormSchema } from "./schema"; // move schema to a shared file or adjust import
import { doctorService } from "@/services";

export async function createDoctor(values: z.infer<typeof doctorFormSchema>) {
  try {
    await doctorService.createDoctor(values);
    return { success: true };
  } catch (error) {
    return { success: false, error: "Something went wrong" };
  }
}
