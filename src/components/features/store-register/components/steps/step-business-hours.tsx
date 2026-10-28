import StepHeader from "@/components/features/store-register/components/header";
import { FiClock } from "react-icons/fi";
import { useState } from "react";
import Switch from "@/components/ui/switch";

interface BusinessDay {
  name: string;
  open: boolean;
  openMorning: string;
  closeMorning: string;
  openAfternoon: string;
  closeAfternoon: string;
}

type TimeField = | "openMorning" | "closeMorning" | "openAfternoon" | "closeAfternoon"

const PERIODS: { label: string; open: TimeField; close: TimeField }[]  = [
  {
    label: "Manhã",
    open: "openMorning",
    close: "closeMorning"
  },
  {
     label: "Tarde", 
     open: "openAfternoon", 
     close: "closeAfternoon",
  }
]

const openDay = (
  name: string,
  openMorning: string,
  closeMorning: string,
  openAfternoon = "",
  closeAfternoon = "",
): BusinessDay => ({
  name,
  open: true,
  openMorning,
  closeMorning,
  openAfternoon,
  closeAfternoon,
});

const closedDay = (name: string): BusinessDay => ({
  name,
  open: false,
  openMorning: "",
  closeMorning: "",
  openAfternoon: "",
  closeAfternoon: "",
});

const DEFAULT_DAYS: BusinessDay[] = [
  openDay("Segunda", "09:00", "12:00", "13:30", "20:00"),
  openDay("Terça", "09:00", "12:00", "13:30", "20:00"),
  openDay("Quarta", "09:00", "12:00", "13:30", "20:00"),
  openDay("Quinta", "09:00", "12:00", "13:30", "20:00"),
  openDay("Sexta", "09:00", "12:00", "13:30", "22:00"),
  openDay("Sábado", "10:00", "13:00"),
  closedDay("Domingo"),
];

const WEEK_DAYS = [
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
  "Domingo",
];

const PRESETS = [
  {
    name: "Comercial (Seg-Sex 8h-18h)",
    days: WEEK_DAYS.map((day, i) =>
      i < 5 ? openDay(day, "08:00", "12:00", "13:00", "18:00") : closedDay(day),
    ),
  },
  {
    name: "24/7",
    days: WEEK_DAYS.map((day) =>
      openDay(day, "00:00", "12:00", "12:00", "23:59"),
    ),
  },
];
const CUSTOM_PRESET = "Personalizado";

const PRESET_OPTIONS = [CUSTOM_PRESET, ...PRESETS.map((preset) => preset.name)];

const StepBusinessHours = () => {
  const [days, setDays] = useState(DEFAULT_DAYS);
  const [activePreset, setActivePreset] = useState("Comercial (Seg-Sex 8h-18h)");

  const selectPreset = (name: string) => {
    const preset = PRESETS.find((p) => p.name === name);

    if (preset) setDays(preset.days);
    setActivePreset(name);
  };

  const toggleDay = (i: number) => {
    setDays((current) =>
      current.map((day, index) =>
        index === i ? { ...day, open: !day.open } : day,
      ),
    );
    setActivePreset(CUSTOM_PRESET);
  };

  const changeHour = (i: number, field: TimeField, value: string) => {
    setDays((current) =>
      current.map((day, index) =>
        index === i ? { ...day, [field]: value } : day,
      ),
    );
    setActivePreset(CUSTOM_PRESET);
  };

  return (
    <div>
      <StepHeader
        title="Horário de funcionamento"
        subtitle="Em quais dias e horários sua loja efetua vendas e entregas?"
      />

      <div className="flex flex-wrap gap-3">
        {PRESET_OPTIONS.map((name) => {
          const active = activePreset === name;

          return (
            <button
              key={name}
              type="button"
              onClick={() => selectPreset(name)}
              className={`h-11 cursor-pointer rounded-2xl border px-6 text-[14px] font-semibold transition-colors ${
                active
                  ? "border-primary bg-primary-soft-2 text-primary-hover"
                  : "border-border-strong bg-surface text-text-primary hover:border-primary"
              }`}
            >
              { name }
            </button>
          );
        })}
      </div>

      <div className="rounded-2xl border border-border-strong bg-surface px-5 mt-6">
        <div className="flex items-center gap-6 border-b border-border py-3">
          <span className="w-24" />
          <span className="w-28" />
          {PERIODS.map((period) => (
            <span
              key={period.label}
              className="flex-1 text-center text-[11px] font-semibold uppercase tracking-wider text-text-tertiary"
            >
              { period.label }
            </span>
          ))}
        </div>

        {days.map((day, i) => (
          <div
            key={day.name}
            className="flex items-center gap-6 border-b border-border py-3 last:border-b-0"
          >
            <span
              className={`w-24 text-[14px] font-semibold ${
                day.open ? "text-text-primary" : "text-text-disabled"
              }`}
            >
              {day.name}
            </span>

            <div className="flex w-28 items-center gap-2">
              <Switch checked={day.open} onChange={() => toggleDay(i)} />
              <span className="text-[13px] text-text-secondary">
                {day.open ? "Aberto" : "Fechado"}
              </span>
            </div>

            {PERIODS.map((period) => (
              <div
                key={period.label}
                className="flex flex-1 items-center justify-center gap-2"
              >
                <input
                  type="time"
                  value={day[period.open]}
                  disabled={!day.open}
                  onChange={(e) => changeHour(i, period.open, e.target.value)}
                  className="h-10 w-full max-w-30 rounded-xl border border-border-strong bg-surface px-3 text-center text-[13px] text-text-primary outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:border-border disabled:bg-screen disabled:text-text-disabled"
                />
                <span className="shrink-0 text-[12px] text-text-tertiary">
                  até
                </span>
                <input
                  type="time"
                  value={day[period.close]}
                  disabled={!day.open}
                  onChange={(e) => changeHour(i, period.close, e.target.value)}
                  className="h-10 w-full max-w-30 rounded-xl border border-border-strong bg-surface px-3 text-center text-[13px] text-text-primary outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:border-border disabled:bg-screen disabled:text-text-disabled"
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-2 rounded-xl border border-warning/30 bg-warning/10 px-4 py-3 text-[13px] text-warning">
        <FiClock size={16} className="shrink-0" />
        Fora do horário, a Vitryne fecha sua loja automaticamente. Você pode
        abrir manualmente a qualquer momento.
      </div>
    </div>
  );
};

export default StepBusinessHours;
