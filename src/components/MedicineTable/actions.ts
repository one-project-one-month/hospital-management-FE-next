/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import { doctorService } from "@/services";

export async function getMedicines() {
  try {
    // const { data } = await doctorService.getDoctors();
    const data = [
      {
        id: "1",
        name: "Paracetamol",
        stock: 100,
        expired: "2025-12-31",
      },
      {
        id: "2",
        name: "Paracetamol",
        stock: 100,
        expired: "2025-12-31",
      },
      {
        id: "3",
        name: "Paracetamol",
        stock: 100,
        expired: "2025-12-31",
      },
      {
        id: "4",
        name: "Paracetamol",
        stock: 100,
        expired: "2025-12-31",
      },
      {
        id: "5",
        name: "Paracetamol",
        stock: 100,
        expired: "2025-12-31",
      },
    ];
    return { data, success: true };
  } catch (error) {
    return { success: false, error: "Something went wrong" };
  }
}
