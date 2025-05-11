export interface IUser {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export enum UserRole {
  "admin",
  "doctor",
  "receptionist",
  "patient",
}
