import { IMaskInput } from "react-imask";

interface Props {
  mask: string;
  value: string;
  onAccept: (value: string) => void;
  placeholder?: string;
  className?: string;
  title?: string;
}

const MaskedInput: React.FC<Props> = ({
  mask,
  value,
  onAccept,
  placeholder,
  className,
  title,
}) => {
  return (
    <div className="w-full">
      <label className="block font-body font-semibold uppercase tracking-wider text-[11px] leading-snug text-text-primary mb-1.5">
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
              : "w-full rounded-[10px] bg-surface border border-border px-4 py-3 pr-10 font-body text-[14px] text-text-primary outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 hover:border-text-terciary"
          }
        />
      </div>
    </div>
  );
};

export default MaskedInput;
