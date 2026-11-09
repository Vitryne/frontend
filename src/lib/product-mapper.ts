import type {
  Product,
  ProductStock,
} from "@/components/features/panel/products/types";
import {
  CreateProductRequestDTO,
  EditProductRequestDTO,
  ProductManagementResponseDTO,
  ProductStatus,
} from "@/interfaces/product-interface";

export const DEFAULT_PRODUCT_IMAGE_URL = "https://placehold.co/400x520.png";
export const DEFAULT_PRODUCT_COLOR = "Única";

export const formatSku = (id: number) => `VTR-${String(id).padStart(4, "0")}`;

export const parseProductId = (skuOrId: string): number | null => {
  const digits = skuOrId.replace(/\D/g, "");
  if (!digits) return null;
  const parsed = Number(digits);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
};

const resolvePhotoUrls = (urls: string[]): string[] => {
  const valid = urls
    .map((url) => url.trim())
    .filter((url) => url.length > 0 && !url.startsWith("blob:"));

  return valid.length > 0 ? valid : [DEFAULT_PRODUCT_IMAGE_URL];
};

export const toProduct = (dto: ProductManagementResponseDTO): Product => {
  const photos = dto.photoUrls?.filter(Boolean) ?? [];

  return {
    id: dto.id,
    sku: formatSku(dto.id),
    name: dto.name,
    category: dto.type,
    color: dto.color ?? undefined,
    priceInCents: Math.round(dto.price * 100),
    promotion:
      dto.onSale && dto.promotionalPrice !== null && dto.promotionalEndDate
        ? {
            priceInCents: Math.round(dto.promotionalPrice * 100),
            endsAt: dto.promotionalEndDate.slice(0, 10),
          }
        : undefined,
    image: photos[0] ?? DEFAULT_PRODUCT_IMAGE_URL,
    images: photos.length > 0 ? photos : [DEFAULT_PRODUCT_IMAGE_URL],
    description: dto.description ?? undefined,
    stock: [...(dto.stocks ?? [])]
      .sort((a, b) => a.id - b.id)
      .map(({ id, size, quantity, version }) => ({
        id,
        size,
        quantity,
        version,
      })),
    stockAlertThreshold: dto.stockWarningThreshold ?? 3,
    active: dto.status === ProductStatus.ACTIVE,
  };
};

export interface ProductFormValues {
  name: string;
  description: string;
  category: string;
  color?: string;
  priceInCents: number;
  stockAlertThreshold: number;
  photoUrls: string[];
  stock: ProductStock[];
}

export const toCreateProductDTO = (
  values: ProductFormValues,
): CreateProductRequestDTO => ({
  name: values.name.trim(),
  description: values.description.trim(),
  price: Number((values.priceInCents / 100).toFixed(2)),
  type: values.category.trim(),
  color: values.color?.trim() || DEFAULT_PRODUCT_COLOR,
  stockWarningThreshold: values.stockAlertThreshold,
  photoUrls: resolvePhotoUrls(values.photoUrls),
  stocks: values.stock.map((item) => ({
    size: item.size.trim(),
    quantity: item.quantity,
  })),
});

export const toEditProductDTO = (
  values: ProductFormValues,
): EditProductRequestDTO => ({
  name: values.name.trim(),
  description: values.description.trim(),
  price: Number((values.priceInCents / 100).toFixed(2)),
  type: values.category.trim(),
  color: values.color?.trim() || DEFAULT_PRODUCT_COLOR,
  stockWarningThreshold: values.stockAlertThreshold,
  photoUrls: resolvePhotoUrls(values.photoUrls),
});
