import type { Product } from "@/components/features/panel/products/types";
import {
  ProductManagementResponseDTO,
  ProductStatus,
} from "@/interfaces/product-interface";

export const DEFAULT_PRODUCT_IMAGE_URL = "https://placehold.co/400x520.png";

export const formatSku = (id: number) => `VTR-${String(id).padStart(4, "0")}`;

export const toProduct = (dto: ProductManagementResponseDTO): Product => {
  const photos = dto.photoUrls?.filter(Boolean) ?? [];

  return {
    id: dto.id,
    sku: formatSku(dto.id),
    name: dto.name,
    category: dto.type,
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
      .map(({ size, quantity }) => ({ size, quantity })),
    stockAlertThreshold: dto.stockWarningThreshold ?? 3,
    active: dto.status === ProductStatus.ACTIVE,
  };
};
