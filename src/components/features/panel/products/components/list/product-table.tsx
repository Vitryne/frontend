import type { Product } from "@/components/features/panel/products/types";
import ProductRow from "./product-row";

interface Props {
    products: Product[]
    onToggleStatus: (sku: string, active: boolean) => void
    onClearFilters: () => void
    footer?: React.ReactNode
}

const ProductTable: React.FC<Props> = ({products, onToggleStatus, onClearFilters, footer}) => {

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
                    {products.length > 0 ? (
                        products.map((product) => (
                            <ProductRow
                                key={product.sku}
                                product={product}
                                onToggleStatus={onToggleStatus}
                            />
                        ))
                    ) : (
                        <tr className="border-t border-border">
                            <td colSpan={7} className="px-5 py-12 text-center">
                                <p className="text-[.9rem] font-bold text-text-primary">
                                    Nenhum produto encontrado
                                </p>
                                <p className="mt-1 text-[.8rem] text-text-secondary">
                                    Nenhum produto corresponde aos filtros selecionados.
                                </p>
                                <button
                                    type="button"
                                    onClick={onClearFilters}
                                    className="mt-3 cursor-pointer text-[.8rem] font-semibold text-primary hover:underline"
                                >
                                    Limpar filtros
                                </button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {footer && (
                <div className="flex items-center justify-between border-t border-border px-5 py-3">
                    { footer }
                </div>
            )}
        </div>
    )
}

export default ProductTable;