import PanelLayout from "@/components/features/panel/components/panel-layout";
import ProductTable from "@/components/features/panel/products/components/list/product-table";
import { PRODUCTS_MOCK } from "@/components/features/panel/products/products-mock";
import { Product } from "@/components/features/panel/products/types";
import { useState } from "react";


const Products: React.FC = ({}) => {

    const [products, setProducts] = useState<Product[]>(PRODUCTS_MOCK)

    const handleToggleStatus = (sku: string, active: boolean) => {
        setProducts((current) =>
            current.map((product) =>
                product.sku === sku ? { ...product, active } : product
            )
        );
    };

    return (
        <PanelLayout
            title="Produtos"
            subtitle="48 produtos · 6 categorias · 3 com estoque crítico"
        >
            <ProductTable products={products} onToggleStatus={handleToggleStatus} />
        </PanelLayout>
    );
}

export default Products;