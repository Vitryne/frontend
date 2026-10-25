import { useId } from "react";

interface Props {
  title?: string;
  placeholder?: string;
  rows?: number;
}

const Textarea: React.FC<Props> = ({ title, placeholder, rows = 3 }) => {
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
        className="w-full resize-none rounded-[10px] border border-border bg-surface px-4 py-3 text-[14px] text-text-primary outline-none placeholder:text-text-disabled hover:border-border-strong focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
    </div>
  );
};

export default Textarea;