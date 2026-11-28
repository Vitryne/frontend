import ButtonPrimary from "@/components/ui/button-primary";
import ButtonSecondary from "@/components/ui/button-secondary";
import Modal from "@/components/ui/modal";
import { useRouter } from "next/router";
import { LuTriangleAlert } from "react-icons/lu";

interface Props {
  open: boolean;
  cnpj: string;
  onClose: () => void;
}

const CnpjTakenModal: React.FC<Props> = ({ open, cnpj, onClose }) => {
  const router = useRouter();

  return (
    <Modal
      open={open}
      onClose={onClose}
      tone="danger"
      title="Este CNPJ já tem uma loja na Vitryne"
      subtitle={`CNPJ ${cnpj}`}
      icon={<LuTriangleAlert size={20} />}
      footer={
        <>
          <ButtonSecondary
            title="Entrar em outra conta"
            onClick={() => router.push("/login")}
          />
          <ButtonPrimary title="Falar com o suporte" />
        </>
      }
    >
      <div className="pt-4">
        <div className="rounded-xl bg-surface-subtle p-4">
          <p className="text-[13px] font-semibold text-text-primary">
            Se a loja é sua e você perdeu o acesso
          </p>
          <p className="mt-1 text-[12px] text-text-secondary">
            Fale com o suporte para reivindicar a titularidade. Vamos pedir o
            contrato social e um documento do responsável.
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default CnpjTakenModal;
