import PainelLayout from "@/components/features/panel/components/panel-layout";
import ProductTable from "@/components/features/panel/products/components/list/product-table";
import { PRODUCTS_MOCK } from "@/components/features/panel/products/products-mock";


const Produtos: React.FC = ({}) => {
    return (
        <PainelLayout title="Produtos" subtitle="48 produtos · 6 categorias · 3 com estoque crítico">
            <ProductTable products={PRODUCTS_MOCK}/>
        </PainelLayout>
    );
}

export default Produtos;