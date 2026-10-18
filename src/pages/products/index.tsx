import PanelLayout from "@/components/features/panel/components/panel-layout";
import ProductEmpty from "@/components/features/panel/products/components/list/product-empty";
import ProductTable from "@/components/features/panel/products/components/list/product-table";
import ProductFilters from "@/components/features/panel/products/components/list/produtc-filters";
import { PRODUCTS_MOCK } from "@/components/features/panel/products/products-mock";
import { hasCriticalStock } from "@/components/features/panel/products/stock";
import { Product, ProductStatusFilter } from "@/components/features/panel/products/types";
import Pagination from "@/components/ui/pagination";
import { useState } from "react";


const pluralize = (count: number, singular: string, plural: string) =>
    `${count} ${count === 1 ? singular : plural}`

const Products: React.FC = ({}) => {

    const [products, setProducts] = useState<Product[]>(PRODUCTS_MOCK)
    const [category, setCategory] = useState("")
    const [status, setStatus] = useState<ProductStatusFilter>("all")
    const [criticalOnly, setCriticalOnly] = useState(false)
    const [page, setPage] = useState(1)

    const categories = [...new Set(products.map((product) => product.category))].sort()
    const criticalCount = products.filter(hasCriticalStock).length

    const filteredProducts = products.filter((product) => {
        if (category && product.category !== category) return false
        if (status === "active" && !product.active) return false
        if (status === "inactive" && product.active) return false
        if (criticalOnly && !hasCriticalStock(product)) return false
        return true
    })

    const totalPages = Math.max(1, Math.ceil(filteredProducts.length / 8))
    const currentPage = Math.min(page, totalPages)
    const pageStart = (currentPage - 1) * 8
    const pagedProducts = filteredProducts.slice(pageStart, pageStart + 8)

    const subtitle = [
        pluralize(products.length, "produto", "produtos"),
        pluralize(categories.length, "categoria", "categorias"),
        `${criticalCount} com estoque crítico`,
    ].join(" · ")

    const handleToggleStatus = (sku: string, active: boolean) => {
        setProducts((current) =>
            current.map((product) =>
                product.sku === sku ? { ...product, active } : product
            )
        )
    }

    const handleCategoryChange = (value: string) => {
        setCategory(value)
        setPage(1)
    }

    const handleStatusChange = (value: ProductStatusFilter) => {
        setStatus(value)
        setPage(1)
    }

    const handleCriticalOnlyChange = (value: boolean) => {
        setCriticalOnly(value)
        setPage(1)
    }

    const handleClearFilters = () => {
        setCategory("")
        setStatus("all")
        setCriticalOnly(false)
        setPage(1)
    }

    if (products.length === 0) {
        return (
            <PanelLayout title="Produtos" subtitle="Nenhum produto cadastrado">
                <ProductEmpty storeName="Atelier Norte"/>
            </PanelLayout>
        )
    }

    return (
        <PanelLayout title="Produtos" subtitle={subtitle}>
            <ProductFilters
                categories={categories}
                category={category}
                onCategoryChange={handleCategoryChange}
                status={status}
                onStatusChange={handleStatusChange}
                criticalOnly={criticalOnly}
                onCriticalOnlyChange={handleCriticalOnlyChange}
                criticalCount={criticalCount}
            />
            <ProductTable
                products={pagedProducts}
                onToggleStatus={handleToggleStatus}
                onClearFilters={handleClearFilters}
                footer={
                    filteredProducts.length > 0 && (
                        <>
                            <p className="text-[.8rem] text-text-secondary">
                                Mostrando {pageStart + 1}–{pageStart + pagedProducts.length} de{" "}
                                {pluralize(filteredProducts.length, "produto", "produtos")}
                            </p>
                            {totalPages > 1 && (
                                <Pagination
                                    page={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={setPage}
                                />
                            )}
                        </>
                    )
                }
            />
        </PanelLayout>
    )
}

export default Products