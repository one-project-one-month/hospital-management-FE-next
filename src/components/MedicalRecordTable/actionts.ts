/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import { medicalRecordService } from "@/services";

export async function getMedicalRecords() {
  try {
    const { data } = await medicalRecordService.getMedicalRecords();
    return { data: data.medicalRecords, success: true };
  } catch (error) {
    return { success: false, error: "Something went wrong" };
  }
}
