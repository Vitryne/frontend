import PanelLayout from "@/components/features/panel/components/panel-layout";
import ProductForm from "@/components/features/panel/products/components/form/product-form";
import { PRODUCTS_MOCK } from "@/mocks/products-mock";
import Link from "next/link";
import { useRouter } from "next/router";

const EditProduct: React.FC = ({}) => {
  const router = useRouter();
  const sku = typeof router.query.sku === "string" ? router.query.sku : "";
  const product = PRODUCTS_MOCK.find(
    (item) => item.sku.toLowerCase() === sku.toLowerCase(),
  );

  return (
    <PanelLayout
      title="Editar produto"
      subtitle={product ? `${product.name} · SKU ${product.sku}` : undefined}
    >
      {router.isReady &&
        (product ? (
          <ProductForm key={product.sku} product={product} />
        ) : (
          <div className="flex flex-col items-center py-24 text-center">
            <p className="font-display text-[18px] font-semibold text-text-primary">
              Produto não encontrado
            </p>
            <p className="mt-1 text-[13px] text-text-tertiary">
              O SKU &quot;{sku}&quot; não existe ou foi removido.
            </p>
            <Link
              href="/products"
              className="mt-4 text-[13px] font-semibold text-primary hover:underline"
            >
              Voltar para produtos
            </Link>
          </div>
        ))}
    </PanelLayout>
  );
};

export default EditProduct;
