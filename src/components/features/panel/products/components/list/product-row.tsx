import type { Product } from "@/components/features/panel/products/types";
import Badge from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import StockBySize from "./stock-by-size";
import Switch from "@/components/ui/switch";
import { LuPencil } from "react-icons/lu";
import CheckBox from "@/components/ui/checkbox";


interface Props {
    product: Product
    selected: boolean
    onToggleSelect: (sku: string, selected: boolean) => void
    onToggleStatus: (sku: string, active: boolean) => void
}

const formatPrice = (priceInCents: number) => {
    const reais = Math.floor(priceInCents / 100).toLocaleString("pt-BR");
    const cents = String(priceInCents % 100).padStart(2, "0");

    return { reais, cents };
};

const ProductRow: React.FC<Props> = ({product, selected, onToggleSelect, onToggleStatus}) => {

    const { reais, cents } = formatPrice(product.priceInCents)
    const total = product.stock.reduce((sum, item) => sum + item.quantity, 0)
    const dimmed = product.active ? "" : "opacity-50";

    return (
        <tr className={`border-t border-border transition-colors ${selected ? "bg-primary-soft/50" : ""}`}>
            <td className={`w-12 py-3 pl-5 ${dimmed}`}>
                <CheckBox
                    checked={selected}
                    onChange={(checked) => onToggleSelect(product.sku, checked)}
                    label={`Selecionar ${product.name}`}
                />
            </td>

            <td className={`px-5 py-3 ${dimmed}`}>
                <div className="flex items-center gap-3">
                    <div className="relative size-10 shrink-0 overflow-hidden rounded-lg bg-surface-subtle">
                        <Image
                            src={product.image}
                            alt=""
                            fill
                            sizes="40px"
                            className="object-cover"
                        />
                    </div>
                    <div>
                        <p className="text-[.85rem] font-bold text-text-primary">
                            {product.name}
                        </p>
                        <p className="text-[.75rem] text-text-secondary">
                            SKU {product.sku}
                        </p>
                    </div>
                </div>
            </td>

            <td className={`px-5 py-3 ${dimmed}`}>
                <Badge title={product.category}/>
            </td>

            <td className={`whitespace-nowrap px-5 py-3 text-[.85rem] font-bold text-text-primary ${dimmed}`}>
                R$ {reais},<span className="text-[.7rem]">{cents}</span>
            </td>

            <td className={`px-5 py-3 ${dimmed}`}>
                <StockBySize stock={product.stock} alertThreshold={product.stockAlertThreshold} />
            </td>

            <td className={`whitespace-nowrap px-5 py-3 text-[.85rem] font-bold text-text-primary ${dimmed}`}>
                {total}{" "}
                <span className="text-[.75rem] font-normal text-text-secondary">un.</span>
            </td>

            <td className={`px-5 py-3 ${dimmed}`}>
                <div className="flex items-center gap-2">
                    <Switch
                        checked={product.active}
                        onChange={(checked) => onToggleStatus(product.sku, checked)}
                        label={`Status do produto ${product.name}`}
                    />
                    <span
                        className={`text-[.8rem] ${
                            product.active ? "text-text-primary" : "text-text-secondary"
                        }`}
                    >
                        {product.active ? "Ativo" : "Inativo"}
                    </span>
                </div>
            </td>

            <td className={`px-5 py-3 text-right ${dimmed}`}>
                <Link
                    href={`/products/${product.sku.toLowerCase()}/edit`}
                    aria-label={`Editar ${product.name}`}
                    className="inline-flex size-8 items-center justify-center rounded-full text-text-primary transition-colors hover:bg-surface-subtle"
                >   
                    <LuPencil size={15}/>
                </Link>
            </td>
        </tr>
    )
}

export default ProductRow;