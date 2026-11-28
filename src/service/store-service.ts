import { useHttp } from "@/components/hooks/use-http";
import { StoreProfileResponseDTO } from "@/interfaces/store-interface";

const StoreService = () => {
  const http = useHttp();

  return {
    getMyStore: () => {
      return http.get<StoreProfileResponseDTO>("/store/me").then((r) => r.data);
    },
  };
};

export default StoreService;
