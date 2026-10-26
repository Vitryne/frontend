import { DragDropContext, Draggable, type DropResult } from "@hello-pangea/dnd";
import { useRef, useState } from "react";
import { ORDER_COLUMNS } from "@/components/features/panel/orders/columns";
import type { Order, OrderStatus } from "@/components/features/panel/orders/types";
import OrderCard from "@/components/features/panel/orders/components/kanban/order-card";
import OrderCardSkeleton from "@/components/features/panel/orders/components/kanban/order-card-skeleton";
import OrdersColumn from "@/components/features/panel/orders/components/kanban/orders-column";

interface Props {
  orders: Order[];
  loading?: boolean;
  onAdvance: (order: Order) => void;
  onRefuse: (order: Order) => void;
  onMove: (order: Order, status: OrderStatus) => void;
}

const OrdersBoard: React.FC<Props> = ({
  orders,
  loading,
  onAdvance,
  onRefuse,
  onMove,
}) => {
  const boardRef = useRef<HTMLDivElement>(null);
  const [isPanning, setIsPanning] = useState(false);

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    const board = boardRef.current;

    if (!board || event.button !== 0) return;
    if (
      (event.target as HTMLElement).closest("[data-rfd-draggable-id], button")
    )
      return;

    event.preventDefault();

    const startX = event.clientX;
    const startScroll = board.scrollLeft;

    setIsPanning(true);

    const handleMouseMove = (moveEvent: MouseEvent) => {
      board.scrollLeft = startScroll - (moveEvent.clientX - startX);
    };

    const handleMouseUp = () => {
      setIsPanning(false);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleDragEnd = ({ source, destination, draggableId }: DropResult) => {
    if (!destination || destination.droppableId === source.droppableId) return;

    const order = orders.find((item) => item.id === draggableId);

    if (order) onMove(order, destination.droppableId as OrderStatus);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div
        ref={boardRef}
        onMouseDown={handleMouseDown}
        className={`flex items-start gap-4 overflow-x-auto pb-4 ${
          isPanning ? "cursor-grabbing select-none" : "cursor-grab"
        }`}
      >
        {ORDER_COLUMNS.map((column) => {
          const columnOrders = orders.filter(
            (order) => order.status === column.status,
          );

          return (
            <OrdersColumn
              key={column.status}
              status={column.status}
              title={column.title}
              dotClass={column.dotClass}
              count={loading ? undefined : columnOrders.length}
            >
              {loading ? (
                <>
                  <OrderCardSkeleton />
                  <OrderCardSkeleton />
                </>
              ) : (
                columnOrders.map((order, index) => (
                  <Draggable
                    key={order.id}
                    draggableId={order.id}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="pb-2.5"
                      >
                        <OrderCard
                          order={order}
                          isDragging={snapshot.isDragging}
                          onAdvance={() => onAdvance(order)}
                          onRefuse={() => onRefuse(order)}
                        />
                      </div>
                    )}
                  </Draggable>
                ))
              )}
            </OrdersColumn>
          );
        })}
      </div>
    </DragDropContext>
  );
};

export default OrdersBoard;