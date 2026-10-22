import type { Product } from "@/components/features/panel/products/types";
import Badge from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import StockBySize from "./stock-by-size";
import Switch from "@/components/ui/switch";
import { LuPencil } from "react-icons/lu";
import CheckBox from "@/components/ui/checkbox";
import { formatPrice } from "@/lib/format";

interface Props {
  product: Product;
  selected: boolean;
  onToggleSelect: (sku: string, selected: boolean) => void;
  onToggleStatus: (sku: string, active: boolean) => void;
}

const ProductRow: React.FC<Props> = ({
  product,
  selected,
  onToggleSelect,
  onToggleStatus,
}) => {
  const { reais, cents } = formatPrice(product.priceInCents);
  const total = product.stock.reduce((sum, item) => sum + item.quantity, 0);
  const dimmed = product.active ? "" : "opacity-50";

  return (
    <tr
      className={`border-t border-border transition-colors ${selected ? "bg-primary-soft" : ""}`}
    >
      <td className="w-px py-3 pl-5 pr-2">
        <CheckBox
          checked={selected}
          onChange={(checked) => onToggleSelect(product.sku, checked)}
        />
      </td>

      <td className={`px-2 py-3 ${dimmed}`}>
        <div className="flex items-center gap-3">
          <div className="relative h-13 w-10 shrink-0 overflow-hidden rounded-lg bg-surface-subtle">
            <Image
              src={product.image}
              alt=""
              fill
              sizes="40px"
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-[.9rem] font-semibold text-text-primary">
              {product.name}
            </p>
            <p className="text-[.75rem] text-text-tertiary">
              SKU {product.sku}
            </p>
          </div>
        </div>
      </td>

      <td className={`px-2 py-3 ${dimmed}`}>
        <Badge title={product.category} />
      </td>

      <td
        className={`whitespace-nowrap px-2 py-3 text-[.9rem] font-bold text-text-primary ${dimmed}`}
      >
        R$ {reais},<span className="text-[.7rem]">{cents}</span>
      </td>

      <td className={`px-2 py-3 ${dimmed}`}>
        <StockBySize
          stock={product.stock}
          alertThreshold={product.stockAlertThreshold}
          showCritical={product.active}
        />
      </td>

      <td
        className={`whitespace-nowrap px-2 py-3 text-right text-[.9rem] font-bold text-text-primary ${dimmed}`}
      >
        {total}{" "}
        <span className="text-[.75rem] font-normal text-text-tertiary">
          un.
        </span>
      </td>

      <td className="whitespace-nowrap px-2 py-3">
        <div className="flex items-center gap-2">
          <Switch
            checked={product.active}
            onChange={(checked) => onToggleStatus(product.sku, checked)}
          />
          <span
            className={`text-[.8rem] ${
              product.active ? "text-text-primary" : "text-text-tertiary"
            }`}
          >
            {product.active ? "Ativo" : "Inativo"}
          </span>
        </div>
      </td>

      <td className="py-3 pl-2 pr-5">
        <Link
          href={`/products/${product.sku.toLowerCase()}/edit`}
          className={`inline-flex size-8 items-center justify-center rounded-full text-text-primary transition-colors hover:bg-surface-subtle ${selected ? "bg-surface shadow-sm" : ""}`}
        >
          <LuPencil size={15}/>
        </Link>
      </td>
    </tr>
  );
};

export default ProductRow;
