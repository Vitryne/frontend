import { FiUser } from "react-icons/fi";
import ButtonGoogle from "@/components/ui/button-google";
import { FcGoogle } from "react-icons/fc";
import Input from "@/components/ui/input";
import { useState } from "react";
import SelectUf from "@/components/ui/select-uf";
import MaskedInput from "@/components/ui/masked-input";
import StepHeader from "@/components/features/store-register/components/header";
import CheckBox from "@/components/ui/checkbox";
import Textarea from "@/components/ui/textarea";

const StepStore = () => {
  const [uf, setUf] = useState("");
  const [cep, setCep] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [tel, setTel] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  return (
    <div>
      <StepHeader
        title="Conte sobre a sua loja"
        subtitle="Esses dados aparecem para os clientes no perfil público da loja."
      />

      <div className="rounded-2xl border border-border-brand bg-primary-soft-2 p-6">
        <div className="flex items-center justify-between pb-5">
          <h2 className="flex items-center gap-2 font-display text-[17px] font-semibold text-primary-hover">
            <FiUser size={20} />
            Dados de acesso
          </h2>
          <span className="text-[13px] font-semibold text-primary-hover">
            Obrigatório
          </span>
        </div>

        <ButtonGoogle
          icon={<FcGoogle size={20} />}
          title="Cadastrar com o Google"
        />

        <div className="flex items-center gap-3 py-5">
          <span className="h-px flex-1 bg-border-brand" />
          <span className="text-[13px] text-primary-hover">
            ou com e-mail e senha
          </span>
          <span className="h-px flex-1 bg-border-brand" />
        </div>

        <Input
          title="E-mail *"
          placeholder="lojista@vitryne.com"
          type="email"
        />

        <div className="grid grid-cols-2 gap-4 pt-5">
          <div>
            <Input
              title=" Senha *"
              placeholder="Digite sua senha"
              type="password"
            />
            <p className="pt-2 text-[12px] text-text-secondary">
              Mínimo 6 caracteres, com 1 número e 1 letra maiúscula.
            </p>
          </div>
          <Input
            title="Confirmar senha *"
            placeholder="Confirme sua senha"
            type="password"
          />
        </div>
      </div>

      <div className="mt-8 grid grid-cols-12 gap-4">
        <div className="relative col-span-12">
          <span className="absolute right-0 top-0 text-[12px] text-text-tertiary">
            Como aparece para o cliente
          </span>
          <Input title="Nome da loja *" placeholder="Atelier Norte" />
        </div>

        <div className="col-span-6">
          <MaskedInput
            mask="00.000.000/0000-00"
            value={cnpj}
            onAccept={setCnpj}
            placeholder="34.221.876/0001-44"
            title="CNPJ *"
          />
        </div>
        <div className="col-span-6">
          <MaskedInput
            mask="(00) 00000-0000"
            value={tel}
            onAccept={setTel}
            placeholder="Telefone para contato"
            title="Telefone *"
          />
        </div>

        <div className="col-span-12">
          <Input
            title="Razão social *"
            placeholder="Atelier Norte Comércio de Moda LTDA"
          />
        </div>

        <div className="col-span-12">
          <Textarea
            title="Descrição da loja"
            placeholder="Descrição da sua loja. Ela aparecerá para o cliente."
            maxLength={200}
          />
        </div>

        <div className="col-span-2">
          <MaskedInput
            mask="00000-000"
            value={cep}
            onAccept={setCep}
            placeholder="87020-190"
            title="CEP *"
          />
        </div>
        <div className="col-span-8">
          <Input title="Endereço *" placeholder="R. Paranaguá" />
        </div>
        <div className="col-span-2">
          <Input title="Número *" placeholder="123" inputMode="numeric" />
        </div>

        <div className="col-span-5">
          <Input title="Bairro *" placeholder="Jardim das Flores" />
        </div>
        <div className="col-span-5">
          <Input title="Cidade *" placeholder="Maringá" />
        </div>
        <div className="col-span-2">
          <SelectUf title="UF *" value={uf} onChange={setUf} />
        </div>
      </div>

      <label className="mt-6 flex cursor-pointer items-center gap-2.5 text-[13px] text-text-secondary">
        <CheckBox checked={acceptedTerms} onChange={setAcceptedTerms} />
        <span>
          Declaro que li e aceito os{" "}
          <a href="#" className="text-primary underline">
            Termos de Uso
          </a>{" "}
          e a{" "}
          <a href="#" className="text-primary underline">
            Política de Privacidade
          </a>
          .
        </span>
      </label>
    </div>
  );
};

export default StepStore;
