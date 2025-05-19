/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import { doctorService } from "@/services";

export async function getDoctors() {
  try {
    const { data } = await doctorService.getDoctors();
    return { data, success: true };
  } catch (error) {
    return { success: false, error: "Something went wrong" };
  }
}
