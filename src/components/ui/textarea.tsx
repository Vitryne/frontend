import { useId, useState } from "react";

interface Props {
  title?: string;
  placeholder?: string;
  rows?: number;
  defaultValue?: string;
  maxLength?: number;
  value?: string;
  onChange?: (value: string) => void;
}

const Textarea: React.FC<Props> = ({
  title,
  placeholder,
  rows = 3,
  defaultValue,
  maxLength,
  value,
  onChange,
}) => {
  const id = useId();
  const [uncontrolledLength, setLength] = useState(defaultValue?.length ?? 0);
  const length = value === undefined ? uncontrolledLength : value.length;

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
        <textarea
          id={id}
          rows={rows}
          placeholder={placeholder}
          defaultValue={value === undefined ? defaultValue : undefined}
          value={value}
          maxLength={maxLength}
          onChange={(e) => {
            setLength(e.target.value.length);
            onChange?.(e.target.value);
          }}
          className={`w-full resize-none rounded-xl border border-border-strong bg-surface px-3.5 py-2.5 text-[13px] text-text-primary outline-none placeholder:text-text-disabled hover:border-border-strong focus:border-primary focus:ring-2 focus:ring-primary/20 ${
            maxLength ? "pb-6" : ""
          }`}
        />

        {maxLength && (
          <span className="pointer-events-none absolute bottom-2.5 right-3.5 text-[11px] text-text-tertiary">
            {`${length}/${maxLength}`}
          </span>
        )}
      </div>
    </div>
  );
};

export default Textarea;
