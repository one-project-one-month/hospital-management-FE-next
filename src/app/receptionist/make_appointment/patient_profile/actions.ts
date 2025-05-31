/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import { doctorService, appointmentService } from "@/services";
import { IAppointmentCreateRequest } from "@/types";

export async function getDoctors() {
  try {
    const { data } = await doctorService.getDoctors();

    return { data, success: true };
  } catch (error) {
    return { success: false, error: "Something went wrong" };
  }
}

export async function getAppointmentData({
  doctor_id,
  date,
}: {
  doctor_id: string;
  date: string;
}) {
  try {
    const { data } = await appointmentService.getAppointments({
      doctor_id,
      date,
    });

    return { data: data.appointment, success: true };
  } catch (error) {
    return { success: false, error: "Something went wrong" };
  }
}

export async function createAppointment(
  appointmentData: IAppointmentCreateRequest,
) {
  try {
    const { data } = await appointmentService.createAppointment({
      ...appointmentData,
    });

    return { data, success: true };
  } catch (error) {
    return { success: false, error: "Something went wrong" };
  }
}
