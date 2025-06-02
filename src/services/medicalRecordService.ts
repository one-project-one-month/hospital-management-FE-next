/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAxiosInstance } from "@/lib/axios";
import { handleHttpError } from "@/lib/httpError";
import { IMedicalRecord, IMedicalRecordResponse } from "@/types";

class MedicalRecordService {
  async getMedicalRecords(): Promise<IMedicalRecordResponse> {
    const axios = await getAxiosInstance();

    try {
      const response =
        await axios.get<IMedicalRecordResponse>("/medical-records");
      return response.data;
    } catch (error: any) {
      handleHttpError(error);
    }
  }

  async createMedicalRecord({
    data,
    appointmentId,
  }: {
    data: IMedicalRecord;
    appointmentId: string;
  }): Promise<any> {
    const axios = await getAxiosInstance();

    try {
      const response = await axios.post<any>(
        `/appointments/${appointmentId}/medical-records`,
        {
          ...data,
        },
      );
      return response.data;
    } catch (error: any) {
      handleHttpError(error);
    }
  }

  async deleteMedicalRecord(id: string): Promise<any> {
    const axios = await getAxiosInstance();

    try {
      const response = await axios.delete<any>(`/medicalRecords/${id}`);
      return response.data;
    } catch (error: any) {
      handleHttpError(error);
    }
  }
}

export const medicalRecordService = new MedicalRecordService();
