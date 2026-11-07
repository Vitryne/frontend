import type { DateRange } from "react-day-picker";

export type OrderStatus =
  | "new"
  | "confirmed"
  | "preparing"
  | "ready"
  | "delivering"
  | "completed";

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
}

export interface Order {
  id: string;
  customerName: string;
  items: OrderItem[];
  totalInCents: number;
  status: OrderStatus;
  createdAt: string;
  paymentMethod: PaymentMethod;
  hasCoupon: boolean;
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