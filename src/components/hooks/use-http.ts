import axios, { AxiosResponse, AxiosError } from "axios";
import { getToken } from "@/lib/auth-storage";

export const useHttp = () => {
  const http = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  http.interceptors.request.use((config) => {
    const token = getToken();
    
    if (token && !config.url?.startsWith("/auth/")) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  http.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
      console.error("Erro na requisição:", error);
      return Promise.reject(error);
    },
  );

  return http;
};
