import { ProductStock } from "@/components/features/panel/products/types";
import {
  getTotal,
  isCriticalStock,
} from "@/components/features/panel/products/stock";
import Alert from "@/components/ui/alert";
import Menu, { MenuItem } from "@/components/ui/menu";
import { LuPencil, LuPlus, LuTrash2, LuTrendingUp, LuUpload } from "react-icons/lu";

interface Props {
  stock: ProductStock[];
  alertThreshold: number;
  onChange: (stock: ProductStock[]) => void;
  onConfigureThreshold?: () => void;
}


const SizesStock: React.FC<Props> = ({ stock, alertThreshold, onChange, onConfigureThreshold }) => {
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

  const menuItems: MenuItem[] = [
    { label: "Adicionar mais tamanhos", icon: LuPlus },
    {
      label: "Configurar limiar de aviso",
      icon: LuPencil,
      onClick: onConfigureThreshold,
    },
    { label: "Ver histórico de movimentação", icon: LuTrendingUp },
    {
      label: "Importar estoque por planilha",
      icon: LuUpload,
      disabled: true,
      hint: "Em breve",
    },
    {
      label: "Zerar todo o estoque",
      icon: LuTrash2,
      danger: true,
      separated: true,
      onClick: () =>
        onChange(stock.map((item) => ({ ...item, quantity: 0 }))),
    },
  ];

  return (
    <div>
      <div
        className="grid items-center gap-x-2 gap-y-1.5"
        style={{
          gridTemplateColumns: `auto repeat(${stock.length}, minmax(0, 1fr)) auto`,
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

        <span />

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
              className={`h-7.5 w-full rounded-[10px] border px-2 text-center text-[14px] outline-none transition-colors placeholder:text-text-disabled ${
                critical
                  ? "border-warning bg-warning-soft font-semibold text-warning"
                  : "border-border-strong bg-surface text-text-primary hover:border-border-strong focus:border-primary focus:ring-2 focus:ring-primary/20"
              }`}
            />
          );
        })}

        <Menu title="Estoque" items={menuItems} placement="top" />
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
