import { getConfirmDeadline } from "@/components/features/panel/orders/columns";
import type {
  ItemCategory,
  Order,
  OrderFilters,
  OrderPeriod,
  PaymentMethod,
} from "@/components/features/panel/orders/types";
import { getRemainingSeconds } from "@/components/features/panel/orders/use-countdown";
import type { DateRange } from "react-day-picker";

export const EMPTY_FILTERS: OrderFilters = {
  statuses: [],
  period: null,
  dateRange: undefined,
  valueRange: [0, 1000],
  paymentMethods: [],
  categories: [],
  onlyWithCoupon: false,
  onlyExpiring: false,
};

export const PAYMENT_OPTIONS: { value: PaymentMethod; label: string }[] = [
  { value: "pix", label: "Pix" },
  { value: "credit_card", label: "Cartão de crédito" },
];

export const CATEGORY_OPTIONS: { value: ItemCategory; label: string }[] = [
  { value: "dresses", label: "Vestidos" },
  { value: "skirts", label: "Saias" },
  { value: "shirts", label: "Camisas" },
  { value: "pants", label: "Calças" },
  { value: "blazers", label: "Blazers" },
  { value: "jackets", label: "Jaquetas" },
  { value: "sweatshirts", label: "Moletons" },
  { value: "sneakers", label: "Tênis" },
];

export const getPeriodRange = (period: OrderPeriod): DateRange | undefined => {
  if (period === "custom") return undefined;

  const days = { today: 0, "7d": 6, "30d": 29 }[period];
  const from = new Date();
  from.setDate(from.getDate() - days);

  return { from, to: new Date() };
};

export const filterOrders = (orders: Order[], filters: OrderFilters) =>
  orders.filter((order) => {
    const createdAt = new Date(order.createdAt);
    const total = order.totalInCents / 100;
    const { from, to } = filters.dateRange ?? {};

    if (filters.statuses.length > 0 && !filters.statuses.includes(order.status))
      return false;

    if (from && createdAt < new Date(new Date(from).setHours(0, 0, 0, 0)))
      return false;

    if (to && createdAt > new Date(new Date(to).setHours(23, 59, 59, 999)))
      return false;

    if (total < filters.valueRange[0] || total > filters.valueRange[1])
      return false;

    if (
      filters.paymentMethods.length > 0 &&
      !filters.paymentMethods.includes(order.paymentMethod)
    )
      return false;

    if (
      filters.categories.length > 0 &&
      !order.items.some((item) => filters.categories.includes(item.category))
    )
      return false;

    if (filters.onlyWithCoupon && !order.hasCoupon) return false;

    if (
      filters.onlyExpiring &&
      !(
        order.status === "new" &&
        getRemainingSeconds(getConfirmDeadline(order.createdAt)) < 10 * 60
      )
    )
      return false;

    return true;
  });

  export const toggleValue = <T>(list: T[], value: T) =>
  list.includes(value)
    ? list.filter((item) => item !== value)
    : [...list, value];