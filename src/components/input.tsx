import { ReactElement } from "react";

interface Props {
  title?: string;
  icon?: ReactElement;
  placeholder?: string;
  type?: string;
}

const Input: React.FC<Props> = ({icon, title, placeholder, type}) => {
  return (
    <div className="w-full">
      <label className="block font-body font-semibold uppercase tracking-wider text-[11px] leading-snug text-text-primary mb-1.5">
        {title}
      </label>
      <div className="relative">
        <input
          type={type}
          placeholder={placeholder}
          className="w-full rounded-[10px]  bg-surface border border-border px-4 py-3 pr-10 font-body text-[14px] text-text-primary outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 hover:border-text-terciary"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary font-bold">
          {icon}
        </span>
      </div>
    </div>
  );
};

export default Input;
