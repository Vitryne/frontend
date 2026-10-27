import { FiUser } from "react-icons/fi";
import ButtonGoogle from "@/components/ui/button-google";
import { FcGoogle } from "react-icons/fc";
import Input from "@/components/ui/input";
import { useState } from "react";
import SelectUf from "@/components/ui/select-uf";
import MaskedInput from "@/components/ui/masked-input";
import StepHeader from "@/components/features/store-register/components/header";

const StepStore = () => {
  const [uf, setUf] = useState("");
  const [cep, setCep] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [tel, setTel] = useState("");

  return (
    <div>
      <StepHeader
        title="Conte sobre a sua loja"
        subtitle="Esses dados aparecem para os clientes no perfil público da loja."
      />

      <div className="bg-primary-soft p-10 rounded-2xl ">
        <div className="flex justify-between pb-5">
          <h2 className="text-primary-hover font-display font-bold flex items-center gap-2 text-xl">
            <FiUser size={24} />
            Dados de acesso
          </h2>
          <span className="text-primary-hover font-display">Obrigatório</span>
        </div>

        <ButtonGoogle
          icon={<FcGoogle size={20} />}
          title="Cadastrar com o Google"
        />
        <p className="text-center text-text-secondary py-5">
          Ou com email e senha
        </p>

        <Input
          title="E-mail *"
          placeholder="Digite seu email..."
          type="email"
        />
        <div className="grid grid-cols-2 gap-5 pt-5">
          <div className="flex flex-col">
            <Input
              title=" Senha *"
              placeholder="Digite sua senha..."
              type="password"
            />
            <p className="text-[.8rem] text-text-secondary pt-3">
              Mínimo 6 caracteres, com 1 número e 1 letra maiúscula.
            </p>
          </div>
          <Input
            title="Confirmar senha *"
            placeholder="Confirme sua senha..."
            type="password"
          />
        </div>
      </div>

      <form className="mt-10 grid grid-cols-12 gap-4">
        <div className="col-span-12">
          <Input
            title="Nome da loja *"
            placeholder="Atelier Norte"
            type="text"
          />
        </div>

        <div className="col-span-12">
          <MaskedInput
            mask="00.000.000/0000-00"
            value={cnpj}
            onAccept={setCnpj}
            placeholder="34.221.876/0001-44"
            title="CNPJ *"
          />
        </div>

        <div className="col-span-12">
          <Input
            title="Razão social *"
            placeholder="Atelier Norte Comércio de Moda LTDA"
            type="text"
          />
        </div>

        <div className="col-span-12">
          <Input
            title="Descrição da loja"
            placeholder="Moda contemporânea em peças atemporais, com produção autoral em Maringá."
            type="text"
          />
        </div>

        <div className="col-span-3">
          <MaskedInput
            mask="00000-000"
            value={cep}
            onAccept={setCep}
            placeholder="01310-200"
            title="CEP *"
          />
        </div>
        <div className="col-span-7">
          <Input title="Endereço *" placeholder="Av. Brasil, 123" type="text" />
        </div>
        <div className="col-span-2">
          <Input title="Número *" placeholder="179" type="text" />
        </div>

        <div className="col-span-5">
          <Input title="Bairro *" placeholder="Jardim Oliveira" type="text" />
        </div>
        <div className="col-span-5">
          <Input title="Cidade *" placeholder="Maringá" type="text" />
        </div>
        <div className="col-span-2">
          <SelectUf title="UF *" value={uf} onChange={setUf} />
        </div>

        <div className="col-span-12">
          <MaskedInput
            mask="(00)00000-0000"
            value={tel}
            onAccept={setTel}
            placeholder="(11) 99421-8842"
            title="Telefone de contato *"
          />
        </div>
      </form>
    </div>
  );
};

export default StepStore;
