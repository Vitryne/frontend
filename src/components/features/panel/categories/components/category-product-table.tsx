import type { Category } from "@/components/features/panel/categories/types";
import ButtonSecondary from "@/components/ui/button-secondary";
import { formatPrice } from "@/lib/format";
import Image from "next/image";
import { LuPlus, LuTrash2 } from "react-icons/lu";

interface Props {
  category: Category;
  onAddProduct: () => void;
}

const CategoryProductsTable: React.FC<Props> = ({ category, onAddProduct }) => {
  return (
    <div className="overflow-hidden rounded-[14px] border border-border bg-surface">
      <div className="flex items-center justify-between gap-3 px-5 py-4">
        <h2 className="font-display text-[16px] font-semibold text-text-primary">
          Produtos em {category.name}
        </h2>
        <ButtonSecondary
          title="Adicionar produto"
          btnIcon={<LuPlus size={14} />}
          iconPosition="left"
          onClick={onAddProduct}
          className="inline-flex h-8 cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-primary/30 bg-surface px-3 text-[12px] font-semibold text-primary transition-colors hover:bg-primary/5"
        />
      </div>

      {category.products.length === 0 ? (
        <p className="border-t border-border px-5 py-8 text-center text-[13px] text-text-tertiary">
          Nenhum produto nesta categoria ainda.
        </p>
      ) : (
        <table className="w-full">
          <thead className="bg-surface-subtle">
            <tr className="text-left text-[11px] font-semibold tracking-wider text-text-tertiary uppercase">
              <th scope="col" className="py-2.5 pr-2 pl-5">
                Produto
              </th>
              <th scope="col" className="px-2 py-2.5">
                SKU
              </th>
              <th scope="col" className="px-2 py-2.5">
                Preço
              </th>
              <th scope="col" className="px-2 py-2.5">
                Estoque
              </th>
              <th scope="col" className="w-px py-2.5 pr-5 pl-2" />
            </tr>
          </thead>
          <tbody>
            {category.products.map((product) => {
              const price = formatPrice(product.priceInCents);

              return (
                <tr key={product.sku} className="border-t border-border">
                  <td className="py-3 pr-2 pl-5">
                    <div className="flex items-center gap-3">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={40}
                        height={40}
                        className="size-10 shrink-0 rounded-lg object-cover"
                      />
                      <span className="text-[13px] font-semibold text-text-primary">
                        {product.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-2 py-3 text-[12px] text-text-tertiary">
                    {product.sku}
                  </td>
                  <td className="px-2 py-3 text-[13px] font-bold whitespace-nowrap text-text-primary">
                    R$ {price.reais}
                    <span className="text-[10px]">,{price.cents}</span>
                  </td>
                  <td className="px-2 py-3 text-[12px] text-text-tertiary">
                    {product.stock} un.
                  </td>
                  <td className="py-3 pr-5 pl-2">
                    <button
                      type="button"
                      className="flex size-8 cursor-pointer items-center justify-center rounded-lg text-text-secondary transition-colors hover:bg-danger-soft hover:text-danger"
                    >
                      <LuTrash2 size={16} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CategoryProductsTable;
