/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAxiosInstance } from "@/lib/axios";
import { handleHttpError, HttpError } from "@/lib/httpError";
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
        data,
      );
      return response.data;
    } catch (error: any) {
      handleHttpError(error);
    }
  }
}

export const doctorService = new DoctorService();
export { HttpError };
