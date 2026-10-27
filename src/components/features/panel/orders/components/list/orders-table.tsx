import { Order } from "@/components/features/panel/orders/types";
import OrderRow from "@/components/features/panel/orders/components/list/order-row";
import OrderRowSkeleton from "@/components/features/panel/orders/components/list/order-list-skeleton";
import { ORDER_COLUMNS } from "@/components/features/panel/orders/columns";
import { useState } from "react";
import Pagination from "@/components/ui/pagination";

interface Props {
  orders: Order[];
  loading?: boolean;
  onAdvance: (order: Order) => void;
  onRefuse: (order: Order) => void;
}

const getStageIndex = (order: Order) =>
  ORDER_COLUMNS.findIndex((column) => column.status === order.status);

const OrdersTable: React.FC<Props> = ({
  orders,
  loading,
  onAdvance,
  onRefuse,
}) => {
  const [page, setPage] = useState(1);

  const sortedOrders = [...orders].sort(
    (a, b) =>
      getStageIndex(a) - getStageIndex(b) ||
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  const totalPages = Math.max(1, Math.ceil(sortedOrders.length / 10));
  const currentPage = Math.min(page, totalPages);
  const pageStart = (currentPage - 1) * 10;
  const pagedOrders = sortedOrders.slice(pageStart, pageStart + 10);

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
            <th
              scope="col"
              className="w-px px-2 py-3 text-right whitespace-nowrap"
            >
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
          {loading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <OrderRowSkeleton key={index} />
            ))
          ) : pagedOrders.length > 0 ? (
            pagedOrders.map((order) => (
              <OrderRow
                key={order.id}
                order={order}
                onAdvance={() => onAdvance(order)}
                onRefuse={() => onRefuse(order)}
              />
            ))
          ) : (
            <tr className="border-t border-border">
              <td colSpan={6} className="px-5 py-12 text-center">
                <p className="text-[.9rem] font-bold text-text-primary">
                  Nenhum pedido
                </p>
                <p className="mt-1 text-[.8rem] text-text-secondary">
                  Os pedidos da loja aparecem aqui assim que forem feitos.
                </p>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="flex items-center justify-between gap-3 border-t border-border px-4.5 py-2.75">
          <p className="text-[.75rem] text-text-tertiary">
            Mostrando {pageStart + 1}-{pageStart + pagedOrders.length} de{" "}
            {sortedOrders.length} pedidos
          </p>
          <Pagination
            page={currentPage}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      )}
    </div>
  );
};

export default OrdersTable;
