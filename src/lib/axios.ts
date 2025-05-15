// lib/axios.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: interceptors for auth tokens or error handling
axiosInstance.interceptors.request.use((config) => {
  // You can attach tokens here if needed
  return config;
});

export default axiosInstance;
