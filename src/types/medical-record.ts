import { IAppointment, IBaseResponse } from ".";

export interface IMedicalRecord {
  record_type_id: string;
  title: string;
  description: string;
  recorded_at: string;
  medicines: Medicine[];
}
export interface IMedicalRecordResponse {
  id?: string;
  title: string;
  record_type_id: string;
  appointment_id: number;
  description: string;
  recorded_at: string;
  medicine_price: string;
  appointment: IAppointment;
  medicines: Medicine[];
}

interface Medicine {
  medicine_id: string;
  quantity: number;
}

export interface IMedicalRecordResponse extends IBaseResponse {
  data: {
    medicalRecords: IMedicalRecordResponse[];
  };
}
