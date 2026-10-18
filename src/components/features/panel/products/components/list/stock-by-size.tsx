import type { ProductStock } from "@/components/features/panel/products/types";
import { isCriticalStock } from "@/components/features/panel/products/stock";

interface Props {
    stock: ProductStock[];
    alertThreshold: number;
    showCritical?: boolean;
}

const StockBySize: React.FC<Props> = ({
    stock,
    alertThreshold,
    showCritical = true,
}) => {
    return (
        <ul className="flex flex-wrap gap-1.5">
            {stock.map((item) => {
                const critical =
                    showCritical &&
                    isCriticalStock(item.quantity, alertThreshold);

                return (
                    <li
                        key={item.size}
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[13px] ${
                            critical
                                ? "bg-danger-soft text-danger"
                                : "bg-surface-subtle text-text-primary"
                        }`}
                    >
                        <span
                            className={`text-[11px] ${critical ? "" : "text-text-tertiary"}`}
                        >
                            {item.size}
                        </span>
                        <span className="font-medium">{item.quantity}</span>
                    </li>
                );
            })}
        </ul>
    );
};

export default StockBySize;
