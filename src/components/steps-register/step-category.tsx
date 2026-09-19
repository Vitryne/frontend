import StepHeader from "@/components/steps-register/step-header"

interface Props {
    onNext: () => void
}

const StepCategory: React.FC<Props> = ({onNext}) => {
    return (
        <div>
            <StepHeader
                steps="passo 3 de 5"
                title="Categorias e raio de entrega"
                subtitle="Em quais categorias sua loja atua e até onde você entrega?"
            />

            <button onClick={onNext} className="cursor-pointer">
                proximo
            </button>
        </div>
    )
}

export default StepCategory