import StepHeader from "@/components/features/store-register/components/header";
import { FiCheck } from "react-icons/fi";
import MaskedInput from "@/components/ui/masked-input";
import { useState } from "react";
import Input from "@/components/ui/input";

const ACC_TYPE = ["Conta corrente", "Conta poupança", "Conta pagamento"];

const StepBankDetails = () => {
  const [accType, setAccType] = useState("Conta corrente");
  const [cnpj, setCnpj] = useState("");
  const [checkDigit, setCheckDigit] = useState("");

  return (
    <div>
      <StepHeader
        title="Dados bancários"
        subtitle="É para onde transferimos seus repasses em D+2 após cada venda confirmada."
      />

      <div className="flex gap-3 bg-primary-soft py-4 px-5 border border-border-brand rounded-2xl ">
        <FiCheck size={24} className="shrink-0 text-primary" />
        <p className="text-primary-hover text-[16px]">
          O CNPJ <span className="font-bold">34.221.876/0001-44</span> e o
          titular precisam coincidir com a conta abaixo. Pagamentos são feitos
          em D+2 após cada pedido entregue.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-12 gap-4">
        <div className="col-span-12">
          <Input
            title="Titular da conta *"
            type="text"
            placeholder="Atelier Norte Comércio de Moda LTDA"
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
          <h2 className="font-bold text-[1rem]">Tipo de conta</h2>

          <div className="flex gap-4 py-3">
            {ACC_TYPE.map((type) => {
              const active = accType === type;

              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => setAccType(type)}
                  className={`cursor-pointer border border-border rounded-2xl px-6 py-3 text-[1rem] font-semibold  ${
                    active
                      ? "bg-black text-white"
                      : "bg-surface border-border text-text-primary hover:border-border-strong"
                  }`}
                >
                  {type}
                </button>
              );
            })}
          </div>
        </div>

        <div className="col-span-12">
          <Input
            title="Banco *"
            type="text"
            placeholder="237 — Bradesco S.A."
          />
        </div>

        <div className="col-span-5">
          <Input title="Agência *" type="text" placeholder="00264" />
        </div>

        <div className="col-span-6">
          <Input
            title="Conta *"
            type="text"
            placeholder="237 — Bradesco S.A."
          />
        </div>

        <div className="col-span-1">
          <MaskedInput
            mask="0"
            value={checkDigit}
            onAccept={setCheckDigit}
            placeholder="0"
            title="Dígito *"
          />
        </div>

        <div className="col-span-12">
          <Input
            title="Chave PIX (opcional)"
            type="text"
            placeholder="contato@ateliernorte.com.br"
          />
        </div>
      </div>

      <div className="flex gap-3 bg-surface-subtle mt-10 py-4 px-5 border border-border rounded-2xl ">
        <FiCheck size={16} />
        <p className="text-text-disabled text-[13px]">
          Seus dados bancários são criptografados em repouso (AES-256) e nunca
          exibidos em texto claro.
        </p>
      </div>
    </div>
  );
};

export default StepBankDetails;
