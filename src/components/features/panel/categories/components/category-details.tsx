import KpiCard from "@/components/features/panel/components/kpi-card";
import type { Category } from "@/components/features/panel/categories/types";
import Badge from "@/components/ui/badge";
import ButtonSecondary from "@/components/ui/button-secondary";
import { formatMoneyCompact } from "@/lib/format";
import {
  LuBox,
  LuChartColumn,
  LuEye,
  LuEyeOff,
  LuTag,
  LuTrash2,
  LuWallet,
} from "react-icons/lu";

interface Props {
  category: Category;
}

const CategoryDetails: React.FC<Props> = ({ category }) => {
  return (
    <div className="rounded-[14px] border border-border bg-surface p-5">
      <div className="flex items-center gap-3">
        <h2 className="font-display text-[22px] font-semibold text-text-primary">
          {category.name}
        </h2>
        <Badge
          title={category.visible ? "Visível" : "Oculta"}
          variant={category.visible ? "success" : "neutral"}
        />
      </div>
      <p className="mt-1 text-[13px] text-text-secondary">
        {category.description}
      </p>

      <div className="mt-3 flex gap-2">
        <ButtonSecondary
          title={category.visible ? "Ocultar" : "Mostrar"}
          btnIcon={
            category.visible ? <LuEyeOff size={14} /> : <LuEye size={14} />
          }
          iconPosition="left"
          className="inline-flex h-8 cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-border-strong bg-surface px-3 text-[12px] font-semibold text-text-primary transition-colors hover:bg-surface-subtle"
        />
        <ButtonSecondary
          title="Excluir"
          btnIcon={<LuTrash2 size={14} />}
          iconPosition="left"
          className="inline-flex h-8 cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-danger/30 bg-surface px-3 text-[12px] font-semibold text-danger transition-colors hover:bg-danger-soft"
        />
      </div>

      <div className="mt-4 grid grid-cols-4 gap-3">
        <KpiCard
          label="Produtos"
          value={String(category.productsCount)}
          icon={<LuTag size={16} />}
          description="na categoria"
        />
        <KpiCard
          label="Em estoque"
          value={String(category.inStockCount)}
          icon={<LuBox size={16} />}
          description="com saldo"
        />
        <KpiCard
          label="Vendas no mês"
          value={String(category.salesThisMonth)}
          icon={<LuChartColumn size={16} />}
          description="neste mês"
        />
        <KpiCard
          label="Receita"
          value={formatMoneyCompact(category.revenueThisMonthInCents)}
          icon={<LuWallet size={16} />}
          description="neste mês"
        />
      </div>
    </div>
  );
};

export default CategoryDetails;