import type {
  Category,
  CategoryProduct,
} from "@/components/features/panel/categories/types";

export const addProducts = (
  category: Category,
  products: CategoryProduct[],
): Category => ({
  ...category,
  products: [...category.products, ...products],
  productsCount: category.productsCount + products.length,
  inStockCount:
    category.inStockCount +
    products.filter((product) => product.stock > 0).length,
});

export const removeProduct = (
  category: Category,
  product: CategoryProduct,
): Category => ({
  ...category,
  products: category.products.filter((item) => item.sku !== product.sku),
  productsCount: category.productsCount - 1,
  inStockCount: category.inStockCount - (product.stock > 0 ? 1 : 0),
});