import { Order, OrderFilters, OrderPeriod, OrdersView } from "@/components/features/panel/orders/types";
import { CATEGORY_OPTIONS, EMPTY_FILTERS, filterOrders, getPeriodRange, PAYMENT_OPTIONS, toggleValue } from "@/components/features/panel/orders/filters";
import { useState } from "react";
import Modal from "@/components/ui/modal";
import { LuCalendar, LuChevronDown, LuListFilter } from "react-icons/lu";
import ButtonSecondary from "@/components/ui/button-secondary";
import ButtonPrimary from "@/components/ui/button-primary";
import { ORDER_COLUMNS } from "@/components/features/panel/orders/columns";
import Chip from "@/components/ui/chip";
import { DayPicker } from "react-day-picker";
import { ptBR } from "react-day-picker/locale";
import * as Slider from "@radix-ui/react-slider";
import CheckBox from "@/components/ui/checkbox";




interface Props {
  orders: Order[];
  filters: OrderFilters;
  view: OrdersView;
  onClose: () => void;
  onApply: (filters: OrderFilters) => void;
}

const OrdersFiltersModal: React.FC<Props> = ({orders, filters, view, onClose, onApply}) => {

  const [draft, setDraft] = useState(filters);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  const handlePeriodClick = (period: OrderPeriod) => {
    if (draft.period === period) {
      setDraft({...draft, period: null, dateRange: undefined})
      setIsCalendarOpen(false)
      
      return
    }

    setDraft({
      ...draft,
      period,
      dateRange: period === "custom" ? draft.dateRange : getPeriodRange(period)
    })

    setIsCalendarOpen(period === "custom")
  }

  const { from, to } = draft.dateRange ?? {}

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
                  { draft.statuses.length }{" "}
                  { draft.statuses.length === 1 ? "selecionado" : "selecionados"}
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

        <div>
          <h3 className="mb-2 text-[13px] font-semibold text-text-primary">
            Período do pedido
          </h3>

          <div className="grid grid-cols-4 rounded-xl bg-surface-subtle p-1">
            {(
              [
                { value: "today", label: "Hoje" },
                { value: "7d", label: "7 dias" },
                { value: "30d", label: "30 dias"},
                { value: "custom", label: "Personalizado"},
              ] as { value: OrderPeriod; label: string} []
            ).map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handlePeriodClick(option.value)}
                className={`h-9 cursor-pointer rounded-lg text-[13px] transition-colors ${
                  draft.period === option.value
                    ? "bg-surface font-semibold text-primary-hover shadow-sm"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                { option.label }
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="mb-2 text-[13px] font-semibold text-text-primary">
            Intervalo de datas
          </h3>

          <button
            type="button"
            onClick={() => setIsCalendarOpen(!isCalendarOpen)}
            className="flex h-11 w-full cursor-pointer items-center gap-2.5 rounded-xl border border-border-strong bg-surface px-3.5 text-[13px] text-text-primary"
          >
            <LuCalendar size={16} className="text-text-secondary" />
            <span className={`flex-1 text-left ${from ? "" : "text-text-disabled"}`}>
              {from
                ? `${from.toLocaleDateString("pt-BR")} – ${to ? to.toLocaleDateString("pt-BR") : "..."}`
                : "Selecione as datas"}
            </span>
            <LuChevronDown
              size={16}
              className={`text-text-secondary transition-transform ${isCalendarOpen ? "rotate-180" : ""}`}
            />
          </button>

          {isCalendarOpen && (
            <div className="mt-2 rounded-xl border border-border p-4">
              <DayPicker
                mode="range"
                locale={ptBR}
                numberOfMonths={2}
                defaultMonth={
                  new Date(new Date().getFullYear(), new Date().getMonth() - 1)
                }
                selected={draft.dateRange}
                onSelect={(range) =>
                  setDraft({ ...draft, period: "custom", dateRange: range })
                }
                disabled={{ after: new Date() }}
                classNames={{
                  months: "relative flex gap-6",
                  month: "flex-1",
                  month_caption: "flex h-8 items-center justify-center",
                  caption_label:
                    "text-[13px] font-semibold capitalize text-text-primary",
                  nav: "pointer-events-none absolute inset-x-0 top-0 flex justify-between",
                  button_previous:
                    "pointer-events-auto flex size-8 cursor-pointer items-center justify-center rounded-full border border-border-strong text-text-secondary transition-colors hover:bg-surface-subtle",
                  button_next:
                    "pointer-events-auto flex size-8 cursor-pointer items-center justify-center rounded-full border border-border-strong text-text-secondary transition-colors hover:bg-surface-subtle",
                  chevron: "size-3.5 fill-current",
                  month_grid: "mt-3 w-full border-separate border-spacing-y-1",
                  weekday:
                    "h-7 text-[10px] font-semibold tracking-wider text-text-tertiary uppercase",
                  day: "p-0 text-center",
                  day_button:
                    "mx-auto flex size-8 cursor-pointer items-center justify-center rounded-full text-[13px] text-text-primary transition-colors hover:bg-surface-subtle",
                  today: "[&>button]:font-semibold [&>button]:text-primary",
                  selected: "bg-primary-soft",
                  range_start:
                    "rounded-l-full [&>button]:bg-primary [&>button]:text-white [&>button]:hover:bg-primary-hover",
                  range_end:
                    "rounded-r-full [&>button]:bg-primary [&>button]:text-white [&>button]:hover:bg-primary-hover",
                  range_middle: "[&>button]:hover:bg-primary-soft-2",
                  disabled:
                    "[&>button]:cursor-not-allowed [&>button]:text-text-disabled [&>button]:hover:bg-transparent",
                }}
              />
            </div>
          )}
        </div>

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
                setDraft({...draft, valueRange: [min, max]})
              }
              className="relative flex h-5 w-full touch-none items-center select-none"
            >
              <Slider.Track className="relative h-1 grow rounded-full bg-border">
                <Slider.Range className="absolute h-full rounded-full bg-primary"/>
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
                      paymentMethods: toggleValue(draft.paymentMethods, option.value)
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
              <span>
                { draft.categories.length } {" "}
                { draft.categories.length === 1 ? "selecionada" : "selecionadas"}
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
                    categories: toggleValue(draft.categories, option.value)
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
                onChange={(checked) => setDraft({...draft, onlyWithCoupon: checked })}
              />
              <span className="text-[13px] text-text-primary">
                Só pedidos com cupom aplicado
              </span>
            </label>
            <label className="flex cursor-pointer items-center gap-2 select-none">
              <CheckBox 
                checked={draft.onlyExpiring}
                onChange={(checked) => setDraft({...draft, onlyExpiring: checked})}
              />
              <span className="text-[13px] text-text-primary">
                Só pedidos com prazo de confirmação vencendo
              </span>
            </label>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default OrdersFiltersModal