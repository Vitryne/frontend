import { Order } from "@/components/features/panel/orders/types";
import Alert from "@/components/ui/alert";
import ButtonPrimary from "@/components/ui/button-primary";
import ButtonSecondary from "@/components/ui/button-secondary";
import Input from "@/components/ui/input";
import Modal from "@/components/ui/modal";
import { useState } from "react";
import { LuX } from "react-icons/lu";

const REFUSE_REASONS = [
  "Produto esgotado",
  "Loja fechada temporariamente",
  "Endereço fora do raio de entrega",
  "Outro",
];

interface Props {
  order: Order | null;
  onCancel: () => void;
  onConfirm: () => void;
}

const RefuseOrderModal: React.FC<Props> = ({ order, onCancel, onConfirm }) => {
  const [reason, setReason] = useState<string | null>(null);
  const [detail, setDetail] = useState("");

  const reset = () => {
    setReason(null);
    setDetail("");
  };

  const handleCancel = () => {
    reset();
    onCancel();
  };

  const handleConfirm = () => {
    reset();
    onConfirm();
  };

  return (
    <Modal
      open={order !== null}
      onClose={handleCancel}
      tone="danger"
      title={`Recusar o pedido #${order?.id}?`}
      subtitle={
        order
          ? `${order.customerName} recebe o aviso na hora e o valor é estornado integralmente. Recusas frequentes reduzem sua taxa de aceitação.`
          : ""
      }
      icon={<LuX size={20} />}
      footer={
        <>
          <ButtonSecondary title="Voltar" onClick={handleCancel} />
          <ButtonPrimary
            title="Recusar pedido"
            onClick={handleConfirm}
            disabled={!reason}
            className="inline-flex cursor-pointer items-center justify-center rounded-[10px] bg-danger px-5 py-2.5 text-[14px] font-semibold text-white transition-colors hover:bg-danger/90 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-danger"
          />
        </>
      }
    >
      <div className="flex flex-col gap-3 pt-4">
        <div className="flex flex-col gap-2">
          <p className="text-[12px] font-semibold text-text-primary">
            Motivo da recusa *
          </p>
          {REFUSE_REASONS.map((option) => {
            const isSelected = reason === option;

            return (
              <button
                key={option}
                type="button"
                onClick={() => setReason(option)}
                className={`flex w-full cursor-pointer items-center gap-2.5 rounded-xl px-3.5 py-3 text-left text-[13px] transition-colors ${
                  isSelected
                    ? "border-[1.5px] border-primary bg-primary-soft font-semibold text-text-primary"
                    : "border border-border bg-surface text-text-secondary hover:border-border-strong"
                }`}
              >
                <span
                  className={`size-4.5 shrink-0 rounded-full bg-surface ${
                    isSelected
                      ? "border-5 border-primary"
                      : "border-[1.5px] border-border-strong"
                  }`}
                />
                {option}
              </button>
            );
          })}
        </div>

        <Input
          placeholder="Detalhe o motivo para a cliente (opcional)"
          value={detail}
          onChange={setDetail}
        />

        {reason === "Produto esgotado" && (
          <Alert message="Ao escolher Produto esgotado, zeramos o estoque do tamanho pedido para evitar novas vendas." />
        )}
      </div>
    </Modal>
  );
};

export default RefuseOrderModal;
