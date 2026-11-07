export type SalesPeriod = 7 | 14 | 30 | 90;

export interface SalesPoint {
  date: string;
  totalInCents: number;
}

export interface TopProduct {
  name: string;
  image: string;
  salesCount: number;
  revenueInCents: number;
}

export interface DashboardKpis {
  salesTodayInCents: number;
  salesTodayChangePercent: number;
  ordersToday: number;
  ordersTodayChange: number;
  averageTicketInCents: number;
  averageTicketChangeInCents: number;
  acceptanceRatePercent: number;
  acceptanceRateChangePercent: number;
  newCustomersThisMonth: number;
  averageLtvInCents: number;
  recurrencePercent: number;
  storeRating: number;
  reviewsCount: number;
  newReviewsToday: number;
}

export interface CriticalStockItem {
  name: string;
  image: string;
  size: string;
  quantity: number;
}

export interface HourlyOrders {
  hour: number;
  today: number;
  average: number;
}
