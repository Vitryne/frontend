import type { Category } from "@/components/features/panel/categories/types";
import Alert from "@/components/ui/alert";
import ButtonPrimary from "@/components/ui/button-primary";
import ButtonSecondary from "@/components/ui/button-secondary";
import Modal from "@/components/ui/modal";
import { LuPlus, LuTriangleAlert } from "react-icons/lu";

interface Props {
  open: boolean;
  category: Category;
  onClose: () => void;
  onAddCategory: () => void;
}

const DeleteCategoryBlockedModal: React.FC<Props> = ({
  open,
  category,
  onClose,
  onAddCategory,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      tone="warning"
      title={`Não é possível excluir ${category.name}`}
      subtitle="É a única categoria da sua loja"
      icon={<LuTriangleAlert size={20} />}
      footer={
        <>
          <ButtonSecondary title="Fechar" onClick={onClose} />
          <ButtonPrimary
            title="Adicionar categoria"
            btnIcon={<LuPlus size={16} />}
            iconPosition="left"
            onClick={onAddCategory}
          />
        </>
      }
    >
      <div className="pt-4">
        <p className="text-[13px] font-semibold text-text-primary">
          {`${category.productsCount} ${category.productsCount === 1 ? "produto ficaria" : "produtos ficariam"} sem categoria`}
        </p>
        <p className="text-[12px] text-text-tertiary">
          Todo produto precisa estar em pelo menos uma categoria, e não há outra
          para recebê-los.
        </p>

        <div className="mt-4">
          <Alert
            variant="info"
            title="Crie outra categoria primeiro"
            message={`Com uma nova categoria, você escolhe para onde os produtos vão e consegue excluir ${category.name}.`}
          />
        </div>
      </div>
    </Modal>
  );
};

export default DeleteCategoryBlockedModal;