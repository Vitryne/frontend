import ButtonPrimary from "@/components/ui/button-primary";
import Card from "@/components/ui/card";
import Link from "next/link";
import { LuChevronLeft } from "react-icons/lu";

const ProductForm: React.FC = () => {
  return (
    <div>
      <div className="mb-5 flex items-center justify-between gap-4">
        <Link
          href="/products"
          className="inline-flex items-center gap-1 text-[13px] font-semibold text-primary hover:underline"
        >
          <LuChevronLeft size={16} />
          Voltar para produtos
        </Link>

        <div className="flex items-center gap-3">
          <Link
            href="/products"
            className="inline-flex items-center justify-center rounded-[10px] border border-primary/30 bg-white px-5 py-2.5 text-[14px] font-semibold text-primary transition-transform duration-200 ease-in-out hover:scale-[1.02] hover:bg-primary/5 active:scale-95"
          >
            Cancelar
          </Link>
          <ButtonPrimary title="Cadastrar produto" />
        </div>
      </div>

      <div className="grid grid-cols-3 items-start gap-5">
        <div className="col-span-2 flex flex-col gap-5">
          <Card title="Informações básicas">
            <p className="text-[13px] text-text-primary">Em breve.</p>
          </Card>
          <Card
            title="Galeria de fotos"
            aside="0 de 8 fotos · JPG, PNG ou WebP até 5 MB"
          >
            <p className="text-[13px] text-text-tertiary">Em breve.</p>
          </Card>

          <Card
            title="Tamanhos e estoque"
            aside="Informe a quantidade por tamanho · alerta em 3 unidades"
          >
            <p className="text-[13px] text-text-tertiary">Em breve.</p>
          </Card>
        </div>

        <div className="flex flex-col gap-5">
          <Card title="Preço">
            <p className="text-[13px] text-text-tertiary">Em breve.</p>
          </Card>

          <Card title="Visibilidade">
            <p className="text-[13px] text-text-tertiary">Em breve.</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
