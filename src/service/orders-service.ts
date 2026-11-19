import { useHttp } from "@/components/hooks/use-http";
import type {
  Order,
  OrderStatus,
} from "@/components/features/panel/orders/types";
import {
  BackendOrderStatus,
  OrderResponseDTO,
  UpdateOrderStatusRequestDTO,
} from "@/interfaces/orders-interface";
import {
  parseOrderId,
  toBackendOrderStatus,
  toOrder,
} from "@/lib/orders-mapper";

const OrdersService = () => {
  const http = useHttp();

  return {
    listStoreOrders: () => {
      return http.get<OrderResponseDTO[]>("/store/orders").then((r) => r.data);
    },
    getStoreOrder: (orderId: number) => {
      return http
        .get<OrderResponseDTO>(`/store/orders/${orderId}`)
        .then((r) => r.data);
    },
    updateStoreOrderStatus: (
      orderId: number,
      request: UpdateOrderStatusRequestDTO,
    ) => {
      return http
        .patch<OrderResponseDTO>(`/store/orders/${orderId}/status`, request)
        .then((r) => r.data);
    },
  };
};

export const getOrders = async (): Promise<Order[]> => {
  const data = await OrdersService().listStoreOrders();
  return data.map(toOrder);
};

export const updateOrderStatus = async (
  id: string,
  status: OrderStatus,
): Promise<Order> => {
  const orderId = parseOrderId(id);
  if (!orderId) {
    throw new Error("ID do pedido inválido");
  }

  const updated = await OrdersService().updateStoreOrderStatus(orderId, {
    status: toBackendOrderStatus(status),
  });

  return toOrder(updated);
};

export const refuseOrder = async (id: string): Promise<void> => {
  const orderId = parseOrderId(id);
  if (!orderId) {
    throw new Error("ID do pedido inválido");
  }

  await OrdersService().updateStoreOrderStatus(orderId, {
    status: BackendOrderStatus.CANCELED,
  });
};

export default OrdersService;
