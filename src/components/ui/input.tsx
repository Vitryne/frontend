import { HTMLAttributes, ReactElement, useId } from "react";

interface Props {
  title?: string;
  icon?: ReactElement;
  placeholder?: string;
  type?: "text" | "email" | "password" | "tel" | "url" | "search";
  inputMode?: HTMLAttributes<HTMLInputElement>["inputMode"];
  disabled?: boolean;
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
}

const Input: React.FC<Props> = ({
  icon,
  title,
  placeholder,
  type = "text",
  inputMode,
  disabled,
  defaultValue,
  value,
  onChange,
  error,
}) => {
  const id = useId();

  return (
    <div className="w-full" data-error={error ? "true" : undefined}>
      {title && (
        <label
          htmlFor={id}
          className="mb-1.5 block text-[14px] font-semibold text-text-primary"
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
          defaultValue={value === undefined ? defaultValue : undefined}
          value={value}
          onChange={onChange ? (e) => onChange(e.target.value) : undefined}
          className={`h-11 w-full rounded-xl border bg-surface px-3.5 text-[13px] text-text-primary outline-none placeholder:text-text-disabled ${
            error
              ? "border-danger focus:border-danger focus:ring-2 focus:ring-danger/20"
              : "border-border-strong hover:border-border-strong focus:border-primary focus:ring-2 focus:ring-primary/20"
          } disabled:cursor-not-allowed disabled:border-border disabled:bg-screen disabled:text-text-disabled ${
            icon ? "pr-10" : ""
          }`}
        />

        {icon && (
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary">
            {icon}
          </span>
        )}
      </div>
      {error && <p className="mt-1.5 text-[12px] text-danger">{error}</p>}
    </div>
  );
};

export default Input;
