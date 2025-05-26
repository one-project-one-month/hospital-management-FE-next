/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import { z } from "zod";
import { formSchema } from "./schema"; // move schema to a shared file or adjust import
import { medicineService } from "@/services";

export async function createMedicine(values: z.infer<typeof formSchema>) {
  try {
    await medicineService.createMedicine(values);
    return { success: true };
  } catch (error) {
    return { success: false, error: "Something went wrong" };
  }
}

export async function updateMedicine({
  values,
  id,
}: {
  values: z.infer<typeof formSchema>;
  id: string | null;
}) {
  try {
    await medicineService.updateMedicine({ data: values, id });
    return { success: true };
  } catch (error) {
    return { success: false, error: "Something went wrong" };
  }
}
