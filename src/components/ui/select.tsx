import { useEffect, useRef, useState } from "react";
import { FiChevronDown } from "react-icons/fi";

interface Option {
  value: string;
  label: string;
}

interface Props {
  label: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
}

const Select: React.FC<Props> = ({ label, value, options, onChange }) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selected = options.find((option) => option.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-10 cursor-pointer items-center gap-2 rounded-[10px] bg-surface border border-border px-3 text-[14px] text-text-primary outline-none transition-colors duration-200 hover:border-border-strong hover:bg-surface-subtle focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20"
      >
        <span className="text-text-secondary">{label}</span>
        <span className="font-semibold">{selected ? selected.label : ""}</span>

        <FiChevronDown
          size={16}
          className={`text-text-secondary transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <ul className="absolute left-0 z-10 mt-2 max-h-60 w-max min-w-full overflow-auto rounded-[10px] border border-border bg-surface py-1 shadow-lg">
          {options.map((option) => (
            <li key={option.value}>
              <button
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                className={`w-full px-4 py-2.5 text-left text-[14px] transition-colors cursor-pointer hover:bg-primary-soft hover:text-primary-hover ${
                  option.value === value
                    ? "bg-primary-soft text-primary-hover font-semibold"
                    : "text-text-primary"
                }`}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;
