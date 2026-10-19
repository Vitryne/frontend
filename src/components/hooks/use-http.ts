import axios, { AxiosResponse, AxiosError } from "axios";

export const useHttp = () => {
  const http = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      "Content-Type": "application/json",
    },
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
