import KpiCard from "@/components/features/panel/components/kpi-card";
import PainelLayout from "@/components/features/panel/components/panel-layout";
import BankAccountCard from "@/components/features/panel/finance/components/bank-account-card";
import DailyReceiptsChart from "@/components/features/panel/finance/components/daily-receipts-chart";
import ButtonPrimary from "@/components/ui/button-primary";
import ButtonSecondary from "@/components/ui/button-secondary";
import { formatChange, formatDayMonth, formatMoney, formatMoneyRounded } from "@/lib/format";
import { BANK_ACCOUNT_MOCK, DAILY_RECEIPTS_MOCK, FINANCE_SUMMARY_MOCK, PAYOUTS_MOCK } from "@/mocks/finance-mock";
import { LuDownload, LuListFilter, LuReceipt, LuTag, LuTrendingUp, LuWallet } from "react-icons/lu";

const Finance: React.FC = ({}) => {

  const scheduledPayouts = PAYOUTS_MOCK.filter(
    (payout) => payout.status === "scheduled",
  );
  const nextPayout = scheduledPayouts[scheduledPayouts.length - 1];

  return (
    <PainelLayout 
      title="Financeiro" 
      subtitle="Repasses, comissões e fluxo de caixa"
    >
      <div className="flex flex-col gap-3">
        <div className="mb-2 flex justify-end gap-3">
          <ButtonSecondary
            title="Período"
            btnIcon={<LuListFilter size={16} />}
            iconPosition="left"
          />
          <ButtonPrimary
            title="Exportar relatório"
            btnIcon={<LuDownload size={16} />}
            iconPosition="left"
          />
        </div>

        <div className="grid grid-cols-3 gap-3">
          <KpiCard
            label="Recebido este mês"
            value={`R$ ${formatMoney(FINANCE_SUMMARY_MOCK.receivedThisMonthInCents)}`}
            icon={<LuTrendingUp size={16} />}
            trend={{
              label: `${formatChange(FINANCE_SUMMARY_MOCK.receivedChangePercent)}%`,
              positive: FINANCE_SUMMARY_MOCK.receivedChangePercent >= 0
            }}
          />
          <KpiCard
            label="Comissões Vitryne"
            value={`R$ ${formatMoney(FINANCE_SUMMARY_MOCK.commissionsInCents)}`}
            icon={<LuReceipt size={16} />}
            description={`${FINANCE_SUMMARY_MOCK.averageCommissionPercent}% médio`}
          />
          <KpiCard
            label="Ticket médio"
            value={`R$ ${formatMoney(FINANCE_SUMMARY_MOCK.averageTicketInCents)}`}
            icon={<LuTag size={16} />}
            trend={{
              label: formatMoneyRounded(
                FINANCE_SUMMARY_MOCK.averageTicketChangeInCents,
                true
              ),
              positive: FINANCE_SUMMARY_MOCK.averageTicketChangeInCents >= 0
            }}
          />
        </div>
        
        <div className="grid grid-cols-3 gap-3">
          <div className="flex flex-col gap-3">
            <KpiCard
              label="Saldo disponível"
              value={`R$ ${formatMoney(FINANCE_SUMMARY_MOCK.availableBalanceInCents)}`}
              icon={<LuWallet size={16} />}
              description={`Próximo repasse: ${formatDayMonth(nextPayout.date)} - conta ${BANK_ACCOUNT_MOCK.bank} final ${BANK_ACCOUNT_MOCK.accountLastDigits}`}
            />

            <BankAccountCard account={BANK_ACCOUNT_MOCK} />
          </div>

          <div className="col-span-2">
            <DailyReceiptsChart receipts={DAILY_RECEIPTS_MOCK} />
          </div>
        </div>
      </div>
    </PainelLayout>
  );
};

export default Finance;
