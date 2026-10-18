import type { ProductStock } from "@/components/features/panel/products/types";
import { isCriticalStock } from "@/components/features/panel/products/stock";


interface Props {
    stock: ProductStock[]
    alertThreshold: number
    showCritical?: boolean;
}

const StockBySize: React.FC<Props> = ({stock, alertThreshold, showCritical = true}) => {

    return (
        <ul className="flex flex-wrap gap-1.5">
            {stock.map((item) => {
                const critical = showCritical && isCriticalStock(item.quantity, alertThreshold);

                return (
                    <li
                        key={item.size}
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[.75rem] ${
                            critical
                                ? "bg-red-50 text-red-600"
                                : "bg-surface-subtle text-text-primary"
                        }`}
                    >
                        <span className={`text-[.65rem] ${critical ? "" : "text-text-secondary"}`}>
                            {item.size}
                        </span>
                        <span className="font-bold">{item.quantity}</span>
                        {critical && <span className="sr-only">(estoque crítico)</span>}
                    </li>
                )
            })}
        </ul>
    )
}

export default StockBySize;