import { Product } from "@/components/features/panel/products/types";
import ProdutcRow from "./product-row";



interface Props {
    products: Product[]
}

const ProductTable: React.FC<Props> = ({products}) => {

    return (
        <div className="overflow-hidden rounded-2xl border border-border bg-white">
            <table className="w-full">
                <thead className="bg-surface-subtle">
                    <tr className="text-left text-[.7rem] font-bold uppercase tracking-wider text-text-secondary">
                        <th scope="col" className="px-5 py-3">Produto</th>
                        <th scope="col" className="px-5 py-3">Preço</th>
                        <th scope="col" className="px-5 py-3">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <ProdutcRow key={product.sku} product={product}/>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ProductTable;