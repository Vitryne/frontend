import StepHeader from "@/components/steps-register/step-header"

interface Props {
    onNext: () => void
}

const StepBusinessHours: React.FC<Props> = ({onNext}) => {
    return (
        <div>
            <StepHeader
                steps="passo 4 de 5"
                title="Horário de funcionamento"
                subtitle="Fora destes horários, a Vitryne fecha a loja automaticamente."
            />

            <button onClick={onNext} className="cursor-pointer">
                proximo
            </button>
        </div>
    )
}

export default StepBusinessHours