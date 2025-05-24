export * from "./user";
export * from "./auth";
export * from "./employee";
export * from "./patient";
export * from "./appointment";
export * from "./medicine";

export interface IBaseResponse {
  status: string;
  statusCode: number;
  message: string;
}
