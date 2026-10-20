import { LuEyeOff, LuTriangleAlert } from "react-icons/lu";
import Alert from "@/components/ui/alert";
import Modal from "@/components/ui/modal";
import ButtonPrimary from "@/components/ui/button-primary";
import ButtonSecondary from "@/components/ui/button-secondary";
import type { Product } from "@/components/features/panel/products/types";

interface Props {
  products: Product[];
  onCancel: () => void;
  onConfirm: () => void;
}

const DeleteBlockedModal: React.FC<Props> = ({
  products,
  onCancel,
  onConfirm,
}) => {
  const single = products.length === 1 ? products[0] : null;
  const ordersCount = products.reduce(
    (sum, product) => sum + (product.ordersCount ?? 0),
    0,
  );

  return (
    <Modal
      open={products.length > 0}
      onClose={onCancel}
      tone="warning"
      title={
        single
          ? "Não é possível excluir este produto"
          : "Não é possível excluir estes produtos"
      }
      subtitle={
        single
          ? `${single.name} · SKU ${single.sku}`
          : `${products.length} produtos selecionados`
      }
      icon={<LuTriangleAlert size={18} />}
      footer={
        <>
          <ButtonSecondary title="Cancelar" onClick={onCancel} />
          <ButtonPrimary
            title={single ? "Desativar produto" : "Desativar produtos"}
            btnIcon={<LuEyeOff size={22} />}
            iconPosition="left"
            onClick={onConfirm}
          />
        </>
      }
    >
      <p className="text-[13px] font-semibold text-text-primary">
        Aparece em {ordersCount}{" "}
        {ordersCount === 1 ? "pedido já realizado" : "pedidos já realizados"}
      </p>
      <p className="text-[12px] text-text-tertiary">
        Excluir apagaria o histórico de compra desses clientes
      </p>

      <div className="mt-4">
        <Alert
          variant="info"
          title="Desative em vez de excluir"
          message="O produto sai da vitrine e das buscas imediatamente, e o histórico de pedidos continua íntegro. Você pode reativá-lo quando quiser."
        />
      </div>
    </Modal>
  );
};

export default DeleteBlockedModal;
