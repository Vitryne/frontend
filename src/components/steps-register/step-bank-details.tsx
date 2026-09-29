import StepHeader from "@/components/steps-register/header"
import Button from "@/components/button";
import { FiArrowLeft, FiArrowRight, FiCheck } from "react-icons/fi";
import MaskedInput from "@/components/masked-input";
import { useState } from "react";
import Input from "@/components/input";

interface Props {
    onNext?: () => void;
    onBack: () => void;
}

const ACC_TYPE = [
    "Conta corrente", "Conta poupança" ,"Conta pagamento"
]

const StepBankDetails: React.FC<Props> = ({onNext, onBack}) => {

    const [accType, setAccType] = useState("Conta corrente")
    const [cnpj, setCnpj] = useState('')
    const [checkDigit, setCheckDigit] = useState('')

    return (
        <div>
            <StepHeader
                steps="passo 5 de 5"
                title="Dados bancários"
                subtitle="É para onde transferimos seus repasses em D+2 após cada venda confirmada."
            />

            <div className="flex gap-3 bg-primary-soft py-4 px-5 border border-border-brand rounded-2xl ">
                <FiCheck size={24} color="#9530D9"/>
                <p className="text-primary-hover text-[16px]">
                    O CNPJ <span className="font-bold">34.221.876/0001-44</span> e o titular precisam coincidir com a conta abaixo. Pagamentos são feitos em D+2 após cada pedido entregue.
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
                    <h2 className="font-bold text-[1rem]">
                        Tipo de conta
                    </h2>

                    <div className="flex gap-4 py-3">
                        {ACC_TYPE.map((type) => {
                            const active = accType === type

                                return (
                                    <button
                                        key={type}
                                        type="button"
                                        onClick={() => setAccType(type)}
                                        aria-pressed={active}
                                        className={`cursor-pointer border border-border rounded-2xl px-6 py-3 text-[1rem] font-semibold  ${
                                        active
                                            ? "bg-black text-white"
                                            : "bg-surface border-border text-text-primary hover:border-text-terciary"
                                    }`}
                                    >
                                        {type}
                                    </button>
                                )
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
                    <Input
                        title="Agência *"
                        type="number"
                        placeholder="3421"
                    />
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
                        value={checkDigit }
                        onAccept={setCheckDigit}
                        placeholder="0"
                        title="Dígito *"
                    />
                </div>

                <div className="col-span-12">
                    <Input
                        title="Chave PIX (opcional)"
                        type="string"
                        placeholder="contato@ateliernorte.com.br"
                    />
                </div>
            </div>

            <div className="flex gap-3 bg-surface-subtle mt-10 py-4 px-5 border border-border rounded-2xl ">
                <FiCheck size={16}/>
                <p className="text-text-disabled text-[13px]">
                    Seus dados bancários são criptografados em repouso (AES-256) e nunca exibidos em texto claro.
                </p>
            </div>

            <div className="flex justify-between pt-17">
                <button 
                    onClick={onBack}
                    className="cursor-pointer flex items-center justify-center gap-1 rounded-[10px] border  border-border-brand w-35 py-2 font-semibold text-[1rem] text-text-brand transition-all duration-200 ease-in-out hover:bg-screen hover:scale-[1.02] active:scale-95"
                >
                    <FiArrowLeft size={20}/>
                    Voltar
                </button>

                <Button
                    onClick={onNext} 
                    title="Finalizar configuração"
                    titleClassName="text-[1rem]"
                    buttonIcon={<FiArrowRight size={20} />}
                    className="cursor-pointer flex items-center justify-center gap-1 rounded-[10px] bg-primary w-60 py-2 font-semibold text-[14px] text-white transition-all duration-200 ease-in-out shadow-[0_8px_24px_rgba(149,48,217,0.35)] hover:bg-primary-hover hover:scale-[1.02] active:scale-95"
                />
            </div>
        </div>
    )
}

export default StepBankDetails