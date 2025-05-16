// /services/AuthService.ts
import axios from "@/lib/axios";
import { LoginRequest, LoginResponse } from "@/types";

class AuthService {
  async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await axios.post<LoginResponse>("/auth/login", data);
    return response.data;
  }

  // Add other methods here, e.g., logout, getProfile, etc.
  async logout() {
    return axios.post("/auth/logout");
  }
}

export const authService = new AuthService();
