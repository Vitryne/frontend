export interface CategoryProduct {
  sku: string;
  name: string;
  image: string;
  priceInCents: number;
  stock: number;
}

export interface Category {
  name: string;
  description: string;
  visible: boolean;
  productsCount: number;
  inStockCount: number;
  salesThisMonth: number;
  revenueThisMonthInCents: number;
  products: CategoryProduct[];
}