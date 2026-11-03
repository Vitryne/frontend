import { IMaskInput } from "react-imask";

interface Props {
  mask: string;
  value: string;
  onAccept: (value: string) => void;
  placeholder?: string;
  className?: string;
  title?: string;
  error?: string;
}

const MaskedInput: React.FC<Props> = ({
  mask,
  value,
  onAccept,
  placeholder,
  className,
  title,
  error,
}) => {
  return (
    <div className="w-full" data-error={error ? "true" : undefined}>
      <label className="mb-1.5 block text-[12px] font-semibold text-text-primary">
        {title}
      </label>
      <div className="relative">
        <IMaskInput
          mask={mask}
          value={value}
          onAccept={onAccept}
          placeholder={placeholder}
          className={
            className
              ? className
              : `w-full rounded-xl bg-surface border h-11 px-3.5 pr-10 text-[13px] text-text-primary outline-none ${
                  error
                    ? "border-danger focus:border-danger focus:ring-2 focus:ring-danger/20"
                    : "border-border-strong focus:border-primary focus:ring-2 focus:ring-primary/20 hover:border-border-strong"
                }`
          }
        />
      </div>
      {error && <p className="mt-1.5 text-[12px] text-danger">{error}</p>}
    </div>
  );
};

export default MaskedInput;
