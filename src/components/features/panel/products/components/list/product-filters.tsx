import { ProductStatusFilter } from "@/components/features/panel/products/types";
import Badge from "@/components/ui/badge";
import Select from "@/components/ui/select";
import Link from "next/link";
import { LuPlus } from "react-icons/lu";

interface Props {
  categories: string[];
  category: string;
  onCategoryChange: (category: string) => void;
  status: ProductStatusFilter;
  onStatusChange: (status: ProductStatusFilter) => void;
  criticalOnly: boolean;
  onCriticalOnlyChange: (criticalOnly: boolean) => void;
  criticalCount: number;
}

const STATUS_OPTIONS = [
  { value: "all", label: "Todos" },
  { value: "active", label: "Ativos" },
  { value: "inactive", label: "Inativos" },
];

const ProductFilters: React.FC<Props> = ({
  categories,
  category,
  onCategoryChange,
  status,
  onStatusChange,
  criticalOnly,
  onCriticalOnlyChange,
  criticalCount,
}) => {
  const categoryOptions = [
    { value: "", label: "Todas" },
    ...categories.map((item) => ({ value: item, label: item })),
  ];

  return (
    <div className="mb-5 flex items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <Select
          label="Categoria"
          value={category}
          options={categoryOptions}
          onChange={onCategoryChange}
        />

        <Select
          label="Status"
          value={status}
          options={STATUS_OPTIONS}
          onChange={(value) => onStatusChange(value as ProductStatusFilter)}
        />

        <button
          type="button"
          onClick={() => onCriticalOnlyChange(!criticalOnly)}
          className={`inline-flex h-10 cursor-pointer items-center gap-2.5 rounded-[10px] border px-3 text-[14px] outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary/20 ${
            criticalOnly
              ? "border-primary bg-primary-soft text-primary-hover hover:border-primary-hover"
              : "border-border bg-surface text-text-primary hover:border-border-strong hover:bg-surface-subtle"
          }`}
        >
          Estoque crítico
          <Badge title={String(criticalCount)} variant="danger" size="md" />
        </button>
      </div>

      <Link
        href="/products/new"
        className="inline-flex items-center justify-center gap-2 rounded-[10px] bg-primary hover:bg-primary-hover text-white font-semibold text-[14px] px-5 py-2.5 shadow-lg shadow-primary/30 transition-transform duration-200 ease-in-out hover:scale-[1.02] active:scale-95"
      >
        <LuPlus size={16} />
        Novo produto
      </Link>
    </div>
  );
};

export default ProductFilters;
