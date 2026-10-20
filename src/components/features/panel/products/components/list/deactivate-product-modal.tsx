import { LuEyeOff } from "react-icons/lu";
import Modal from "@/components/ui/modal";
import ButtonPrimary from "@/components/ui/button-primary";
import ButtonSecondary from "@/components/ui/button-secondary";
import type { Product } from "@/components/features/panel/products/types";

interface Props {
  product: Product | null;
  onCancel: () => void;
  onConfirm: () => void;
}

const TEXT_MODAL = [
  {
    title: "Fica invisível para os clientes",
    description: "Sai da vitrine e das buscas por proximidade",
  },
  {
    title: "Fica indisponível para venda",
    description:
      "Ninguém consegue adicioná-lo à sacola enquanto estiver inativo",
  },
];

const DeactivateProductModal: React.FC<Props> = ({
  product,
  onCancel,
  onConfirm,
}) => {
  return (
    <Modal
      open={product !== null}
      onClose={onCancel}
      title="Desativar este produto?"
      subtitle={product ? `${product.name} · SKU ${product.sku}` : undefined}
      icon={<LuEyeOff size={18} />}
      footer={
        <>
          <ButtonSecondary title="Cancelar" onClick={onCancel} />
          <ButtonPrimary
            title="Desativar produto"
            btnIcon={<LuEyeOff size={22} />}
            iconPosition="left"
            onClick={onConfirm}
          />
        </>
      }
    >
      <ul className="flex flex-col">
        {TEXT_MODAL.map((item, index) => (
          <li
            key={item.title}
            className={`py-3 ${index > 0 ? "border-t border-border" : ""}`}
          >
            <p className="text-[14px] font-semibold text-text-primary">
              {item.title}
            </p>
            <p className="text-[13px] text-text-tertiary">{item.description}</p>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-[14px] text-text-tertiary">
        Os pedidos já realizados continuam no histórico e você pode reativar o
        produto quando quiser.
      </p>
    </Modal>
  );
};

export default DeactivateProductModal;
