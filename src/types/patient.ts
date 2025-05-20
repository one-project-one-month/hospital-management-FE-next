import { IBaseResponse } from ".";

export interface IPatient {
  id: string;
  user_id: number;
  name: string;
  age: number;
  gender: string;
  date_of_birth: string;
  phone: string;
  address: string;
  relation: string;
  blood_type: string;
}

export interface IPatientResponse extends IBaseResponse {
  data: IPatient[];
}
