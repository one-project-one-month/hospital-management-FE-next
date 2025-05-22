/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAxiosInstance } from "@/lib/axios";
import { IPatientResponse } from "@/types";

class PatientService {
  async getPatients(): Promise<IPatientResponse> {
    const axios = await getAxiosInstance();

    try {
      const response = await axios.get<IPatientResponse>("/admin/patients");

      return response.data;
    } catch (error: any) {
      console.log(error);

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

export const patientService = new PatientService();
