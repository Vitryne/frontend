import { ProductStock } from "@/components/features/panel/products/types";
import {
  getTotal,
  isCriticalStock,
} from "@/components/features/panel/products/stock";
import Alert from "@/components/ui/alert";

interface Props {
  stock: ProductStock[];
  alertThreshold: number;
  onChange: (stock: ProductStock[]) => void;
}

const SizesStock: React.FC<Props> = ({ stock, alertThreshold, onChange }) => {
  const hasStock = getTotal(stock) > 0;
  const criticalSizes = hasStock
    ? stock
        .filter((item) => isCriticalStock(item.quantity, alertThreshold))
        .map((item) => item.size)
    : [];

  const changeQuantity = (size: string, value: string) => {
    const quantity = Number(value.replace(/\D/g, "").slice(0, 5));

    onChange(
      stock.map((item) => (item.size === size ? { ...item, quantity } : item)),
    );
  };

  return (
    <div>
      <div
        className="grid items-center gap-x-2 gap-y-1.5"
        style={{
          gridTemplateColumns: `auto repeat(${stock.length}, minmax(0, 1fr))`,
        }}
      >
        <span className="pr-6 text-[12px] text-text-tertiary">Tamanho</span>

        {stock.map((item) => (
          <span
            key={item.size}
            className="text-center text-[12px] text-text-tertiary"
          >
            {item.size}
          </span>
        ))}

        <span className="pr-6 text-[13px] font-semibold text-text-primary">
          Estoque
        </span>
        {stock.map((item) => {
          const critical = criticalSizes.includes(item.size);

          return (
            <input
              key={item.size}
              type="text"
              inputMode="numeric"
              placeholder="0"
              value={item.quantity === 0 ? "" : String(item.quantity)}
              onChange={(e) => changeQuantity(item.size, e.target.value)}
              className={`h-9 w-full rounded-lg border px-2 text-center text-[14px] outline-none transition-colors placeholder:text-text-disabled ${
                critical
                  ? "border-warning bg-warning-soft font-semibold text-warning"
                  : "border-border bg-surface text-text-primary hover:border-border-strong focus:border-primary focus:ring-2 focus:ring-primary/20"
              }`}
            />
          );
        })}
      </div>

      {criticalSizes.length > 0 && (
        <div className="mt-3">
          <Alert
            message={`${criticalSizes.length} ${
              criticalSizes.length === 1 ? "tamanho" : "tamanhos"
            } com estoque crítico (${criticalSizes.join(", ")})`}
          />
        </div>
      )}
    </div>
  );
};

export default SizesStock;
