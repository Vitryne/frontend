import { useHttp } from "@/components/hooks/use-http";
import { LoginRequestDTO, LoginResponseDTO } from "@/interfaces/login-interface";

const LoginService = () => {
  const http = useHttp();
  return {
    login: (loginRequest: LoginRequestDTO) => {
      return http.post<LoginResponseDTO>("/auth/login", loginRequest).then((r) => r.data);
    }
  };
};

export default LoginService;
