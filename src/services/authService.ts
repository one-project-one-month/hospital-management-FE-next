/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAxiosInstance } from "@/lib/axios";
import { handleHttpError } from "@/lib/httpError";
import { LoginRequest, LoginResponse } from "@/types";

class AuthService {
  async login(data: LoginRequest): Promise<LoginResponse> {
    const axios = await getAxiosInstance();

    try {
      const response = await axios.post<LoginResponse>("/auth/login", data);
      return response.data;
    } catch (error) {
      handleHttpError(error);
    }
  }

  // Add other methods here, e.g., logout, getProfile, etc.
  async logout() {
    try {
      const axios = await getAxiosInstance();
      return axios.post("/auth/logout");
    } catch (error: any) {
      handleHttpError(error);
    }
  }
}

export const authService = new AuthService();
