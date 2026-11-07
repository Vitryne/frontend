import { Order, OrderFilters, OrdersView } from "@/components/features/panel/orders/types";
import { EMPTY_FILTERS, filterOrders, toggleValue } from "@/components/features/panel/orders/filters";
import { useState } from "react";
import Modal from "@/components/ui/modal";
import { LuListFilter } from "react-icons/lu";
import ButtonSecondary from "@/components/ui/button-secondary";
import ButtonPrimary from "@/components/ui/button-primary";
import { ORDER_COLUMNS } from "../../columns";
import Chip from "@/components/ui/chip";




interface Props {
  orders: Order[];
  filters: OrderFilters;
  view: OrdersView;
  onClose: () => void;
  onApply: (filters: OrderFilters) => void;
}

const OrdersFiltersModal: React.FC<Props> = ({orders, filters, view, onClose, onApply}) => {

  const [draft, setDraft] = useState(filters);

  const resultCount = filterOrders(
    orders,
    view === "list" ? draft : { ...draft, statuses: [] },
  ).length;

  return (
    <Modal
      open
      onClose={onClose}
      title="Filtrar pedidos"
      subtitle="Combine os filtros para encontrar pedidos."
      icon={<LuListFilter size={22} />}
      headerAction={
        <ButtonSecondary
          title="Limpas filtros"
          onClick={() => setDraft(EMPTY_FILTERS)}
          className="Inline-flex h-8 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-primary/30 bg-surface px-3 text-[12px] font-semibold text-primary transition-colors hover:bg-primary/5"
        />
      }
      footer={
        <>
          <ButtonSecondary
            title="Cancelar"
            onClick={onClose}
            className="inline-flex h-11 flex-1 cursor-pointer items-center justify-center rounded-[10px] border border-primary/30 bg-surface text-[14px] font-semibold text-primary transition-colors hover:bg-primary/5"
          />
          <ButtonPrimary
            title={`Mostrar ${resultCount} ${resultCount === 1 ? "pedido" : "pedidos"}`}
            onClick={() => onApply(draft)}
            className="inline-flex h-11 flex-1 cursor-pointer items-center justify-center rounded-[10px] bg-primary text-[14px] font-semibold text-white shadow-lg shadow-primary/30 transition-colors hover:bg-primary-hover"
          />
        </>
      }
    >
      <div className="flex flex-col gap-5 pt-5">
        {view === "list" && (
          <div>
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-[13px] font-semibold text-text-primary">
                Status
              </h3>
              {draft.statuses.length > 0 && (
                <span className="text-[11px] text-text-tertiary">
                  { draft.statuses.length }{" "}
                  { draft.statuses.length === 1 ? "selecionado" : "selecionados"}
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {ORDER_COLUMNS.map((column) => (
                <Chip
                  key={column.status}
                  label={column.label}
                  selected={draft.statuses.includes(column.status)}
                  onClick={() =>
                    setDraft({
                      ...draft,
                      statuses: toggleValue(draft.statuses, column.status),
                    })
                  }
                />
              ))}
            </div>
          </div>
        )}

      </div>
    </Modal>
  )
}

export default OrdersFiltersModal