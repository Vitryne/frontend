import type { Order } from "@/components/features/panel/orders/types";
import { ORDERS_MOCK } from "@/mocks/orders-mock";

const RESPONSE_DELAY = 600;

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const orders: Order[] = [...ORDERS_MOCK];

export const getOrders = async (): Promise<Order[]> => {
  await wait(RESPONSE_DELAY);
  return orders.map((order) => ({ ...order }));
};