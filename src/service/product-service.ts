import { useHttp } from "@/components/hooks/use-http";
import {
  AdjustStockRequestDTO,
  CreateProductRequestDTO,
  CreateStockRequestDTO,
  EditProductRequestDTO,
  ProductManagementResponseDTO,
  ReplenishStockRequestDTO,
  StatusRequestDTO,
  StockManagementResponseDTO,
} from "@/interfaces/product-interface";

const ProductService = () => {
  const http = useHttp();

  return {
    listManagedProducts: () => {
      return http
        .get<ProductManagementResponseDTO[]>("/product/manager")
        .then((r) => r.data);
    },
    findByIdManager: (id: number) => {
      return http
        .get<ProductManagementResponseDTO>(`/product/manager/${id}`)
        .then((r) => r.data);
    },
    createProduct: (request: CreateProductRequestDTO) => {
      return http
        .post<ProductManagementResponseDTO>("/product/manager", request)
        .then((r) => r.data);
    },
    editProduct: (id: number, request: EditProductRequestDTO) => {
      return http
        .put<ProductManagementResponseDTO>(`/product/manager/${id}`, request)
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
    addStock: (productId: number, request: CreateStockRequestDTO) => {
      return http
        .post<StockManagementResponseDTO>(
          `/product/manager/${productId}/stocks`,
          request,
        )
        .then((r) => r.data);
    },
    replenishStock: (
      productId: number,
      stockId: number,
      request: ReplenishStockRequestDTO,
    ) => {
      return http
        .post<StockManagementResponseDTO>(
          `/product/manager/${productId}/stocks/${stockId}/replenishments`,
          request,
        )
        .then((r) => r.data);
    },
    adjustStock: (
      productId: number,
      stockId: number,
      request: AdjustStockRequestDTO,
    ) => {
      return http
        .patch<StockManagementResponseDTO>(
          `/product/manager/${productId}/stocks/${stockId}`,
          request,
        )
        .then((r) => r.data);
    },
  };
};

export default ProductService;
