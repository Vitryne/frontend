import PanelLayout from "@/components/features/panel/components/panel-layout";
import { getNextStatus } from "@/components/features/panel/orders/columns";
import OrdersBoard from "@/components/features/panel/orders/components/kanban/orders-board";
import OrdersTable from "@/components/features/panel/orders/components/list/orders-table";
import OrdersError from "@/components/features/panel/orders/components/orders-error";
import OrdersToolbar from "@/components/features/panel/orders/components/orders-toolbar";
import PendingOrdersBanner from "@/components/features/panel/orders/components/pending-orders-banner";
import RefuseOrderModal from "@/components/features/panel/orders/components/refuse-order-modal";
import type {
  Order,
  OrderStatus,
  OrdersView,
} from "@/components/features/panel/orders/types";
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

  const [orders, setOrders] = useState<Order[]>([]);
  const [loadState, setLoadState] = useState<"loading" | "error" | "ready">(
    "loading",
  );
  const [orderToRefuse, setOrderToRefuse] = useState<Order | null>(null);

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
      {router.isReady && (
        <>
          <OrdersToolbar view={view} onViewChange={handleViewChange}>
            <PendingOrdersBanner
              orders={newOrders}
              onAcceptAll={handleAcceptAll}
            />
          </OrdersToolbar>

          {loadState === "error" ? (
            <OrdersError onRetry={() => setLoadState("loading")} />
          ) : view === "list" ? (
            <OrdersTable
              orders={orders}
              loading={loadState === "loading"}
              onAdvance={handleAdvance}
              onRefuse={setOrderToRefuse}
            />
          ) : (
            <OrdersBoard
              orders={orders}
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
    </PanelLayout>
  );
};

export default Orders;
