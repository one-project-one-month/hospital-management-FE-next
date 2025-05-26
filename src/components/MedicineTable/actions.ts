/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import { medicineService } from "@/services";

export async function getMedicines() {
  try {
    const { data } = await medicineService.getMedicines();
    const { medicine } = data;

    return { data: medicine, success: true };
  } catch (error) {
    return { success: false, error: "Something went wrong" };
  }
}
