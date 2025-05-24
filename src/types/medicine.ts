import { IBaseResponse } from ".";

export interface IMedicine {
  id?: string;
  name: string;
  stock: number;
  expired: string;
}

export interface IMedicineResponse extends IBaseResponse {
  data: IMedicine[];
}
