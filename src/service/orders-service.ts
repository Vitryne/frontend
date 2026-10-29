import type {
  Order,
  OrderStatus,
} from "@/components/features/panel/orders/types";
import { ORDERS_MOCK } from "@/mocks/orders-mock";

const RESPONSE_DELAY = 600;

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const minutesFromNow = (minutes: number) =>
  new Date(Date.now() + minutes * 60000).toISOString();

let orders: Order[] = [...ORDERS_MOCK];

const getStatusData = (order: Order, status: OrderStatus): Partial<Order> => {
  switch (status) {
    case "confirmed":
    case "preparing":
      return { readyBy: order.readyBy ?? minutesFromNow(30) };
    case "ready":
      return {
        pickupCode:
          order.pickupCode ?? String(Math.floor(1000 + Math.random() * 9000)),
        courierStatus: order.courierStatus ?? "Buscando entregador",
      };
    case "delivering":
      return {
        courierName: order.courierName ?? "Rafa Moreira",
        deliverBy: order.deliverBy ?? minutesFromNow(20),
      };
    default:
      return {};
  }
};

export const getOrders = async (): Promise<Order[]> => {
  await wait(RESPONSE_DELAY);

  return orders.map((order) => ({ ...order }));
};

export const updateOrderStatus = async (
  id: string,
  status: OrderStatus,
): Promise<Order> => {
  await wait(RESPONSE_DELAY);

  const order = orders.find((item) => item.id === id);

  if (!order) throw new Error("Pedido não encontrado");

  const updated = { ...order, ...getStatusData(order, status), status };
  orders = orders.map((item) => (item.id === id ? updated : item));

  return { ...updated };
};

export const refuseOrder = async (id: string): Promise<void> => {
  await wait(RESPONSE_DELAY);

  orders = orders.filter((item) => item.id !== id);
};
