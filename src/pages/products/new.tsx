import PanelLayout from "@/components/features/panel/components/panel-layout";
import ProductForm from "@/components/features/panel/products/components/form/product-form";

const NewProduct: React.FC = ({}) => {
  return (
    <PanelLayout title="Novo produto" subtitle="Campos com * são obrigatórios">
      <ProductForm />
    </PanelLayout>
  );
};

export default NewProduct;
