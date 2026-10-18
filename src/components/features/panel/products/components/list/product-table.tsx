import CheckBox from "@/components/ui/checkbox";
import type { Product } from "@/components/features/panel/products/types";
import ProductRow from "@/components/features/panel/products/components/list/product-row";

interface Props {
    products: Product[]
    selectedSkus: string[]
    onToggleSelect: (sku: string, selected: boolean) => void
    onToggleSelectAll: (selected: boolean) => void
    onToggleStatus: (sku: string, active: boolean) => void
    onClearFilters: () => void
    footer?: React.ReactNode
}

const ProductTable: React.FC<Props> = ({
    products,
    selectedSkus,
    onToggleSelect,
    onToggleSelectAll,
    onToggleStatus,
    onClearFilters,
    footer,
}) => {

    const selectedOnPage = products.filter((product) => selectedSkus.includes(product.sku)).length;
    const allSelected = products.length > 0 && selectedOnPage === products.length;
    const someSelected = selectedOnPage > 0 && !allSelected;

    return (
        <div className="overflow-hidden rounded-2xl border border-border bg-white">
            <table className="w-full">
                <thead className="bg-surface-subtle">
                    <tr className="text-left text-[.8rem] font-semibold uppercase tracking-wider text-text-secondary">
                        <th scope="col" className="w-px py-3 pl-5 pr-2">
                            <CheckBox
                                checked={allSelected}
                                indeterminate={someSelected}
                                disabled={products.length === 0}
                                onChange={onToggleSelectAll}
                                label="Selecionar todos os produtos da página"
                            />
                        </th>
                        <th scope="col" className="px-2 py-3">Produto</th>
                        <th scope="col" className="px-2 py-3">Categoria</th>
                        <th scope="col" className="px-2 py-3">Preço</th>
                        <th scope="col" className="px-2 py-3">Estoque por tamanho</th>
                        <th scope="col" className="w-px whitespace-nowrap px-2 py-3 text-right">Total</th>
                        <th scope="col" className="w-px whitespace-nowrap px-2 py-3">Status</th>
                        <th scope="col" className="w-px py-3 pl-2 pr-5"></th>
                    </tr>
                </thead>
                <tbody>
                    {products.length > 0 ? (
                        products.map((product) => (
                            <ProductRow
                                key={product.sku}
                                product={product}
                                selected={selectedSkus.includes(product.sku)}
                                onToggleSelect={onToggleSelect}
                                onToggleStatus={onToggleStatus}
                            />
                        ))
                    ) : (
                        <tr className="border-t border-border">
                            <td colSpan={8} className="px-5 py-12 text-center">
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
                <div className="flex items-center justify-between gap-3 border-t border-border px-4.5 py-2.75">
                    {footer}
                </div>
            )}
        </div>
    )
}

export default ProductTable;