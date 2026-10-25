export type OrderStatus = "new" | "confirmed" | "preparing" | "ready" | "delivering" | "completed";

export interface OrderItem {
  name: string;
  size?: string;
}

export interface Order {
  id: string;
  customerName: string;
  items: OrderItem[];
  totalInCents: number;
  status: OrderStatus;
  createdAt: string;
  readyBy?: string;
  deliverBy?: string;
  pickupCode?: string;
  courierStatus?: string;
  courierName?: string;
}