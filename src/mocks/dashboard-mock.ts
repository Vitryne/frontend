import type {
  CriticalStockItem,
  DashboardKpis,
  HourlyOrders,
  SalesPoint,
  TopProduct,
} from "@/components/features/panel/dashboard/types";

const localDate = (daysBack: number) => {
  const date = new Date();
  date.setDate(date.getDate() - daysBack);

  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${date.getFullYear()}-${month}-${day}`;
};

export const KPIS_MOCK: DashboardKpis = {
  salesTodayInCents: 849000,
  salesTodayChangePercent: 18,
  ordersToday: 47,
  ordersTodayChange: 6,
  averageTicketInCents: 18063,
  averageTicketChangeInCents: 1200,
  acceptanceRatePercent: 94,
  acceptanceRateChangePercent: -2,
  newCustomersThisMonth: 186,
  averageLtvInCents: 184200,
  recurrencePercent: 62,
  storeRating: 4.7,
  reviewsCount: 128,
  newReviewsToday: 2,
};

export const SALES_MOCK: SalesPoint[] = Array.from(
  { length: 90 },
  (_, index) => {
    const daysBack = 89 - index;

    if (daysBack === 0) {
      return { date: localDate(0), totalInCents: KPIS_MOCK.salesTodayInCents };
    }

    const trend = 420000 + index * 3000;
    const wave = Math.sin(index * 1.3) * 60000 + Math.sin(index * 0.4) * 40000;

    return {
      date: localDate(daysBack),
      totalInCents: Math.round(trend + wave),
    };
  },
);

export const TOP_PRODUCTS_MOCK: TopProduct[] = [
  {
    name: "Vestido midi seda",
    image: "/p_vestido_seda.jpg",
    salesCount: 32,
    revenueInCents: 924800,
  },
  {
    name: "Blazer oversize",
    image: "/p_blazer_oversize.jpg",
    salesCount: 21,
    revenueInCents: 942900,
  },
  {
    name: "Camisa de linho",
    image: "/p_camisa_linho.jpg",
    salesCount: 18,
    revenueInCents: 394200,
  },
  {
    name: "Saia plissada midi",
    image: "/p_saia_plissada.jpg",
    salesCount: 14,
    revenueInCents: 250600,
  },
];

export const CRITICAL_STOCK_MOCK: CriticalStockItem[] = [
  {
    name: "Tênis off-white",
    image: "/p_tenis_branco.jpg",
    size: "39",
    quantity: 0,
  },
  {
    name: "Jaqueta de couro",
    image: "/p_jaqueta_couro.jpg",
    size: "P",
    quantity: 1,
  },
  {
    name: "Vestido midi floral",
    image: "/p_vestido_floral.jpg",
    size: "GG",
    quantity: 2,
  },
  {
    name: "Blazer oversize",
    image: "/p_blazer_oversize.jpg",
    size: "G",
    quantity: 2,
  },
];

export const HOURLY_ORDERS_MOCK: HourlyOrders[] = [
  { hour: 9, today: 4, average: 3 },
  { hour: 10, today: 5, average: 4 },
  { hour: 11, today: 2, average: 3 },
  { hour: 12, today: 5, average: 5 },
  { hour: 13, today: 8, average: 6 },
  { hour: 14, today: 6, average: 5 },
  { hour: 15, today: 2, average: 3 },
  { hour: 16, today: 7, average: 5 },
  { hour: 17, today: 5, average: 5 },
  { hour: 18, today: 3, average: 4 },
];
