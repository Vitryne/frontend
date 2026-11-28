import type {
  Category,
  CategoryProduct,
} from "@/components/features/panel/categories/types";
import Badge from "@/components/ui/badge";
import ButtonPrimary from "@/components/ui/button-primary";
import ButtonSecondary from "@/components/ui/button-secondary";
import Input from "@/components/ui/input";
import Modal from "@/components/ui/modal";
import Image from "next/image";
import { useState } from "react";
import { LuBox, LuCheck, LuPlus, LuSearch } from "react-icons/lu";

interface Props {
  open: boolean;
  category: Category;
  categories: Category[];
  onClose: () => void;
  onConfirm: (products: CategoryProduct[]) => void;
}

const AddProductsModal: React.FC<Props> = ({
  open,
  category,
  categories,
  onClose,
  onConfirm,
}) => {
  const [search, setSearch] = useState("");
  const [selectedSkus, setSelectedSkus] = useState<string[]>([]);

  const categorySkus = category.products.map((product) => product.sku);

  const catalog = categories
    .flatMap(({ name, products }) =>
      products.map((product) => ({ product, categoryName: name })),
    )
    .filter(
      (item, index, list) =>
        list.findIndex((other) => other.product.sku === item.product.sku) ===
        index,
    )
    .sort((a, b) => {
      const aInCategory = categorySkus.includes(a.product.sku);
      const bInCategory = categorySkus.includes(b.product.sku);

      if (aInCategory !== bInCategory) return aInCategory ? 1 : -1;
      return a.product.name.localeCompare(b.product.name, "pt-BR");
    });

  const trimmedSearch = search.trim();
  const results = catalog.filter((item) =>
    item.product.name.toLowerCase().includes(trimmedSearch.toLowerCase()),
  );

  const selectedCount = selectedSkus.length;

  const countLabel = trimmedSearch
    ? `${results.length} ${results.length === 1 ? "resultado" : "resultados"} para "${trimmedSearch}"`
    : `${catalog.length} produtos no catálogo`;

  const reset = () => {
    setSearch("");
    setSelectedSkus([]);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleConfirm = () => {
    onConfirm(
      catalog
        .filter((item) => selectedSkus.includes(item.product.sku))
        .map((item) => item.product),
    );
    reset();
  };

  const toggleSku = (sku: string) => {
    setSelectedSkus((current) =>
      current.includes(sku)
        ? current.filter((item) => item !== sku)
        : [...current, sku],
    );
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title={`Adicionar produtos a ${category.name}`}
      subtitle="Busque pelo nome e inclua um ou mais produtos."
      icon={<LuBox size={20} />}
      footer={
        <>
          <ButtonSecondary title="Cancelar" onClick={handleClose} />
          <ButtonPrimary
            title={
              selectedCount === 0
                ? "Adicionar produtos"
                : `Adicionar ${selectedCount} ${selectedCount === 1 ? "produto" : "produtos"}`
            }
            onClick={handleConfirm}
            disabled={selectedCount === 0}
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-[10px] bg-primary px-5 py-2.5 text-[14px] font-semibold text-white shadow-lg shadow-primary/30 transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
          />
        </>
      }
    >
      <div className="flex flex-col gap-3 pt-5">
        <Input
          title="Buscar por nome"
          placeholder="Digite o nome do produto"
          icon={<LuSearch size={18} />}
          value={search}
          onChange={setSearch}
        />

        <div className="flex items-center justify-between text-[12px]">
          <span className="text-text-tertiary">{countLabel}</span>
          <span
            className={
              selectedCount === 0 ? "text-text-tertiary" : "text-primary"
            }
          >
            {selectedCount === 0
              ? "Nenhum selecionado"
              : `${selectedCount} ${selectedCount === 1 ? "selecionado" : "selecionados"}`}
          </span>
        </div>

        {results.length === 0 ? (
          <p className="rounded-xl border border-border px-4 py-8 text-center text-[13px] text-text-tertiary">
            Nenhum produto encontrado
          </p>
        ) : (
          <ul className="max-h-80 divide-y divide-border overflow-y-auto rounded-xl border border-border">
            {results.map(({ product, categoryName }) => {
              const inCategory = categorySkus.includes(product.sku);
              const isSelected = selectedSkus.includes(product.sku);

              return (
                <li key={product.sku}>
                  <button
                    type="button"
                    disabled={inCategory}
                    onClick={() => toggleSku(product.sku)}
                    className={`flex w-full items-center gap-3 px-3 py-2.5 text-left transition-colors ${
                      inCategory
                        ? "cursor-not-allowed"
                        : isSelected
                          ? "cursor-pointer bg-primary-soft"
                          : "cursor-pointer hover:bg-surface-subtle"
                    }`}
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={40}
                      height={40}
                      className={`size-10 shrink-0 rounded-lg object-cover ${inCategory ? "opacity-50" : ""}`}
                    />
                    <div
                      className={`min-w-0 flex-1 ${inCategory ? "opacity-50" : ""}`}
                    >
                      <p className="text-[13px] font-semibold text-text-primary">
                        {product.name}
                      </p>
                      <p className="text-[11px] text-text-tertiary">
                        SKU {product.sku} - {categoryName}
                      </p>
                    </div>

                    {inCategory ? (
                      <Badge title="Na categoria" />
                    ) : isSelected ? (
                      <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-primary text-white">
                        <LuCheck size={16} />
                      </span>
                    ) : (
                      <span className="flex size-7 shrink-0 items-center justify-center text-text-secondary">
                        <LuPlus size={18} />
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </Modal>
  );
};

export default AddProductsModal;
