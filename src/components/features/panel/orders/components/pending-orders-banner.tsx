import {
  CONFIRM_WINDOW_MINUTES,
  getConfirmDeadline,
} from "@/components/features/panel/orders/columns";
import type { Order } from "@/components/features/panel/orders/types";
import {
  getRemainingSeconds,
  useNow,
} from "@/components/features/panel/orders/use-countdown";
import { formatCountdown } from "@/lib/format";
import { LuBell } from "react-icons/lu";

interface Props {
  orders: Order[];
  action: React.ReactNode;
}

const PendingOrdersBanner: React.FC<Props> = ({ orders, action }) => {
  const now = useNow();

  if (orders.length === 0) return null;

  const remainings = orders.map((order) =>
    getRemainingSeconds(getConfirmDeadline(order.createdAt), now),
  );
  const expiredCount = remainings.filter((seconds) => seconds === 0).length;
  const urgent = remainings.filter(
    (seconds) => seconds > 0 && seconds < 10 * 60,
  );

  const pill =
    expiredCount > 0
      ? `${expiredCount} ${expiredCount === 1 ? "vencido" : "vencidos"}`
      : urgent.length > 0 &&
        `${urgent.length} ${urgent.length === 1 ? "vence" : "vencem"} em ${formatCountdown(Math.min(...urgent))}`;

  return (
    <div className="flex items-center gap-3 rounded-xl border border-primary/20 bg-primary-soft py-2 pr-2 pl-3">
      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-white">
        <LuBell size={16} />
      </span>

      <p className="min-w-0 flex-1 truncate text-[13px] text-text-secondary">
        <strong className="font-semibold text-text-primary">
          {orders.length}{" "}
          {orders.length === 1 ? "novo pedido" : "novos pedidos"}
        </strong>{" "}
        aguardando confirmação · prazo de {CONFIRM_WINDOW_MINUTES} min
      </p>

      {pill && (
        <span className="shrink-0 rounded-full bg-danger-soft px-2.5 py-1 text-[11px] font-semibold text-danger uppercase tabular-nums">
          {pill}
        </span>
      )}

      <div className="shrink-0">{action}</div>
    </div>
  );
};

export default PendingOrdersBanner;