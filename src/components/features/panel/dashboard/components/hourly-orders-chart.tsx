import { HourlyOrders } from "@/components/features/panel/dashboard//types";
import { LuClock3 } from "react-icons/lu";
import {
  Bar,
  BarShapeProps,
  ComposedChart,
  Line,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface Props {
  hours: HourlyOrders[];
}

const HourlyOrdersChart: React.FC<Props> = ({ hours }) => {
  const peakHours = [...hours]
    .sort((a, b) => b.today - a.today)
    .slice(0, 2)
    .map((item) => item.hour)
    .sort((a, b) => a - b);

  const data = hours.map((item) => ({
    label: `${item.hour}h`,
    today: item.today,
    average: item.average,
    isPeak: peakHours.includes(item.hour),
  }));

  return (
    <div className="h-full rounded-[14px] border border-border bg-surface px-5.5 py-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="font-display text-[16px] font-semibold text-text-primary">
            Pedidos por horário
          </h2>
          <p className="mt-0.5 text-[12px] text-text-tertiary">
            Hoje comparado à média dos últimos 30 dias
          </p>
        </div>
        <div className="flex items-center gap-4 text-[12px] text-text-secondary">
          <span className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-[3px] bg-primary" />
            Hoje
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-0.5 w-3.5 bg-text-tertiary" />
            Média
          </span>
        </div>
      </div>

      <div className="mt-5 h-48">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={data}
            margin={{ top: 8, right: 0, bottom: 0, left: 0 }}
          >
            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "#6c6779" }}
              tickMargin={8}
            />
            <YAxis hide />

            <Tooltip
              isAnimationActive={false}
              cursor={{ fill: "#f7f0fb" }}
              content={({ active, payload, label }) =>
                active && payload?.length ? (
                  <div className="rounded-lg bg-text-primary px-3 py-2 text-white shadow-lg">
                    <p className="text-[11px] text-white/70">{label}</p>
                    <p className="text-[13px] font-semibold">
                      Hoje: {payload[0].payload.today} pedidos
                    </p>
                    <p className="text-[12px] text-white/70">
                      Média: {payload[0].payload.average} pedidos
                    </p>
                  </div>
                ) : null
              }
            />

            <Bar
              dataKey="today"
              shape={(props: BarShapeProps) => (
                <Rectangle
                  {...props}
                  radius={[6, 6, 0, 0]}
                  fill={data[props.index].isPeak ? "#9530d9" : "#ecddf6"}
                />
              )}
            />
            <Line
              type="linear"
              dataKey="average"
              stroke="#6c6779"
              strokeWidth={1.5}
              strokeDasharray="4 4"
              dot={{ r: 2.5, fill: "#6c6779", strokeWidth: 0 }}
              activeDot={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-4 flex items-center gap-2 rounded-lg bg-cream px-3 py-2.5 text-[13px] text-text-secondary">
        <LuClock3 size={16} className="shrink-0 text-primary" />
        Picos às {peakHours[0]}h e às {peakHours[1]}h. Nesses horários, deixe
        alguém de olho nos pedidos novos.
      </p>
    </div>
  );
};

export default HourlyOrdersChart;
