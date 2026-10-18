import type { Product } from "@/components/features/panel/products/types";
import ProductRow from "./product-row";

interface Props {
    products: Product[]
    onToggleStatus: (sku: string, active: boolean) => void;  
}

const ProductTable: React.FC<Props> = ({products, onToggleStatus}) => {

    return (
        <div className="overflow-hidden rounded-2xl border border-border bg-white">
            <table className="w-full">
                <thead className="bg-surface-subtle">
                    <tr className="text-left text-[.7rem] font-bold uppercase tracking-wider text-text-secondary">
                        <th scope="col" className="px-5 py-3">Produto</th>
                        <th scope="col" className="px-5 py-3">Categoria</th>
                        <th scope="col" className="px-5 py-3">Preço</th>
                        <th scope="col" className="px-5 py-3">Estoque por tamanho</th>
                        <th scope="col" className="px-5 py-3">Total</th>
                        <th scope="col" className="px-5 py-3">Status</th>
                        <th scope="col" className="px-5 py-3"></th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <ProductRow
                            key={product.sku}
                            product={product}
                            onToggleStatus={onToggleStatus}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ProductTable;