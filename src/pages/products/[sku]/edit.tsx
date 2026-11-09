import PanelLayout from "@/components/features/panel/components/panel-layout";
import ProductForm from "@/components/features/panel/products/components/form/product-form";
import ProductError from "@/components/features/panel/products/components/list/product-error";
import { Product } from "@/components/features/panel/products/types";
import { parseProductId, toProduct } from "@/lib/product-mapper";
import ProductService from "@/service/product-service";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const EditProduct: React.FC = ({}) => {
  const router = useRouter();
  const sku = typeof router.query.sku === "string" ? router.query.sku : "";

  const [product, setProduct] = useState<Product | null>(null);
  const [loadState, setLoadState] = useState<
    "loading" | "error" | "not-found" | "ready"
  >("loading");

  useEffect(() => {
    if (!router.isReady || loadState !== "loading") return;

    const id = parseProductId(sku);
    if (id === null) {
      setLoadState("not-found");
      return;
    }

    ProductService()
      .findByIdManager(id)
      .then((data) => {
        setProduct(toProduct(data));
        setLoadState("ready");
      })
      .catch((err) => {
        const status = axios.isAxiosError(err)
          ? err.response?.status
          : undefined;
        setLoadState(status === 404 ? "not-found" : "error");
      });
  }, [router.isReady, sku, loadState]);

  const subtitle =
    loadState === "loading"
      ? "Carregando produto..."
      : product
        ? `${product.name} · SKU ${product.sku}`
        : undefined;

  return (
    <PanelLayout title="Editar produto" subtitle={subtitle}>
      {router.isReady &&
        (loadState === "loading" ? (
          <div className="flex flex-col items-center py-24 text-center">
            <p className="text-[14px] text-text-secondary">
              Carregando dados do produto...
            </p>
          </div>
        ) : loadState === "error" ? (
          <ProductError onRetry={() => setLoadState("loading")} />
        ) : loadState === "ready" && product ? (
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
