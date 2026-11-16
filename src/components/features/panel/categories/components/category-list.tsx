import ButtonSecondary from "@/components/ui/button-secondary";
import type { Category } from "@/components/features/panel/categories/types";
import { LuPlus } from "react-icons/lu";

interface Props {
  categories: Category[];
  selectedName: string;
  onSelect: (name: string) => void;
}

const CategoryList: React.FC<Props> = ({
  categories,
  selectedName,
  onSelect,
}) => {
  return (
    <section className="overflow-hidden rounded-[14px] border border-border bg-surface">
      <div className="flex items-center justify-between gap-3 px-4 py-4">
        <h2 className="font-display text-[15px] font-semibold text-text-primary">
          Categorias da plataforma
        </h2>
        <span className="text-[12px] text-text-tertiary">
          {categories.length}
        </span>
      </div>

      <ul>
        {categories.map((category) => (
          <li key={category.name} className="border-t border-border">
            <button
              type="button"
              onClick={() => onSelect(category.name)}
              className={`flex w-full cursor-pointer items-center justify-between gap-3 px-4 py-3 text-left transition-colors ${
                category.name === selectedName
                  ? "bg-primary-soft"
                  : "hover:bg-surface-subtle"
              }`}
            >
              <div className="min-w-0">
                <p className="text-[13px] font-semibold text-text-primary">
                  {category.name}
                </p>
                <p className="text-[11px] text-text-tertiary">
                  {category.visible ? "Visível na vitrine" : "Oculta na vitrine"}
                </p>
              </div>
              <span className="shrink-0 text-[12px] text-text-secondary">
                {category.productsCount}{" "}
                {category.productsCount === 1 ? "produto" : "produtos"}
              </span>
            </button>
          </li>
        ))}
      </ul>

      <div className="border-t border-border p-3">
        <ButtonSecondary
          title="Adicionar categoria"
          btnIcon={<LuPlus size={14} />}
          iconPosition="left"
          className="inline-flex h-9 w-full cursor-pointer items-center justify-center gap-1.5 rounded-[10px] border border-primary/30 bg-surface text-[12px] font-semibold text-primary transition-colors hover:bg-primary/5"
        />
      </div>
    </section>
  );
};

export default CategoryList;