import ButtonPrimary from "@/components/ui/button-primary";
import ButtonSecondary from "@/components/ui/button-secondary";
import Modal from "@/components/ui/modal";
import { LuPause } from "react-icons/lu";

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const PauseStoreModal: React.FC<Props> = ({ open, onClose, onConfirm }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Pausar a loja?"
      subtitle="Novos pedidos ficam suspensos e o perfil continua visível, com indicação de pausa."
      icon={<LuPause size={20} />}
      footer={
        <>
          <ButtonSecondary title="Cancelar" onClick={onClose} />
          <ButtonPrimary title="Pausar loja" onClick={onConfirm} />
        </>
      }
    />
  );
};

export default PauseStoreModal;
