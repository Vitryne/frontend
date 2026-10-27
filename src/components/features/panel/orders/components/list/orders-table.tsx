import { Order } from "@/components/features/panel/orders/types";
import OrderRow from "@/components/features/panel/orders/components/list/order-row";


interface Props {
  orders: Order[]
  onAdvance: (order: Order) => void
  onRefuse: (order: Order) => void
}

const OrdersTable: React.FC<Props> = ({orders, onAdvance, onRefuse}) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-white">
      <table className="w-full">
        <thead className="bg-surface-subtle">
          <tr className="text-left text-[.8rem] font-semibold tracking-wider text-text-secondary uppercase">
            <th scope="col" className="py-3 pr-2 pl-5">
              Pedido
            </th>
            <th scope="col" className="px-2 py-3">
              Cliente
            </th>
            <th scope="col" className="w-px px-2 py-3 text-right whitespace-nowrap">
              Total
            </th>
            <th scope="col" className="w-px px-2 py-3 whitespace-nowrap">
              Status
            </th>
            <th scope="col" className="px-2 py-3">
              Acompanhamento
            </th>
            <th scope="col" className="w-px py-3 pr-5 pl-2 text-right">
              Ação
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <OrderRow
              key={order.id}
              order={order}
              onAdvance={() => onAdvance(order)}
              onRefuse={() => onRefuse(order)}
            />
          ))}
        </tbody>
      </table>

    </div>
  )
}

export default OrdersTable