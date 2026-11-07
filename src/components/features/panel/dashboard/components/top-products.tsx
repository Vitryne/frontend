import { TopProduct } from "@/components/features/panel/dashboard/types";
import { formatMoneyRounded } from "@/lib/format";
import Image from "next/image";



interface Props {
  products: TopProduct[]
}

const TopProducts: React.FC<Props> = ({ products }) => {
  return (
    <div className="h-full rounded-[14px] border border-border bg-surface px-5.5 py-5">
      <h2 className="font-display text-[16px] font-semibold text-text-primary">
        Produtos mais vendidos
      </h2>

      <ul className="mt-4 flex flex-col gap-3">
        {products.map((product) => (
          <li key={product.name} className="flex items-center gap-3">
            <Image
              src={product.image}
              alt={product.name}
              width={44}
              height={44}
              className="size-11 shrink-0 rounded-[10px] object-cover"
            />
            
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-semibold text-text-primary">
                { product.name }
              </p>
              <p className="text-[12px] text-text-tertiary">
                { product.salesCount } vendas
              </p>
            </div>
            <span className="text-[13px] font-bold whitespace-nowrap text-text-primary">
              {formatMoneyRounded(product.revenueInCents)}
            </span>
          </li>
        ))}

      </ul>
    </div>
  )
}

export default TopProducts