import PanelLayout from "@/components/features/panel/components/panel-layout";
import { getNextStatus } from "@/components/features/panel/orders/columns";
import OrdersFiltersModal from "@/components/features/panel/orders/components/filters/orders-filters-modal";
import OrdersBoard from "@/components/features/panel/orders/components/kanban/orders-board";
import OrdersTable from "@/components/features/panel/orders/components/list/orders-table";
import OrdersError from "@/components/features/panel/orders/components/orders-error";
import OrdersToolbar from "@/components/features/panel/orders/components/orders-toolbar";
import PendingOrdersBanner from "@/components/features/panel/orders/components/pending-orders-banner";
import RefuseOrderModal from "@/components/features/panel/orders/components/refuse-order-modal";
import { EMPTY_FILTERS, filterOrders } from "@/components/features/panel/orders/filters";
import type {
  Order,
  OrderFilters,
  OrderStatus,
  OrdersView,
} from "@/components/features/panel/orders/types";
import ButtonPrimary from "@/components/ui/button-primary";
import {
  getOrders,
  refuseOrder,
  updateOrderStatus,
} from "@/service/orders-service";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Orders: React.FC = () => {
  const router = useRouter();
  const view: OrdersView = router.query.view === "list" ? "list" : "kanban";

  const [isMounted, setIsMounted] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadState, setLoadState] = useState<"loading" | "error" | "ready">(
    "loading",
  );
  const [orderToRefuse, setOrderToRefuse] = useState<Order | null>(null);

  const [filters, setFilters] = useState<OrderFilters>(EMPTY_FILTERS);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (loadState !== "loading") return;

    getOrders()
      .then((data) => {
        setOrders(data);
        setLoadState("ready");
      })
      .catch(() => setLoadState("error"));
  }, [loadState]);

  const handleViewChange = (nextView: OrdersView) => {
    router.push(
      {
        pathname: "/orders",
        query: nextView === "list" ? { view: "list" } : {},
      },
      undefined,
      { shallow: true },
    );
  };

  const handleMove = async (order: Order, status: OrderStatus) => {
    setOrders((current) =>
      current.map((item) =>
        item.id === order.id ? { ...item, status } : item,
      ),
    );

    try {
      const updated = await updateOrderStatus(order.id, status);

      setOrders((current) =>
        current.map((item) => (item.id === updated.id ? updated : item)),
      );
    } catch {
      setOrders((current) =>
        current.map((item) => (item.id === order.id ? order : item)),
      );
    }
  };

  const handleAdvance = (order: Order) => {
    const nextStatus = getNextStatus(order.status);

    if (nextStatus) handleMove(order, nextStatus);
  };

  const newOrders = orders.filter((order) => order.status === "new");

  const visibleOrders = filterOrders(
    orders,
    view === "list" ? filters : { ...filters, statuses: [] },
  );

  const handleAcceptAll = () => {
    newOrders.forEach((order) => handleMove(order, "confirmed"));
  };

  const handleConfirmRefuse = async () => {
    if (!orderToRefuse) return;

    const order = orderToRefuse;

    setOrderToRefuse(null);
    setOrders((current) => current.filter((item) => item.id !== order.id));

    try {
      await refuseOrder(order.id);
    } catch {
      setOrders((current) => [...current, order]);
    }
  };

  return (
    <PanelLayout
      title="Pedidos"
      subtitle={`${view === "list" ? "Lista" : "Quadro kanban"} · atualizado em tempo real`}
    >
      {isMounted && router.isReady && (
        <>
          <OrdersToolbar 
            view={view} 
            onViewChange={handleViewChange}
            onFiltersClick={() => setIsFiltersOpen(true)}
          >
            <PendingOrdersBanner
              orders={newOrders}
              action={
                <ButtonPrimary
                  title="Aceitar todos"
                  onClick={handleAcceptAll}
                  className="inline-flex h-8 cursor-pointer items-center justify-center rounded-lg bg-primary px-3.5 text-[12px] font-semibold text-white transition-colors hover:bg-primary-hover"
                />
              }
            />
          </OrdersToolbar>

          {loadState === "error" ? (
            <OrdersError onRetry={() => setLoadState("loading")} />
          ) : view === "list" ? (
            <OrdersTable
              orders={visibleOrders}
              loading={loadState === "loading"}
              onAdvance={handleAdvance}
              onRefuse={setOrderToRefuse}
            />
          ) : (
            <OrdersBoard
              orders={visibleOrders}
              loading={loadState === "loading"}
              onAdvance={handleAdvance}
              onRefuse={setOrderToRefuse}
              onMove={handleMove}
            />
          )}
        </>
      )}

      <RefuseOrderModal
        order={orderToRefuse}
        onCancel={() => setOrderToRefuse(null)}
        onConfirm={handleConfirmRefuse}
      />

      {isFiltersOpen && (
        <OrdersFiltersModal
          orders={orders}
          filters={filters}
          view={view}
          onClose={() => setIsFiltersOpen(false)}
          onApply={(nextFilters) => {
            setFilters(nextFilters);
            setIsFiltersOpen(false);
          }}
        />
      )}
    </PanelLayout>
  );
};

export default Orders;
