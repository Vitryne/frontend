import type { Order } from "@/components/features/panel/orders/types";
import { formatTime } from "@/lib/format";

export const getItemsLabel = (order: Order) => {
  const [first, ...rest] = order.items;
  const parts = [first.name];

  if (first.size) parts.push(first.size);
  if (rest.length === 1) parts.push("+1 item");
  if (rest.length > 1) parts.push(`+${rest.length} itens`);

  return parts.join(" · ");
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

export const getCourier = (name: string) => {
  const names = name.split(" ");
  const firstName = names[0];
  const lastName = names[names.length - 1];

  return {
    initials: `${firstName[0]}${lastName[0]}`,
    shortName: `${firstName} ${lastName[0]}.`,
  };
};