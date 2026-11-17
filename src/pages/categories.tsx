import AddCategoryModal from "@/components/features/panel/categories/components/add-category-modal";
import CategoryDetails from "@/components/features/panel/categories/components/category-details";
import CategoryList from "@/components/features/panel/categories/components/category-list";
import CategoryProductsTable from "@/components/features/panel/categories/components/category-product-table";
import type { Category } from "@/components/features/panel/categories/types";
import PanelLayout from "@/components/features/panel/components/panel-layout";
import { CATEGORIES_MOCK } from "@/mocks/categories-mock";
import { useState } from "react";

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>(CATEGORIES_MOCK);
  const [selectedName, setSelectedName] = useState(CATEGORIES_MOCK[0].name);
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);

  const selectedCategory =
    categories.find((category) => category.name === selectedName) ??
    categories[0];

  const handleAddCategory = (name: string) => {
    const newCategory: Category = {
      name,
      description: "",
      visible: true,
      productsCount: 0,
      inStockCount: 0,
      salesThisMonth: 0,
      revenueThisMonthInCents: 0,
      products: [],
    };

    setCategories((current) =>
      [...current, newCategory].sort((a, b) =>
        a.name.localeCompare(b.name, "pt-BR"),
      ),
    );
    setSelectedName(name);
    setIsAddCategoryOpen(false);
  };

  return (
    <PanelLayout
      title="Categorias"
      subtitle="Quantos produtos você tem em cada categoria da plataforma"
    >
      <div className="grid grid-cols-[320px_1fr] items-start gap-4">
        <CategoryList
          categories={categories}
          selectedName={selectedName}
          onSelect={setSelectedName}
          onAdd={() => setIsAddCategoryOpen(true)}
        />

        <div className="flex flex-col gap-4">
          <CategoryDetails category={selectedCategory} />
          <CategoryProductsTable category={selectedCategory} />
        </div>
      </div>

      <AddCategoryModal
        open={isAddCategoryOpen}
        categoryNames={categories.map((category) => category.name)}
        onClose={() => setIsAddCategoryOpen(false)}
        onConfirm={handleAddCategory}
      />
    </PanelLayout>
  );
};

export default Categories;