import { Order } from "@/components/features/panel/orders/types";


interface Props {
  orders: Order[]
}

const OrdersTable: React.FC<Props> = ({orders}) => {
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
            <tr key={order.id} className="border-t border-border">
              <td className="py-3 pr-2 pl-5 text-[13px] font-semibold text-text-primary">
                #{order.id}
              </td>
              <td colSpan={5} className="px-2 py-3 text-[13px] text-text-secondary">
                {order.customerName}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  )
}

export default OrdersTable