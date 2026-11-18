import CategoryDetails from "@/components/features/panel/categories/components/category-details";
import CategoryList from "@/components/features/panel/categories/components/category-list";
import CategoryProductsTable from "@/components/features/panel/categories/components/category-product-table";
import PanelLayout from "@/components/features/panel/components/panel-layout";
import { CATEGORIES_MOCK } from "@/mocks/categories-mock";
import { useState } from "react";

const Categories: React.FC = () => {
  const [selectedName, setSelectedName] = useState(CATEGORIES_MOCK[0].name);

  const selectedCategory =
    CATEGORIES_MOCK.find((category) => category.name === selectedName) ??
    CATEGORIES_MOCK[0];

  return (
    <PanelLayout
      title="Categorias"
      subtitle="Quantos produtos você tem em cada categoria da plataforma"
    >
      <div className="grid grid-cols-[320px_1fr] items-start gap-4">
        <CategoryList
          categories={CATEGORIES_MOCK}
          selectedName={selectedName}
          onSelect={setSelectedName}
        />

        <div className="flex flex-col gap-4">
          <CategoryDetails category={selectedCategory} />
          <CategoryProductsTable category={selectedCategory} />
        </div>
      </div>
    </PanelLayout>
  );
};

export default Categories;
