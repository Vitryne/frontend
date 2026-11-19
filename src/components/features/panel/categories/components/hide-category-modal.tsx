import type { Category } from "@/components/features/panel/categories/types";
import ButtonPrimary from "@/components/ui/button-primary";
import ButtonSecondary from "@/components/ui/button-secondary";
import Modal from "@/components/ui/modal";
import { LuEyeOff } from "react-icons/lu";

interface Props {
  open: boolean;
  category: Category;
  onClose: () => void;
  onConfirm: () => void;
}

const HideCategoryModal: React.FC<Props> = ({
  open,
  category,
  onClose,
  onConfirm,
}) => {
  const productsText =
    category.productsCount === 1
      ? " O produto continua cadastrado."
      : ` Os ${category.productsCount} produtos continuam cadastrados.`;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={`Ocultar ${category.name}?`}
      subtitle={`A categoria some da vitrine e da busca.${category.productsCount > 0 ? productsText : ""}`}
      icon={<LuEyeOff size={20} />}
      footer={
        <>
          <ButtonSecondary title="Cancelar" onClick={onClose} />
          <ButtonPrimary title="Ocultar categoria" onClick={onConfirm} />
        </>
      }
    />
  );
};

export default HideCategoryModal;
