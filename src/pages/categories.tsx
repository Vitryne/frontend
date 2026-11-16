import CategoryList from "@/components/features/panel/categories/components/category-list";
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

        <section className="rounded-[14px] border border-border bg-surface p-5">
          <h2 className="font-display text-[22px] font-semibold text-text-primary">
            {selectedCategory.name}
          </h2>
        </section>
      </div>
    </PanelLayout>
  );
};

export default Categories;