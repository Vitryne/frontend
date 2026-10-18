import { useEffect, useRef } from "react";
import { FaCheck, FaMinus } from "react-icons/fa";

interface Props {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  indeterminate?: boolean;
  disabled?: boolean;
}

const CheckBox: React.FC<Props> = ({
  checked,
  onChange,
  label,
  indeterminate = false,
  disabled,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  return (
    <span className="relative inline-flex size-4.5 shrink-0 align-middle">
      <input
          ref={inputRef}
          type="checkbox"
          checked={checked}
          defaultChecked={checked === undefined ? true : undefined}
          onChange={(e) => onChange?.(e.target.checked)}
          aria-label={label}
          disabled={disabled}
          className="peer size-full cursor-pointer appearance-none rounded-md border-[1.5px] border-border-strong bg-surface outline-none transition-colors duration-200 hover:border-text-tertiary checked:border-primary checked:bg-primary indeterminate:border-primary indeterminate:bg-primary focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:opacity-50"
      />
      <FaCheck
          size={10}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 m-auto hidden text-white peer-checked:block"
      />
      <FaMinus
          size={10}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 m-auto hidden text-white peer-indeterminate:block"
      />
    </span>
  );
};

export default CheckBox;