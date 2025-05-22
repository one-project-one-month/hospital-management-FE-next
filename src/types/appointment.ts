import { IBaseResponse } from ".";

export interface IAppointment {
  doctor_profile_id?: number;
  appointment_date: string;
  appointment_time: string;
  status: string;
  notes: string;
}

export interface IAppointmentResponse extends IBaseResponse {
  data: IAppointment[];
}

export interface IAppointmentCreateRequest {
  patient_profile_id: string;
  doctor_profile_id: number;
  appointment_date: string;
  appointment_time: string;
  status: string;
  notes: string;
}
