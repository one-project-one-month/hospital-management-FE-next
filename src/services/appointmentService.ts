/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAxiosInstance } from "@/lib/axios";
import { handleHttpError } from "@/lib/httpError";
import { IAppointmentCreateRequest, IAppointmentResponse } from "@/types";

class AppointmentService {
  async getAppointmentByDoctorId({
    doctor_id,
    date,
  }: {
    doctor_id: string;
    date: string;
  }): Promise<IAppointmentResponse> {
    const axios = await getAxiosInstance();

    try {
      const response = await axios.get<IAppointmentResponse>("/appointments", {
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

  async createAppointment(data: IAppointmentCreateRequest): Promise<any> {
    const axios = await getAxiosInstance();
    console.log(data);

    try {
      const response = await axios.post<any>("/appointments/receptionist", {
        ...data,
      });
      return response.data;
    } catch (error: any) {
      handleHttpError(error);
    }
  }
}

export const appointmentService = new AppointmentService();
