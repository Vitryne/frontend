import Badge from "@/components/ui/badge";
import ButtonPrimary from "@/components/ui/button-primary";
import ButtonSecondary from "@/components/ui/button-secondary";
import { useRouter } from "next/router";
import { LuCheck, LuEyeOff } from "react-icons/lu";

interface Props {
  storeName: string;
}

const RegisterSuccess: React.FC<Props> = ({ storeName }) => {
  const router = useRouter();

  return (
    <div className="max-w-140">
      <span className="flex size-13 items-center justify-center rounded-2xl bg-success-soft text-success">
        <LuCheck size={24} />
      </span>

      <h1 className="mt-6 font-display text-4xl font-bold text-text-primary">
        Conta criada. Sua loja está em análise.
      </h1>
      <p className="mt-4 text-[14px] text-text-secondary">
        {`Recebemos os dados da loja ${storeName}. Nossa equipe confere CNPJ, documentos e titularidade bancária — normalmente em até 2 dias úteis. Você recebe o resultado por e-mail.`}
      </p>

      <div className="mt-4">
        <Badge title="Pendente de aprovação" variant="warning" />
      </div>

      <ul className="mt-5 flex flex-col gap-3 rounded-2xl border border-border bg-surface p-5 text-[13px] text-text-secondary">
        <li className="flex gap-2.5">
          <LuCheck size={16} className="mt-0.5 shrink-0 text-success" />
          <span>
            <span className="font-semibold text-text-primary">
              O portal já está liberado.
            </span>{" "}
            Você pode cadastrar produtos, definir horários e configurar entrega
            desde já.
          </span>
        </li>
        <li className="flex gap-2.5">
          <LuEyeOff size={16} className="mt-0.5 shrink-0 text-text-secondary" />
          <span>
            <span className="font-semibold text-text-primary">
              A loja fica invisível ao público
            </span>{" "}
            até a aprovação. Ela não aparece em buscas nem recebe pedidos.
          </span>
        </li>
      </ul>

      <div className="mt-6 flex gap-3">
        <ButtonPrimary
          title="Configurar minha loja"
          onClick={() => router.push("/store-profile")}
        />
        <ButtonSecondary
          title="Ir para o painel"
          onClick={() => router.push("/dashboard")}
        />
      </div>
    </div>
  );
};

export default RegisterSuccess;
