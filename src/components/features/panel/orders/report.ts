import { ORDER_COLUMNS } from "@/components/features/panel/orders/columns";
import { PAYMENT_OPTIONS } from "@/components/features/panel/orders/filters";
import type { Order } from "@/components/features/panel/orders/types";
import { formatMoney } from "@/lib/format";

export const buildOrdersCsv = (orders: Order[]) => {
  const header = [
    "Pedido",
    "Data",
    "Cliente",
    "Itens",
    "Total",
    "Status",
    "Pagamento",
    "Cupom",
  ];

  const rows = orders.map((order) => [
    order.id,
    new Date(order.createdAt).toLocaleString("pt-BR"),
    order.customerName,
    order.items
      .map((item) => (item.size ? `${item.name} (${item.size})` : item.name))
      .join(" + "),
    formatMoney(order.totalInCents),
    ORDER_COLUMNS.find((column) => column.status === order.status)?.label ?? "",
    PAYMENT_OPTIONS.find((option) => option.value === order.paymentMethod)
      ?.label ?? "",
    order.hasCoupon ? "Sim" : "Não",
  ]);

  return [header, ...rows]
    .map((row) =>
      row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(";"),
    )
    .join("\n");
};

export const downloadCsv = (content: string, fileName: string) => {
  const blob = new Blob([`\uFEFF${content}`], {
    type: "text/csv;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
};
