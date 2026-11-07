import type {
  DashboardKpis,
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