import Alert from "@/components/ui/alert";
import ButtonSecondary from "@/components/ui/button-secondary";
import Link from "next/link";
import { LuPackage, LuPlus, LuUpload } from "react-icons/lu";

interface Props {
  storeName: string;
}

const ProductEmpty: React.FC<Props> = ({ storeName }) => {
  return (
    <div className="flex flex-col items-center p-19 text-center">
      <span className="flex size-14 items-center justify-center rounded-[22px] bg-cream text-plum">
        <LuPackage size={30} />
      </span>

      <h2 className="mt-5 font-display text-[22px] font-bold text-text-primary">
        Sua Vitryne está vazia
      </h2>

      <p className="mt-2 max-w-md text-[.85rem] leading-relaxed text-text-secondary">
        Cadastre o primeiro produto para que o {storeName} comece a aparecer nas
        buscas por proximidade. Você pode importar uma planilha ou cadastrar
        item por item.
      </p>

      <div className="mt-6 flex items-center gap-3">
        <Link
          href="/products/new"
          className="inline-flex items-center justify-center gap-2 rounded-[10px] bg-primary hover:bg-primary-hover text-white font-semibold text-[14px] px-5 py-2.5 shadow-lg shadow-primary/30 transition-transform duration-200 ease-in-out hover:scale-[1.02] active:scale-95"
        >
          <LuPlus size={16} />
          Cadastrar produto
        </Link>
        <ButtonSecondary
          title="Importar planilha"
          btnIcon={<LuUpload size={16} />}
        />
      </div>

      <div className="mt-6 w-full max-w-lg">
        <Alert message="A loja permanece invisível ao público até ter pelo menos um produto ativo." />
      </div>
    </div>
  );
};

export default ProductEmpty;
