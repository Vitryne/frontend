import Alert from "@/components/ui/alert";
import ButtonPrimary from "@/components/ui/button-primary";
import ButtonSecondary from "@/components/ui/button-secondary";
import Chip from "@/components/ui/chip";
import Input from "@/components/ui/input";
import Modal from "@/components/ui/modal";
import { PLATFORM_CATEGORIES_MOCK } from "@/mocks/categories-mock";
import { useState } from "react";
import { LuPlus } from "react-icons/lu";

interface Props {
  open: boolean;
  categoryNames: string[];
  onClose: () => void;
  onConfirm: (name: string) => void;
}

const AddCategoryModal: React.FC<Props> = ({
  open,
  categoryNames,
  onClose,
  onConfirm,
}) => {
  const [selected, setSelected] = useState("");
  const [customName, setCustomName] = useState("");

  const availableCategories = PLATFORM_CATEGORIES_MOCK.filter(
    (name) => !categoryNames.includes(name),
  );

  const isDuplicate = categoryNames.some(
    (name) => name.toLowerCase() === customName.toLowerCase(),
  );
  const name = selected || customName;

  const reset = () => {
    setSelected("");
    setCustomName("");
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleConfirm = () => {
    onConfirm(name);
    reset();
  };

  const handleChipClick = (category: string) => {
    setSelected((current) => (current === category ? "" : category));
    setCustomName("");
  };

  const handleCustomNameChange = (value: string) => {
    setCustomName(value);
    setSelected("");
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Adicionar categoria"
      subtitle="Escolha uma da lista da plataforma ou crie uma só da sua loja."
      icon={<LuPlus size={20} />}
      footer={
        <>
          <ButtonSecondary title="Cancelar" onClick={handleClose} />
          <ButtonPrimary
            title="Adicionar categoria"
            onClick={handleConfirm}
            disabled={!name || isDuplicate}
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-[10px] bg-primary px-5 py-2.5 text-[14px] font-semibold text-white shadow-lg shadow-primary/30 transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
          />
        </>
      }
    >
      <div className="flex flex-col gap-4 pt-5">
        <div>
          <p className="mb-2 text-[13px] font-semibold text-text-primary">
            Categorias da plataforma
          </p>
          <div className="flex flex-wrap gap-2">
            {availableCategories.map((category) => (
              <Chip
                key={category}
                label={category}
                selected={selected === category}
                onClick={() => handleChipClick(category)}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 text-[12px] text-text-tertiary">
          <span className="h-px flex-1 bg-border" />
          ou
          <span className="h-px flex-1 bg-border" />
        </div>

        <Input
          title="Categoria personalizada"
          placeholder="Digite o nome da categoria"
          value={customName}
          onChange={handleCustomNameChange}
          error={
            isDuplicate ? "Já existe uma categoria com esse nome" : undefined
          }
        />

        {customName && !isDuplicate && (
          <Alert
            variant="warning"
            message="A categoria personalizada aparece só no perfil da sua loja. Produtos que estiverem apenas nela podem não ser exibidos na busca."
          />
        )}
      </div>
    </Modal>
  );
};

export default AddCategoryModal;
