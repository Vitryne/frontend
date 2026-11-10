import { useHttp } from "@/components/hooks/use-http";
import {
  ProductManagementResponseDTO,
  StatusRequestDTO,
} from "@/interfaces/product-interface";

const ProductService = () => {
  const http = useHttp();

  return {
    listManagedProducts: () => {
      return http
        .get<ProductManagementResponseDTO[]>("/product/manager")
        .then((r) => r.data);
    },
    alterStatus: (id: number, statusRequest: StatusRequestDTO) => {
      return http
        .patch<ProductManagementResponseDTO>(
          `/product/manager/${id}/status`,
          statusRequest,
        )
        .then((r) => r.data);
    },
  };
};

export default ProductService;
