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

export async function getAppointmentData({
  doctor_id,
  patient_profile_id,
  date,
  status,
}: {
  doctor_id: string;
  patient_profile_id: string;
  date: string;
  status: "pending" | "confirmed" | "cancelled";
}) {
  try {
    const { data } = await appointmentService.getAppointmentByDoctorId({
      doctor_id,
      patient_profile_id,
      date,
      appointment_status: status,
    });

    return { data: data.appointment, success: true };
  } catch (error) {
    return { success: false, error: "Something went wrong" };
  }
}

export async function confirmAppointment(id: string) {
  try {
    const { data } = await appointmentService.confirmAppointment(id);

    return { data: data.appointment, success: true };
  } catch (error) {
    return { success: false, error: "Something went wrong" };
  }
}

export async function cancelAppointment(id: string) {
  try {
    const { data } = await appointmentService.cancelAppointment(id);

    return { data: data.appointment, success: true };
  } catch (error) {
    return { success: false, error: "Something went wrong" };
  }
}
