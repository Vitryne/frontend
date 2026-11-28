import PanelLayout from "@/components/features/panel/components/panel-layout";
import { getNextStatus } from "@/components/features/panel/orders/columns";
import OrdersFiltersModal from "@/components/features/panel/orders/components/filters/orders-filters-modal";
import OrdersReportModal from "@/components/features/panel/orders/components/filters/orders-report-modal";
import OrdersBoard from "@/components/features/panel/orders/components/kanban/orders-board";
import OrdersTable from "@/components/features/panel/orders/components/list/orders-table";
import OrderDetailModal from "@/components/features/panel/orders/components/order-detail-modal";
import OrdersError from "@/components/features/panel/orders/components/orders-error";
import OrdersToolbar from "@/components/features/panel/orders/components/orders-toolbar";
import PendingOrdersBanner from "@/components/features/panel/orders/components/pending-orders-banner";
import RefuseOrderModal from "@/components/features/panel/orders/components/refuse-order-modal";
import {
  EMPTY_FILTERS,
  filterOrders,
} from "@/components/features/panel/orders/filters";
import type {
  Order,
  OrderFilters,
  OrderStatus,
  OrdersView,
} from "@/components/features/panel/orders/types";
import { useOrdersStream } from "@/components/hooks/use-orders-stream";
import ButtonPrimary from "@/components/ui/button-primary";
import type { StoreRejectionReason } from "@/interfaces/orders-interface";
import {
  isCanceledOrder,
  parseOrderId,
  toActiveOrders,
  toBackendOrderStatus,
  toOrder,
} from "@/lib/orders-mapper";
import OrdersService from "@/service/orders-service";
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
  const [orderToView, setOrderToView] = useState<Order | null>(null);
  const [orderToRefuse, setOrderToRefuse] = useState<Order | null>(null);

  const [filters, setFilters] = useState<OrderFilters>(EMPTY_FILTERS);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const [isReportsOpen, setIsReportsOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (loadState !== "loading") return;

    OrdersService()
      .listStoreOrders()
      .then((data) => {
        setOrders(toActiveOrders(data));
        if (
          typeof window !== "undefined" &&
          data.length > 0 &&
          data[0].storeName
        ) {
          localStorage.setItem("vitryne:store-name", data[0].storeName);
        }
        setLoadState("ready");
      })
      .catch(() => setLoadState("error"));
  }, [loadState]);

  const refreshOrders = () => {
    OrdersService()
      .listStoreOrders()
      .then((data) => setOrders(toActiveOrders(data)))
      .catch(() => {});
  };

  useOrdersStream({
    onEvent: ({ order: dto }) => {
      if (isCanceledOrder(dto)) {
        setOrders((current) =>
          current.filter((item) => item.id !== String(dto.id)),
        );
        return;
      }

      const incoming = toOrder(dto);

      setOrders((current) =>
        current.some((item) => item.id === incoming.id)
          ? current.map((item) => (item.id === incoming.id ? incoming : item))
          : [incoming, ...current],
      );
    },
    onReconnect: refreshOrders,
  });

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
    const orderId = parseOrderId(order.id);
    if (!orderId || order.status === status) return;

    setOrders((current) =>
      current.map((item) =>
        item.id === order.id ? { ...item, status } : item,
      ),
    );

    try {
      const updated = await OrdersService().updateStoreOrderStatus(orderId, {
        status: toBackendOrderStatus(status),
      });

      setOrders((current) =>
        current.map((item) => (item.id === order.id ? toOrder(updated) : item)),
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

  const handleDetailAdvance = (order: Order) => {
    setOrderToView(null);
    handleAdvance(order);
  };

  const handleDetailRefuse = (order: Order) => {
    setOrderToView(null);
    setOrderToRefuse(order);
  };

  const newOrders = orders.filter((order) => order.status === "new");

  const visibleOrders = filterOrders(
    orders,
    view === "list" ? filters : { ...filters, statuses: [] },
  );

  const handleAcceptAll = () => {
    newOrders.forEach((order) => handleMove(order, "confirmed"));
  };

  const handleConfirmRefuse = async (reason: StoreRejectionReason) => {
    if (!orderToRefuse) return;

    const order = orderToRefuse;
    const orderId = parseOrderId(order.id);

    setOrderToRefuse(null);
    if (!orderId) return;

    setOrders((current) => current.filter((item) => item.id !== order.id));

    try {
      await OrdersService().rejectStoreOrder(orderId, { reason });
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
            onReportsClick={() => setIsReportsOpen(true)}
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
              onOpen={setOrderToView}
              onAdvance={handleAdvance}
              onRefuse={setOrderToRefuse}
              onMove={handleMove}
            />
          )}
        </>
      )}

      <OrderDetailModal
        order={orderToView}
        onClose={() => setOrderToView(null)}
        onAdvance={handleDetailAdvance}
        onRefuse={handleDetailRefuse}
      />

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

      {isReportsOpen && (
        <OrdersReportModal
          orders={orders}
          visibleOrders={visibleOrders}
          onClose={() => setIsReportsOpen(false)}
        />
      )}
    </PanelLayout>
  );
};

export default Orders;
