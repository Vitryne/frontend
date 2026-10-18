import { useEffect, useRef } from "react";

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
    <input
      ref={inputRef}
      type="checkbox"
      checked={checked}
      defaultChecked={checked === undefined ? true : undefined}
      onChange={(e) => onChange?.(e.target.checked)}
      aria-label={label}
      disabled={disabled}
      className="w-4 h-4 cursor-pointer rounded border-border accent-primary disabled:cursor-not-allowed"
    />
  );
};

export default CheckBox;
