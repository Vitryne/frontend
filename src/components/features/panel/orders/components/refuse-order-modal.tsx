import { Order } from "@/components/features/panel/orders/types";
import ButtonPrimary from "@/components/ui/button-primary";
import ButtonSecondary from "@/components/ui/button-secondary";
import Modal from "@/components/ui/modal";
import type { StoreRejectionReason } from "@/interfaces/orders-interface";
import { formatMoney } from "@/lib/format";
import { useState } from "react";
import { LuTriangleAlert } from "react-icons/lu";

interface Props {
  order: Order | null;
  onCancel: () => void;
  onConfirm: (reason: StoreRejectionReason) => void;
}

const REJECTION_REASONS: { value: StoreRejectionReason; label: string }[] = [
  { value: "ITEM_UNAVAILABLE", label: "Item indisponível" },
  { value: "STORE_CLOSED", label: "Loja fechada" },
  { value: "OUT_OF_DELIVERY_AREA", label: "Endereço fora da área de entrega" },
  { value: "HIGH_DEMAND", label: "Alta demanda, sem capacidade de atender" },
];

const RefuseOrderModal: React.FC<Props> = ({ order, onCancel, onConfirm }) => {
  const [reason, setReason] = useState<StoreRejectionReason | null>(null);

  const handleCancel = () => {
    setReason(null);
    onCancel();
  };

  const handleConfirm = () => {
    if (!reason) return;

    onConfirm(reason);
    setReason(null);
  };

  return (
    <Modal
      open={order !== null}
      onClose={handleCancel}
      tone="warning"
      title={`Recusar pedido #${order?.id}`}
      subtitle={
        order
          ? `${order.customerName} · R$ ${formatMoney(order.totalInCents)}`
          : ""
      }
      icon={<LuTriangleAlert size={18} />}
      footer={
        <>
          <ButtonSecondary title="Cancelar" onClick={handleCancel} />
          <ButtonPrimary
            title="Recusar pedido"
            onClick={handleConfirm}
            disabled={!reason}
            className="inline-flex cursor-pointer items-center justify-center rounded-[10px] bg-danger px-5 py-2.5 text-[14px] font-semibold text-white transition-colors hover:bg-danger/90 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </>
      }
    >
      <fieldset className="flex flex-col gap-2 pt-4">
        <legend className="mb-1 text-[13px] text-text-secondary">
          Informe o motivo. O pedido sai do quadro e não pode ser recuperado.
        </legend>

        {REJECTION_REASONS.map((option) => (
          <label
            key={option.value}
            className="flex cursor-pointer items-center gap-2.5 text-[14px] text-text-primary"
          >
            <input
              type="radio"
              name="rejection-reason"
              value={option.value}
              checked={reason === option.value}
              onChange={() => setReason(option.value)}
              className="size-4 accent-primary"
            />
            {option.label}
          </label>
        ))}
      </fieldset>
    </Modal>
  );
};

export default RefuseOrderModal;
