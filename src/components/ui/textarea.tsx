import { useId } from "react";

interface Props {
  title?: string;
  placeholder?: string;
  rows?: number;
  defaultValue?: string;
}

const Textarea: React.FC<Props> = ({
  title,
  placeholder,
  rows = 3,
  defaultValue,
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
      <textarea
        id={id}
        rows={rows}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="w-full resize-none rounded-xl border border-border-strong bg-surface px-3.5 py-2.5 text-[13px] text-text-primary outline-none placeholder:text-text-disabled hover:border-border-strong focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
    </div>
  );
};

export default Textarea;
