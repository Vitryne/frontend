import PanelLayout from "@/components/features/panel/components/panel-layout";
import { getNextStatus } from "@/components/features/panel/orders/columns";
import OrdersBoard from "@/components/features/panel/orders/components/kanban/orders-board";
import OrdersToolbar from "@/components/features/panel/orders/components/kanban/orders-toolbar";
import RefuseOrderModal from "@/components/features/panel/orders/components/kanban/refuse-order-modal";
import type { Order, OrderStatus } from "@/components/features/panel/orders/types";
import { getOrders, refuseOrder, updateOrderStatus } from "@/service/orders-service";
import { useEffect, useState } from "react";

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [orderToRefuse, setOrderToRefuse] = useState<Order | null>(null);

  useEffect(() => {
    getOrders().then(setOrders);
  }, []);

  const handleMove = async (order: Order, status: OrderStatus) => {
    setOrders((current) =>
      current.map((item) => (item.id === order.id ? { ...item, status } : item)),
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
      subtitle="Quadro kanban · atualizado em tempo real"
    >
      <OrdersToolbar />
      <OrdersBoard
        orders={orders}
        onAdvance={handleAdvance}
        onRefuse={setOrderToRefuse}
      />

      <RefuseOrderModal
        order={orderToRefuse}
        onCancel={() => setOrderToRefuse(null)}
        onConfirm={handleConfirmRefuse}
      />
    </PanelLayout>
  );
};

export default Orders;