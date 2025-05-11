export interface IUser {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export enum UserRole {
  Admin = "admin",
  Doctor = "doctor",
  Receptionist = "receptionist",
  Patient = "patient",
}
