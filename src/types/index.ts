export * from "./user";
export * from "./auth";
export * from "./employee";
export * from "./patient";

export interface IBaseResponse {
  status: string;
  statusCode: number;
  message: string;
}
