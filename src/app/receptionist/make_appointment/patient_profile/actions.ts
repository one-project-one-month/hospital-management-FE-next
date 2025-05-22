/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import { doctorService, appointmentService } from "@/services";

export async function getDoctors() {
  try {
    const { data } = await doctorService.getDoctors();

    return { data, success: true };
  } catch (error) {
    return { success: false, error: "Something went wrong" };
  }
}

// TODO
export async function getAppointmentData({
  doctor_id,
  date,
}: {
  doctor_id: string;
  date: string;
}) {
  try {
    const { data } = await appointmentService.getAppointmentByDoctorId({
      doctor_id,
      date,
    });

    return { data, success: true };
  } catch (error) {
    return { success: false, error: "Something went wrong" };
  }
}
