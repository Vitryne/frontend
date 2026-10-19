import { LuBell, LuSearch } from "react-icons/lu";

interface Props {
  title: string;
  subtitle?: string;
}

const PanelTopbar: React.FC<Props> = ({ title, subtitle }) => {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between gap-5 border-b border-border bg-surface px-10 py-5">
      <div className="flex flex-col gap-0.75">
        <h1 className="font-display text-[26px] font-semibold leading-[1.2] tracking-[-0.01em] text-text-primary">
          {title}
        </h1>
        {subtitle && (
          <p className="text-[1rem] leading-normal text-text-tertiary">
            {subtitle}
          </p>
        )}
      </div>

      <div className="flex items-center gap-5">
        <label className="relative flex items-center">
          <span className="sr-only">Buscar</span>
          <LuSearch
            size={16}
            aria-hidden="true"
            className="pointer-events-none absolute left-3 text-text-secondary"
          />
          <input
            type="search"
            placeholder="Buscar produtos, pedidos..."
            className="h-9 w-70 rounded-[10px] border border-transparent bg-surface-subtle pl-9 pr-3 text-[13px] text-text-primary outline-none transition-colors duration-200 placeholder:text-text-secondary hover:bg-border/60 focus:border-primary focus:bg-surface"
          />
        </label>

        <button
          type="button"
          aria-label="Notificações"
          className="relative flex size-9 cursor-pointer items-center justify-center rounded-[10px] bg-surface-subtle text-text-primary transition-colors duration-200 hover:bg-border/60"
        >
          <LuBell size={16} aria-hidden="true" />
          <span className="absolute right-2 top-2 size-1.5 rounded-full bg-primary" />
        </button>
      </div>
    </header>
  );
};

export default PanelTopbar;
