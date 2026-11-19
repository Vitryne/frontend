import ButtonPrimary from "@/components/ui/button-primary";
import ButtonSecondary from "@/components/ui/button-secondary";
import CheckBox from "@/components/ui/checkbox";
import Modal from "@/components/ui/modal";
import PeriodPicker from "@/components/features/panel/orders/components/filters/period-picker";
import {
  EMPTY_FILTERS,
  filterOrders,
  getPeriodRange,
} from "@/components/features/panel/orders/filters";
import {
  buildOrdersCsv,
  downloadCsv,
} from "@/components/features/panel/orders/report";
import type {
  Order,
  OrderPeriod,
} from "@/components/features/panel/orders/types";
import React, { useState } from "react";
import { LuDownload, LuEyeOff } from "react-icons/lu";

interface Props {
  orders: Order[];
  visibleOrders: Order[];
  onClose: () => void;
}

interface OptionProps {
  title: string;
  description: string;
  selected: boolean;
}

const ReportOption: React.FC<OptionProps> = ({
  title,
  description,
  selected,
}) => {
  return (
    <div
      className={`flex items-center gap-3 rounded-xl border px-3.5 py-3 ${
        selected ? "border-primary" : "border-border opacity-60"
      }`}
    >
      <div className="min-w-0 flex-1">
        <p className="text-[13px] font-semibold text-text-primary">
          {title}
          {!selected && (
            <span className="ml-2 text-[11px] font-normal text-text-tertiary">
              Em breve
            </span>
          )}
        </p>
        <p className="text-[11px] text-text-tertiary">{description}</p>
      </div>
      <span
        className={`flex size-4.5 shrink-0 items-center justify-center rounded-full border-2 ${
          selected ? "border-primary" : "border-border-strong"
        }`}
      >
        {selected && <span className="size-2 rounded-full bg-primary" />}
      </span>
    </div>
  );
};

const OrdersReportModal: React.FC<Props> = ({
  orders,
  visibleOrders,
  onClose,
}) => {
  const [period, setPeriod] = useState<OrderPeriod | null>("30d");
  const [dateRange, setDateRange] = useState(getPeriodRange("30d"));
  const [applyFilters, setApplyFilters] = useState(false);

  const handleExport = () => {
    const source = applyFilters ? visibleOrders : orders;
    const reportOrders = filterOrders(source, { ...EMPTY_FILTERS, dateRange });
    const today = new Date()
      .toLocaleDateString("pt-BR")
      .split("/")
      .reverse()
      .join("-");

    downloadCsv(buildOrdersCsv(reportOrders), `pedidos-${today}.csv`);
    onClose();
  };

  return (
    <Modal
      open
      onClose={onClose}
      title="Relatórios de pedidos"
      subtitle="Escolha o relatório, o período e o formato do arquivo."
      icon={<LuDownload size={22} />}
      footer={
        <>
          <ButtonSecondary
            title="Cancelar"
            onClick={onClose}
            className="inline-flex h-11 flex-1 cursor-pointer items-center justify-center rounded-[10px] border border-primary/30 bg-surface text-[14px] font-semibold text-primary transition-colors hover:bg-primary/5"
          />
          <ButtonPrimary
            title="Exportar CSV"
            btnIcon={<LuDownload size={16} />}
            iconPosition="left"
            onClick={handleExport}
            className="inline-flex h-11 flex-1 cursor-pointer items-center justify-center gap-2 rounded-[10px] bg-primary text-[14px] font-semibold text-white shadow-lg shadow-primary/30 transition-colors hover:bg-primary-hover"
          />
        </>
      }
    >
      <div className="flex flex-col gap-5 pt-5">
        <div>
          <h3 className="mb-2 text-[13px] font-semibold text-text-primary">
            Tipo de relatório
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {[
              {
                title: "Pedidos",
                description: "Cliente, itens, total e status",
              },
              {
                title: "Pedidos por período",
                description: "Quantidade e faturamento por dia",
              },
              {
                title: "Pedidos por categoria de item",
                description: "Faturamento por categoria de item",
              },
              {
                title: "Pedidos por status",
                description: "Ativos, concluídos e cancelados",
              },
              {
                title: "Produtos mais vendidos",
                description: "Ranking por produto e tamanho",
              },
              {
                title: "Vendas e repasses",
                description: "Faturamento, comissão e repasse",
              },
            ].map((option) => (
              <ReportOption
                key={option.title}
                title={option.title}
                description={option.description}
                selected={option.title === "Pedidos"}
              />
            ))}
          </div>
        </div>

        <PeriodPicker
          title="Período"
          period={period}
          dateRange={dateRange}
          onChange={(nextPeriod, nextRange) => {
            setPeriod(nextPeriod);
            setDateRange(nextRange);
          }}
        />

        <div>
          <h3 className="mb-2 text-[13px] font-semibold text-text-primary">
            Formato do arquivo
          </h3>
          <div className="grid grid-cols-2 gap-2">
            <ReportOption
              title="CSV"
              description="Para Excel ou Google Planilhas"
              selected
            />
            <ReportOption
              title="PDF"
              description="Pronto para imprimir ou enviar"
              selected={false}
            />
          </div>
        </div>

        <div>
          <h3 className="mb-2 text-[13px] font-semibold text-text-primary">
            Opções
          </h3>
          <label className="flex cursor-pointer items-center gap-2 select-none">
            <CheckBox checked={applyFilters} onChange={setApplyFilters} />
            <span className="text-[13px] text-text-primary">
              Aplicar os filtros ativos da tela de pedidos
            </span>
          </label>
        </div>

        <div className="flex gap-3 border-t border-border pt-4">
          <LuEyeOff size={16} className="mt-0.5 shrink-0 text-text-secondary" />
          <div>
            <p className="text-[13px] font-semibold text-text-primary">
              CPF dos clientes sai mascarado
            </p>
            <p className="text-[11px] text-text-tertiary">
              O arquivo segue a mesma máscara de dados do portal, conforme a
              LGPD.
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default OrdersReportModal;
