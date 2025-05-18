/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAxiosInstance } from "@/lib/axios";
import { IDoctor } from "@/types";

class DoctorService {
  async createDoctor(data: IDoctor): Promise<any> {
    const axios = await getAxiosInstance();

    try {
      const response = await axios.post<any>("/admin/createDoctor", data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export const doctorService = new DoctorService();
