import { LuEye, LuEyeOff, LuTrash2 } from "react-icons/lu";

interface Props {
    count: number;
    onActivate: () => void;
    onDeactivate: () => void;
    onDelete: () => void;
    onClear: () => void;
}

const BulkActionBar: React.FC<Props> = ({
    count,
    onActivate,
    onDeactivate,
    onDelete,
    onClear,
}) => {
    return (
        <div className="mb-4 flex items-center justify-between gap-3 rounded-xl border border-border-brand bg-primary-soft px-4 py-2.5">
            <div className="flex items-center gap-3">
                <p className="text-[14px] font-semibold text-primary-hover">
                    {count}{" "}
                    {count === 1
                        ? "produto selecionado"
                        : "produtos selecionados"}
                </p>

                <span className="h-5 w-px bg-border-brand" />

                <button
                    type="button"
                    onClick={onActivate}
                    className="inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-lg border bg-surface px-3 text-[13px] font-semibold outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary/20 border-border-brand text-primary-strong hover:bg-primary-soft-2"
                >
                    <LuEye size={14} />
                    Ativar
                </button>
                <button
                    type="button"
                    onClick={onDeactivate}
                    className="inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-lg border bg-surface px-3 text-[13px] font-semibold outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary/20 border-border-brand text-primary-strong hover:bg-primary-soft-2"
                >
                    <LuEyeOff size={14} />
                    Desativar
                </button>
                <button
                    type="button"
                    onClick={onDelete}
                    className="inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-lg border bg-surface px-3 text-[13px] font-semibold outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary/20 border-border text-danger hover:bg-danger-soft"
                >
                    <LuTrash2 size={14} />
                    Excluir
                </button>
            </div>

            <button
                type="button"
                onClick={onClear}
                className="cursor-pointer text-[13px] font-semibold text-text-tertiary outline-none transition-colors hover:text-text-primary hover:underline focus-visible:underline"
            >
                Limpar seleção
            </button>
        </div>
    );
};

export default BulkActionBar;
