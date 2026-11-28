import { ORDER_COLUMNS } from "@/components/features/panel/orders/columns";
import type {
  Order,
  OrderItem,
  OrderStatus,
} from "@/components/features/panel/orders/types";
import { formatTime, formatTimeAgo } from "@/lib/format";

const HISTORY_LABELS: Record<OrderStatus, string> = {
  new: "Pedido recebido",
  confirmed: "Pedido confirmado",
  preparing: "Em preparo",
  ready: "Pronto para coleta",
  delivering: "Saiu para entrega",
  completed: "Pedido entregue",
};

export const getItemLabel = (item: OrderItem) => {
  const name = item.quantity > 1 ? `${item.quantity}× ${item.name}` : item.name;
  return item.size ? `${name} - ${item.size}` : name;
};

export const getItemsLabel = (order: Order) => {
  const [first, ...rest] = order.items;
  const parts = [getItemLabel(first)];

  if (rest.length === 1) parts.push("+1 item");
  if (rest.length > 1) parts.push(`+${rest.length} itens`);

  return parts.join(" - ");
};

export const getInfoLabel = (order: Order) => {
  switch (order.status) {
    case "confirmed":
    case "preparing":
      return order.readyBy && `Pronto até ${formatTime(order.readyBy)}`;
    case "ready":
      return order.courierStatus;
    case "delivering":
      return order.deliverBy && `Entrega às ${formatTime(order.deliverBy)}`;
  }
};

export const getOrderHistory = (order: Order) => {
  const currentIndex = ORDER_COLUMNS.findIndex(
    (column) => column.status === order.status,
  );

  const steps: { label: string; time?: string; done: boolean }[] =
    ORDER_COLUMNS.slice(0, currentIndex + 1).map((column, index) => ({
      label: HISTORY_LABELS[column.status],
      time:
        index === 0
          ? formatTimeAgo(order.createdAt)
          : index === currentIndex
            ? formatTimeAgo(order.updatedAt)
            : undefined,
      done: true,
    }));

  const nextStep =
    order.status === "new" ? "Aguardando sua confirmação" : getInfoLabel(order);

  if (nextStep) {
    steps.push({
      label: nextStep,
      time: order.status === "new" ? "agora" : undefined,
      done: false,
    });
  }

  return steps;
};

export const getPaymentInfo = (order: Order) => {
  if (order.paymentMethod === "pix") {
    return {
      title: "Pix - pagamento aprovado",
      description: "Em caso de recusa, o valor é estornado na hora",
    };
  }

  return order.status === "new"
    ? {
        title: "Cartão de crédito - pré-autorizado",
        description: "A cobrança é capturada quando você confirma o pedido",
      }
    : {
        title: "Cartão de crédito - cobrança capturada",
        description: "O valor foi confirmado na aceitação do pedido",
      };
};

export const getCourier = (name: string) => {
  const names = name.split(" ");
  const firstName = names[0];
  const lastName = names[names.length - 1];

  return {
    initials: `${firstName[0]}${lastName[0]}`,
    shortName: `${firstName} ${lastName[0]}.`,
  };
};
