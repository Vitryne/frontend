import { HTMLAttributes, ReactElement, useId } from "react";

interface Props {
  title?: string;
  icon?: ReactElement;
  placeholder?: string;
  type?: "text" | "email" | "password" | "tel" | "url" | "search";
  inputMode?: HTMLAttributes<HTMLInputElement>["inputMode"];
  disabled?: boolean;
}

const Input: React.FC<Props> = ({
  icon,
  title,
  placeholder,
  type = "text`",
  inputMode,
  disabled,
}) => {
  const id = useId();

  return (
    <div className="w-full">
      {title && (
        <label
          htmlFor={id}
          className="mb-1.5 block text-[12px] font-semibold text-text-primary"
        >
          {title}
        </label>
      )}
      <div className="relative">
        <input
          id={id}
          type={type}
          inputMode={inputMode}
          placeholder={placeholder}
          disabled={disabled}
          className={`h-11 w-full rounded-xl border border-border-strong bg-surface px-3.5 text-[13px] text-text-primary outline-none placeholder:text-text-disabled hover:border-border-strong focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:border-border disabled:bg-screen disabled:text-text-disabled ${
            icon ? "pr-10" : ""
          }`}
        />

        {icon && (
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary">
            {icon}
          </span>
        )}
      </div>
    </div>
  );
};

export default Input;
