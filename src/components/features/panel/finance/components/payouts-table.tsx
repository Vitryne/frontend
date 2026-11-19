import { Payout } from "@/components/features/panel/finance/types";
import Badge from "@/components/ui/badge";
import ButtonSecondary from "@/components/ui/button-secondary";
import { formatDayMonth, formatMoney } from "@/lib/format";
import { LuArrowDown, LuChevronRight } from "react-icons/lu";

interface Props {
  payouts: Payout[];
}

const PayoutsTable: React.FC<Props> = ({ payouts }) => {
  return (
    <div className="overflow-hidden rounded-[14px] border border-border bg-surface">
      <div className="flex items-center justify-between gap-3 px-5.5 py-4">
        <h2 className="font-display text-[16px] font-semibold text-text-primary">
          Repasses
        </h2>
        <ButtonSecondary
          title="Ver extrato completo"
          btnIcon={<LuArrowDown size={14} />}
          iconPosition="right"
          className="inline-flex h-8 cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-primary/30 bg-surface px-3 text-[12px] font-semibold text-primary transition-colors hover:bg-primary/5"
        />
      </div>

      <table className="w-full">
        <thead className="bg-surface-subtle">
          <tr className="text-[11px] font-semibold tracking-wider text-text-tertiary uppercase">
            <th scope="col" className="py-2.5 pr-2 pl-5.5 text-left">
              Data
            </th>
            <th scope="col" className="px-2 py-2.5 text-right">
              Pedidos
            </th>
            <th scope="col" className="px-2 py-2.5 text-right">
              Bruto
            </th>
            <th scope="col" className="px-2 py-2.5 text-right">
              Comissão Vitryne
            </th>
            <th scope="col" className="px-2 py-2.5 text-right">
              Líquido
            </th>
            <th scope="col" className="px-2 py-2.5 pl-6 text-left">
              Status
            </th>
            <th scope="col" className="w-px py-2.5 pr-5.5 pl-2" />
          </tr>
        </thead>
        <tbody>
          {payouts.map((payout) => (
            <tr key={payout.date} className="border-t border-border">
              <td className="py-3.5 pr-2 pl-5.5 text-[13px] font-semibold text-text-primary">
                {formatDayMonth(payout.date)}
              </td>
              <td className="px-2 py-3.5 text-right text-[13px] text-text-secondary">
                {payout.ordersCount}
              </td>
              <td className="px-2 py-3.5 text-right text-[13px] text-text-secondary">
                R$ {formatMoney(payout.grossInCents)}
              </td>
              <td className="px-2 py-3.5 text-right text-[13px] text-text-secondary">
                -R$ {formatMoney(payout.commissionInCents)}
              </td>
              <td className="px-2 py-3.5 text-right text-[13px] font-bold text-text-primary">
                R$ {formatMoney(payout.grossInCents - payout.commissionInCents)}
              </td>
              <td className="px-2 py-3.5 pl-6">
                <Badge
                  title={payout.status === "paid" ? "Pago" : "Agendado"}
                  variant={payout.status === "paid" ? "success" : "warning"}
                />
              </td>
              <td className="py-3.5 pr-5.5 pl-2 text-text-tertiary">
                <LuChevronRight size={16} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PayoutsTable;
