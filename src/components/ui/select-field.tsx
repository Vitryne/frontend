import { useId, useRef, useState } from "react";
import { LuCheck, LuChevronDown } from "react-icons/lu";

interface Props {
  title?: string;
  placeholder?: string;
  listTitle?: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

const SelectField: React.FC<Props> = ({
  title,
  placeholder = "Selecione",
  listTitle,
  options,
  value,
  onChange,
}) => {

  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const id = useId()


  return (
    <div className="relative w-full" ref={containerRef}>
      {title && (
        <label htmlFor={id} className="mb-1.5 block text-[12px] font-semibold text-text-primary">
          { title }
        </label>
      )}

      <button
        id={id}
        type="submit"
        onClick={() => setOpen((prev) => !prev)}
        className={`flex w-full cursor-pointer items-center justify-between rounded-[10px] border bg-surface px-4 py-3 text-[14px] outline-none transition-colors ${
        open
          ? "border-primary ring-2 ring-primary/20"
          : "border-border hover:border-border-strong"
      }`}
      >
        <span className={value ? "text-text-primary" : "text-text-disabled"}>
          { value || placeholder }
        </span>
        
        <LuChevronDown
          size={16}
          className={`text-text-secondary transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

        {open && (
          <div className="absolute left-0 right-0 z-20 mt-2 rounded-[10px] border border-border bg-surface p-1.5 shadow-lg">
            {listTitle && (
              <p className="px-3 pb-1.5 pt-1 text-[11px] font-semibold uppercase tracking-wider text-text-tertiary">
                { listTitle }
              </p>
            )}
            
            <ul className="max-h-72 overflow-auto">
              {options.map((option) => {
                const selected = option === value

                return (
                  <li key={option}>
                    <button
                      type="button"
                      onClick={() => {
                        onChange(option)
                        setOpen(false)
                      }}
                      className={`flex w-full cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-left text-[14px] transition-colors ${
                      selected
                        ? "bg-primary-soft font-semibold text-primary-hover"
                        : "text-text-primary hover:bg-surface-subtle"
                      }`}
                    >
                      { option }
                      { selected && <LuCheck size={16} />}
                    </button>
                  </li>
                )

              })}
            </ul>
          </div>
        )}
    </div>
  )
};

export default SelectField;
