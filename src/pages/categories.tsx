import AddCategoryModal from "@/components/features/panel/categories/components/add-category-modal";
import AddProductsModal from "@/components/features/panel/categories/components/add-products-modal";
import CategoryDetails from "@/components/features/panel/categories/components/category-details";
import CategoryList from "@/components/features/panel/categories/components/category-list";
import CategoryProductsTable from "@/components/features/panel/categories/components/category-product-table";
import HideCategoryModal from "@/components/features/panel/categories/components/hide-category-modal";
import type {
  Category,
  CategoryProduct,
} from "@/components/features/panel/categories/types";
import PanelLayout from "@/components/features/panel/components/panel-layout";
import { CATEGORIES_MOCK } from "@/mocks/categories-mock";
import { useState } from "react";

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>(CATEGORIES_MOCK);
  const [selectedName, setSelectedName] = useState(CATEGORIES_MOCK[0].name);
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [isAddProductsOpen, setIsAddProductsOpen] = useState(false);
  const [isHideCategoryOpen, setIsHideCategoryOpen] = useState(false);

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

  const handleAddProducts = (products: CategoryProduct[]) => {
    setCategories((current) =>
      current.map((category) =>
        category.name === selectedName
          ? {
              ...category,
              products: [...category.products, ...products],
              productsCount: category.productsCount + products.length,
              inStockCount:
                category.inStockCount +
                products.filter((product) => product.stock > 0).length,
            }
          : category,
      ),
    );
    setIsAddProductsOpen(false);
  };

  const setCategoryVisible = (visible: boolean) => {
    setCategories((current) =>
      current.map((category) =>
        category.name === selectedName ? { ...category, visible } : category,
      ),
    );
  };

  const handleToggleVisibility = () => {
    if (selectedCategory.visible) {
      setIsHideCategoryOpen(true);
      return;
    }

    setCategoryVisible(true);
  };

  const handleHideCategory = () => {
    setCategoryVisible(false);
    setIsHideCategoryOpen(false);
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
          <CategoryDetails
            category={selectedCategory}
            onToggleVisibility={handleToggleVisibility}
          />
          <CategoryProductsTable
            category={selectedCategory}
            onAddProduct={() => setIsAddProductsOpen(true)}
          />
        </div>
      </div>

      <AddCategoryModal
        open={isAddCategoryOpen}
        categoryNames={categories.map((category) => category.name)}
        onClose={() => setIsAddCategoryOpen(false)}
        onConfirm={handleAddCategory}
      />

      <AddProductsModal
        open={isAddProductsOpen}
        category={selectedCategory}
        categories={categories}
        onClose={() => setIsAddProductsOpen(false)}
        onConfirm={handleAddProducts}
      />

      <HideCategoryModal
        open={isHideCategoryOpen}
        category={selectedCategory}
        onClose={() => setIsHideCategoryOpen(false)}
        onConfirm={handleHideCategory}
      />
    </PanelLayout>
  );
};

export default Categories;