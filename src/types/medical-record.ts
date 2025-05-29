import { IAppointment, IBaseResponse, IMedicine } from ".";

export interface IMedicalRecord {
  record_type_id: string;
  title: string;
  description: string;
  recorded_at: string;
  medicines: IMedicine[];
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
  medicines: IMedicine[];
}

export interface IMedicalRecordResponse extends IBaseResponse {
  data: {
    medicalRecords: IMedicalRecordResponse[];
  };
}
