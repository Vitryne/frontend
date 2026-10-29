import { formatPrice, formatTimeAgo } from "@/lib/format";
import { ORDER_COLUMNS } from "@/components/features/panel/orders/columns";
import {
  getCourier,
  getInfoLabel,
  getItemsLabel,
} from "@/components/features/panel/orders/labels";
import { Order } from "@/components/features/panel/orders/types";
import ConfirmDeadline from "../confirm-deadline";
import { LuArrowRight, LuCheck, LuClock3 } from "react-icons/lu";
import ButtonSecondary from "@/components/ui/button-secondary";
import ButtonPrimary from "@/components/ui/button-primary";

interface Props {
  order: Order;
  onAdvance: () => void;
  onRefuse: () => void;
}

const OrderRow: React.FC<Props> = ({ order, onAdvance, onRefuse }) => {
  const isNew = order.status === "new";
  const isCompleted = order.status === "completed";
  const column = ORDER_COLUMNS.find((item) => item.status === order.status);
  const infoLabel = getInfoLabel(order);
  const courier = order.courierName && getCourier(order.courierName);
  const price = formatPrice(order.totalInCents);

  return (
    <tr className={`border-t border-border ${isCompleted ? "opacity-60" : ""}`}>
      <td
        className={`py-3 pr-6 pl-5 whitespace-nowrap ${
          isNew ? "shadow-[inset_3px_0_0_var(--color-primary)]" : ""
        }`}
      >
        <p className="text-[13px] font-semibold text-text-primary">
          #{order.id}
        </p>
        <p className="mt-0.5 text-[11px] text-text-tertiary">
          {formatTimeAgo(order.createdAt)}
        </p>
      </td>

      <td className="px-2 py-3">
        <p className="text-[13px] font-medium text-text-primary">
          {order.customerName}
        </p>
        <p className="mt-0.5 text-[12px] text-text-tertiary">
          {getItemsLabel(order)}
        </p>
      </td>

      <td className="px-2 py-3 text-right whitespace-nowrap">
        <span className="text-[13px] font-bold text-text-primary">
          R$ {price.reais}
          <span className="text-[10px">,{price.cents}</span>
        </span>
      </td>

      <td className="px-2 py-3">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-subtle px-2.5 py-1 text-[12px] font-medium whitespace-nowrap text-text-primary">
          <span className={`size-1.5 rounded-full ${column?.dotClass}`} />
          {column?.label}
        </span>
      </td>

      <td className="px-2 py-3">
        <div className="flex items-center gap-3 text-[11px] text-text-secondary">
          {isNew && (
            <ConfirmDeadline createdAt={order.createdAt} className="w-50" />
          )}

          {order.status === "ready" && order.pickupCode && (
            <span className="inline-flex items-center gap-2 rounded-lg bg-primary-soft px-2.5 py-1">
              <span className="text-[9px] font-semibold tracking-wider text-primary uppercase">
                Código
              </span>
              <span className="font-display text-[18px] leading-tight font-bold tracking-[0.3em] text-primary-strong">
                {order.pickupCode}
              </span>
            </span>
          )}

          {infoLabel && (
            <span className="flex items-center gap-1.5 whitespace-nowrap">
              <LuClock3 size={12} className="shrink-0" />
              {infoLabel}
            </span>
          )}

          {order.status === "delivering" && courier && (
            <span className="flex items-center gap-2 whitespace-nowrap">
              <span className="flex size-6 items-center justify-center rounded-full bg-primary-soft-2 text-[10px] font-semibold text-primary-strong">
                {courier.initials}
              </span>
              {courier.shortName} · entregador
            </span>
          )}
        </div>
      </td>

      <td className="py-3 pr-5 pl-2">
        <div className="flex justify-end gap-1.5">
          {isNew && (
            <>
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
            </>
          )}

          {isCompleted && (
            <span className="inline-flex h-8 items-center gap-1.5 text-[12px] font-semibold whitespace-nowrap text-success">
              <LuCheck size={14} />
              Concluido
            </span>
          )}

          {!isNew && !isCompleted && (
            <ButtonSecondary
              title="Avançar status"
              btnIcon={<LuArrowRight size={14} />}
              iconPosition="right"
              onClick={onAdvance}
              className="inline-flex h-8 cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-primary/30 bg-surface px-3 text-[12px] font-semibold whitespace-nowrap text-primary transition-colors hover:bg-primary/5"
            />
          )}
        </div>
      </td>
    </tr>
  );
};

export default OrderRow;
