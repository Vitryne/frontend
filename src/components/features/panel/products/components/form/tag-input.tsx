import CheckBox from "@/components/ui/checkbox";
import { useEffect, useId, useRef, useState } from "react";
import { LuX } from "react-icons/lu";

interface Props {
  title?: string;
  suggestions: string[];
  value: string[];
  onChange: (tags: string[]) => void;
}

const TagsInput: React.FC<Props> = ({
  title,
  suggestions,
  value,
  onChange,
}) => {

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const id = useId();

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);


  const options = [...new Set([...suggestions, ...value])];
  const search = query.trim().toLowerCase();
  const filtered = options.filter((tag) => tag.includes(search));

  const toggleTag = (tag: string) => {
    onChange(
      value.includes(tag) ? value.filter((item) => item !== tag) : [...value, tag],
    );
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") return;

    event.preventDefault();
    if (!search) return;

    if (!value.includes(search)) onChange([...value, search]);
    setQuery("");
  };

  return (

    <div className="relative w-full" ref={containerRef}>
      {title && (
        <label htmlFor={id} className="mb-1.5 block text-[12px] font-semibold text-text-primary">
          { title }
        </label>
      )}

      <div
        onClick={() => inputRef.current?.focus()}
        className={`flex min-h-12 w-full cursor-text flex-wrap items-center gap-1.5 rounded-[10px] border bg-surface px-3 py-2 transition-colors ${
          open
            ? "border-primary ring-2 ring-primary/20"
            : "border-border hover:border-border-strong"
        }`}
      >
        {value.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 rounded-md bg-primary-soft px-2 py-0.5 text-[12px] font-semibold text-primary-hover"
          >
            {tag}

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                toggleTag(tag);
              }}
              className="cursor-pointer rounded-sm hover:text-primary-strong"
            >
              <LuX size={12} />
            </button>
          </span>
        ))}

        <input
          ref={inputRef}
          id={id}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="+ adicionar tag"
          className="min-w-24 flex-1 bg-transparent text-[13px] text-text-primary outline-none placeholder:text-text-disabled"
        />
      </div>

      {open && (
        <div className="absolute left-0 right-0 z-20 mt-2 rounded-[10px] border border-border bg-surface p-1.5 shadow-lg">
          <p className="px-3 pb-1.5 pt-1 text-[11px] font-semibold uppercase tracking-wider text-text-tertiary">
            Tags do produto
          </p>

          <ul className="max-h-72 overflow-auto">
            {filtered.map((tag) => (
              <li key={tag}>
                <label className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-[14px] text-text-primary transition-colors hover:bg-surface-subtle">
                  <CheckBox
                    checked={value.includes(tag)}
                    onChange={() => toggleTag(tag)}
                  />
                  { tag }
                </label>
              </li>
            ))}

            {filtered.length === 0 && (
              <li className="px-3 py-2 text-[13px] text-text-tertiary">
                Tecle Enter para criar &quot;{search}&quot;
              </li>
            )}
          </ul>


          <p className="mt-1 border-t border-border px-3 pb-1 pt-2 text-[12px] text-text-tertiary">
            Digite e tecle Enter para criar uma tag nova
          </p>
        </div>
      )}
    </div>
  )
};

export default TagsInput;
