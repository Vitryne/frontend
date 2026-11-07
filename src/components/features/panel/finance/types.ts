export type PayoutStatus = "paid" | "scheduled";

export interface FinanceSummary {
  receivedThisMonthInCents: number;
  receivedChangePercent: number;
  commissionsInCents: number;
  averageCommissionPercent: number;
  averageTicketInCents: number;
  averageTicketChangeInCents: number;
  availableBalanceInCents: number;
}

export interface BankAccount {
  bank: string;
  type: string;
  agency: string;
  accountLastDigits: string;
  logo: string;
}

export interface DailyReceipt {
  date: string;
  totalInCents: number;
}

export interface Payout {
  date: string;
  ordersCount: number;
  grossInCents: number;
  commissionInCents: number;
  status: PayoutStatus;
}