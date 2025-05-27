/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import { patientService } from "@/services";

export async function getPatients() {
  try {
    const { data } = await patientService.getPatients();

    return { data: data.patients, success: true };
  } catch (error) {
    return { success: false, error: "Something went wrong" };
  }
}
