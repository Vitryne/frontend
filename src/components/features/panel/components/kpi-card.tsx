import { LuArrowDown, LuTrendingUp } from "react-icons/lu";

interface Props {
  label: string;
  value: string;
  icon: React.ReactNode;
  valueSuffix?: string;
  trend?: { label: string; positive: boolean };
  description?: React.ReactNode;
}

const KpiCard: React.FC<Props> = ({
  label,
  value,
  icon,
  valueSuffix,
  trend,
  description,
}) => {
  return (
    <div className="flex flex-col gap-2.5 rounded-[14px] border border-border bg-surface px-5 py-4.5">
      <div className="flex items-center justify-between gap-2">
        <span className="text-[11px] font-semibold tracking-wider text-text-secondary uppercase">
          {label}
        </span>
        <span className="flex size-8 shrink-0 items-center justify-center rounded-[9px] bg-primary-soft text-primary">
          {icon}
        </span>
      </div>

      <p className="font-display text-[26px] leading-none font-bold text-text-primary">
        {value}
        {valueSuffix && (
          <span className="ml-1.5 font-body text-[11px] font-semibold text-text-secondary">
            {valueSuffix}
          </span>
        )}
      </p>

      {trend && (
        <span
          className={`flex items-center gap-1 text-[12px] font-semibold ${
            trend.positive ? "text-success" : "text-danger"
          }`}
        >
          {trend.positive ? (
            <LuTrendingUp size={14} />
          ) : (
            <LuArrowDown size={14} />
          )}

          {trend.label}
        </span>
      )}

      {description && (
        <p className="text-[12px] text-text-tertiary">{description}</p>
      )}
    </div>
  );
};

export default KpiCard;
