import ButtonPrimary from "@/components/ui/button-primary";
import ButtonSecondary from "@/components/ui/button-secondary";
import CheckBox from "@/components/ui/checkbox";
import Chip from "@/components/ui/chip";
import Modal from "@/components/ui/modal";
import { ORDER_COLUMNS } from "@/components/features/panel/orders/columns";
import PeriodPicker from "@/components/features/panel/orders/components/filters/period-picker";
import {
  CATEGORY_OPTIONS,
  EMPTY_FILTERS,
  PAYMENT_OPTIONS,
  filterOrders,
  toggleValue,
} from "@/components/features/panel/orders/filters";
import type {
  Order,
  OrderFilters,
  OrdersView,
} from "@/components/features/panel/orders/types";
import * as Slider from "@radix-ui/react-slider";
import { useState } from "react";
import { LuListFilter } from "react-icons/lu";

interface Props {
  orders: Order[];
  filters: OrderFilters;
  view: OrdersView;
  onClose: () => void;
  onApply: (filters: OrderFilters) => void;
}

const OrdersFiltersModal: React.FC<Props> = ({
  orders,
  filters,
  view,
  onClose,
  onApply,
}) => {
  const [draft, setDraft] = useState(filters);

  const resultCount = filterOrders(
    orders,
    view === "list" ? draft : { ...draft, statuses: [] },
  ).length;

  return (
    <Modal
      open
      onClose={onClose}
      title="Filtrar pedidos"
      subtitle="Combine os filtros para encontrar pedidos."
      icon={<LuListFilter size={22} />}
      headerAction={
        <ButtonSecondary
          title="Limpar filtros"
          onClick={() => setDraft(EMPTY_FILTERS)}
          className="inline-flex h-8 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-primary/30 bg-surface px-3 text-[12px] font-semibold text-primary transition-colors hover:bg-primary/5"
        />
      }
      footer={
        <>
          <ButtonSecondary
            title="Cancelar"
            onClick={onClose}
            className="inline-flex h-11 flex-1 cursor-pointer items-center justify-center rounded-[10px] border border-primary/30 bg-surface text-[14px] font-semibold text-primary transition-colors hover:bg-primary/5"
          />
          <ButtonPrimary
            title={`Mostrar ${resultCount} ${resultCount === 1 ? "pedido" : "pedidos"}`}
            onClick={() => onApply(draft)}
            className="inline-flex h-11 flex-1 cursor-pointer items-center justify-center rounded-[10px] bg-primary text-[14px] font-semibold text-white shadow-lg shadow-primary/30 transition-colors hover:bg-primary-hover"
          />
        </>
      }
    >
      <div className="flex flex-col gap-5 pt-5">
        {view === "list" && (
          <div>
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-[13px] font-semibold text-text-primary">
                Status
              </h3>
              {draft.statuses.length > 0 && (
                <span className="text-[11px] text-text-tertiary">
                  {draft.statuses.length}{" "}
                  {draft.statuses.length === 1 ? "selecionado" : "selecionados"}
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {ORDER_COLUMNS.map((column) => (
                <Chip
                  key={column.status}
                  label={column.label}
                  selected={draft.statuses.includes(column.status)}
                  onClick={() =>
                    setDraft({
                      ...draft,
                      statuses: toggleValue(draft.statuses, column.status),
                    })
                  }
                />
              ))}
            </div>
          </div>
        )}

        <PeriodPicker
          title="Período do pedido"
          period={draft.period}
          dateRange={draft.dateRange}
          onChange={(period, dateRange) =>
            setDraft({ ...draft, period, dateRange })
          }
        />

        <div className="grid grid-cols-[1fr_auto] gap-6">
          <div>
            <h3 className="mb-9 text-[13px] font-semibold text-text-primary">
              Valor do pedido
            </h3>
            <Slider.Root
              min={0}
              max={1000}
              step={10}
              minStepsBetweenThumbs={1}
              value={draft.valueRange}
              onValueChange={([min, max]) =>
                setDraft({ ...draft, valueRange: [min, max] })
              }
              className="relative flex h-5 w-full touch-none items-center select-none"
            >
              <Slider.Track className="relative h-1 grow rounded-full bg-border">
                <Slider.Range className="absolute h-full rounded-full bg-primary" />
              </Slider.Track>
              {draft.valueRange.map((value, index) => (
                <Slider.Thumb
                  key={index}
                  className="relative block size-4.5 cursor-grab rounded-full border-2 border-primary bg-surface shadow-sm outline-none active:cursor-grabbing"
                >
                  <span className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 rounded-md bg-text-primary px-2 py-0.5 text-[11px] font-semibold whitespace-nowrap text-white">
                    R$ {value.toLocaleString("pt-BR")}
                  </span>
                </Slider.Thumb>
              ))}
            </Slider.Root>
            <div className="mt-2 flex justify-between text-[11px] text-text-tertiary">
              <span>R$ 0</span>
              <span>R$ 1.000</span>
            </div>
          </div>

          <div>
            <h3 className="mb-2 text-[13px] font-semibold text-text-primary">
              Forma de pagamento
            </h3>
            <div className="flex gap-2">
              {PAYMENT_OPTIONS.map((option) => (
                <Chip
                  key={option.value}
                  label={option.label}
                  selected={draft.paymentMethods.includes(option.value)}
                  onClick={() =>
                    setDraft({
                      ...draft,
                      paymentMethods: toggleValue(
                        draft.paymentMethods,
                        option.value,
                      ),
                    })
                  }
                />
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-[13px] font-semibold text-text-primary">
              Categoria do item
            </h3>
            {draft.categories.length > 0 && (
              <span className="text-[11px] text-text-tertiary">
                {draft.categories.length}{" "}
                {draft.categories.length === 1 ? "selecionada" : "selecionadas"}
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {CATEGORY_OPTIONS.map((option) => (
              <Chip
                key={option.value}
                label={option.label}
                selected={draft.categories.includes(option.value)}
                onClick={() =>
                  setDraft({
                    ...draft,
                    categories: toggleValue(draft.categories, option.value),
                  })
                }
              />
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-2 text-[13px] font-semibold text-text-primary">
            Mais opções
          </h3>
          <div className="flex flex-col gap-2.5">
            <label className="flex cursor-pointer items-center gap-2 select-none">
              <CheckBox
                checked={draft.onlyWithCoupon}
                onChange={(checked) =>
                  setDraft({ ...draft, onlyWithCoupon: checked })
                }
              />
              <span className="text-[13px] text-text-primary">
                Só pedidos com cupom aplicado
              </span>
            </label>
            <label className="flex cursor-pointer items-center gap-2 select-none">
              <CheckBox
                checked={draft.onlyExpiring}
                onChange={(checked) =>
                  setDraft({ ...draft, onlyExpiring: checked })
                }
              />
              <span className="text-[13px] text-text-primary">
                Só pedidos com prazo de confirmação vencendo
              </span>
            </label>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default OrdersFiltersModal;
