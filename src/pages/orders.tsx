import PainelLayout from "@/components/features/panel/components/panel-layout";
import OrdersBoard from "@/components/features/panel/orders/components/kanban/orders-board";
import OrdersToolbar from "@/components/features/panel/orders/components/kanban/orders-toolbar";
import { Order } from "@/components/features/panel/orders/types";
import { getOrders } from "@/service/orders-service";
import { useEffect, useState } from "react";

const Pedidos: React.FC = ({}) => {

  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    getOrders().then(setOrders)
  }, [])

  return (
    <PainelLayout
      title="Pedidos"
      subtitle="Quadro kanban • atualizado em tempo real"
    >
      <OrdersToolbar />
      <OrdersBoard orders={orders} />
    </PainelLayout>
  );
};

export default Pedidos;
