/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAxiosInstance } from "@/lib/axios";
import { handleHttpError } from "@/lib/httpError";
import { IAppointmentResponse } from "@/types";

// {
//   doctor_id :'string',
//   date: 'toISOString'
// }

class AppointmentService {
  async getAppointmentByDoctorId({
    doctor_id,
    date,
  }: {
    doctor_id: string;
    date: string;
  }): Promise<IAppointmentResponse> {
    const axios = await getAxiosInstance();

    console.log({
      doctor_id,
      date,
    });

    try {
      const response = await axios.get<IAppointmentResponse>("/appointment", {
        params: {
          doctor_id,
          appointment_date: date,
        },
      });
      return response.data;
    } catch (error: any) {
      handleHttpError(error);
    }
  }
}

export const appointmentService = new AppointmentService();
