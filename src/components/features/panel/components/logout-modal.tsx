import ButtonPrimary from "@/components/ui/button-primary";
import ButtonSecondary from "@/components/ui/button-secondary";
import Modal from "@/components/ui/modal";
import { LuLogOut } from "react-icons/lu";

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const LogoutModal: React.FC<Props> = ({ open, onClose, onConfirm }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Sair do portal?"
      subtitle="Você precisará entrar de novo para acompanhar os pedidos."
      icon={<LuLogOut size={20} />}
      footer={
        <>
          <ButtonSecondary title="Cancelar" onClick={onClose} />
          <ButtonPrimary title="Sair" onClick={onConfirm} />
        </>
      }
    />
  );
};

export default LogoutModal;
