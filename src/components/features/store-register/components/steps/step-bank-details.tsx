import StepHeader from "@/components/features/store-register/components/header";
import { FiCheck } from "react-icons/fi";
import MaskedInput from "@/components/ui/masked-input";
import { useState } from "react";
import Input from "@/components/ui/input";
import SelectField from "@/components/ui/select-field";
import { BANKS_MOCK } from "@/mocks/banks-mock";

const ACC_TYPE = ["Conta corrente", "Conta poupança", "Conta pagamento"];

const StepBankDetails = () => {
  const [accType, setAccType] = useState("Conta corrente");
  const [holderDocument, setHolderDocument] = useState("");
  const [bank, setBank] = useState("");

  const documentMask =
    holderDocument.replace(/\D/g, "").length > 11
      ? "00.000.000/0000-00"
      : "000.000.000-000";

  return (
    <div>
      <StepHeader
        title="Dados bancários"
        subtitle="É para onde transferimos seus repasses em D+2 após cada venda confirmada."
      />

      <div className="flex gap-3 rounded-2xl border border-border-brand bg-primary-soft px-5 py-4">
        <FiCheck size={24} className="mt-0.5 shrink-0 text-primary" />
        <p className="text-[14px] text-primary-hover">
          O CNPJ <span className="font-bold">34.221.876/0001-44</span> e o
          titular precisam coincidir com a conta abaixo. Pagamentos são feitos
          em dois dias úteis após cada pedido entregue.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-12 gap-4">
        <div className="col-span-12">
          <Input
            title="Titular da conta *"
            placeholder="Atelier Norte Comércio de Moda LTDA"
          />
        </div>

        <div className="col-span-12">
          <MaskedInput
            mask={documentMask}
            value={holderDocument}
            onAccept={setHolderDocument}
            placeholder="34.221.876/0001-44"
            title="CPF/CNPJ do titular *"
          />
        </div>

        <div className="col-span-12">
          <p className="mb-1.5 text-[12px] font-semibold text-text-primary">
            Tipo de conta *
          </p>

          <div className="flex flex-wrap gap-3">
            {ACC_TYPE.map((type) => {
              const active = accType === type;

              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => setAccType(type)}
                  className={`cursor-pointer rounded-xl border px-5 py-2.5 text-[13px] font-semibold transition-colors ${
                    active
                      ? "border-primary bg-primary-soft text-primary-hover"
                      : "border-border-strong bg-surface text-text-primary hover:border-primary"
                  }`}
                >
                  {type}
                </button>
              );
            })}
          </div>
        </div>

        <div className="col-span-5">
          <SelectField
            title="Banco *"
            placeholder="Selecione o banco"
            options={BANKS_MOCK}
            value={bank}
            onChange={setBank}
          />
        </div>

        <div className="col-span-3">
          <Input title="Agência *" placeholder="3421" inputMode="numeric" />
        </div>
        <div className="col-span-4">
          <Input title="Conta *" placeholder="00264-2" inputMode="numeric" />
        </div>

        <div className="col-span-12">
          <Input
            title="Chave PIX"
            placeholder="pagamento@vitryne.com (opcional)"
          />
        </div>
      </div>
    </div>
  );
};

export default StepBankDetails;
