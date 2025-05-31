/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import { medicalRecordService, appointmentService } from "@/services";

export async function getAppointmentData() {
  try {
    const { data } = await appointmentService.getAppointments({
      doctor_id: "",
      patient_profile_id: "",
      date: "",
      appointment_status: "confirmed",
    });

    return { data: data.appointment || [], success: true };
  } catch (error) {
    return { success: false, error: "Something went wrong" };
  }
}

export async function getTreatments() {
  try {
    // const { data } = await medicalRecordService.getMedicalRecords();
    const data = {
      treatments: [
        {
          id: "1",
          title: "Treatment 1",
          description: "description",
          appointments: [],
        },
      ],
    };

    return { data: data.treatments || [], success: true };
  } catch (error) {
    return { success: false, error: "Something went wrong" };
  }
}
