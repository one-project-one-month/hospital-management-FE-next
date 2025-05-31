/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAxiosInstance } from "@/lib/axios";
import { handleHttpError } from "@/lib/httpError";
import { IAppointmentCreateRequest, IAppointmentResponse } from "@/types";

class AppointmentService {
  async getAppointments({
    doctor_id,
    patient_profile_id,
    date,
    appointment_status,
  }: {
    doctor_id: string;
    patient_profile_id?: string;
    date: string;
    appointment_status?: "pending" | "confirmed" | "cancelled";
  }): Promise<IAppointmentResponse> {
    const axios = await getAxiosInstance();

    try {
      const response = await axios.get<IAppointmentResponse>("/appointments", {
        params: {
          doctor_id,
          patient_profile_id,
          appointment_date: date,
          status: appointment_status,
        },
      });
      return response.data;
    } catch (error: any) {
      handleHttpError(error);
    }
  }

  async createAppointment(data: IAppointmentCreateRequest): Promise<any> {
    const axios = await getAxiosInstance();

    try {
      const response = await axios.post<any>(`/appointments/receptionist`, {
        ...data,
      });
      return response.data;
    } catch (error: any) {
      handleHttpError(error);
    }
  }

  async confirmAppointment(id: string): Promise<any> {
    const axios = await getAxiosInstance();

    try {
      const response = await axios.put<any>(`/appointments/${id}/confirmed`);
      return response.data;
    } catch (error: any) {
      handleHttpError(error);
    }
  }

  async cancelAppointment(id: string): Promise<any> {
    const axios = await getAxiosInstance();

    try {
      const response = await axios.patch<any>(`/appointments/${id}/cancelled`);
      return response.data;
    } catch (error: any) {
      handleHttpError(error);
    }
  }
}

export const appointmentService = new AppointmentService();
