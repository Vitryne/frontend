export interface ProductStock {
  id?: number;
  size: string;
  quantity: number;
  version?: number;
}

export interface Product {
  id?: number;
  sku: string;
  name: string;
  category: string;
  color?: string;
  priceInCents: number;
  image: string;
  images?: string[];
  description?: string;
  tags?: string[];
  stock: ProductStock[];
  stockAlertThreshold: number;
  active: boolean;
  featured?: boolean;
  ordersCount?: number;
  promotion?: ProductPromotion;
}

export interface ProductPromotion {
  priceInCents: number;
  endsAt: string;
}

export type ProductStatusFilter = "all" | "active" | "inactive";
