import KpiCard from "@/components/features/panel/components/kpi-card";
import PainelLayout from "@/components/features/panel/components/panel-layout";
import PendingOrdersBanner from "@/components/features/panel/orders/components/pending-orders-banner";
import { Order } from "@/components/features/panel/orders/types";
import { formatChange, formatMoney, formatMoneyRounded, formatToday } from "@/lib/format";
import { KPIS_MOCK } from "@/mocks/dashboard-mock";
import { getOrders } from "@/service/orders-service";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LuChartColumn, LuCheck, LuHeart, LuReceipt, LuStar, LuTag, LuUser, LuWallet } from "react-icons/lu";

const Dashboard: React.FC = ({}) => {
  
  const [today, setToday] = useState("")
  const [newOrders, setNewOrders] = useState<Order[]>([])

  useEffect(() => {
    setToday(formatToday())

    getOrders()
      .then((orders) =>
        setNewOrders(orders.filter((order) => order.status === "new"))
    )

    .catch(() => setNewOrders([]))
  }, [])


  return (
    <PainelLayout 
      title="Dashboard"
      subtitle={
        today
        ? `Resumo da Atelier Norte - ${today} · Maringá`
        : "Resumo da Atelier NOrte"
      }
    >
      <div className="flex flex-col gap-3">
        <PendingOrdersBanner
          orders={newOrders}
          action={
            <Link
              href="/orders"
              className="inline-flex h-8 items-center justify-center rounded-lg bg-primary px-3.5 text-[12px] font-semibold text-white transition-colors hover:bg-primary-hover"
            >
              Abrir o Kanban
            </Link>
          }
        />

        <div className="grid grid-cols-4 gap-3">
          <KpiCard
            label="Vendas hoje"
            value={formatMoneyRounded(KPIS_MOCK.salesTodayInCents)}
            icon={<LuChartColumn size={16} />}
            trend={{
              label: `${formatChange(KPIS_MOCK.salesTodayChangePercent)}%`,
              positive: KPIS_MOCK.salesTodayChangePercent >= 0,
            }}
          />
          <KpiCard
            label="Pedidos hoje"
            value={String(KPIS_MOCK.ordersToday)}
            icon={<LuReceipt size={16} />}
            trend={{
              label: formatChange(KPIS_MOCK.ordersTodayChange),
              positive: KPIS_MOCK.ordersTodayChange >= 0,
            }}
          />
          <KpiCard
            label="Ticket médio"
            value={`R$ ${formatMoney(KPIS_MOCK.averageTicketInCents)}`}
            icon={<LuTag size={16} />}
            trend={{
              label: formatMoneyRounded(KPIS_MOCK.averageTicketChangeInCents, true),
              positive: KPIS_MOCK.averageTicketChangeInCents >= 0,
            }}
          />
          <KpiCard
            label="Taxa de aceitação"
            value={`${KPIS_MOCK.acceptanceRatePercent}%`}
            icon={<LuCheck size={16} />}
            trend={{
              label: `${formatChange(KPIS_MOCK.acceptanceRateChangePercent)}%`,
              positive: KPIS_MOCK.acceptanceRateChangePercent >= 0,
            }}
          />
        </div>

        <div className="grid grid-cols-4 gap-3">
          <KpiCard
            label="Novos clientes no mês"
            value={String(KPIS_MOCK.newCustomersThisMonth)}
            icon={<LuUser size={16} />}
          />
          <KpiCard
            label="LTV médio"
            value={formatMoneyRounded(KPIS_MOCK.averageLtvInCents)}
            icon={<LuWallet size={16} />}
          />
          <KpiCard
            label="Recorrência"
            value={`${KPIS_MOCK.recurrencePercent}%`}
            icon={<LuHeart size={16} />}
          />
          <KpiCard
            label="Avaliação da loja"
            value={KPIS_MOCK.storeRating.toLocaleString("pt-BR")}
            valueSuffix="de 5"
            icon={<LuStar size={16} />}
            description={
              <>
                {KPIS_MOCK.reviewsCount} avaliações ·{" "}
                <strong className="font-semibold text-text-primary">
                  {KPIS_MOCK.newReviewsToday} novas hoje
                </strong>
              </>
            }
          />
        </div>
      </div>
    </PainelLayout>
  );
};

export default Dashboard;
