/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAxiosInstance } from "@/lib/axios";
import { IDoctor, IDoctorResponse } from "@/types";

class DoctorService {
  async getDoctors(): Promise<IDoctorResponse> {
    const axios = await getAxiosInstance();

    try {
      const response = await axios.get<IDoctorResponse>("/admin/doctors");

      return response.data;
    } catch (error: any) {
      if (error.response) {
        // Server responded with a status code out of the 2xx range
        throw {
          message: error.response.data?.message || "Server Error",
          status: error.response.status,
          data: error.response.data,
        };
      } else if (error.request) {
        // No response received from server
        throw {
          message: "No response from server",
          request: error.request,
        };
      } else {
        // Other errors (e.g. setup issues)
        throw {
          message: error.message || "Unexpected error occurred",
        };
      }
    }
  }

  async createDoctor(data: IDoctor): Promise<any> {
    const axios = await getAxiosInstance();

    try {
      const response = await axios.post<any>("/admin/createDoctor", {
        ...data,
      });

      return response.data;
    } catch (error: any) {
      if (error.response) {
        // Server responded with a status code out of the 2xx range
        throw {
          message: error.response.data?.message || "Server Error",
          status: error.response.status,
          data: error.response.data,
        };
      } else if (error.request) {
        // No response received from server
        throw {
          message: "No response from server",
          request: error.request,
        };
      } else {
        // Other errors (e.g. setup issues)
        throw {
          message: error.message || "Unexpected error occurred",
        };
      }
    }
  }
}

export const doctorService = new DoctorService();
