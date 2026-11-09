export enum ProductStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export interface AvailableSizeDTO {
  id: number;
  size: string;
  quantity: number;
  available: boolean;
}

export interface StockManagementResponseDTO {
  id: number;
  productId: number;
  size: string;
  quantity: number;
  available: boolean;
  version: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductManagementResponseDTO {
  id: number;
  name: string;
  description: string | null;
  price: number;
  promotionalPrice: number | null;
  finalPrice: number;
  type: string;
  color: string | null;
  rating: number | null;
  status: ProductStatus;
  newProduct: boolean;
  onSale: boolean;
  photoUrls: string[] | null;
  availableProduct: boolean;
  availableSizes: AvailableSizeDTO[];
  promotionalStartDate: string | null;
  promotionalEndDate: string | null;
  stockWarningThreshold: number | null;
  createdAt: string;
  updatedAt: string;
  stocks: StockManagementResponseDTO[];
}

export interface StatusRequestDTO {
  status: ProductStatus;
}

export interface CreateStockRequestDTO {
  size: string;
  quantity: number;
}

export interface CreateProductRequestDTO {
  name: string;
  description: string;
  price: number;
  type: string;
  color: string | null;
  stockWarningThreshold: number | null;
  photoUrls: string[];
  stocks: CreateStockRequestDTO[];
}

export interface EditProductRequestDTO {
  name: string;
  description: string;
  price: number;
  type: string;
  color: string;
  stockWarningThreshold: number | null;
  photoUrls: string[];
}

export interface ReplenishStockRequestDTO {
  quantity: number;
}

export interface AdjustStockRequestDTO {
  quantity: number;
  version: number;
}
