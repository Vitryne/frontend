import type { DailyReceipt } from "@/components/features/panel/finance/types";
import { formatDayMonth, formatMoney } from "@/lib/format";
import {
  Bar,
  BarChart,
  BarShapeProps,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";

interface Props {
  receipts: DailyReceipt[];
}

const DailyReceiptsChart: React.FC<Props> = ({ receipts }) => {
  const maxValue = Math.max(...receipts.map((item) => item.totalInCents));

  const data = receipts.map((item) => ({
    day: String(Number(item.date.slice(8, 10))),
    date: formatDayMonth(item.date),
    value: item.totalInCents,
    isPeak: item.totalInCents === maxValue,
  }));

  return (
    <div className="flex h-full flex-col rounded-[14px] border border-border bg-surface px-5.5 py-5">
      <h2 className="font-display text-[16px] font-semibold text-text-primary">
        Recebimentos por dia
      </h2>

      <div className="mt-4 min-h-40 flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 8, right: 0, bottom: 0, left: 0 }}
          >
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "#6c6779" }}
              tickMargin={8}
            />

            <Tooltip
              isAnimationActive={false}
              cursor={false}
              content={({ active, payload }) =>
                active && payload?.length ? (
                  <div className="rounded-lg bg-text-primary px-3 py-2 text-white shadow-lg">
                    <p className="text-[11px] text-white/70">
                      {payload[0].payload.date}
                    </p>
                    <p className="font-display text-[14px] font-semibold">
                      R$ {formatMoney(payload[0].payload.value)}
                    </p>
                  </div>
                ) : null
              }
            />

            <Bar
              dataKey="value"
              shape={(props: BarShapeProps) => (
                <Rectangle
                  {...props}
                  radius={[6, 6, 0, 0]}
                  fill={data[props.index].isPeak ? "#9530d9" : "#ecddf6"}
                />
              )}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DailyReceiptsChart;
