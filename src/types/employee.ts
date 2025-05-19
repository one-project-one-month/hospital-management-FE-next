import { IBaseResponse } from ".";

/* eslint-disable @typescript-eslint/no-empty-object-type */
export interface IDoctor extends IEmployee {
  specialty: string[];
  license_number: string;
  education: string;
  experience_years: number;
  biography: string;
  phone: string;
  address: string;
}

export interface IReceptionist extends IEmployee {}

export interface IEmployee {
  name: string;
  email: string;
  password: string;
  id?: string;
}

export interface IDoctorResponse extends IBaseResponse {
  data: IDoctor[];
}
