import ButtonSecondary from "@/components/ui/button-secondary";
import { LuDownload, LuLayoutGrid, LuList, LuListFilter } from "react-icons/lu";
import { OrdersView } from "@/components/features/panel/orders/types";

interface Props {
  view: OrdersView;
  onViewChange: (view: OrdersView) => void;
  children?: React.ReactNode;
}

const OrdersToolbar: React.FC<Props> = ({ view, onViewChange, children }) => {
  return (
    <div className="mb-5 flex items-center gap-3">
      <div className="min-w-0 flex-1">{children}</div>

      <ButtonSecondary title="Filtros" btnIcon={<LuListFilter size={16} />} />
      <ButtonSecondary title="Relatórios" btnIcon={<LuDownload size={16} />} />

      <div className="flex items-center rounded-xl bg-surface-subtle p-1">
        <button
          type="button"
          onClick={() => onViewChange("kanban")}
          className={`flex h-8 cursor-pointer items-center gap-1.5 rounded-lg px-3 text-[13px] transition-colors ${
            view === "kanban"
              ? "bg-surface font-semibold text-primary-hover shadow-sm"
              : "text-text-secondary hover:text-text-primary"
          }`}
        >
          <LuLayoutGrid size={14} />
          Kanban
        </button>
        <button
          type="button"
          onClick={() => onViewChange("list")}
          className={`flex h-8 cursor-pointer items-center gap-1.5 rounded-lg px-3 text-[13px] transition-colors ${
            view === "list"
              ? "bg-surface font-semibold text-primary-hover shadow-sm"
              : "text-text-secondary hover:text-text-primary"
          }`}
        >
          <LuList size={14} />
          Lista
        </button>
      </div>
    </div>
  );
};

export default OrdersToolbar;
