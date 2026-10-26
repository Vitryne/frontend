import { Order, OrderStatus } from "@/components/features/panel/orders/types";
import { ORDER_COLUMNS } from "@/components/features/panel/orders/columns";
import OrdersColumn from "@/components/features/panel/orders/components/kanban/orders-column";
import OrderCard from "@/components/features/panel/orders/components/kanban/order-card";
import { DragDropContext, Draggable, DropResult } from "@hello-pangea/dnd";
import OrderCardSkeleton from "./order-card-skeleton";

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
  const handleDragEnd = ({ source, destination, draggableId }: DropResult) => {
    if (!destination || destination.droppableId === source.droppableId) return;

    const order = orders.find((item) => item.id === draggableId);

    if (order) onMove(order, destination.droppableId as OrderStatus);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex items-start gap-4 overflow-x-auto pb-4">
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
