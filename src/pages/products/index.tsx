import PanelLayout from "@/components/features/panel/components/panel-layout";
import BulkActionBar from "@/components/features/panel/products/components/list/bulk-action-bar";
import DeactivateProductModal from "@/components/features/panel/products/components/list/deactivate-product-modal";
import DeleteBlockedModal from "@/components/features/panel/products/components/list/delete-blocked-modal";
import ProductEmpty from "@/components/features/panel/products/components/list/product-empty";
import ProductError from "@/components/features/panel/products/components/list/product-error";
import ProductTable from "@/components/features/panel/products/components/list/product-table";
import ProductFilters from "@/components/features/panel/products/components/list/product-filters";
import { hasCriticalStock } from "@/components/features/panel/products/stock";
import {
  Product,
  ProductStatusFilter,
} from "@/components/features/panel/products/types";
import Pagination from "@/components/ui/pagination";
import { ProductStatus } from "@/interfaces/product-interface";
import { toProduct } from "@/lib/product-mapper";
import ProductService from "@/service/product-service";
import { useEffect, useState } from "react";

const Products: React.FC = ({}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loadState, setLoadState] = useState<"loading" | "error" | "ready">(
    "loading",
  );
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState<ProductStatusFilter>("all");
  const [criticalOnly, setCriticalOnly] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedSkus, setSelectedSkus] = useState<string[]>([]);
  const [productToDeactivate, setProductToDeactivate] =
    useState<Product | null>(null);
  const [blockedProducts, setBlockedProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (loadState !== "loading") return;

    ProductService()
      .listManagedProducts()
      .then((data) => {
        setProducts(data.map(toProduct));
        setLoadState("ready");
      })
      .catch(() => setLoadState("error"));
  }, [loadState]);

  const categories = [
    ...new Set(products.map((product) => product.category)),
  ].sort();
  const criticalCount = products.filter(hasCriticalStock).length;

  const filteredProducts = products.filter((product) => {
    if (category && product.category !== category) return false;
    if (status === "active" && !product.active) return false;
    if (status === "inactive" && product.active) return false;
    if (criticalOnly && !hasCriticalStock(product)) return false;
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / 8));
  const currentPage = Math.min(page, totalPages);
  const pageStart = (currentPage - 1) * 8;
  const pagedProducts = filteredProducts.slice(pageStart, pageStart + 8);

  const updateProductStatus = async (product: Product, active: boolean) => {
    if (!product.id || product.active === active) return;

    setProducts((current) =>
      current.map((item) =>
        item.sku === product.sku ? { ...item, active } : item,
      ),
    );

    try {
      const updated = await ProductService().alterStatus(product.id, {
        status: active ? ProductStatus.ACTIVE : ProductStatus.INACTIVE,
      });

      setProducts((current) =>
        current.map((item) =>
          item.sku === product.sku ? toProduct(updated) : item,
        ),
      );
    } catch {
      setProducts((current) =>
        current.map((item) => (item.sku === product.sku ? product : item)),
      );
    }
  };

  const handleToggleStatus = (sku: string, active: boolean) => {
    const product = products.find((item) => item.sku === sku);
    if (!product) return;

    if (active) {
      updateProductStatus(product, true);
      return;
    }

    setProductToDeactivate(product);
  };

  const handleConfirmDeactivate = () => {
    if (productToDeactivate) {
      updateProductStatus(productToDeactivate, false);
    }
    setProductToDeactivate(null);
  };

  const handleToggleSelect = (sku: string, selected: boolean) => {
    setSelectedSkus((current) =>
      selected ? [...current, sku] : current.filter((item) => item !== sku),
    );
  };

  const handleToggleSelectAll = (selected: boolean) => {
    setSelectedSkus(
      selected ? pagedProducts.map((product) => product.sku) : [],
    );
  };

  const handleSetActiveForSelected = (active: boolean) => {
    const selectedProducts = products.filter((product) =>
      selectedSkus.includes(product.sku),
    );

    setSelectedSkus([]);
    selectedProducts.forEach((product) => updateProductStatus(product, active));
  };

  const handleDeleteSelected = () => {
    const selectedProducts = products.filter((product) =>
      selectedSkus.includes(product.sku),
    );
    const hasOrders = selectedProducts.some(
      (product) => (product.ordersCount ?? 0) > 0,
    );

    if (hasOrders) {
      setBlockedProducts(selectedProducts);
      return;
    }

    setProducts((current) =>
      current.filter((product) => !selectedSkus.includes(product.sku)),
    );
    setSelectedSkus([]);
  };

  const handleConfirmDeactivateBlocked = () => {
    blockedProducts.forEach((product) => updateProductStatus(product, false));
    setBlockedProducts([]);
    setSelectedSkus([]);
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    setPage(1);
    setSelectedSkus([]);
  };

  const handleStatusChange = (value: ProductStatusFilter) => {
    setStatus(value);
    setPage(1);
    setSelectedSkus([]);
  };

  const handleCriticalOnlyChange = (value: boolean) => {
    setCriticalOnly(value);
    setPage(1);
    setSelectedSkus([]);
  };

  const handlePageChange = (value: number) => {
    setPage(value);
    setSelectedSkus([]);
  };

  const handleClearFilters = () => {
    setCategory("");
    setStatus("all");
    setCriticalOnly(false);
    setPage(1);
    setSelectedSkus([]);
  };

  if (loadState === "error") {
    return (
      <PanelLayout
        title="Produtos"
        subtitle="Não foi possível carregar os produtos"
      >
        <ProductError onRetry={() => setLoadState("loading")} />
      </PanelLayout>
    );
  }

  if (loadState === "ready" && products.length === 0) {
    return (
      <PanelLayout title="Produtos" subtitle="Nenhum produto cadastrado">
        <ProductEmpty storeName="Atelier Norte" />
      </PanelLayout>
    );
  }

  return (
    <PanelLayout
      title="Produtos"
      subtitle={
        loadState === "loading"
          ? "Carregando produtos..."
          : `${products.length} produtos · ${categories.length} categorias · ${criticalCount} com estoque crítico`
      }
    >
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

      {selectedSkus.length > 0 && (
        <BulkActionBar
          count={selectedSkus.length}
          onActivate={() => handleSetActiveForSelected(true)}
          onDeactivate={() => handleSetActiveForSelected(false)}
          onDelete={handleDeleteSelected}
          onClear={() => setSelectedSkus([])}
        />
      )}

      <ProductTable
        products={pagedProducts}
        loading={loadState === "loading"}
        selectedSkus={selectedSkus}
        onToggleSelect={handleToggleSelect}
        onToggleSelectAll={handleToggleSelectAll}
        onToggleStatus={handleToggleStatus}
        onClearFilters={handleClearFilters}
        footer={
          totalPages > 1 && (
            <>
              <p className="text-[.75rem] text-text-tertiary">
                Mostrando {pageStart + 1}–{pageStart + pagedProducts.length} de{" "}
                {filteredProducts.length} produtos
              </p>
              <Pagination
                page={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )
        }
      />

      <DeactivateProductModal
        product={productToDeactivate}
        onCancel={() => setProductToDeactivate(null)}
        onConfirm={handleConfirmDeactivate}
      />

      <DeleteBlockedModal
        products={blockedProducts}
        onCancel={() => setBlockedProducts([])}
        onConfirm={handleConfirmDeactivateBlocked}
      />
    </PanelLayout>
  );
};

export default Products;
