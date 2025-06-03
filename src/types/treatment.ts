import { IAppointment, IBaseResponse } from ".";

export interface ITreatment {
  title: string;
  description: string;
  appointments: IAppointment[];
}

export interface ITreatmentResponse {
  id?: string;
  title: string;
  description: string;
  appointments: IAppointment[];
}

export interface ITreatmentResponse extends IBaseResponse {
  data: {
    treatments: ITreatmentResponse[];
  };
}
