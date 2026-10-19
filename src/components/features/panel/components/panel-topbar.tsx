import { LuBell, LuSearch } from "react-icons/lu"

interface Props {
    title: string
    subtitle?: string
}

const PanelTopbar: React.FC<Props> = ({ title, subtitle }) => {
    return (
        <header className="sticky top-0 z-10 flex items-center justify-between gap-6 border-b border-border bg-white px-10 py-4">
            <div>
                <h1 className="font-display text-[22px] font-semibold leading-tight text-text-primary">
                    {title}
                </h1>
                {subtitle && (
                    <p className="text-[13px] text-text-secondary">
                        {subtitle}
                    </p>
                )}
            </div>

            <div className="flex items-center gap-4">
                <label className="relative flex items-center">
                    <span className="sr-only">Buscar</span>
                    <LuSearch
                        size={16}
                        className="pointer-events-none absolute left-3 text-text-secondary"
                    />
                    <input
                        type="search"
                        placeholder="Buscar produtos, pedidos..."
                        className="h-9 w-72 rounded-[10px] border border-border bg-screen pl-9 pr-3 text-[13px] text-text-primary outline-none transition-colors focus:border-primary"
                    />
                </label>

                <button
                    type="button"
                    aria-label="Notificações"
                    className="relative flex size-9 cursor-pointer items-center justify-center rounded-[10px] border border-border bg-white text-text-primary transition-colors hover:bg-surface-subtle"
                >
                    <LuBell size={16} aria-hidden="true" />
                    <span className="absolute right-2 top-2 size-1.5 rounded-full bg-primary" />
                </button>
            </div>
        </header>
    )
}

export default PanelTopbar;