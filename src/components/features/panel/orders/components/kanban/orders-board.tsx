import { Order } from "@/components/features/panel/orders/types";
import { ORDER_COLUMNS } from "../../columns";
import OrdersColumn from "./orders-column";



interface Props {
  orders: Order[];
}


const OrdersBoard: React.FC<Props> = ({orders}) => {
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
                #{order.id}
              </div>
            ))}
          </OrdersColumn>
        )
      })}
    </div>
  )
}

export default OrdersBoard;