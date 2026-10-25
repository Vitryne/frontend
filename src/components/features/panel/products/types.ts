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
  images?: string[]
  description?: string
  tags?: string[]
  stock: ProductStock[];
  stockAlertThreshold: number;
  active: boolean;
  featured?: boolean
  ordersCount?: number;
}

export type ProductStatusFilter = "all" | "active" | "inactive";
