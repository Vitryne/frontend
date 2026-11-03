import { RegistrationResponseDTO , RegisterStoreRequestDTO } from "@/interfaces/register-interface";
import { useHttp } from "@/components/hooks/use-http";
const RegisterService = () => {
    const http = useHttp();
    
    return {
        registerStore: (registerStoreRequestDTO: RegisterStoreRequestDTO) => { 
            return http.post<RegistrationResponseDTO>("/auth/register/merchant", registerStoreRequestDTO).then((r) => r.data);
        }
    }
}

export default RegisterService;