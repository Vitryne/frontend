import { getPeriodRange } from "@/components/features/panel/orders/filters";
import type { OrderPeriod } from "@/components/features/panel/orders/types";
import { useState } from "react";
import { DayPicker, type DateRange } from "react-day-picker";
import { ptBR } from "react-day-picker/locale";
import { LuCalendar, LuChevronDown } from "react-icons/lu";

interface Props {
  title: string;
  period: OrderPeriod | null;
  dateRange: DateRange | undefined;
  onChange: (
    period: OrderPeriod | null,
    dateRange: DateRange | undefined,
  ) => void;
}

const PeriodPicker: React.FC<Props> = ({
  title,
  period,
  dateRange,
  onChange,
}) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const { from, to } = dateRange ?? {};

  const handlePeriodClick = (option: OrderPeriod) => {
    if (period === option) {
      onChange(null, undefined);
      setIsCalendarOpen(false);
      return;
    }

    onChange(option, option === "custom" ? dateRange : getPeriodRange(option));
    setIsCalendarOpen(option === "custom");
  };

  return (
    <>
      <div>
        <h3 className="mb-2 text-[13px] font-semibold text-text-primary">
          {title}
        </h3>
        <div className="grid grid-cols-4 rounded-xl bg-surface-subtle p-1">
          {(
            [
              { value: "today", label: "Hoje" },
              { value: "7d", label: "7 dias" },
              { value: "30d", label: "30 dias" },
              { value: "custom", label: "Personalizado" },
            ] as { value: OrderPeriod; label: string }[]
          ).map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handlePeriodClick(option.value)}
              className={`h-9 cursor-pointer rounded-lg text-[13px] transition-colors ${
                period === option.value
                  ? "bg-surface font-semibold text-primary-hover shadow-sm"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              {option.label}
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
          className="flex h-11 w-full cursor-pointer items-center gap-2.5 rounded-xl border border-border-strong bg-surface px-3.5 text-[13px] text-text-primary outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20"
        >
          <LuCalendar size={16} className="text-text-secondary" />
          <span
            className={`flex-1 text-left ${from ? "" : "text-text-disabled"}`}
          >
            {from
              ? `${from.toLocaleDateString("pt-BR")} – ${to ? to.toLocaleDateString("pt-BR") : "..."}`
              : "Selecione as datas"}
          </span>
          <LuChevronDown
            size={16}
            className={`text-text-secondary transition-transform ${isCalendarOpen ? "rotate-180" : ""}`}
          />
        </button>

        <div
          className={`grid transition-all duration-300 ease-out ${
            isCalendarOpen
              ? "mt-2 grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="rounded-xl border border-border p-4">
              <DayPicker
                mode="range"
                locale={ptBR}
                numberOfMonths={2}
                defaultMonth={
                  new Date(new Date().getFullYear(), new Date().getMonth() - 1)
                }
                selected={dateRange}
                onSelect={(range) => onChange("custom", range)}
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
          </div>
        </div>
      </div>
    </>
  );
};

export default PeriodPicker;
