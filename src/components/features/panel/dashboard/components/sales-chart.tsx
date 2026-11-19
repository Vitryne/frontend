import { useState } from "react";
import { SalesPeriod, SalesPoint } from "../types";
import { formatMoneyRounded, formatShortDate } from "@/lib/format";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceDot,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface Props {
  sales: SalesPoint[];
}

const SalesChart: React.FC<Props> = ({ sales }) => {
  const [period, setPeriod] = useState<SalesPeriod>(14);

  const data = sales.slice(-period).map((point) => ({
    label: formatShortDate(point.date),
    value: point.totalInCents,
  }));

  const lastPoint = data[data.length - 1];

  return (
    <div className="h-full rounded-[14px] border border-border bg-surface px-5.5 py-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="font-display text-[16px] font-semibold text-text-primary">
            Vendas dos últimos {period} dias
          </h2>
          <p className="mt-0.5 text-[12px] text-text-tertiary">
            Receita bruta - BRL
          </p>
        </div>

        <div className="flex gap-1.5">
          {([7, 14, 30, 90] as SalesPeriod[]).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setPeriod(option)}
              className={`h-8 min-w-11 cursor-pointer rounded-full border px-3 text-[12px] font-semibold transition-colors ${
                option === period
                  ? "border-text-primary bg-text-primary text-white"
                  : "border-border-strong bg-surface text-text-secondary hover:text-text-primary"
              }`}
            >
              {option}d
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 h-52">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 8, right: 8, bottom: 8, left: 8 }}
          >
            <defs>
              <linearGradient id="salesFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#9530d9" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#9530d9" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              vertical={false}
              stroke="#ece9e3"
              strokeDasharray="4 4"
            />

            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "#6c6779" }}
              tickMargin={10}
              minTickGap={24}
            />
            <YAxis hide domain={["dataMin - 100000", "dataMax + 50000"]} />

            <Tooltip
              isAnimationActive={false}
              cursor={{
                stroke: "#9530d9",
                strokeOpacity: 0.4,
                strokeDasharray: "3 3",
              }}
              content={({ active, payload, label }) =>
                active && payload?.length ? (
                  <div className="rounded-lg bg-text-primary px-3 py-2 text-white shadow-lg">
                    <p className="text-[11px] text-white/70">{label}</p>
                    <p className="font-display text-[14px] font-semibold">
                      {formatMoneyRounded(Number(payload[0].value))}
                    </p>
                  </div>
                ) : null
              }
            />

            <Area
              type="linear"
              dataKey="value"
              stroke="#9530d9"
              strokeWidth={2.5}
              fill="url(#salesFill)"
              activeDot={{
                r: 5,
                fill: "#fff",
                stroke: "#9530d9",
                strokeWidth: 2.5,
              }}
            />
            <ReferenceDot
              x={lastPoint.label}
              y={lastPoint.value}
              r={5}
              fill="#ffffff"
              stroke="#9530d9"
              strokeWidth={2.5}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesChart;
