import type { DateRange } from "react-day-picker";

export type OrderStatus =
  "new" | "confirmed" | "preparing" | "ready" | "delivering" | "completed";

export type PaymentMethod = "pix" | "credit_card";

export type ItemCategory =
  | "dresses"
  | "skirts"
  | "shirts"
  | "pants"
  | "blazers"
  | "jackets"
  | "sweatshirts"
  | "sneakers";

export interface OrderItem {
  name: string;
  size?: string;
  category: ItemCategory;
  quantity: number;
  priceInCents: number;
}

export interface Order {
  id: string;
  customerName: string;
  items: OrderItem[];
  totalInCents: number;
  shippingInCents: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  paymentMethod: PaymentMethod;
  hasCoupon: boolean;
  deliveryArea?: string;
  readyBy?: string;
  deliverBy?: string;
  pickupCode?: string;
  courierStatus?: string;
  courierName?: string;
}

export type OrdersView = "kanban" | "list";

export type OrderPeriod = "today" | "7d" | "30d" | "custom";

export interface OrderFilters {
  statuses: OrderStatus[];
  period: OrderPeriod | null;
  dateRange: DateRange | undefined;
  valueRange: [number, number];
  paymentMethods: PaymentMethod[];
  categories: ItemCategory[];
  onlyWithCoupon: boolean;
  onlyExpiring: boolean;
}
