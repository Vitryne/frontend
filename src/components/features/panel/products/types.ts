export interface ProductStock {
  size: string;
  quantity: number;
}

export interface Product {
  sku: string;
  name: string;
  category: string;
  priceInCents: number;
  image: string;
  stock: ProductStock[];
  stockAlertThreshold: number;
  active: boolean;
  ordersCount?: number;
}

export type ProductStatusFilter = "all" | "active" | "inactive";
