"use server";
import axios from "axios";
import { getAccessToken } from "./session";

export async function getAxiosInstance() {
  const token = await getAccessToken();

  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });

  // Optional: interceptors
  axiosInstance.interceptors.request.use((config) => {
    return config;
  });

  return axiosInstance;
}
