/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAxiosInstance } from "@/lib/axios";
import { handleHttpError } from "@/lib/httpError";
import { IDoctor, IDoctorResponse } from "@/types";

interface ICreateDoctorResponse {
  message: string;
  doctor: IDoctor;
}

class DoctorService {
  async getDoctors(): Promise<IDoctorResponse> {
    const axios = await getAxiosInstance();

    try {
      const response = await axios.get<IDoctorResponse>("/admin/doctors");
      return response.data;
    } catch (error: any) {
      handleHttpError(error);
    }
  }

  async createDoctor(data: IDoctor): Promise<ICreateDoctorResponse> {
    const axios = await getAxiosInstance();

    try {
      const response = await axios.post<ICreateDoctorResponse>(
        "/admin/createDoctor",
        {
          ...data,
          availability: {
            Mon: ["09:00", "11:00", "13:00", "15:00"],
            Tue: ["09:00", "11:00", "13:00", "15:00"],
            Wed: ["09:00", "11:00", "13:00", "15:00"],
            Thu: ["09:00", "11:00", "13:00", "15:00"],
            Fri: ["09:00", "11:00", "13:00", "15:00"],
            Sat: ["09:00", "11:00", "13:00", "15:00"],
            Sun: ["09:00", "11:00", "13:00", "15:00"],
          },
        },
      );
      return response.data;
    } catch (error: any) {
      handleHttpError(error);
    }
  }
}

export const doctorService = new DoctorService();
