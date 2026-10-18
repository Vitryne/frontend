import type { Product } from "@/components/features/panel/products/types";

export const isCriticalStock = (quantity: number, alertThreshold: number) =>
    quantity < alertThreshold;

export const hasCriticalStock = (product: Product) =>
    product.active &&
    product.stock.some((item) =>
        isCriticalStock(item.quantity, product.stockAlertThreshold),
    );
