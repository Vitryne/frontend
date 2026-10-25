import type { Product, ProductStock } from "@/components/features/panel/products/types";

export const isCriticalStock = (quantity: number, alertThreshold: number) =>
  quantity < alertThreshold;

export const hasCriticalStock = (product: Product) =>
  product.active &&
  product.stock.some((item) =>
    isCriticalStock(item.quantity, product.stockAlertThreshold),
  );


export const getTotal = (stock: ProductStock[]) =>
  stock.reduce((sum, item) => sum + item.quantity, 0)