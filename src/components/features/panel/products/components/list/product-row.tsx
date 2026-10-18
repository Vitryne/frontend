import { Product } from "@/components/features/panel/products/types";
import Image from "next/image";


interface Props {
    product: Product
}

const formatPrice = (priceInCents: number) => {
    const reais = Math.floor(priceInCents / 100).toLocaleString("pt-BR");
    const cents = String(priceInCents % 100).padStart(2, "0");

    return { reais, cents };
};

const ProdutcRow: React.FC<Props> = ({product}) => {

    const { reais, cents } = formatPrice(product.priceInCents)
    const total = product.stock.reduce((sum, item) => sum + item.quantity, 0)

    return (
        <tr className="border-t border-border">
            <td className="px-5 py-3">
                <div className="flex items-center gap-3">
                    <div className="relative size-10 shrink-0 overflow-hidden rounded-lg bg-surface-subtle">
                        <Image
                            src={product.image}
                            alt="Product photo"
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

            <td className="whitespace-nowrap px-5 py-3 text-[.85rem] font-bold text-text-primary">
                R$ {reais},<span className="text-[.7rem]">{cents}</span>
            </td>

            <td className="whitespace-nowrap px-5 py-3 text-[.85rem] font-bold text-text-primary">
                {total}{" "}
                <span className="text-[.75rem] font-normal text-text-secondary">un.</span>
            </td>
        </tr>
    )
}

export default ProdutcRow;