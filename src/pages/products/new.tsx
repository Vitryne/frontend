import PanelLayout from "@/components/features/panel/components/panel-layout";

const NewProduct: React.FC = ({}) => {
    return (
        <PanelLayout
            title="Novo produto"
            subtitle="Campos com * são obrigatórios"
        >
            <p className="text-text-secondary">Em construção.</p>
        </PanelLayout>
    );
};

export default NewProduct;
