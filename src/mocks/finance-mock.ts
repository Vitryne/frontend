import type {
  BankAccount,
  DailyReceipt,
  FinanceSummary,
  Payout,
} from "@/components/features/panel/finance/types";

const localDate = (daysBack: number) => {
  const date = new Date();
  date.setDate(date.getDate() - daysBack);

  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${date.getFullYear()}-${month}-${day}`;
};

export const FINANCE_SUMMARY_MOCK: FinanceSummary = {
  receivedThisMonthInCents: 3891040,
  receivedChangePercent: 18,
  commissionsInCents: 466800,
  averageCommissionPercent: 12,
  averageTicketInCents: 18452,
  averageTicketChangeInCents: 1200,
  availableBalanceInCents: 1284700,
};

export const BANK_ACCOUNT_MOCK: BankAccount = {
  bank: "Bradesco",
  type: "Conta corrente",
  agency: "3421",
  accountLastDigits: "8842",
  logo: "/bradesco.jpg",
};

export const DAILY_RECEIPTS_MOCK: DailyReceipt[] = [
  { date: localDate(6), totalInCents: 420000 },
  { date: localDate(5), totalInCents: 560000 },
  { date: localDate(4), totalInCents: 330000 },
  { date: localDate(3), totalInCents: 690000 },
  { date: localDate(2), totalInCents: 980000 },
  { date: localDate(1), totalInCents: 840000 },
  { date: localDate(0), totalInCents: 290000 },
];

export const PAYOUTS_MOCK: Payout[] = [
  {
    date: localDate(-2),
    ordersCount: 12,
    grossInCents: 238000,
    commissionInCents: 28560,
    status: "scheduled",
  },
  {
    date: localDate(-1),
    ordersCount: 8,
    grossInCents: 164000,
    commissionInCents: 19680,
    status: "scheduled",
  },
  {
    date: localDate(0),
    ordersCount: 15,
    grossInCents: 312000,
    commissionInCents: 37440,
    status: "paid",
  },
  {
    date: localDate(1),
    ordersCount: 10,
    grossInCents: 198000,
    commissionInCents: 23760,
    status: "paid",
  },
  {
    date: localDate(2),
    ordersCount: 6,
    grossInCents: 119000,
    commissionInCents: 14280,
    status: "paid",
  },
  {
    date: localDate(3),
    ordersCount: 11,
    grossInCents: 221000,
    commissionInCents: 26520,
    status: "paid",
  },
];