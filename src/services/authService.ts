/* eslint-disable @typescript-eslint/no-unused-vars */
import { getAxiosInstance } from "@/lib/axios";
import { LoginRequest, LoginResponse } from "@/types";

class AuthService {
  async login(data: LoginRequest): Promise<LoginResponse> {
    const axios = await getAxiosInstance();

    try {
      const response = await axios.post<LoginResponse>("/auth/login", data);
      return response.data;
    } catch (error) {
      throw new Error("Login failed");
    }
  }

  // Add other methods here, e.g., logout, getProfile, etc.
  async logout() {
    const axios = await getAxiosInstance();
    return axios.post("/auth/logout");
  }
}

export const authService = new AuthService();
