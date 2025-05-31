import { IBaseResponse, IDoctor } from ".";

export interface IAppointment {
  doctor_profile_id?: number;
  appointment_date: string;
  appointment_time: string;
  status: string;
  notes: string;
  doctor?: IDoctor;
  patient_profile_name?: string;
  id?: number;
}

export interface IAppointmentResponse extends IBaseResponse {
  data: {
    appointment: IAppointment[];
  };
}

export interface IAppointmentCreateRequest {
  patient_profile_id: string;
  doctor_profile_id: string;
  appointment_date: string;
  appointment_time: string;
  notes: string;
}

// type Status
