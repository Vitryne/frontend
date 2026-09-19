import StepHeader from "@/components/steps-register/step-header"

interface Props {
    onNext: () => void
}

const StepBankDetails: React.FC<Props> = ({onNext}) => {
    return (
        <div>
            <StepHeader
                steps="passo 5 de 5"
                title="Dados bancários"
                subtitle="É para onde transferimos seus repasses em D+2 após cada venda confirmada."
            />

            

            <button onClick={onNext} className="cursor-pointer">
                Finalizar
            </button>
        </div>
    )
}

export default StepBankDetails