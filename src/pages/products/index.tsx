import PanelLayout from "@/components/features/panel/components/panel-layout";
import BulkActionBar from "@/components/features/panel/products/components/list/bulk-action-bar";
import DeactivateProductModal from "@/components/features/panel/products/components/list/deactivate-product-modal";
import DeleteBlockedModal from "@/components/features/panel/products/components/list/delete-blocked-modal";
import ProductEmpty from "@/components/features/panel/products/components/list/product-empty";
import ProductTable from "@/components/features/panel/products/components/list/product-table";
import ProductFilters from "@/components/features/panel/products/components/list/product-filters";
import { PRODUCTS_MOCK } from "@/mocks/products-mock";
import { hasCriticalStock } from "@/components/features/panel/products/stock";
import {
  Product,
  ProductStatusFilter,
} from "@/components/features/panel/products/types";
import Pagination from "@/components/ui/pagination";
import { useState } from "react";

const Products: React.FC = ({}) => {
  const [products, setProducts] = useState<Product[]>(PRODUCTS_MOCK);
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState<ProductStatusFilter>("all");
  const [criticalOnly, setCriticalOnly] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedSkus, setSelectedSkus] = useState<string[]>([]);
  const [productToDeactivate, setProductToDeactivate] =
    useState<Product | null>(null);
  const [blockedProducts, setBlockedProducts] = useState<Product[]>([]);

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

  const setProductActive = (sku: string, active: boolean) => {
    setProducts((current) =>
      current.map((product) =>
        product.sku === sku ? { ...product, active } : product,
      ),
    );
  };

  const handleToggleStatus = (sku: string, active: boolean) => {
    if (active) {
      setProductActive(sku, true);
      return;
    }

    const product = products.find((item) => item.sku === sku);
    if (product) setProductToDeactivate(product);
  };

  const handleConfirmDeactivate = () => {
    if (productToDeactivate) {
      setProductActive(productToDeactivate.sku, false);
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
    setProducts((current) =>
      current.map((product) =>
        selectedSkus.includes(product.sku) ? { ...product, active } : product,
      ),
    );

    setSelectedSkus([]);
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
    const blockedSkus = blockedProducts.map((product) => product.sku);

    setProducts((current) =>
      current.map((product) =>
        blockedSkus.includes(product.sku)
          ? { ...product, active: false }
          : product,
      ),
    );
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

  if (products.length === 0) {
    return (
      <PanelLayout title="Produtos" subtitle="Nenhum produto cadastrado">
        <ProductEmpty storeName="Atelier Norte" />
      </PanelLayout>
    );
  }

  return (
    <PanelLayout
      title="Produtos"
      subtitle={`${products.length} produtos · ${categories.length} categorias · ${criticalCount} com estoque crítico`}
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
