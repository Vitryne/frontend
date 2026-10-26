import { formatPrice, formatTime, formatTimeAgo } from "@/lib/format";
import { Order } from "@/components/features/panel/orders/types";
import { LuArrowRight, LuCheck, LuClock3 } from "react-icons/lu";
import ButtonSecondary from "@/components/ui/button-secondary";
import ButtonPrimary from "@/components/ui/button-primary";
import ConfirmDeadline from "@/components/features/panel/orders/components/kanban/confirm-deadline";

interface Props {
  order: Order;
  isDragging?: boolean;
  onAdvance: () => void;
  onRefuse: () => void;
}

const getItemsLabel = (order: Order) => {
  const [first, ...rest] = order.items;
  const parts = [first.name];

  if (first.size) parts.push(first.size);
  if (rest.length === 1) parts.push("+1 item");
  if (rest.length > 1) parts.push(`+${rest.length} itens`);

  return parts.join(" · ");
};

const getInfoLabel = (order: Order) => {
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

const getCourier = (name: string) => {
  const names = name.split(" ");
  const firstName = names[0];
  const lastName = names[names.length - 1];

  return {
    initials: `${firstName[0]}${lastName[0]}`,
    shortName: `${firstName} ${lastName[0]}.`,
  };
};

const OrderCard: React.FC<Props> = ({
  order,
  isDragging,
  onAdvance,
  onRefuse,
}) => {
  const isNew = order.status === "new";
  const isCompleted = order.status === "completed";
  const infoLabel = getInfoLabel(order);
  const courier = order.courierName && getCourier(order.courierName);
  const price = formatPrice(order.totalInCents);

  return (
    <div
      className={`rounded-xl border p-3 ${
        isDragging ? "shadow-lg" : "shadow-sm"
      } ${
        isNew
          ? "border-primary/40 bg-surface shadow-primary/10"
          : isCompleted
            ? "border-border bg-surface/60"
            : "border-border bg-surface"
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-[13px] font-semibold text-text-primary">
          #{order.id}
        </span>
        <span className="text-[13px] font-medium text-text-primary">
          {formatTimeAgo(order.createdAt)}
        </span>
      </div>

      <p className="mt-1 text-[12px] font-medium text-text-primary">
        {order.customerName}
      </p>
      <p className="mt-0.5 truncate text-[12px] text-text-tertiary">
        {getItemsLabel(order)}
      </p>

      {isNew && <ConfirmDeadline createdAt={order.createdAt} />}

      {infoLabel && (
        <p className="mt-2.5 flex items-center gap-1.5 text-[11px] text-text-secondary">
          <LuClock3 size={12} className="shrink-0" />
          {infoLabel}
        </p>
      )}

      {order.status === "ready" && order.pickupCode && (
        <div className="mt-2.5 inline-flex flex-col rounded-lg bg-primary-soft px-3 py-2">
          <span className="text-[9px] font-semibold tracking-wider text-primary uppercase">
            Código de coleta
          </span>
          <span className="font-display text-[20px] leading-tight font-bold tracking-[0.3em] text-primary-strong">
            {order.pickupCode}
          </span>
        </div>
      )}

      {order.status === "delivering" && courier && (
        <div className="mt-2 flex items-center gap-2 text-[11px] text-text-secondary">
          <span className="flex size-6 items-center justify-center rounded-full bg-primary-soft-2 text-[10px] font-semibold text-primary-strong">
            {courier.initials}
          </span>
          {courier.shortName} · entregador
        </div>
      )}

      <div className="mt-3 flex items-center justify-between gap-2">
        <span className="text-[13px] font-bold text-text-primary">
          R$ {price.reais}
        </span>

        {isNew && (
          <div className="flex gap-1.5">
            <ButtonSecondary
              title="Recusar"
              onClick={onRefuse}
              className="inline-flex h-8 cursor-pointer items-center justify-center rounded-lg border border-border-strong bg-surface px-3 text-[12px] font-semibold text-danger transition-colors hover:bg-danger-soft"
            />
            <ButtonPrimary
              title="Aceitar"
              onClick={onAdvance}
              className="inline-flex h-8 cursor-pointer items-center justify-center rounded-lg bg-primary px-3.5 text-[12px] font-semibold text-white transition-colors hover:bg-primary-hover"
            />
          </div>
        )}

        {isCompleted && <LuCheck size={14} className="text-success" />}

        {!isNew && !isCompleted && (
          <ButtonSecondary
            title="Avançar"
            btnIcon={<LuArrowRight size={14} />}
            iconPosition="right"
            onClick={onAdvance}
            className="inline-flex h-8 cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-primary/30 bg-surface px-3 text-[12px] font-semibold text-primary transition-colors hover:bg-primary/5"
          />
        )}
      </div>
    </div>
  );
};

export default OrderCard;
