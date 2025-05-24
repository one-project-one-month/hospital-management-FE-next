/* eslint-disable @typescript-eslint/no-explicit-any */
export class HttpError extends Error {
  status?: number;
  data?: any;
  request?: any;

  constructor(message: string, status?: number, data?: any, request?: any) {
    super(message);
    this.name = "HttpError";
    this.status = status;
    this.data = data;
    this.request = request;
  }
}

export function handleHttpError(error: any): never {
  if (error.response) {
    throw new HttpError(
      error.response.data?.message || "Server Error",
      error.response.status,
      error.response.data,
    );
  } else if (error.request) {
    throw new HttpError(
      "No response from server",
      undefined,
      undefined,
      error.request,
    );
  } else {
    throw new HttpError(error.message || "Unexpected error occurred");
  }
}
