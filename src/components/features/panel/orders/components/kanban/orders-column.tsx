import { OrderStatus } from "@/components/features/panel/orders/types";
import { Droppable } from "@hello-pangea/dnd";

interface Props {
  status: OrderStatus;
  title: string;
  dotClass: string;
  count?: number;
  children?: React.ReactNode;
}

const OrdersColumn: React.FC<Props> = ({
  status,
  title,
  dotClass,
  count,
  children,
}) => {
  return (
    <div className="flex w-69 shrink-0 flex-col gap-3 rounded-[14px] bg-surface-subtle p-3">
      <header className="flex items-center gap-2 px-1">
        <span className={`size-2 shrink-0 rounded-full ${dotClass}`} />
        <h2 className="flex-1 text-[13px] font-semibold text-text-primary">
          {title}
        </h2>
        {count !== undefined && (
          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-surface px-1.5 text-[11px] font-semibold text-text-secondary">
            {count}
          </span>
        )}
      </header>

      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`-mb-2.5 min-h-20 rounded-xl transition-colors ${
              snapshot.isDraggingOver ? "bg-primary-soft" : ""
            }`}
          >
            {count === 0 && !snapshot.isDraggingOver && (
              <p className="mb-2.5 flex h-20 items-center justify-center rounded-xl border border-dashed border-border-strong text-[12px] text-text-tertiary">
                Nenhum pedido
              </p>
            )}
            {children}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default OrdersColumn;
