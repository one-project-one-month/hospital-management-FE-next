import { IBaseResponse } from ".";

export interface IMedicine {
  id?: string;
  name: string;
  stock: number;
  price: number;
  expired_at: string;
}

export interface IMedicineResponse extends IBaseResponse {
  data: {
    medicine: IMedicine[];
  };
}
