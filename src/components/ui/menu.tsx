import { useEffect, useRef, useState } from "react";
import { IconType } from "react-icons";
import { LuEllipsisVertical } from "react-icons/lu";

export interface MenuItem {
  label: string;
  icon: IconType;
  onClick?: () => void;
  disabled?: boolean;
  hint?: string;
  danger?: boolean;
  separated?: boolean;
}

interface Props {
  title?: string;
  items: MenuItem[];
  placement?: "top" | "bottom";
}

const Menu: React.FC<Props> = ({ title, items, placement = "bottom" }) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`flex size-8 cursor-pointer items-center justify-center rounded-lg text-text-primary transition-colors hover:bg-surface-subtle ${
          open ? "bg-surface-subtle" : ""
        }`}
      >
        <LuEllipsisVertical size={16} />
      </button>

      {open && (
        <div
          className={`absolute right-0 z-30 w-72 rounded-xl border border-border bg-surface p-1.5 shadow-lg ${
            placement === "top" ? "bottom-full mb-2" : "top-full mt-2"
          }`}
        >
          {title && (
            <p className="px-3 pb-1.5 pt-1 text-[11px] font-semibold uppercase tracking-wider text-text-tertiary">
              {title}
            </p>
          )}

          <ul>
            {items.map((item) => {
              const Icon = item.icon;

              return (
                <li
                  key={item.label}
                  className={
                    item.separated ? "mt-1.5 border-t border-border pt-1.5" : ""
                  }
                >
                  <button
                    type="button"
                    disabled={item.disabled}
                    onClick={() => {
                      item.onClick?.();
                      setOpen(false);
                    }}
                    className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-[13px] transition-colors ${
                      item.disabled
                        ? "cursor-not-allowed text-text-disabled"
                        : item.danger
                          ? "cursor-pointer text-danger hover:bg-danger-soft"
                          : "cursor-pointer text-text-primary hover:bg-primary-soft hover:text-primary-hover"
                    }`}
                  >
                    <Icon size={15} />
                    <span className="flex-1 whitespace-nowrap">
                      {item.label}
                    </span>
                    {item.hint && (
                      <span className="text-[11px] text-text-disabled">
                        {item.hint}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Menu;