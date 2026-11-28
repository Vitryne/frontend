import type {
  ItemCategory,
  Order,
  OrderItem,
  OrderStatus,
  PaymentMethod,
} from "@/components/features/panel/orders/types";
import {
  BackendOrderStatus,
  BackendPaymentMethod,
  DeliveryAddressDTO,
  OrderItemResponseDTO,
  OrderResponseDTO,
} from "@/interfaces/orders-interface";

const READY_IN_MINUTES = 30;
const DELIVER_IN_MINUTES = 20;

const addMinutes = (isoDate: string, minutes: number): string => {
  const baseTime = new Date(isoDate).getTime();
  const timestamp = Number.isNaN(baseTime) ? Date.now() : baseTime;
  return new Date(timestamp + minutes * 60_000).toISOString();
};

const formatPickupCode = (orderId: number): string => {
  const code = ((orderId * 1597) % 9000) + 1000;
  return String(code);
};

const toCents = (value?: number | null) => Math.round((value ?? 0) * 100);

export const parseOrderId = (orderId: string): number | null => {
  const digits = orderId.replace(/\D/g, "");
  if (!digits) return null;
  const parsed = Number(digits);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
};

export const toFrontendOrderStatus = (
  status: BackendOrderStatus | string,
): OrderStatus => {
  switch (status.toUpperCase()) {
    case BackendOrderStatus.NEW:
    case "PENDING":
      return "new";
    case BackendOrderStatus.CONFIRMED:
      return "confirmed";
    case BackendOrderStatus.PREPARING:
      return "preparing";
    case BackendOrderStatus.READY:
      return "ready";
    case BackendOrderStatus.OUT_FOR_DELIVERY:
    case "DELIVERING":
      return "delivering";
    case BackendOrderStatus.DELIVERED:
    case "COMPLETED":
      return "completed";
    default:
      return "confirmed";
  }
};

export const toBackendOrderStatus = (
  status: OrderStatus,
): BackendOrderStatus => {
  switch (status) {
    case "new":
      return BackendOrderStatus.NEW;
    case "confirmed":
      return BackendOrderStatus.CONFIRMED;
    case "preparing":
      return BackendOrderStatus.PREPARING;
    case "ready":
      return BackendOrderStatus.READY;
    case "delivering":
      return BackendOrderStatus.OUT_FOR_DELIVERY;
    case "completed":
      return BackendOrderStatus.DELIVERED;
  }
};

export const inferItemCategory = (productName: string): ItemCategory => {
  const lower = productName.toLowerCase();
  if (lower.includes("vestido")) return "dresses";
  if (lower.includes("saia")) return "skirts";
  if (lower.includes("camisa") || lower.includes("camiseta")) return "shirts";
  if (lower.includes("calça") || lower.includes("calca")) return "pants";
  if (lower.includes("blazer")) return "blazers";
  if (lower.includes("jaqueta")) return "jackets";
  if (lower.includes("moletom")) return "sweatshirts";
  if (
    lower.includes("tênis") ||
    lower.includes("tenis") ||
    lower.includes("sapato")
  ) {
    return "sneakers";
  }
  return "shirts";
};

export const toFrontendPaymentMethod = (
  method?: BackendPaymentMethod | string,
): PaymentMethod => {
  if (!method) return "pix";
  return method.toUpperCase() === "PIX" ? "pix" : "credit_card";
};

export const toOrderItems = (
  items: OrderItemResponseDTO[] = [],
): OrderItem[] => {
  if (items.length === 0) {
    return [
      {
        name: "Pedido sem itens",
        category: "shirts",
        quantity: 0,
        priceInCents: 0,
      },
    ];
  }

  return items.map((item) => ({
    name: item.productName,
    size: item.size || undefined,
    category: inferItemCategory(item.productName),
    quantity: Math.max(1, item.quantity || 1),
    priceInCents: toCents(item.unitPrice),
  }));
};

const toDeliveryArea = (address?: DeliveryAddressDTO | null) => {
  if (!address) return undefined;

  const parts = [address.neighborhood, address.city].filter(Boolean);

  return parts.length > 0 ? parts.join(" - ") : undefined;
};

export const getStatusTrackingFields = (
  orderId: number,
  status: OrderStatus,
  referenceDate: string,
): Partial<Order> => {
  switch (status) {
    case "confirmed":
    case "preparing":
      return {
        readyBy: addMinutes(referenceDate, READY_IN_MINUTES),
      };
    case "ready":
      return {
        pickupCode: formatPickupCode(orderId),
        courierStatus: "Buscando entregador",
      };
    case "delivering":
      return {
        courierName: "Entregador Parceiro",
        deliverBy: addMinutes(referenceDate, DELIVER_IN_MINUTES),
      };
    default:
      return {};
  }
};

export const toOrder = (dto: OrderResponseDTO): Order => {
  const status = toFrontendOrderStatus(dto.status);
  const referenceDate = dto.updatedAt || dto.createdAt;

  return {
    id: String(dto.id),
    customerName: dto.customerName?.trim() || `Cliente #${dto.userId}`,
    items: toOrderItems(dto.items),
    totalInCents: toCents(dto.totalAmount),
    shippingInCents: toCents(dto.shippingAmount),
    status,
    createdAt: dto.createdAt,
    updatedAt: referenceDate,
    paymentMethod: toFrontendPaymentMethod(dto.payment?.method),
    hasCoupon: false,
    deliveryArea: toDeliveryArea(dto.deliveryAddress),
    ...getStatusTrackingFields(dto.id, status, referenceDate),
  };
};
