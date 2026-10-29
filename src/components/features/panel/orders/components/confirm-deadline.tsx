import { getConfirmDeadline } from "@/components/features/panel/orders/columns";
import { useCountdown } from "@/components/features/panel/orders/use-countdown";
import { formatCountdown } from "@/lib/format";
import { LuClock3 } from "react-icons/lu";

interface Props {
  createdAt: string;
  className?: string;
}

const ConfirmDeadline: React.FC<Props> = ({ createdAt, className }) => {
  const remaining = useCountdown(getConfirmDeadline(createdAt));

  return (
    <div
      className={`flex items-center justify-between rounded-lg px-2.5 py-1.5 text-[11px] ${className ?? ""} ${
        remaining > 15 * 60
          ? "bg-primary-soft text-primary"
          : remaining >= 10 * 60
            ? "bg-warning-soft text-warning"
            : "bg-danger-soft text-danger"
      }`}
    >
      <span className="flex items-center gap-1.5 font-medium">
        <LuClock3 size={12} />
        Confirme em
      </span>
      <span className="font-mono font-semibold tabular-nums">
        {formatCountdown(remaining)}
      </span>
    </div>
  );
};

export default ConfirmDeadline;
