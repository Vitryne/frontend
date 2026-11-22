import type { CategoryProduct } from "@/components/features/panel/categories/types";
import ButtonPrimary from "@/components/ui/button-primary";
import ButtonSecondary from "@/components/ui/button-secondary";
import Modal from "@/components/ui/modal";
import SelectField from "@/components/ui/select-field";
import { useState } from "react";
import { LuBox } from "react-icons/lu";

interface Props {
  product: CategoryProduct | null;
  categoryName: string;
  options: string[];
  onClose: () => void;
  onConfirm: (targetName: string) => void;
}

const MoveProductModal: React.FC<Props> = ({
  product,
  categoryName,
  options,
  onClose,
  onConfirm,
}) => {
  const [target, setTarget] = useState("");

  if (!product) return null;

  const handleClose = () => {
    setTarget("");
    onClose();
  };

  const handleConfirm = () => {
    onConfirm(target);
    setTarget("");
  };

  return (
    <Modal
      open
      onClose={handleClose}
      title="Remover da categoria?"
      subtitle={`${product.name} · SKU ${product.sku}`}
      icon={<LuBox size={20} />}
      footer={
        <>
          <ButtonSecondary title="Cancelar" onClick={handleClose} />
          <ButtonPrimary
            title="Mover produto"
            onClick={handleConfirm}
            disabled={!target}
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-[10px] bg-primary px-5 py-2.5 text-[14px] font-semibold text-white shadow-lg shadow-primary/30 transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
          />
        </>
      }
    >
      <div className="flex flex-col gap-4 pt-4">
        <div className="flex gap-2.5">
          <LuBox size={16} className="mt-0.5 shrink-0 text-text-secondary" />
          <div>
            <p className="text-[13px] font-semibold text-text-primary">
              Este produto só está em {categoryName}
            </p>
            <p className="text-[12px] text-text-tertiary">
              Todo produto precisa estar em pelo menos uma categoria. Escolha
              para onde ele vai.
            </p>
          </div>
        </div>

        <div>
          <SelectField
            title="Mover para *"
            placeholder="Selecione uma categoria"
            options={options}
            value={target}
            onChange={setTarget}
          />
          <p className="mt-1.5 text-[12px] text-text-tertiary">
            {target
              ? `O ${product.name} passa a ficar em ${target}.`
              : "O produto continua no catálogo, só muda de categoria."}
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default MoveProductModal;
