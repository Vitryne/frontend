import { LuCircleAlert, LuInfo } from "react-icons/lu";

interface Props {
  message: string;
  title?: string;
  variant?: "warning" | "info";
}

const VARIANTS = {
  warning: {
    box: "border-warning bg-warning-soft",
    icon: "text-warning",
    title: "text-warning",
    Icon: LuCircleAlert,
  },
  info: {
    box: "border-border-brand bg-primary-soft",
    icon: "text-primary",
    title: "text-primary-hover",
    Icon: LuInfo,
  },
};

const Alert: React.FC<Props> = ({ message, title, variant = "warning" }) => {
  const style = VARIANTS[variant];
  const Icon = style.Icon;

  return (
    <div
      role="status"
      className={`flex items-start gap-3 rounded-xl border px-4 py-3 ${style.box}`}
    >
      <Icon size={18} className={`mt-0.5 shrink-0 ${style.icon}`} />

      <div>
        {title && (
          <p className={`text-[.85rem] font-bold ${style.title}`}>{title}</p>
        )}

        <p className="text-[.8rem] text-text-primary">{message}</p>
      </div>
    </div>
  );
};

export default Alert;
