import { getExclusiveProducts } from "@/components/features/panel/categories/products";
import type { Category } from "@/components/features/panel/categories/types";
import ButtonPrimary from "@/components/ui/button-primary";
import ButtonSecondary from "@/components/ui/button-secondary";
import Modal from "@/components/ui/modal";
import SelectField from "@/components/ui/select-field";
import { useState } from "react";
import { LuBox, LuEyeOff, LuTrash2 } from "react-icons/lu";

interface Props {
  open: boolean;
  category: Category;
  categories: Category[];
  onClose: () => void;
  onConfirm: (targetName: string) => void;
}

const DeleteCategoryModal: React.FC<Props> = ({
  open,
  category,
  categories,
  onClose,
  onConfirm,
}) => {
  const [target, setTarget] = useState("");

  const exclusiveCount = getExclusiveProducts(categories, category).length;
  const othersCount = category.productsCount - exclusiveCount;
  const options = categories
    .filter((item) => item.name !== category.name)
    .map((item) => item.name);

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
      open={open}
      onClose={handleClose}
      tone="danger"
      title={`Excluir a categoria ${category.name}?`}
      subtitle={`${category.productsCount} ${category.productsCount === 1 ? "produto" : "produtos"} · ${category.visible ? "visível na vitrine" : "oculta na vitrine"}`}
      icon={<LuTrash2 size={20} />}
      footer={
        <>
          <ButtonSecondary title="Cancelar" onClick={handleClose} />
          <ButtonPrimary
            title="Excluir categoria"
            btnIcon={<LuTrash2 size={16} />}
            iconPosition="left"
            onClick={handleConfirm}
            disabled={exclusiveCount > 0 && !target}
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-[10px] bg-danger px-5 py-2.5 text-[14px] font-semibold text-white shadow-lg shadow-danger/30 transition-colors hover:bg-danger/90 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
          />
        </>
      }
    >
      <ul className="divide-y divide-border">
        {exclusiveCount > 0 && (
          <li className="flex gap-2.5 py-3">
            <LuBox size={16} className="mt-0.5 shrink-0 text-text-secondary" />
            <div>
              <p className="text-[13px] font-semibold text-text-primary">
                {exclusiveCount === 1
                  ? `1 produto está só em ${category.name}`
                  : `${exclusiveCount} produtos estão só em ${category.name}`}
              </p>
              <p className="text-[12px] text-text-tertiary">
                Escolha abaixo para onde movê-los.
                {othersCount > 0 &&
                  ` Os outros ${othersCount} continuam nas categorias em que já estão.`}
              </p>
            </div>
          </li>
        )}
        <li className="flex gap-2.5 py-3">
          <LuEyeOff size={16} className="mt-0.5 shrink-0 text-text-secondary" />
          <div>
            <p className="text-[13px] font-semibold text-text-primary">
              {category.name} some da vitrine e da busca
            </p>
            <p className="text-[12px] text-text-tertiary">
              Clientes deixam de encontrar a categoria nos filtros da loja.
            </p>
          </div>
        </li>
        <li className="flex gap-2.5 py-3">
          <LuTrash2 size={16} className="mt-0.5 shrink-0 text-danger" />
          <div>
            <p className="text-[13px] font-semibold text-text-primary">
              Não dá para desfazer
            </p>
            <p className="text-[12px] text-text-tertiary">
              Para usar de novo, será preciso criar a categoria do zero.
            </p>
          </div>
        </li>
      </ul>

      {exclusiveCount > 0 && (
        <div className="mt-2">
          <SelectField
            title={
              exclusiveCount === 1
                ? "Mover o produto para *"
                : `Mover os ${exclusiveCount} produtos para *`
            }
            placeholder="Selecione uma categoria"
            options={options}
            value={target}
            onChange={setTarget}
          />
          <p className="mt-1.5 text-[12px] text-text-tertiary">
            {target
              ? exclusiveCount === 1
                ? `O produto passa a ficar em ${target}.`
                : `Os ${exclusiveCount} produtos passam a ficar em ${target}.`
              : "Mostra suas outras categorias."}
          </p>
        </div>
      )}

      <p className="mt-3 text-[12px] text-text-tertiary">
        Se quiser só tirar a categoria da vitrine por um tempo, use Ocultar.
      </p>
    </Modal>
  );
};

export default DeleteCategoryModal;
