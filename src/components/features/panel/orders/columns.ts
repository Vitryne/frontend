import type { OrderStatus } from "@/components/features/panel/orders/types";

export const CONFIRM_WINDOW_MINUTES = 30;

export const ORDER_COLUMNS: {
  status: OrderStatus;
  title: string;
  label: string;
  dotClass: string;
}[] = [
  { status: "new", title: "Novos pedidos", label: "Novo", dotClass: "bg-primary" },
  { status: "confirmed", title: "Confirmados", label: "Confirmado", dotClass: "bg-plum" },
  { status: "preparing", title: "Em preparo", label: "Em preparo", dotClass: "bg-warning" },
  { status: "ready", title: "Pronto p/ coleta", label: "Pronto p/ coleta", dotClass: "bg-info-strong" },
  { status: "delivering", title: "Em entrega", label: "Em entrega", dotClass: "bg-info" },
  { status: "completed", title: "Concluídos", label: "Concluído", dotClass: "bg-success" },
];

export const getConfirmDeadline = (createdAt: string) =>
  new Date(
    new Date(createdAt).getTime() + CONFIRM_WINDOW_MINUTES * 60000,
  ).toISOString();

export const getNextStatus = (status: OrderStatus) => {
  const index = ORDER_COLUMNS.findIndex((column) => column.status === status);

  return ORDER_COLUMNS[index + 1]?.status;
};
