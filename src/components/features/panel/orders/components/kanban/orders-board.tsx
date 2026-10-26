import { Order } from "@/components/features/panel/orders/types";
import { ORDER_COLUMNS } from "@/components/features/panel/orders/columns";
import OrdersColumn from "@/components/features/panel/orders/components/kanban/orders-column";
import OrderCard from "@/components/features/panel/orders/components/kanban/order-card";



interface Props {
  orders: Order[];
  onAdvance: (order: Order) => void;
  onRefuse: (order: Order) => void;
}

const OrdersBoard: React.FC<Props> = ({ orders, onAdvance, onRefuse }) => {
  return (
    <div className="flex items-start gap-4 overflow-x-auto pb-4">
      {ORDER_COLUMNS.map((column) => {
        const columnOrders = orders.filter(
          (order) => order.status === column.status
        )

        return (
          <OrdersColumn
            key={column.status}
            title={column.title}
            dotClass={column.dotClass}
            count={columnOrders.length}
          >
            {columnOrders.map((order) => (
              <div
                key={order.id}
                className="rounded-xl bg-surface p-3 text-[13px] font-semibold text-text-primary"
              > 
                <OrderCard 
                  key={order.id} 
                  order={order} 
                  onAdvance={() => onAdvance(order)}
                  onRefuse={() => onRefuse(order)}
                />
              </div>
            ))}
          </OrdersColumn>
        )
      })}
    </div>
  )
}

export default OrdersBoard;