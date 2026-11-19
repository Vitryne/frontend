import { CriticalStockItem } from "@/components/features/panel/dashboard/types";
import Badge from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";

interface Props {
  items: CriticalStockItem[];
}

const CriticalStock: React.FC<Props> = ({ items }) => {
  return (
    <div className="h-full rounded-[14px] border border-border bg-surface px-5.5 py-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-display text-[16px] font-semibold text-text-primary">
          Estoque critíco
        </h2>
        <Link
          href="/products"
          className="text-[12px] font-semibold text-primary hover:text-primary-hover"
        >
          Repor estoque em produtos
        </Link>
      </div>

      <ul className="mt-4 flex flex-col gap-3">
        {items.map((item) => (
          <li
            key={`${item.name}-${item.size}`}
            className="flex items-center gap-3"
          >
            <Image
              src={item.image}
              alt={item.name}
              width={44}
              height={44}
              className="size-11 shrink-0 rounded-[10px] object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-semibold text-text-primary">
                {item.name}
              </p>
              <p className="text-[12px] text-text-tertiary">
                Tamanho: {item.size}
              </p>
            </div>
            <Badge
              title={item.quantity === 0 ? "Esgotado" : `${item.quantity} uni`}
              variant={item.quantity === 0 ? "danger" : "warning"}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CriticalStock;
