import { Order } from "@/components/features/panel/orders/types";
import ButtonPrimary from "@/components/ui/button-primary";
import ButtonSecondary from "@/components/ui/button-secondary";
import Modal from "@/components/ui/modal";
import { formatMoney } from "@/lib/format";
import { LuTriangleAlert } from "react-icons/lu";

interface Props {
  order: Order | null;
  onCancel: () => void;
  onConfirm: () => void;
}

const RefuseOrderModal: React.FC<Props> = ({order, onCancel, onConfirm}) => {
  return (
    <Modal
      open={order !== null}
      onClose={onCancel}
      tone="warning"
      title={`Recusar pedido #${order?.id}`}
      subtitle={order ? `${order.customerName} · R$ ${formatMoney(order.totalInCents)}` : ""}
      icon={<LuTriangleAlert size={18} />}
      footer={
        <>
          <ButtonSecondary title="Cancelar" onClick={onCancel} />
          <ButtonPrimary
            title="Recusar pedido"
            onClick={onConfirm}
            className="inline-flex cursor-pointer items-center justify-center rounded-[10px] bg-danger px-5 py-2.5 text-[14px] font-semibold text-white transition-colors hover:bg-danger/90"
          />
        </>
      }
    >
      <p className="text-[13px] text-text-secondary">
        O pedido sai do quadro e não pode ser recuperado
      </p>
    </Modal>
  )
}

export default RefuseOrderModal
