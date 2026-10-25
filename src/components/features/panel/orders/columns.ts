import type { OrderStatus } from "@/components/features/panel/orders/types";

export const CONFIRM_WINDOW_MINUTES = 30;

export const ORDER_COLUMNS: {
  status: OrderStatus;
  title: string;
  dotClass: string;
}[] = [
  { status: "new", title: "Novos pedidos", dotClass: "bg-primary" },
  { status: "confirmed", title: "Confirmados", dotClass: "bg-plum" },
  { status: "preparing", title: "Em preparo", dotClass: "bg-warning" },
  { status: "ready", title: "Pronto p/ coleta", dotClass: "bg-info-strong" },
  { status: "delivering", title: "Em entrega", dotClass: "bg-info" },
  { status: "completed", title: "Concluídos", dotClass: "bg-success" },
];

export const getConfirmDeadline = (createdAt: string) =>
  new Date(
    new Date(createdAt).getTime() + CONFIRM_WINDOW_MINUTES * 60000,
  ).toISOString();