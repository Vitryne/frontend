import ButtonSecondary from "@/components/ui/button-secondary";
import { LuRotateCw, LuTriangleAlert } from "react-icons/lu";

interface Props {
  onRetry: () => void;
}

const OrdersError: React.FC<Props> = ({ onRetry }) => {
  return (
    <div className="flex flex-col items-center p-19 text-center">
      <span className="flex size-14 items-center justify-center rounded-[22px] bg-danger-soft text-danger">
        <LuTriangleAlert size={30} />
      </span>

      <h2 className="mt-5 font-display text-[22px] font-bold text-text-primary">
        Não foi possível carregar os pedidos
      </h2>

      <p className="mt-2 max-w-md text-[.85rem] leading-relaxed text-text-secondary">
        Verifique sua conexão e tente novamente. Seus pedidos continuam salvos.
      </p>

      <div className="mt-6">
        <ButtonSecondary
          title="Tentar novamente"
          btnIcon={<LuRotateCw size={16} />}
          onClick={onRetry}
        />
      </div>
    </div>
  );
};

export default OrdersError;
