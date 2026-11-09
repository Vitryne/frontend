import type {
  Order,
  OrderItem,
  OrderStatus,
} from "@/components/features/panel/orders/types";
import {
  BackendOrderStatus,
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

export const toOrderItems = (
  items: OrderItemResponseDTO[] = [],
): OrderItem[] => {
  if (items.length === 0) {
    return [{ name: "Pedido sem itens" }];
  }

  return items.flatMap((item) => {
    const count = Math.max(1, item.quantity || 1);
    return Array.from({ length: count }, () => ({
      name: item.productName,
      size: item.size || undefined,
    }));
  });
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
    totalInCents: Math.round((dto.totalAmount ?? 0) * 100),
    status,
    createdAt: dto.createdAt,
    ...getStatusTrackingFields(dto.id, status, referenceDate),
  };
};
