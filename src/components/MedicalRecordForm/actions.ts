/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import { z } from "zod";
import { formSchema } from "./schema"; // move schema to a shared file or adjust import
import { medicalRecordService, medicineService } from "@/services";

export async function createMedicalRecord({
  values,
  appointmentId,
}: {
  values: z.infer<typeof formSchema>;
  appointmentId: string;
}) {
  try {
    await medicalRecordService.createMedicalRecord({
      data: values,
      appointmentId,
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: "Something went wrong" };
  }
}

export async function getMedicines() {
  try {
    const { data } = await medicineService.getMedicines();
    const { medicine } = data;

    return { data: medicine, success: true };
  } catch (error) {
    return { success: false, error: "Something went wrong" };
  }
}
