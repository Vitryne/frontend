import axios, { AxiosResponse, AxiosError } from "axios";
import { clearToken, getToken } from "@/lib/auth-storage";

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
      const isAuthRoute = error.config?.url?.startsWith("/auth/");

      if (
        error.response?.status === 401 &&
        !isAuthRoute &&
        typeof window !== "undefined"
      ) {
        clearToken();
        window.location.replace("/login");
      }

      console.error("Erro na requisição:", error);
      return Promise.reject(error);
    },
  );

  return http;
};
