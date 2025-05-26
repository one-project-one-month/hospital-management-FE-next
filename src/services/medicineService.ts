/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAxiosInstance } from "@/lib/axios";
import { handleHttpError } from "@/lib/httpError";
import { IMedicine, IMedicineResponse } from "@/types";

class MedicineService {
  async getMedicines(): Promise<IMedicineResponse> {
    const axios = await getAxiosInstance();

    try {
      const response = await axios.get<IMedicineResponse>("/medicines");
      return response.data;
    } catch (error: any) {
      handleHttpError(error);
    }
  }

  async createMedicine(data: IMedicine): Promise<any> {
    const axios = await getAxiosInstance();

    try {
      const response = await axios.post<any>("/medicines", {
        ...data,
      });
      return response.data;
    } catch (error: any) {
      handleHttpError(error);
    }
  }

  async updateMedicine({
    data,
    id,
  }: {
    data: IMedicine;
    id: string | null;
  }): Promise<any> {
    const axios = await getAxiosInstance();

    try {
      const response = await axios.put<any>(`/medicines/${id}`, {
        ...data,
      });
      return response.data;
    } catch (error: any) {
      handleHttpError(error);
    }
  }

  async deleteMedicine(id: string): Promise<any> {
    const axios = await getAxiosInstance();

    try {
      const response = await axios.delete<any>(`/medicines/${id}`);
      return response.data;
    } catch (error: any) {
      handleHttpError(error);
    }
  }
}

export const medicineService = new MedicineService();
